// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {OmniCodec} from "../OmniCodec.sol";

interface IOmniPortal {
    // txn metadata
    function txSender() external view returns (address);
    function txSourceChain() external view returns (string memory);
    function chain() external view returns (string memory);
    function supportedChains(string memory) external view returns (bool);
    function getLatestOmniBlock() external view returns (OmniCodec.Block memory);

    // messages
    function sendOmniTx(address _to, uint256 _value, uint64 _gasLimit, bytes memory _data) external payable;
    function sendXChainTx(string memory _chain, address _to, uint256 _value, uint64 _gasLimit, bytes memory _data)
        external
        payable;

    // state verification
    function verifyOmniState(
        uint64 _blockNumber,
        bytes memory _storageProof,
        bytes memory _storageKey,
        bytes memory _storageValue
    ) external view returns (bool);
}
