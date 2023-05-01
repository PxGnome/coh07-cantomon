// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.13;

// import "../../lib/forge-std/src/Test.sol";
// // import {Utils} from "./utils/Utils.sol";

// import "../contracts/destination/CantomonDiamond.sol";
// import "../contracts/destination/facet/BattleFacet.sol";
// import "../contracts/destination/facet/EvolutionFacet.sol";
// import "../contracts/destination/facet/GMFacet.sol";
// import "../contracts/destination/facet/ProxyERC721Facet.sol";
// import {SolidStateERC721Mock} from "../contracts/mock/MockERC721.sol";
// import {NftReader} from "../contracts/origin/NftReader.sol";

// contract CantomonTest is Test {
//     CantomonDiamond cantomonDiamond;
//     BattleFacet battleFacet;
//     EvolutionFacet evolutionFacet;
//     GMFacet gmFacet;
//     ProxyERC721Facet proxyERC721Facet;
//     SolidStateERC721Mock mockERC721;
//     NftReader nftreader;

//     address owner;
//     address addr1;

//     function setUp() public {
//         cantomonDiamond = new CantomonDiamond();
//         battleFacet = new BattleFacet();
//         evolutionFacet = new EvolutionFacet();
//         gmFacet = new GMFacet();
//         proxyERC721Facet = new ProxyERC721Facet();
//         mockERC721 = new SolidStateERC721Mock('mock', 'mock', 'MOCK');
//         nftreader = new NftReader(address(0));
//         // ['Cantomon', "CANTOMON", "/BASEURI"]
//         owner = vm.addr(1);
//         addr1 = vm.addr(2);
//         vm.label(owner, "Owner");
//         vm.label(addr1, "Address1");

//         //build cut struct
//         FacetCut[] memory cut = new FacetCut[](2);

//         cut[0] = (
//             FacetCut({
//                 facetAddress: address(dLoupe),
//                 action: FacetCutAction.Add,
//                 functionSelectors: generateSelectors("DiamondLoupeFacet")
//             })
//         );

//         cut[1] = (
//             FacetCut({
//                 facetAddress: address(ownerF),
//                 action: FacetCutAction.Add,
//                 functionSelectors: generateSelectors("OwnershipFacet")
//             })
//         );


//         // cantomon.diamondCut(
//         //     address(battleFacet),
//         //     abi.encodeWithSelector(battleFacet.init.selector, "Cantomon", "CANTOMON", "/BASEURI"),
//         //     new bytes32[](0)
//         // );

//     }

//     function test_proxyERC721Facet() public {
//         assertEq(proxyERC721Facet.name(),'Cantomon');
//     }

    
//     function generateSelectors(string memory _facetName)
//         internal
//         returns (bytes4[] memory selectors)
//     {
//         string[] memory cmd = new string[](3);
//         cmd[0] = "node";
//         cmd[1] = "scripts/genSelectors.js";
//         cmd[2] = _facetName;
//         bytes memory res = vm.ffi(cmd);
//         selectors = abi.decode(res, (bytes4[]));
//     }

//     function diamondCut(
//         FacetCut[] calldata _diamondCut,
//         address _init,
//         bytes calldata _calldata
//     ) external override {}

// }
