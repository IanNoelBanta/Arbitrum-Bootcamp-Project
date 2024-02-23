// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// latest contract address = 0xA02b92D9D24d6EF0aDd69d7FA9e59689F46b339F

contract ZZZ is ERC20, Ownable {
  mapping(address => uint256) private _stakes;
  mapping(address => uint256) private _lastStakeTimestamp;
  uint256 private _rewardRate = 1;

  constructor(address initialOwner) ERC20("ZZZ", "z") Ownable(initialOwner) {}

  function mint(address account, uint256 amount) public {
    uint256 convertedAmount = amount * 1e18;
    _mint(account, convertedAmount);
  }

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
    // uint256 reward = stakedAmount * 2;

    _stakes[msg.sender] = 0;
    _transfer(address(this), msg.sender, stakedAmount);
    _mint(msg.sender, reward);
  }

  function getStake(address account) public view returns (uint256) {
    uint256 staked = _stakes[account];
    staked = staked / 1e18;
    return staked;
  }

  function getWithdraw(address account) public view returns (uint256) {
    require(_stakes[account] > 0, "No staked tokens");

    uint256 stakedAmount = _stakes[account];
    uint256 reward = ((block.timestamp - _lastStakeTimestamp[msg.sender]) * _rewardRate) * 1e18;
    // uint256 reward =  stakedAmount * 2;

    uint256 totalWithdraw = stakedAmount + reward;
    return totalWithdraw;
  }

  function getLastStakeTimestamp(address account) public view returns (uint256) {
    return _lastStakeTimestamp[account];
  }

  function getElapsedStakeTime() public view returns (uint256) {
    uint256 time = (block.timestamp - _lastStakeTimestamp[msg.sender]);
    return time;
  } 
}