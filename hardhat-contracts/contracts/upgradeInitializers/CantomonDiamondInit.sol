// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import '@solidstate/contracts/token/ERC721/metadata/ERC721MetadataStorage.sol';

contract CantomonDiamondInit {    
    function init(string memory _name, string memory _symbol, string memory _baseURI) external {
        ERC721MetadataStorage.Layout storage l = ERC721MetadataStorage.layout();
        l.name = _name;
        l.symbol = _symbol;
        l.baseURI = _baseURI;
    }
}
