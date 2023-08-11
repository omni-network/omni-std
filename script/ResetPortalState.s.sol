// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.12;

import "forge-std/Script.sol";
import "../contracts/OmniPortal.sol";
import {ProxyAdmin} from "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";
import {ITransparentUpgradeableProxy} from "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract ResetPortalState is Script {
    function run() external {
        uint256 deployerKey = vm.envUint("DEPLOYER_KEY");
        address portalAddress = vm.envAddress("PORTAL_ADDRESS");
        address proxyAdminAddress = vm.envAddress("PROXY_ADMIN_ADDRESS");

        vm.startBroadcast(deployerKey);

        // reset storage for testing purposes
        OmniPortal portal = OmniPortal(payable(address(portalAddress)));
        portal.resetState();

        // deploy latest omni portal implementation
        OmniPortal portalImpl = new OmniPortal();

        ProxyAdmin portalProxyAdmin = ProxyAdmin(proxyAdminAddress);
        portalProxyAdmin.upgrade(ITransparentUpgradeableProxy(portalAddress), address(portalImpl));

        vm.stopBroadcast();
    }
}
