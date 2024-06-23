// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Clones.sol";
import "./CoffeeShop.sol";

contract CoffeeShopFactory {
    using Clones for address;

    address public implementation;
    uint256 public userCounter;

    mapping(uint256 => address) private userIdToOwner;
    mapping(address => uint256) private ownerToUserId;
    mapping(uint256 => address) private userIdToCoffeeShop;

    event CoffeeShopCreated(address owner, address indexed coffeeShop, uint256 userId);
    event OwnerRegistered(address indexed owner, uint256 userId);
    event OwnerRegistrationFailed(address indexed owner, string reason);
    event UserIdAssigned(address indexed owner, uint256 counter, string userId);
    event SixDigitStringConversion(uint256 value, string result);

    constructor(address _implementation) {
        implementation = _implementation;
        userCounter = 1_000_000;
    }

    function register(
        address _owner,
        address _usdcAddress,
        bool _randomizedLoyaltyScheme,
        uint256 _loyaltySchemeConfiguration
    ) external returns (string memory) {
        address owner = _owner == address(0) ? msg.sender : _owner;

        if (ownerToUserId[owner] != 0) {
            emit OwnerRegistrationFailed(owner, "Owner has already registered");
            revert("Owner has already registered");
        }

        address coffeeShop = implementation.clone();

        if (_randomizedLoyaltyScheme) {
            CoffeeShop(coffeeShop).initializeRandomizedLoyaltyScheme(owner, _usdcAddress, _loyaltySchemeConfiguration);
        } else {
            CoffeeShop(coffeeShop).initializePredictableLoyaltyScheme(owner, _usdcAddress, _loyaltySchemeConfiguration);
        }

        userCounter -= 1;
        userIdToOwner[userCounter] = owner;
        ownerToUserId[owner] = userCounter;
        userIdToCoffeeShop[userCounter] = coffeeShop;

        console2.log("User counter: %d", userCounter);

        string memory userId = toSixDigitString(userCounter);

        console2.log("User ID: %s", userId);
        console2.log("Owner: %s", owner);
        console2.log("Coffee shop: %s", coffeeShop);

        emit CoffeeShopCreated(owner, coffeeShop, userCounter);
        emit OwnerRegistered(owner, userCounter);
        emit UserIdAssigned(owner, userCounter, userId);

        return userId;
    }

    function getOwnerByUserId(uint256 _userId) external view returns (address) {
        return userIdToOwner[_userId];
    }

    function getUserIdByOwner(address _owner) external view returns (uint256) {
        return ownerToUserId[_owner];
    }

    function getCoffeeShopByUserId(uint256 _userId) external view returns (address) {
        return userIdToCoffeeShop[_userId];
    }

    function toSixDigitString(uint256 _value) internal returns (string memory) {
        require(_value > 0 && _value < 1_000_000, "Too many registrations");
        bytes memory reversed = new bytes(6);
        for (uint256 i = 0; i < 6; i++) {
            reversed[5 - i] = bytes1(uint8(48 + (_value % 10)));
            _value /= 10;
        }
        string memory result = string(reversed);
        emit SixDigitStringConversion(_value, result);
        return result;
    }
}
