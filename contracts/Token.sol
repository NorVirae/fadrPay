// SPDX-License-Identifier:MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract Token {
    string public symbol = "FIS";
    address owner;
    string public name = "FisCoin";
    uint public totalSupply = 100000;
    mapping(address => uint) balances;

    event Transfered(address from, address to, uint _amount);
    constructor(){
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    function Transfer(address to, uint _amount) external {
        require(balances[msg.sender] > _amount, "Insufficient Balance");
        balances[msg.sender] -= _amount;
        balances[to] += _amount;
        emit Transfered(msg.sender, to, _amount);
    }

    function balanceOf (address account) public view returns(uint){
        return balances[account];
    }
}