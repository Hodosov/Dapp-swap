// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

import "./Token.sol";

contract EthSwap {
   string public name = "EthSwap Instant Exchange";
   Token public token;
   uint public rate = 100;

   event TokenPurechased(
      address account,
      address token,
      uint amount,
      uint rate
   );

   constructor(Token _token) public {
      token = _token;
   }

   function buyTokens() public payable {
      uint tokenAmount = msg.value * rate;

      require(token.balanceOf(address(this)) >= tokenAmount);

      token.transfer(msg.sender, tokenAmount);

      //Emit an event
      emit TokenPurechased(msg.sender, address(token), tokenAmount, rate);
   }
}
