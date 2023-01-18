// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Web3Market {
    address public owner;

    struct Item {
        uint256 id; 
        string name; 
        string category; 
        string image; 
        uint256 price; 
        uint256 rating; 
        uint256 stock;
    }

    mapping(uint256 => Item) public items;

    event List(string name, uint256 price, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner is authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    //List products
    function list(
        uint256 id, 
        string memory name, 
        string memory category, 
        string memory image, 
        uint256 price, 
        uint256 rating, 
        uint256 stock
        ) public onlyOwner{
        
        //Create Item
        Item memory item = Item(id, name, category, image, price, rating, stock);

        //Save Item to chain
        items[id] = item;

        //Emit event
        emit List(name, price, stock);
    }

    //Buy products
    function buy() public {}

    //Withdraw funds
    function withdraw() public {}

}