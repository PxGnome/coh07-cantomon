// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
// import "../src/Level2.sol";

contract SolutionTest is Test {
    Sort sort;

    function setUp() public {
        sort = new Sort();
    }

    function generateRandomArray() private view returns (uint256[10] memory) {
        uint256[10] memory array;
        uint256 seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));

        for (uint256 i = 0; i < 10; i++) {
            array[i] = uint256(keccak256(abi.encodePacked(seed, i))) % 100;
        }

        return array;
    }

    function testSolution() public {
        uint256[10] memory array = generateRandomArray();
        uint256[10] memory sortedArray = sort.solution(array);
        // console.log(sortedArray.length);
        // for (uint256 i = 0; i < sortedArray.length; i++) {
        //     console.log(sortedArray[i]);
        // }
    }
}
