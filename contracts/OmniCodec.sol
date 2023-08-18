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

    struct Block {
        string sourceChain;
        bytes32 parentHash;
        bytes32 hash;
        uint64 number;
        Tx[] txs;
    }

    function packChain(string memory _chain) internal pure returns (bytes32) {
        return keccak256(abi.encode(_chain));
    }

    function cmpChains(string memory _chain1, string memory _chain2) internal pure returns (bool) {
        return packChain(_chain1) == packChain(_chain2);
    }

    function encodeBlock(Block memory _block) internal pure returns (bytes memory) {
        return abi.encode(_block);
    }

    function decodeBlock(bytes memory _block) internal pure returns (Block memory) {
        return abi.decode(_block, (Block));
    }

    function encodeTx(Tx memory _tx) internal pure returns (bytes memory) {
        return abi.encode(_tx);
    }

    function decodeTx(bytes memory _tx) internal pure returns (Tx memory) {
        return abi.decode(_tx, (Tx));
    }
}
