// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {OmniCodec} from "./OmniCodec.sol";
import {Ics23} from "./ics23/ics23.sol";
import {Ics23CommitmentProof} from "./ics23/proofs.sol";
import {Ics23ProofSpecs} from "./ics23/specs.sol";
import {OmniProofs} from "./OmniProofs.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

/**
 * @title OmniPortal
 * @notice Repurposed from Optimism's OmniPortal.
 */
contract OmniPortal is Initializable, OwnableUpgradeable {
    uint64 internal constant RECEIVE_DEFAULT_GAS_LIMIT = 100_000;
    address internal constant OMNI_PREDEPLOY_ADDRESS = 0x1212400000000000000000000000000000000001;

    // block hash is root of evm store in the omni cosmos chain
    // you can fetch with omni_getEvmStoreRoot
    OmniCodec.Block public latestOmniBlock;
    mapping(uint64 => OmniCodec.Block) public omniBlocks;

    bool public isOmniTx;         // set to true before processing an xchain tx
    address public txSender;      // set tx.from before processing an xchain tx
    string public txSourceChain;  // set to tx.sourceChain before processing an xchain tx

    // just initialized in contructor for now
    // TODO: add function to allow existing orchestrators to add new ones / remove existing ones
    // TODO: track orchestrator stake and weight votes by stake
    address[] public orchestrators;

    string public chain;
    uint256 public nonce;
    OmniProofs public proofs;

    mapping (string => bool) supportedChains;

    event TransactionDeposited(address indexed from, address indexed to, uint256 indexed nonce, bytes data);
    event OmniBlockAdded(uint256 indexed blockNumber, OmniCodec.Block block);
    event XChainTxResult(bytes32 indexed sourceTxHash, uint256 indexed omniNonce, bool success);

    constructor() initializer {}

    function initialize(
        string memory _chain,
        address[] memory _orchestrators,
        address _proofs
    ) public initializer {
        __Ownable_init();
        chain = _chain;
        orchestrators = _orchestrators;
        proofs = OmniProofs(_proofs);
    }

    receive() external payable {
        _sendOmniTx(msg.sender, msg.value, RECEIVE_DEFAULT_GAS_LIMIT, bytes(""));
    }

    modifier onlySupportedChain(string memory _chain) {
        require(supportedChains[_chain], "Omni: chain is not supported");
        _;
    }

    function addSupportedChain(string memory _chain) external onlyOwner {
        supportedChains[_chain] = true;
    }

    function removeSupportedChain(string memory _chain) external onlyOwner {
        supportedChains[_chain] = false;
    }

    // used only for testing
    function resetState() external onlyOwner {
        nonce = 0;
        delete latestOmniBlock;
    }

    function getLatestOmniBlock() public view returns (OmniCodec.Block memory) {
        return latestOmniBlock;
    }

    function isOrchestrator(address _address) public view returns (bool) {
        for (uint64 i = 0; i < orchestrators.length; i++) {
            if (orchestrators[i] == _address) {
                return true;
            }
        }
        return false;
    }

    function addOmniBlock(OmniCodec.Block calldata _block, bytes[] calldata signatures) public {
        bytes32 digest = keccak256(OmniCodec.encodeBlock(_block));
        address[] memory signers = new address[](signatures.length);

        require(_block.parentHash == latestOmniBlock.hash, "OmniPortal: invalid parent hash");

        // check signatures
        for (uint64 i = 0; i < signatures.length; i++) {
            (address signer, ECDSA.RecoverError err) = ECDSA.tryRecover(digest, signatures[i]);

            require(err == ECDSA.RecoverError.NoError, "OmniPortal: invalid signature");
            require(isOrchestrator(signer), "OmniPortal: signer is not an orchestrator");

            // check signer is unique
            for (uint64 j = 0; j < i; j++) {
                require(signers[j] != signer, "OmniPortal: duplicate signer");
            }

            signers[i] = signer;
        }

        // check at least 2/3s of orchestrators signed
        // TODO: this should be a stake weighted
        require(signers.length >= (orchestrators.length * 2) / 3, "OmniPortal: not enough signatures");

        latestOmniBlock = _block;
        omniBlocks[_block.number] = _block;

        for (uint64 i = 0; i < _block.txs.length; i++) {
            // only execute block transactions where destination is current chain
            OmniCodec.Tx memory blockTx = _block.txs[i];
            if (OmniCodec.packChain(blockTx.destChain) == OmniCodec.packChain(chain)) {
                _executeTx(blockTx);
            }
        }

        emit OmniBlockAdded(_block.number, _block);
    }

    function addOmniBlocks(OmniCodec.Block[] calldata _blocks, bytes[][] calldata signatures) public {
        require(_blocks.length == signatures.length, "OmniPortal: blocks and signatures length mismatch");

        for (uint64 i = 0; i < _blocks.length; i++) {
            addOmniBlock(_blocks[i], signatures[i]);
        }
    }

    function _executeTx(OmniCodec.Tx memory _tx) internal {
        txSender = _tx.from;
        txSourceChain = _tx.sourceChain;
        isOmniTx = true;

        uint256 gasStart = gasleft();
        (bool success, bytes memory returnValue) = address(_tx.to).call(_tx.data);
        uint256 gasSpent = gasStart - gasleft();

        txSender = address(0);
        txSourceChain = "";
        isOmniTx = false;

        if (success) {
            _sendOmniTx(
                OMNI_PREDEPLOY_ADDRESS,
                0, // value
                100000, // gas limit,
                abi.encodeWithSignature(
                    "markSuccess(bytes,address,bytes,uint256)", OmniCodec.encodeTx(_tx), msg.sender, returnValue, gasSpent
                )
            );
        } else {
            _sendOmniTx(
                OMNI_PREDEPLOY_ADDRESS,
                0, // value
                100000, // gas limit,
                abi.encodeWithSignature("markReverted(bytes,address,uint256)", OmniCodec.encodeTx(_tx), msg.sender, gasSpent)
            );
        }

        emit XChainTxResult(_tx.sourceTxHash, _tx.nonce, success);

        // TODO: handle setting tx value by withdrawing from oWETH omni bridge
        // TODO: enable injection of cctx.sender into cctx calldata
    }

    function sendOmniTx(address _to, uint256 _value, uint64 _gasLimit, bytes memory _data)
        external
        payable
    {
        require(_to != OMNI_PREDEPLOY_ADDRESS, "OmniPortal: direct sendOmniTx to Omni allowed only by portal");
        _sendOmniTx(_to, _value, _gasLimit, _data);
    }

    function _sendOmniTx(address _to, uint256 _value, uint64 _gasLimit, bytes memory _data) private {
        require(_gasLimit >= 21_000, "OmniPortal: gas limit must cover instrinsic gas cost");

        bytes memory txData = abi.encodePacked(msg.value, _value, _gasLimit, _data);
        emit TransactionDeposited(msg.sender, _to, nonce, txData);
        nonce = nonce + 1;
    }

    function sendXChainTx(string memory _chain, address _to, uint256 _value, uint64 _gasLimit, bytes memory _data)
        external
        onlySupportedChain(_chain)
        payable
    {
        _sendOmniTx(
            OMNI_PREDEPLOY_ADDRESS,
            0,
            100000, // gas limit,
            abi.encodeWithSignature("sendTx(string,address,uint256,uint64,bytes)", _chain, _to, _value, _gasLimit, _data)
        );
    }

    function verifyOmniState(
        uint64 _blockNumber,
        bytes memory _storageProof,
        bytes memory _storageKey,
        bytes memory _storageValue
    ) public view returns (bool) {
        OmniCodec.Block storage b = omniBlocks[_blockNumber];
        require(b.hash != 0x0, "OmniPortal: state root not found");

        bytes memory root = abi.encodePacked(b.hash);

        Ics23CommitmentProof.Data memory storageProof = Ics23CommitmentProof.decode(_storageProof);
        Ics23.VerifyMembershipError err =
            proofs.ics23VerifyMembership(Ics23ProofSpecs.iavlSpec(), root, storageProof, _storageKey, _storageValue);

        require(err == Ics23.VerifyMembershipError.None, "OmniPortal: invalid storageProof");

        return true;
    }
}
