// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Web3Market {
    string public name;
    address public owner;

    constructor() {
        name = "Web3Market";
        owner = msg.sender;
    }
}
