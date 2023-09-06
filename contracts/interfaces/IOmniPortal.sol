// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {OmniCodec} from "../OmniCodec.sol";

interface IOmniPortal {
    event TransactionDeposited(address indexed from, address indexed to, uint256 indexed nonce, bytes data);
    event OmniBlockAdded(uint256 indexed blockNumber, OmniCodec.BlockChunk block);
    event XChainTxResult(bytes32 indexed sourceTxHash, uint256 indexed omniNonce, bool success);

    function chain() external view returns (string memory);
    function isOrchestrator(address _address) external view returns (bool);

    // blocks
    function getLatestOmniBlockChunk() external view returns (OmniCodec.BlockChunk memory);
    function addOmniBlockChunk(OmniCodec.BlockChunk calldata _blockChunk, bytes[] calldata signatures) external;
    function addOmniBlockChunks(OmniCodec.BlockChunk[] calldata _blockChunks, bytes[][] calldata signatures) external;

    // outbound tx
    function sendOmniTx(address _to, bytes memory _data) external;
    function sendXChainTx(string memory _chain, address _to, bytes memory _data) external;
    function nonce() external view returns (uint256);

    // inbound tx metadata
    function txSender() external view returns (address); // tx.from if tx is from omni
    function txSourceChain() external returns (string memory);
    function isXChainTx() external view returns (bool); // true if tx is a XChainTx
    function isOmniTx() external view returns (bool);
    function isTxFrom(string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory, string memory, string memory)
        external
        view
        returns (bool);

    // state verification
    function verifyOmniState(
        uint64 _blockNumber,
        bytes memory _storageProof,
        bytes memory _storageKey,
        bytes memory _storageValue
    ) external view returns (bool);

    // admin
    function addSupportedChain(string memory _chain) external;
    function removeSupportedChain(string memory _chain) external;
    function addOrchestrator(address _orchestrator) external;
    function removeOrchestrator(address _orchestrator) external;
    function resetState(OmniCodec.BlockChunk calldata _block, uint256 _nonce) external;
}
