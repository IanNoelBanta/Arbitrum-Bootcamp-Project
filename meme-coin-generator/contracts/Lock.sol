// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// latest contract address = 0x4C9A09fD8C1A43e3444587D549BcfD162E5D2bB3

contract ZZZ is ERC20, Ownable {
  mapping(address => uint256) private _stakes;
  mapping(address => uint256) private _lastStakeTimestamp;
  uint256 private _rewardRate = 1;

  mapping(address => uint256) private _stakesLocked;
  mapping(address => uint256) private _lastStakeTimestampLocked;
  uint256 private _lockedRewardRate = 2;
  uint256 private _lockedStakeTime = 60;

  constructor(address initialOwner) ERC20("ZZZ", "z") Ownable(initialOwner) {}

  function mint(address account, uint256 amount) public {
    uint256 convertedAmount = amount * 1e18;
    _mint(account, convertedAmount);
  }

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------NORMAL STAKING----------------------
// ------------------------------------------------------
// ------------------------------------------------------

  function stake(uint256 amount) public {
    uint256 convertedAmount = amount * 1e18;
    require(convertedAmount > 0, "Cannot stake 0 tokens");
    require(balanceOf(msg.sender) >= convertedAmount, "Insufficient balance");

    _stakes[msg.sender] += convertedAmount;
    _lastStakeTimestamp[msg.sender] = block.timestamp;
    _transfer(msg.sender, address(this), convertedAmount);
  }

  function withdraw() public {
    require(_stakes[msg.sender] > 0, "No staked tokens");

    uint256 stakedAmount = _stakes[msg.sender];
    uint256 reward = ((block.timestamp - _lastStakeTimestamp[msg.sender]) * _rewardRate) * 1e18;

    _stakes[msg.sender] = 0;
    _transfer(address(this), msg.sender, stakedAmount);
    _mint(msg.sender, reward);
  }

  function getStake() public view returns (uint256) {
    uint256 staked = _stakes[msg.sender] / 1e18;
    return staked;
  }

  function getWithdraw() public view returns (uint256) {
    require(_stakes[msg.sender] > 0, "No staked tokens");

    uint256 stakedAmount = _stakes[msg.sender] / 1e18;
    uint256 reward = ((block.timestamp - _lastStakeTimestamp[msg.sender]) * _rewardRate);

    uint256 totalWithdraw = stakedAmount + reward;
    return totalWithdraw;
  }

  function getLastStakeTimestamp() public view returns (uint256) {
    return _lastStakeTimestamp[msg.sender];
  }

  function getElapsedStakeTime() public view returns (uint256) {
    uint256 time = (block.timestamp - _lastStakeTimestamp[msg.sender]);
    return time;
  } 
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------


// ----------------------------------------------------------------------------


// ------------------------------------------------------
// ------------------------------------------------------
// ------------------LOCKED STAKING----------------------
// ------------------------------------------------------
// ------------------------------------------------------

  function lockedStake(uint256 amount) public {
    uint256 convertedAmountLocked = amount * 1e18;
    require(convertedAmountLocked > 0, "Cannot stake 0 tokens");
    require(balanceOf(msg.sender) >= convertedAmountLocked, "Insufficient balance");

    _stakesLocked[msg.sender] += convertedAmountLocked;
    _lastStakeTimestampLocked[msg.sender] = block.timestamp;
    _transfer(msg.sender, address(this), convertedAmountLocked);
  }

  function lockedWithdraw() public {
    require(_stakesLocked[msg.sender] > 0, "No staked tokens");
    require(block.timestamp > (_lastStakeTimestampLocked[msg.sender] + _lockedStakeTime), "Cannot withdraw yet, coins are locked for 60 seconds");

    uint256 stakedAmountLocked = _stakesLocked[msg.sender];
    uint256 rewardLocked = ((block.timestamp - _lastStakeTimestampLocked[msg.sender]) * _lockedRewardRate) * 1e18;

    _stakesLocked[msg.sender] = 0;
    _transfer(address(this), msg.sender, stakedAmountLocked);
    _mint(msg.sender, rewardLocked);
  }

  function getStakeLocked() public view returns (uint256) {
    uint256 stakedLocked = _stakesLocked[msg.sender] / 1e18;
    return stakedLocked;
  }

  function getWithdrawLocked() public view returns (uint256) {
    require(_stakesLocked[msg.sender] > 0, "No staked tokens");

    uint256 stakedAmountLocked = _stakesLocked[msg.sender] / 1e18;
    uint256 rewardLocked = ((block.timestamp - _lastStakeTimestampLocked[msg.sender]) * _lockedRewardRate);

    uint256 totalWithdrawLocked = stakedAmountLocked + rewardLocked;
    return totalWithdrawLocked;
  }

  function getLastStakeTimestampLocked() public view returns (uint256) {
    return _lastStakeTimestampLocked[msg.sender];
  }

  function getElapsedStakeTimeLocked() public view returns (uint256) {
    uint256 timeLocked = (block.timestamp - _lastStakeTimestampLocked[msg.sender]);
    return timeLocked;
  } 
}