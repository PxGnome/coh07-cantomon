export const NFT_READER_CONTRACT = "0x2C3B0d8B7819eD3Cf5f76f2feDAE0544971840e7";
export const NFT_DIAMOND_CONTRACT = "0xcF6F356d3195554ebDfE06257791cd22Bc2f4CE7"; 
export const NFT_READER_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_outbox",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint32",
          "name": "destinationDomain",
          "type": "uint32"
        },
        {
          "indexed": false,
          "internalType": "bytes32",
          "name": "recipient",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "message",
          "type": "string"
        }
      ],
      "name": "SentMessage",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_destinationDomain",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "portNft",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_destinationDomain",
          "type": "uint32"
        },
        {
          "internalType": "address",
          "name": "_nftAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_receiveAddr",
          "type": "address"
        }
      ],
      "name": "portNftTest",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint32",
          "name": "_destinationDomain",
          "type": "uint32"
        },
        {
          "internalType": "uint256",
          "name": "_gasAmount",
          "type": "uint256"
        }
      ],
      "name": "quoteGasPayment",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_gasAmount",
          "type": "uint256"
        }
      ],
      "name": "setGasAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_igp",
          "type": "address"
        }
      ],
      "name": "setIgp",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_addr",
          "type": "bytes32"
        }
      ],
      "name": "setMailboxRecepient",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_outbox",
          "type": "address"
        }
      ],
      "name": "setOutbox",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]