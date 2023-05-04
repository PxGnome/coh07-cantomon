// SPDX-License-Identifier: MIT

/// @title: Turnstile Facet for CSR
/// @author: PxGnome
/// @notice: This contract is a facet to register/assign on Canto's Turnstile for CSR when using Diamond Proxy Pattern.
/// @dev: This is Version 0.1

pragma solidity ^0.8.19;

import "@solidstate/contracts/access/ownable/OwnableInternal.sol";

interface Turnstile {
    function register(address) external returns(uint256);
    function assign(uint256) external returns(uint256);
}

contract TurnstileFacet is OwnableInternal {
    function register(address _turnstileAddress) external onlyOwner {
        Turnstile(_turnstileAddress).register(tx.origin);
    }
    function assign(address _turnstileAddress, uint256 _csrId) external onlyOwner {
        Turnstile(_turnstileAddress).assign(_csrId);
    }
}
