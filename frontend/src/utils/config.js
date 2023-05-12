export const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE;
export const WCM_PROJECT_ID= process.env.NEXT_PUBLIC_WCM_PROJECT_ID;
export const NFT_READER_CONTRACT = process.env.NEXT_PUBLIC_NFT_READER_CONTRACT;
export const NFT_DIAMOND_CONTRACT = process.env.NEXT_PUBLIC_NFT_DIAMOND_CONTRACT; 
export const EXPLORER_ADDRESS = process.env.NEXT_PUBLIC_EXPLORER_ADDRESS;
export const CANTO_TEST_NETWORK_CHAIN = {
  id: 7701,
  name: 'Canto Testnet',
  network: 'Canto Testnet',
  nativeCurrency: {
    name: 'CANTO',
    symbol: 'CANTO',
  },
  rpcUrls: {
    public: { http: ['https://canto-testnet.plexnode.wtf'] },
    default: { http: ['https://canto-testnet.plexnode.wtf'] }
  },
  blockExplorers: {
    etherscan: { name: 'Canto Testnet', url: 'https://testnet.tuber.build/' },
    default: { name: 'Canto Testnet', url: 'https://testnet.tuber.build/' },
  }
};

export const CANTO_NETWORK_CHAIN = {
  id: 7700,
  name: 'CANTO',
  network: 'CANTO',
  nativeCurrency: {
    name: 'CANTO',
    symbol: 'CANTO',
  },
  rpcUrls: {
    public: { http: ['https://canto.gravitychain.io'] },
    default: { http: ['https://canto.gravitychain.io'] }
  },
  blockExplorers: {
    etherscan: { name: 'CANTO', url: 'https://tuber.build/' },
    default: { name: 'CANTO', url: 'https://tuber.build/' },
  }
};

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