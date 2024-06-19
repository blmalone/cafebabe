// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import {Vm} from "forge-std/Test.sol";
import "../src/CoffeeShop.sol";
import "../src/CoffeeShopFactory.sol";

contract CoffeeShopFactoryScript is Script {
    function setUp() public {}

    function run() public {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        CoffeeShop shop = new CoffeeShop();
        CoffeeShopFactory factory = new CoffeeShopFactory(address(shop));
        vm.recordLogs();
        string memory userId = factory.register(
            address(0x50F1d3b9F5811F333e7Ef77D14B470cEAA08e905), // owner
            address(0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913), // usdc
            false, // randomizedLoyaltyScheme
            9 // loyaltySchemeConfiguration
        );
        Vm.Log[] memory entries = vm.getRecordedLogs();
        console2.log("##################");
        console2.log("##################");
        address shopAddress = address(uint160(uint256(entries[1].topics[1])));
        console2.log("Shop Proxy Address: ", shopAddress);
        console2.log("##################");
        console2.log("##################");

        vm.stopBroadcast();

        console2.log("CoffeeShopFactory address: ", address(factory));
        console2.log("CoffeeShop implemention address: ", address(shop));
        console2.log("UserId: ", userId);
    }
}
