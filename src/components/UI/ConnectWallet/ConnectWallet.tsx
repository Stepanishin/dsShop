import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { FC } from 'react';
import './ConnectWallet.css'
import * as web3 from "@solana/web3.js";
import { Keypair } from "@solana/web3.js";
import { WalletProvider } from '@solana/wallet-adapter-react';
import baseUrl from '../../../assets/config';
import bs58 from 'bs58'
import nacl from 'tweetnacl'

require('@solana/wallet-adapter-react-ui/styles.css');

const ConnectWallet:FC = () => {
    return (   
        <Content /> 
    );
};

export default ConnectWallet;

const Content: FC = memo(() => {

    const { publicKey, signMessage } = useWallet();

    // Получаем сообщение, подписываем в кошельке, затем записываем пользователя в базу и получает токен
    if (publicKey) {
        let arr = {wallet: publicKey.toBase58()}
        localStorage.setItem('authToken', null);
        fetch(`${baseUrl}/hash/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(arr),
        })
            .then((response) => response.json())
            .then(async (hash) => {
            let message = hash
            signMessage(new TextEncoder().encode(message)).then((signedMessage:any) => {
                let hex = Buffer.from(signedMessage).toString('base64')
                // let arr = {wallet: publicKey.toBase58(), signature: hex, message: hash}
                let arr = {wallet: publicKey.toBase58(), signature: hex}
                fetch(`${baseUrl}/users`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(arr),
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        localStorage.setItem('authToken', data.token);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    }); 
            });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
 
            <div className='connectWallet_wrapper'>
                <WalletMultiButton />
            </div>
 
    );
});