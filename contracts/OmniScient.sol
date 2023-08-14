// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Omni} from "./Omni.sol";
import {OmniCodec} from "./OmniCodec.sol";

contract OmniScient {
    address internal constant OMNI_PREDEPLOY_ADDRESS = 0x1212400000000000000000000000000000000001;
    Omni constant omni = Omni(OMNI_PREDEPLOY_ADDRESS);

    function onXChainTxSuccess(OmniCodec.Tx memory _xtx, address _sender, bytes memory _returnValue, uint256 _gasSpent) virtual external onlyOmni {}
    function onXChainTxReverted(OmniCodec.Tx memory _xtx, address _sender, uint256 _gasSpent) virtual external onlyOmni {}

    modifier onlyOmni {
      require(msg.sender == OMNI_PREDEPLOY_ADDRESS);
      _;
    }
}
