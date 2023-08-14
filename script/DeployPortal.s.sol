// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "../contracts/OmniPortal.sol";
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import {TransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract DeployPortal is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("DEPLOYER_KEY");
        address deployerAddress = vm.envAddress("DEPLOYER_ADDRESS");
        uint256 portalDeployerKey = vm.envUint("PORTAL_DEPLOYER_KEY");
        address portalDeployerAddress = vm.envAddress("PORTAL_DEPLOYER_ADDRESS");
        address orchestrator = vm.envAddress("ORCHESTRATOR");
        string memory chain = vm.envString("CHAIN_NAME");
        address[] memory orchestrators = new address[](1);
        orchestrators[0] = orchestrator;

        vm.startBroadcast(deployerKey);
        (bool sent, ) = portalDeployerAddress.call{value: 0.02 ether}("");
        require(sent, "Failed to send Ether to portal deployer");

        ProxyAdmin proxyAdmin = new ProxyAdmin();

        OmniProofs proofsImpl = new OmniProofs();
        OmniPortal portalImpl = new OmniPortal();

        TransparentUpgradeableProxy proofsProxy = new TransparentUpgradeableProxy(
            address(proofsImpl),
            address(proxyAdmin),
            abi.encodeWithSignature("initialize()")
        );

        vm.stopBroadcast();

        vm.startBroadcast(portalDeployerKey);

        TransparentUpgradeableProxy portalProxy = new TransparentUpgradeableProxy(
            address(portalImpl),
            address(proxyAdmin),
            abi.encodeWithSignature(
                "initialize(string,address[],address)",
                chain,
                orchestrators,
                address(proofsProxy)
            )
        );
        OmniPortal portal = OmniPortal(payable(address(portalProxy)));
        portal.addSupportedChain("chain-a");
        portal.addSupportedChain("chain-b");
        portal.addSupportedChain("arbitrum-goerli");
        portal.addSupportedChain("optimism-goerli");

        portal.transferOwnership(deployerAddress);

        vm.stopBroadcast();
    }
}
