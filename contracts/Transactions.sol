//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCounter;

    event Transfer(address from, address receiver, uint amount, string keyword, string message, uint256 timestamp);

    struct transferStruct {
        address sender;
        address receiver;
        uint amount;
        string keyword;
        string message;
        uint256 timestamp;
    }

    transferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword ) public {
        transactionCounter += 1;
        transactions.push(transferStruct(msg.sender, receiver, amount,  keyword, message,  block.timestamp));
        emit Transfer(msg.sender, receiver, amount, keyword, message, block.timestamp);
    }

    function getAllTransactions() public view returns (transferStruct[] memory){
        return transactions;
    }
    
    function getTransactionCount() public view returns (uint256){
        return transactionCounter;
    }

}