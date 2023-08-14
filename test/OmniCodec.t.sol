// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/OmniCodec.sol";
import "./Utils.sol";

contract OmniCodecTest is Test {
    function testEncodeBlock1() public {
        OmniCodec.Block memory b = TestUtils.getTestOmniBlock1();
        assertEq(OmniCodec.encodeBlock(b), TestUtils.getTestOmniBlock1Encoded());
    }

    function testEncodeBlock2() public {
        OmniCodec.Block memory b = TestUtils.getTestOmniBlock2();
        assertEq(OmniCodec.encodeBlock(b), TestUtils.getTestOmniBlock2Encoded());
    }
}
