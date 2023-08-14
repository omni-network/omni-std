// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../contracts/OmniPortal.sol";
import "./Utils.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract OmniPortalTest is Test {
    OmniPortal public portal;
    address orchestrator = 0x951653190400BFfcc6b7C4D5E7e09988a9022f4E;

    function setUp() public {
        address[] memory orchestrators = new address[](1);
        orchestrators[0] = orchestrator;

        OmniProofs proofs = new OmniProofs();
        ProxyAdmin proxyAdmin = new ProxyAdmin();
        OmniPortal portalImpl = new OmniPortal();

        TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
            address(portalImpl),
            address(proxyAdmin),
            abi.encodeWithSignature(
                "initialize(string,address[],address)",
                "chain-a",
                orchestrators,
                address(proofs)
            )
        );

        portal = OmniPortal(payable(address(proxy)));
    }

    function testAddOmniBlock() public {
        assertEq(portal.getLatestOmniBlock().parentHash, bytes32(0));
        assertEq(portal.getLatestOmniBlock().hash, bytes32(0));

        OmniCodec.Block memory omniBlock = TestUtils.getTestOmniBlock1();
        bytes[] memory sigs = TestUtils.getTestOmniBlock1Sigs();

        portal.addOmniBlock(omniBlock, sigs);

        assertEq(portal.getLatestOmniBlock().parentHash, bytes32(0));
        assertEq(portal.getLatestOmniBlock().hash, omniBlock.hash);
    }

    function testAddOmnBlockTwice() public {
        testAddOmniBlock();

        OmniCodec.Block memory next = TestUtils.getTestOmniBlock2();
        bytes[] memory sigs = TestUtils.getTestOmniBlock2Sigs();

        portal.addOmniBlock(next, sigs);

        assertEq(portal.getLatestOmniBlock().parentHash, next.parentHash);
        assertEq(portal.getLatestOmniBlock().hash, next.hash);
    }

    function testAddOmniBlocks() public {
        OmniCodec.Block[] memory blocks = new OmniCodec.Block[](2);
        blocks[0] = TestUtils.getTestOmniBlock1();
        blocks[1] = TestUtils.getTestOmniBlock2();

        bytes[][] memory sigs = new bytes[][](2);
        sigs[0] = TestUtils.getTestOmniBlock1Sigs();
        sigs[1] = TestUtils.getTestOmniBlock2Sigs();

        portal.addOmniBlocks(blocks, sigs);

        assertEq(portal.getLatestOmniBlock().parentHash, blocks[0].hash);
        assertEq(portal.getLatestOmniBlock().hash, blocks[1].hash);
    }

    function testVerifyState() public {
        // proven against omniBlock hash = hex"c5c8fc8385772657dc025e03b4e4cd05b55eaddf0befac2ded2db52e8629d7d2";
        bytes memory storageSlotProof =
            hex"0aed010a3502749c4665cac9213d8c3fc222d52046390bfa6ca70000000000000000000000000000000000000000000000000000000000000000122000000000000000000000000000000000000000000000000000000000000000011a0c0801180120012a040002b402222a080112260204b402202cd6ae66bd7c65ec44eebfdbd71ea31d68a12a3210bb03fcf778fd2fcc36db6420222c080112050408b402201a21205947c1ef502eff42227bde95ca3b525ca8891cb9c6c6c1c2cf40933c31152767222a08011226060cb40220128e6996dc64831833f0fce41862fa775a67dbc7f0d5f398384b9620f526015420";
        bytes memory storageSlotKey =
            hex"02749c4665cac9213d8c3fc222d52046390bfa6ca70000000000000000000000000000000000000000000000000000000000000000";
        bytes memory storageSlotValue = hex"0000000000000000000000000000000000000000000000000000000000000001";

        testAddOmniBlock();

        bool verified =
            portal.verifyOmniState(TestUtils.getTestOmniBlock1().number, storageSlotProof, storageSlotKey, storageSlotValue);

        assertTrue(verified);
    }
}
