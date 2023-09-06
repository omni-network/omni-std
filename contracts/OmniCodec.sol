// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

library OmniCodec {
    struct Tx {
        bytes32 sourceTxHash;
        string sourceChain; // differs from block.sourceChain in external chain -> chain txs
        string destChain;
        uint64 nonce;
        address from;
        address to;
        uint256 value;
        uint256 paid;
        uint64 gasLimit;
        bytes data;
    }

    struct BlockChunk {
        string destChain;
        bytes32 parentHash;
        bytes32 hash;
        uint64 number;
        Tx[] txs;
        uint64 totalChunks;
        uint64 chunkIndex;
    }

    // Many rollups follow ethereum post EIP-1559 block gas limit of
    // 30,000,000. Average calldata byte costs 15.95 gas (4 gas if the byte
    // is zero, 16 otherwise). The theoretical maximum size is about 1.8 MB for
    // a single tx, that takes up an entire block. Omni xchain txs are batch,
    // and submitted together in a single tx. So we set a conservative limit of
    // for a single omni xchain tx of < 1% 1.8MB.
    uint64 public constant MAX_XCHAIN_CALLDATA_BYTES = 10_000; // 10kb

    function isBelowXChainCalldataLimit(bytes memory _data) internal pure returns (bool) {
        return _data.length <= MAX_XCHAIN_CALLDATA_BYTES;
    }

    function packChain(string memory _chain) internal pure returns (bytes32) {
        return keccak256(abi.encode(_chain));
    }

    function cmpChains(string memory _chain1, string memory _chain2) internal pure returns (bool) {
        return packChain(_chain1) == packChain(_chain2);
    }

    function encodeBlockChunk(BlockChunk memory _block) internal pure returns (bytes memory) {
        return abi.encode(_block);
    }

    function decodeBlockChunk(bytes memory _block) internal pure returns (BlockChunk memory) {
        return abi.decode(_block, (BlockChunk));
    }

    function encodeTx(Tx memory _tx) internal pure returns (bytes memory) {
        return abi.encode(_tx);
    }

    function decodeTx(bytes memory _tx) internal pure returns (Tx memory) {
        return abi.decode(_tx, (Tx));
    }
}

