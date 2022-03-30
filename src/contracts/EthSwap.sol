// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint256 public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint256 amout,
        uint256 rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
      uint256 tokenAmount = msg.value * rate;

      require(token.balanceOf(address(this)) >= tokenAmount);

      token.transfer(msg.sender, tokenAmount);

      emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }
}
