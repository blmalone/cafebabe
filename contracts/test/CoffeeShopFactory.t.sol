// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/CoffeeShopFactory.sol";
import "forge-std/console2.sol";

contract CoffeeShopFactoryTest is Test {
    CoffeeShopFactory coffeeShopFactory;
    address usdc;
    address owner = address(1);
    address user = address(2);
    uint256 basisPoints = 5000; // 50%
    uint256 numPurchasesBeforeFree = 9;

    function setUp() public {
        coffeeShopFactory = new CoffeeShopFactory(owner);
    }

    function test_Register() public {
        // Register a coffee shop using the randomized loyalty scheme
        address cafe1Owner = address(100);
        string memory expectedCafeUserId1 = "999999";
        address cafe1ProxyAddresss = 0x104fBc016F4bb334D775a19E8A6510109AC63E00;
        vm.expectEmit();
        emit CoffeeShopFactory.CoffeeShopCreated(cafe1Owner, cafe1ProxyAddresss, 999999);
        vm.expectEmit();
        emit CoffeeShopFactory.OwnerRegistered(cafe1Owner, 999999);
        vm.expectEmit();
        emit CoffeeShopFactory.UserIdAssigned(cafe1Owner, 999999, expectedCafeUserId1);
        string memory cafeUserId1 = coffeeShopFactory.register(cafe1Owner, address(usdc), true, basisPoints);
        assertEq(cafeUserId1, expectedCafeUserId1);

        // Register a coffee shop using the predictable loyalty scheme
        address cafe2Owner = address(101);
        string memory expectedCafeUserId2 = "999998";
        address cafe2ProxyAddresss = 0x037eDa3aDB1198021A9b2e88C22B464fD38db3f3;
        vm.expectEmit();
        emit CoffeeShopFactory.CoffeeShopCreated(cafe2Owner, cafe2ProxyAddresss, 999998);
        vm.expectEmit();
        emit CoffeeShopFactory.OwnerRegistered(cafe2Owner, 999998);
        vm.expectEmit();
        emit CoffeeShopFactory.UserIdAssigned(cafe2Owner, 999998, expectedCafeUserId2);
        string memory cafeUserId2 = coffeeShopFactory.register(cafe2Owner, address(usdc), false, numPurchasesBeforeFree);
        assertEq(cafeUserId2, expectedCafeUserId2);
    }

    function testFail_UserCannotDoubleRegister() public {
        address cafe1Owner = address(100);
        string memory expectedCafeUserId1 = "999999";
        address cafe1ProxyAddresss = 0x104fBc016F4bb334D775a19E8A6510109AC63E00;
        vm.expectEmit();
        emit CoffeeShopFactory.CoffeeShopCreated(cafe1Owner, cafe1ProxyAddresss, 999999);
        string memory cafeUserId1 = coffeeShopFactory.register(cafe1Owner, address(usdc), true, basisPoints);
        console2.log("cafeUserId1", cafeUserId1);
        console2.log("expectedCafeUserId1", expectedCafeUserId1);
        assertEq(cafeUserId1, expectedCafeUserId1);

        // Try to register the same coffee shop again
        string memory expectedFailureReason = "Owner has already registered";
        vm.expectEmit();
        emit CoffeeShopFactory.OwnerRegistrationFailed(cafe1Owner, expectedFailureReason);
        string memory failureReason = coffeeShopFactory.register(cafe1Owner, address(usdc), true, basisPoints);
    }
}
