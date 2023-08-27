// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

interface IOmni {
    event TransactionSent(string indexed destChain, uint64 indexed nonce, bytes tx);
    event TransactionMarkSuccess(bytes32 sourceTxHash);
    event TransactionMarkReverted(bytes32 sourceTxHash);

    function sendTx(string memory, address, bytes memory) external returns (uint256);

    function isOmniTx() external view returns (bool);
    function isExternalTx() external view returns (bool);

    function txSourceChain() external returns (string memory);
    function isTxFrom(string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory, string memory) external view returns (bool);
    function isTxFromOneOf(string memory, string memory, string memory, string memory, string memory)
        external
        view
        returns (bool);
}
