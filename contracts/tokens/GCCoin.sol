// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GCUC is ERC20, Ownable {
    event buyProductsFinished(
        address _from,
        address _to,
        uint256 _amount,
        uint256 _userId
    );

    constructor() ERC20("GCUC", "GCUC") {}

    function mintTokens(address _account, uint256 _amount) public onlyOwner {
        _mint(_account, _amount);
    }

    function burnTokens(address _account, uint256 _amount) public onlyOwner {
        _burn(_account, _amount);
    }

    function buyProducts(
        address _to,
        uint256 _amount,
        uint256 _userId
    ) public {
        transfer(_to, _amount);
        emit buyProductsFinished(msg.sender, _to, _amount, _userId);
    }
}
