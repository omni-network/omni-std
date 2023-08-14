// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {OmniCodec} from "./OmniCodec.sol";
import {OmniScient} from "./OmniScient.sol";

// predeployed
contract Omni {
    address private _admin;
    mapping (string => bool) supportedChains;

    address public constant SYSTEM = 0x1212400000000000000000000000000000000000;

    string public txSourceChain = "omni";

    // Using encoding for now. We should add a version if we stick with it.
    event TransactionSent(string indexed destChain, uint64 indexed nonce, bytes tx);
    event TransactionMarkSuccess(bytes32 sourceTxHash);
    event TransactionMarkReverted(bytes32 sourceTxHash);

    uint64 public nonce;

    modifier onlySupportedChain(string memory _chain) {
        require(supportedChains[_chain], "Omni: chain is not supported");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Omni: only admin");
        _;
    }

    function addSupportedChain(string memory _chain) external onlyAdmin {
        supportedChains[_chain] = true;
    }

    function removeSupportedChain(string memory _chain) external onlyAdmin {
        supportedChains[_chain] = false;
    }

    function setTxSourceChain(string memory _chain) public {
        require(msg.sender == SYSTEM, "Omni: only system account");
        txSourceChain = _chain;
    }

    function sendTx(string memory _chain, address _to, uint256 _value, uint64 _gasLimit, bytes memory _data)
        external
        onlySupportedChain(_chain)
        payable
        returns (uint256)
    {
        nonce = nonce + 1;
        OmniCodec.Tx memory xtx = OmniCodec.Tx({
            sourceTxHash: bytes32(0),
            sourceChain: txSourceChain,
            destChain: _chain,
            nonce: nonce,
            from: msg.sender,
            to: _to,
            value: _value,
            paid: msg.value,
            gasLimit: _gasLimit,
            data: _data
        });

        emit TransactionSent(_chain, nonce, OmniCodec.encodeTx(xtx));

        return nonce;
    }

    function markSuccess(bytes memory _tx, address _relayer, bytes memory _returnValue, uint256 _gasSpent) external {
        require(isExternalTx(), "Omni: callbacks can only be called by external chain portal");
        OmniCodec.Tx memory xtx = OmniCodec.decodeTx(_tx);
        OmniScient(xtx.from).onXChainTxSuccess(xtx, _relayer, _returnValue, _gasSpent);

        emit TransactionMarkSuccess(xtx.sourceTxHash);
    }

    function markReverted(bytes memory _tx, address _relayer, uint256 _gasSpent) external {
        require(isExternalTx(), "Omni: callbacks can only be called by external chain portal");
        OmniCodec.Tx memory xtx = OmniCodec.decodeTx(_tx);
        OmniScient(xtx.from).onXChainTxReverted(xtx, _relayer, _gasSpent);

        emit TransactionMarkReverted(xtx.sourceTxHash);
    }

    /**
     * txSourceChain helpers
     */

    function isTxFrom(string memory _chain) public view returns (bool) {
        return OmniCodec.cmpChains(txSourceChain, _chain);
    }

    function isOmniTx() public view returns (bool) {
        return isTxFrom("omni");
    }

    function isExternalTx() public view returns (bool) {
        return !isTxFrom("omni");
    }

    function isTxFromOneOf(string memory _chain1, string memory _chain2) public view returns (bool) {
        return isTxFrom(_chain1) || isTxFrom(_chain2);
    }

    function isTxFromOneOf(string memory _chain1, string memory _chain2, string memory _chain3)
        public
        view
        returns (bool)
    {
        return isTxFrom(_chain1) || isTxFrom(_chain2) || isTxFrom(_chain3);
    }

    function isTxFromOneOf(string memory _chain1, string memory _chain2, string memory _chain3, string memory _chain4)
        public
        view
        returns (bool)
    {
        return isTxFrom(_chain1) || isTxFrom(_chain2) || isTxFrom(_chain3) || isTxFrom(_chain4);
    }

    function isTxFromOneOf(
        string memory _chain1,
        string memory _chain2,
        string memory _chain3,
        string memory _chain4,
        string memory _chain5
    ) public view returns (bool) {
        return isTxFrom(_chain1) || isTxFrom(_chain2) || isTxFrom(_chain3) || isTxFrom(_chain4) || isTxFrom(_chain5);
    }
}
