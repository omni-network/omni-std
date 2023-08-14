// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./proofs.sol";


library Ics23ProofSpecs {
  function iavlSpec() internal pure returns (Ics23ProofSpec.Data memory spec) {
    spec = Ics23ProofSpec.decode(
      hex"0a090801180120012a0100120c0a02000110211804200c3001"
    );
  }

  function tendermintSpec() internal pure returns (Ics23ProofSpec.Data memory spec) {
    spec = Ics23ProofSpec.decode(
      hex"0a090801180120012a0100120c0a0200011020180120013001"
    );
  }
}
