// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {OmniCodec} from "../OmniCodec.sol";

interface OmniScient {
    function onXChainTxSuccess(OmniCodec.Tx memory, address, bytes memory, uint256) external;
    function onXChainTxReverted(OmniCodec.Tx memory, address, uint256) external;
}
