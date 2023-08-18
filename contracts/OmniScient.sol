// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {OmniCodec} from "./OmniCodec.sol";
import {IOmni} from "./interfaces/IOmni.sol";

contract OmniScient {
    address internal constant OMNI_PREDEPLOY_ADDRESS = 0x1212400000000000000000000000000000000001;
    IOmni constant omni = IOmni(OMNI_PREDEPLOY_ADDRESS);

    function onXChainTxSuccess(OmniCodec.Tx memory _xtx, address _sender, bytes memory _returnValue, uint256 _gasSpent)
        external
        virtual
        onlyOmni
    {}
    function onXChainTxReverted(OmniCodec.Tx memory _xtx, address _sender, uint256 _gasSpent)
        external
        virtual
        onlyOmni
    {}

    modifier onlyOmni() {
        require(msg.sender == OMNI_PREDEPLOY_ADDRESS);
        _;
    }
}
