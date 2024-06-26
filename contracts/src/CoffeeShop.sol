// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/console2.sol";

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external;
}

contract CoffeeShop {
    IERC20 public usdc;
    address public owner;
    mapping(address => uint256) public loyaltyPoints;
    uint256 public minAmount;

    bool initialized;

    // Used in the randomized scheme
    uint256 public basisPoints;
    // Used in the predictable scheme
    uint256 public numPurchasesBeforeFree;

    uint256 BASIS_POINTS_MULTIPLIER = 100;
    uint256 BASIS_POINTS_MAX = 10_000;

    event Payment(address indexed payer, uint256 amount);
    event FreeCoffee(address indexed payer, uint256 amount);
    event LoyaltyPointsUpdated(address indexed user, uint256 points);
    event UsdcAddressUpdated(address indexed newUsdc);
    event MinAmountUpdated(uint256 newMinAmount);
    event BasisPointsUpdated(uint256 newBasisPoints);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    enum LoyaltyScheme {
        None,
        Randomized,
        Predictable
    }

    LoyaltyScheme public loyaltyScheme;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function initialize(address _owner, address _usdcAddress) internal {
        require(initialized == false && owner == address(0), "Already initialized");
        owner = _owner;
        usdc = IERC20(_usdcAddress);
        minAmount = 1 * 10 ** 6; // Assuming 1 USDC (decimals may vary)
        initialized = true;
    }

    function initializeRandomizedLoyaltyScheme(address _owner, address _usdcAddress, uint256 _basisPoints) external {
        initialize(_owner, _usdcAddress);
        basisPoints = _basisPoints;
        loyaltyScheme = LoyaltyScheme.Randomized;
    }

    function initializePredictableLoyaltyScheme(address _owner, address _usdcAddress, uint256 _numPurchasesBeforeFree)
        external
    {
        initialize(_owner, _usdcAddress);
        numPurchasesBeforeFree = _numPurchasesBeforeFree;
        loyaltyScheme = LoyaltyScheme.Predictable;
    }

    function payWithRandomized(uint256 amount) internal {
        uint256 adjustedBasisPoints = (basisPoints * BASIS_POINTS_MULTIPLIER);
        uint256 adjustedPercentage = adjustedBasisPoints / BASIS_POINTS_MAX;
        uint256 chance = BASIS_POINTS_MULTIPLIER / adjustedPercentage;
        uint256 randomNum = generateRandomNumber();

        bool isNextFree = randomNum % chance == 0;

        if (!isNextFree) {
            require(usdc.transferFrom(msg.sender, owner, amount), "Transfer failed");
            emit Payment(msg.sender, amount);
        } else {
            emit FreeCoffee(msg.sender, amount);
        }
    }

    function payWithPredictable(uint256 amount) internal {
        uint256 points = loyaltyPoints[msg.sender];
        bool isNextFree = points == numPurchasesBeforeFree;

        if (!isNextFree) {
            require(usdc.transferFrom(msg.sender, owner, amount), "Transfer failed");
            emit Payment(msg.sender, amount);
        } else {
            loyaltyPoints[msg.sender] = 0;
            emit FreeCoffee(msg.sender, amount);
            return;
        }

        if (amount >= minAmount) {
            points += 1;
            loyaltyPoints[msg.sender] = points;
            emit LoyaltyPointsUpdated(msg.sender, points);
        }
    }

    function pay(uint256 amount, uint256 deadline, uint8 v, bytes32 r, bytes32 s) public {
        usdc.permit(msg.sender, address(this), amount, deadline, v, r, s);

        if (loyaltyScheme == LoyaltyScheme.Randomized) {
            payWithRandomized(amount);
        } else if (loyaltyScheme == LoyaltyScheme.Predictable) {
            payWithPredictable(amount);
        } else {
            revert("Invalid loyalty scheme");
        }
    }

    function generateRandomNumber() public view returns (uint256) {
        uint256 blockNumber = block.number - 1; // Use the previous block's hash
        bytes32 blockHash = blockhash(blockNumber); // only holds last 256 block hashes
        return uint256(blockHash);
    }

    function updateUsdcAddress(address _newUsdc) external onlyOwner {
        usdc = IERC20(_newUsdc);
        emit UsdcAddressUpdated(_newUsdc);
    }

    function updateMinAmount(uint256 _newMinAmount) external onlyOwner {
        minAmount = _newMinAmount;
        emit MinAmountUpdated(_newMinAmount);
    }

    function updateBasisPoints(uint256 _newBasisPoints) external onlyOwner {
        basisPoints = _newBasisPoints;
        emit BasisPointsUpdated(_newBasisPoints);
    }

    function transferOwnership(address _newOwner) external onlyOwner {
        require(_newOwner != address(0), "New owner is the zero address");
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }

    function getLoyaltyPoints(address user) external view returns (uint256) {
        return loyaltyPoints[user];
    }

    function getUsdcAddress() external view returns (address) {
        return address(usdc);
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getLoyaltyScheme() external view returns (LoyaltyScheme) {
        return loyaltyScheme;
    }
}
