
import Layout from '@/components/layout';
import { ethers, providers } from "ethers";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon, goerli, sepolia } from 'wagmi/chains';

import store from '@/utils/store';
import { Provider } from "react-redux";

import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/customBootstrap.scss';
import '@/styles/globals.scss';
import { Chain } from '@wagmi/core'; 
import EthereumClientContext from '@/utils/ethereum_client_context';

export const canto_test_net = {
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


export default function App({ Component, pageProps }) {
  //const chains = [arbitrum, mainnet, polygon];
  const chains = [sepolia, goerli, canto_test_net];
  const projectId = '6756fe16c79f90abecbbe4e697ca0ee0';

  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
  const ethersProvider = new providers.Web3Provider(provider)
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider
  });
 ;

  const ethereumClient = new EthereumClient(wagmiClient, chains);
 

  return (
    <Provider store={store}>
      <EthereumClientContext.Provider value={{
        ethereumClient,
        provider,
        ethersProvider
      }}>
        <WagmiConfig client={wagmiClient}>
          <Layout>
            <Component {...pageProps} ethereumClient={ethereumClient}/>
          </Layout>
        </WagmiConfig>

        <Web3Modal
          projectId={projectId}
          ethereumClient={ethereumClient}
          themeMode="light"
        />
      </EthereumClientContext.Provider>
    </Provider>
  )
}
