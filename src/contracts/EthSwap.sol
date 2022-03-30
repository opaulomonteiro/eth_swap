// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./Token.sol";

contract EthSwap {
    string public name = "EthSwap Instant Exchange";
    Token public token;
    uint256 public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint256 amout,
        uint256 rate
    );

    event TokensSold(
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

        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint256 _amout) public {
        uint256 etherAmount = _amout / rate;

        require(address(this).balance >= etherAmount);

        token.transferFrom(msg.sender, address(this), _amout);
        payable(msg.sender).transfer(etherAmount);

        emit TokensSold(msg.sender, address(token), _amout, rate);
    }
}
