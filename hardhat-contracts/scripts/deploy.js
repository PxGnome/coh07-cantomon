/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')

async function deploy(_initArg) {
    console.log('')
    console.log('Deploying Diamond')

    const CantomonDiamond = await ethers.getContractFactory("CantomonDiamond");
    cantomonDiamond = await CantomonDiamond.deploy();
    console.log('CantomonDiamond deployed:', cantomonDiamond.address);
    console.log('')
    console.log('Deploying Facets')
    
    var facetCuts = []

    const CantomonDiamondInit = await ethers.getContractFactory("CantomonDiamondInit");
    cantomonDiamondInit = await CantomonDiamondInit.deploy();
    const encodedFunction = cantomonDiamondInit.interface.encodeFunctionData('init', _initArg);

    var Facet = await ethers.getContractFactory('ProxyERC721Facet');
    var facet = await Facet.deploy();
    console.log(`${FacetName} deployed: ${facet.address}`)

    facetCuts.push({
        target: facet.address,
        action: FacetCutAction.Add,
        selectors: getSelectors(facet).remove(['supportsInterface(bytes4)'])
    })

    var FacetNames = [
        'GMFacet',
        'DojoFacet',
        'EvolutionFacet',
    ]

    for (var FacetName of FacetNames) {
        Facet = await ethers.getContractFactory(FacetName);
        facet = await Facet.deploy();
        await facet.deployed();
        console.log(`${FacetName} deployed: ${facet.address}`);

        facetCuts.push({
            target: facet.address,
            action: FacetCutAction.Add,
            selectors:  getSelectors(facet)
        })
    }
    tx = await cantomonDiamond.diamondCut(
        facetCuts,
        // ethers.constants.AddressZero, 
        // '0x',
        cantomonDiamondInit.address, 
        encodedFunction,
        { gasLimit: 8000000 }
    )
    receipt = await tx.wait()
    if (!receipt.status) {
        throw Error(`Diamond upgrade failed: ${tx.hash}`)
    }
    console.log('')
    console.log(`Diamond upgrade succeeded`)
    return cantomonDiamond.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deploy()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deploy = deploy
