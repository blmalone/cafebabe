// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/CoffeeShop.sol";
import "forge-std/console2.sol";

contract CoffeeShopTest is Test {
    CoffeeShop coffeeShop;
    MockERC20 usdc;
    address owner = address(1);
    address user = address(2);
    uint256 basisPoints = 5000; // 50%
    uint256 numPurchasesBeforeFree = 9;
    uint256 minAmount = 1e18; // 1 USDC in wei

    function setUp() public {
        usdc = new MockERC20();
        coffeeShop = new CoffeeShop();

        // Transfer some USDC to the user for testing
        usdc.transfer(user, 10000 * minAmount);

        // Approve the coffeeShop to spend user's USDC
        vm.prank(user);
        usdc.approve(address(coffeeShop), 1000 * minAmount);
    }

    function testInitializeRandomizedLoyaltyScheme() public {
        coffeeShop.initializeRandomizedLoyaltyScheme(owner, address(usdc), basisPoints);

        assertEq(coffeeShop.owner(), owner);
        assertEq(address(coffeeShop.usdc()), address(usdc));
        assertEq(coffeeShop.basisPoints(), basisPoints);
    }

    function testInitializePredictableLoyaltyScheme() public {
        coffeeShop.initializePredictableLoyaltyScheme(owner, address(usdc), numPurchasesBeforeFree);

        assertEq(coffeeShop.owner(), owner);
        assertEq(address(coffeeShop.usdc()), address(usdc));
        assertEq(coffeeShop.numPurchasesBeforeFree(), numPurchasesBeforeFree);
    }

    function testPayWithRandomizedLoyaltyScheme() public {
        coffeeShop.initializeRandomizedLoyaltyScheme(owner, address(usdc), basisPoints);

        bytes32 r;
        bytes32 s;
        uint8 v;
        uint256 deadline = block.timestamp + 1 days;

        uint256 numIterations = 4;

        // We CAN test randomness here because forge is deterministically generating the
        // block numbers, which we use to generate the random number.
        for (uint256 i = 0; i < numIterations; i++) {
            if (i == 2) {
                vm.expectEmit();
                emit CoffeeShop.FreeCoffee(user, 2e18);
            } else {
                vm.expectEmit();
                emit CoffeeShop.Payment(user, 2e18);
            }

            vm.prank(user);
            coffeeShop.pay(2e18, deadline, v, r, s);
            vm.roll(i + 1);
        }
    }

    function testPayWithPredictableLoyaltyScheme() public {
        coffeeShop.initializePredictableLoyaltyScheme(owner, address(usdc), numPurchasesBeforeFree);

        // Simulate USDC permit call
        bytes32 r;
        bytes32 s;
        uint8 v;
        uint256 deadline = block.timestamp + 1 days;

        for (uint256 i = 0; i < numPurchasesBeforeFree; i++) {
            vm.prank(user);
            coffeeShop.pay(2e18, deadline, v, r, s);

            uint256 expectedPoints = i + 1;
            assertEq(coffeeShop.loyaltyPoints(user), expectedPoints);
        }

        vm.prank(user);
        coffeeShop.pay(2e18, deadline, v, r, s);

        assertEq(coffeeShop.loyaltyPoints(user), 0);
    }

    function testGetLoyaltyScheme() public {
        // Test for Randomized Loyalty Scheme
        coffeeShop.initializeRandomizedLoyaltyScheme(owner, address(usdc), basisPoints);
        assertEq(uint256(coffeeShop.getLoyaltyScheme()), uint256(CoffeeShop.LoyaltyScheme.Randomized));

        // Reset the contract state for the next test
        vm.roll(block.number + 1);
        coffeeShop = new CoffeeShop();

        // Test for Predictable Loyalty Scheme
        coffeeShop.initializePredictableLoyaltyScheme(owner, address(usdc), numPurchasesBeforeFree);
        assertEq(uint256(coffeeShop.getLoyaltyScheme()), uint256(CoffeeShop.LoyaltyScheme.Predictable));
    }
}

contract MockERC20 is IERC20 {
    string public constant name = "Mock USDC";
    string public constant symbol = "mUSDC";
    uint8 public constant decimals = 18;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowances;
    uint256 public totalSupply = 1e24; // 1 million tokens

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function approve(address spender, uint256 amount) external override returns (bool) {
        allowances[msg.sender][spender] = amount;
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        require(balances[sender] >= amount, "Insufficient balance");
        require(allowances[sender][msg.sender] >= amount, "Allowance exceeded");

        balances[sender] -= amount;
        balances[recipient] += amount;
        allowances[sender][msg.sender] -= amount;
        return true;
    }

    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        override
    {
        // Mock implementation of permit
        allowances[owner][spender] = value;
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }
}
