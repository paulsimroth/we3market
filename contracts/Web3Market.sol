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

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 price, uint256 quantity);
    event Buy(address buyer, uint256 orderID, uint256 itemID);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only Owner is authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /*
    FALLBACK FUNCTIONS
    */
    receive() external payable {} 
    fallback() external payable {}

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
    function buy(uint256 id) public payable {
        
        //Fetch item
        Item memory item = items[id];

        //Require
        require(msg.value >= item.price, "Not enough ETH");
        require(item.stock > 0, "Item not in stock");

        //Create order
        Order memory order = Order(block.timestamp, item);

        //Save order to chain
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        //Substract stock
        items[id].stock = item.stock - 1;

        //Emit event
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    //Withdraw funds
    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }

}