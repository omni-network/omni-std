// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface IOmni {
    event TransactionSent(string indexed destChain, uint64 indexed nonce, bytes tx);
    event TransactionMarkSuccess(bytes32 sourceTxHash);
    event TransactionMarkReverted(bytes32 sourceTxHash);

    // outbound tx
    function sendTx(string memory, address, bytes memory) external returns (uint256);
    function nonce() external view returns (uint64);

    // inboudn tx metadata
    function txSourceChain() external returns (string memory);
    function isOmniTx() external view returns (bool);
    function isExternalTx() external view returns (bool);
    function isTxFrom(string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory, string memory, string memory)
        external
        view
        returns (bool);

    // admin
    function addSupportedChain(string memory _chain) external;
    function removeSupportedChain(string memory _chain) external;

    // system
    function setTxSourceChain(string memory _chain) external;
}


