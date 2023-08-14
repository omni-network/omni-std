// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Ics23} from "./ics23/ics23.sol";
import {Ics23CommitmentProof, Ics23ProofSpec} from "./ics23/proofs.sol";
import {Initializable} from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

// simple wrapper around Ics23 library
contract OmniProofs is Initializable {

    constructor() initializer {}

    function initialize() public initializer {}

    function ics23VerifyMembership(
        Ics23ProofSpec.Data memory _spec,
        bytes memory _root,
        Ics23CommitmentProof.Data memory _proof,
        bytes memory _key,
        bytes memory _value
    ) external pure returns (Ics23.VerifyMembershipError) {
        return Ics23.verifyMembership(_spec, _root, _proof, _key, _value);
    }
}
