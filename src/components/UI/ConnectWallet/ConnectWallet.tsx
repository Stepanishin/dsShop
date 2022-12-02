import React, {memo, useEffect, useMemo, useState} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { FC } from 'react';
import './ConnectWallet.css'
import * as web3 from "@solana/web3.js";

import { Keypair } from "@solana/web3.js";
import { WalletProvider } from '@solana/wallet-adapter-react';





require('@solana/wallet-adapter-react-ui/styles.css');




const ConnectWallet:FC = () => {
    return (   
        <Content /> 
    );
};

export default ConnectWallet;

const Content: FC = memo(() => {
    return (
 
            <div className='connectWallet_wrapper'>
                <WalletMultiButton />
            </div>


        
    );
});