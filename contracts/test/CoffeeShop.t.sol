// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test, console2} from "forge-std/Test.sol";
import {CoffeeShop} from "../src/CoffeeShop.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CoffeeShopTest is Test {
    CoffeeShop public coffeeShop;

    function setUp() public {
        coffeeShop = new CoffeeShop();
    }

    function testUserIdCreation() public {
        assertEq(true, true);
    }

    /**
     * @dev Recieve function to accept ether
     */
    receive() external payable {}
}
