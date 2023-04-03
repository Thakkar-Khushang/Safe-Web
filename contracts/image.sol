// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ImageStorage {
    mapping(string => string) private images;

    function storeImage(string memory _name, string memory _data) public {
        images[_name] = _data;
    }

    function getImage(string memory _name) public view returns (string memory) {
        return images[_name];
    }
}