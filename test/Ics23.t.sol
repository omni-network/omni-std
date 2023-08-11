// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/ics23/ics23.sol";
import "../contracts/ics23/proofs.sol";
import "../contracts/ics23/specs.sol";



// Test both iavl and simple (tendermint) proofs.
// Iavl proofs are used for storage proofs within a cosmos store (used by omin portal to verify state).
// Simple (tendermint) proofs are used to verify store inclusion within a cosmos multistore. At the moment,
// omni does not rely on these multistore proofs. All test data fetched from omni via eth_getProof calls.
// See github.com/omni-network/omni/specs/proofs.md for more details.
contract Ics23Test is Test {

    // values based off an omni eth_getProof call - IVAL spec used for storage
    // slot proof of inclusion within evm store hash
    function testVerifyMembershipIAVLPasses() public {
      bytes memory evmModuleHash = hex"c5c8fc8385772657dc025e03b4e4cd05b55eaddf0befac2ded2db52e8629d7d2";

      bytes memory storageSlotProof = hex"0aed010a3502749c4665cac9213d8c3fc222d52046390bfa6ca70000000000000000000000000000000000000000000000000000000000000000122000000000000000000000000000000000000000000000000000000000000000011a0c0801180120012a040002b402222a080112260204b402202cd6ae66bd7c65ec44eebfdbd71ea31d68a12a3210bb03fcf778fd2fcc36db6420222c080112050408b402201a21205947c1ef502eff42227bde95ca3b525ca8891cb9c6c6c1c2cf40933c31152767222a08011226060cb40220128e6996dc64831833f0fce41862fa775a67dbc7f0d5f398384b9620f526015420";
      bytes memory storageSlotKey = hex"02749c4665cac9213d8c3fc222d52046390bfa6ca70000000000000000000000000000000000000000000000000000000000000000";
      bytes memory storageSlotValue = hex"0000000000000000000000000000000000000000000000000000000000000001";

      Ics23CommitmentProof.Data memory proof = Ics23CommitmentProof.decode(
        storageSlotProof
      );


      Ics23.VerifyMembershipError err = Ics23.verifyMembership(
        Ics23ProofSpecs.iavlSpec(),
        evmModuleHash,
        proof,
        storageSlotKey,
        storageSlotValue
      );

      assertEq(uint(err), uint(Ics23.VerifyMembershipError.None));
    }

    // same as above just change the root
    function testVerifyMembershipIAVLFails() public {
      // wrong
      bytes memory evmModuleHash = hex"0000000000000000000000000000000000000000000000000000000000000000";

      bytes memory storageSlotProof = hex"0aed010a3502749c4665cac9213d8c3fc222d52046390bfa6ca70000000000000000000000000000000000000000000000000000000000000000122000000000000000000000000000000000000000000000000000000000000000011a0c0801180120012a040002b402222a080112260204b402202cd6ae66bd7c65ec44eebfdbd71ea31d68a12a3210bb03fcf778fd2fcc36db6420222c080112050408b402201a21205947c1ef502eff42227bde95ca3b525ca8891cb9c6c6c1c2cf40933c31152767222a08011226060cb40220128e6996dc64831833f0fce41862fa775a67dbc7f0d5f398384b9620f526015420";
      bytes memory storageSlotKey = hex"02749c4665cac9213d8c3fc222d52046390bfa6ca70000000000000000000000000000000000000000000000000000000000000000";
      bytes memory storageSlotValue = hex"0000000000000000000000000000000000000000000000000000000000000001";

      Ics23CommitmentProof.Data memory proof = Ics23CommitmentProof.decode(
        storageSlotProof
      );


      Ics23.VerifyMembershipError err = Ics23.verifyMembership(
        Ics23ProofSpecs.iavlSpec(),
        evmModuleHash,
        proof,
        storageSlotKey,
        storageSlotValue
      );

      assertFalse(err == Ics23.VerifyMembershipError.None);
    }

    // values based off an omni eth_getProof call - simple spec used for proof of evm store hash inclusion within some
    // app hash
    function testVerifyMembershipSimplePasses() public {
      bytes memory appHash = hex"e0a9882aaead4a410effc55b9621297d19aec2e8c467114f7a2151b2220f0230";
      bytes memory evmModuleHash = hex"c5c8fc8385772657dc025e03b4e4cd05b55eaddf0befac2ded2db52e8629d7d2";

      bytes memory storeProof = hex"0af9010a0365766d1220c5c8fc8385772657dc025e03b4e4cd05b55eaddf0befac2ded2db52e8629d7d21a090801180120012a0100222508011221010842b5561422ad68d28682baffad7f99cd8a64a339d4bd62b72916894d3d9a192225080112210101b020012c5cf94e3298f1e7facf97ad854543a213c54bd319c7ea9dc846051122250801122101eb192aebd916253d63232aaa7d2db377265710647d6d8230b1a1cbf51b64c173222708011201011a20aa6aca0aba234b9a165b914577f82e4cb94e92bafef9c1066d0a6f665a5eb85d222708011201011a200315595fd3df234a5029cfba1f5ba02b278fc18a0272c02e1c3618aade9953a4";
      bytes memory storeKey = bytes("evm");

      Ics23CommitmentProof.Data memory proof = Ics23CommitmentProof.decode(
        storeProof
      );


      Ics23.VerifyMembershipError err = Ics23.verifyMembership(
        Ics23ProofSpecs.tendermintSpec(),
        appHash,
        proof,
        storeKey,
        evmModuleHash
      );

      assertEq(uint(err), uint(Ics23.VerifyMembershipError.None));
    }

    // same as above but change key
    function testVerifyMembershipSimpleFails() public {
      bytes memory appHash = hex"e0a9882aaead4a410effc55b9621297d19aec2e8c467114f7a2151b2220f0230";
      bytes memory evmModuleHash = hex"c5c8fc8385772657dc025e03b4e4cd05b55eaddf0befac2ded2db52e8629d7d2";

      bytes memory storeProof = hex"0af9010a0365766d1220c5c8fc8385772657dc025e03b4e4cd05b55eaddf0befac2ded2db52e8629d7d21a090801180120012a0100222508011221010842b5561422ad68d28682baffad7f99cd8a64a339d4bd62b72916894d3d9a192225080112210101b020012c5cf94e3298f1e7facf97ad854543a213c54bd319c7ea9dc846051122250801122101eb192aebd916253d63232aaa7d2db377265710647d6d8230b1a1cbf51b64c173222708011201011a20aa6aca0aba234b9a165b914577f82e4cb94e92bafef9c1066d0a6f665a5eb85d222708011201011a200315595fd3df234a5029cfba1f5ba02b278fc18a0272c02e1c3618aade9953a4";
      bytes memory storeKey = bytes("wrong");

      Ics23CommitmentProof.Data memory proof = Ics23CommitmentProof.decode(
        storeProof
      );


      Ics23.VerifyMembershipError err = Ics23.verifyMembership(
        Ics23ProofSpecs.tendermintSpec(),
        appHash,
        proof,
        storeKey,
        evmModuleHash
      );

      assertFalse(err == Ics23.VerifyMembershipError.None);
    }
}
