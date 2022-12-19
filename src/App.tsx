import React from 'react';
import './assets/reset.css'
import './assets/normalize.css'
import './assets/index.css'
import Header from './components/Header/Header';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import { WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,

} from '@solana/wallet-adapter-wallets';  
import { FC, ReactNode, useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import ShopPage from './pages/ShopPage/ShopPage';
import { initializeApp } from "firebase/app";
import { Toaster } from 'react-hot-toast';

function App() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAua7sHJHNsJz2IhiaASP5LMKJC9vCnmS8",
    authDomain: "dustcity-7fef1.firebaseapp.com",
    databaseURL: "https://dustcity-7fef1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dustcity-7fef1",
    storageBucket: "dustcity-7fef1.appspot.com",
    messagingSenderId: "540698269699",
    appId: "1:540698269699:web:acf43f8aae50ed77181636"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return (
    <Context>
      <div className="App">
        <Header />
        <Toaster
            position="top-center"
            reverseOrder={false}
            />
        <ShopPage />
      </div>
    </Context>
  );
}

export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {

  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);


  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
      () => [
          new LedgerWalletAdapter(),
          new PhantomWalletAdapter(),
          new GlowWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolletExtensionWalletAdapter(), 
          new SolletWalletAdapter(),
          new SolflareWalletAdapter({ network }),
          new TorusWalletAdapter(),
      ],
      [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>{children}</WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
};
