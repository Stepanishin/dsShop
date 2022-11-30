import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './SubmitForm.module.css'
import { ISubmitFormProps } from '../../types/ISubmitFormProps';
import { ISubmitFormResult } from '../../types/ISubmitFormResult';
import toast from 'react-hot-toast';
import { Toaster, resolveValue } from 'react-hot-toast';
import { clusterApiUrl, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_PROGRAM_ID, createTransferInstruction } from "@solana/spl-token";
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { Connection } from "@solana/web3.js";


const SubmitForm:FC<ISubmitFormProps> = ({totalPrice}) => {

    const [result, setResult] = useState<ISubmitFormResult>({});
    // const { connection } = useConnection();
    const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/IjcuUmymeTy65r4Z0KPaWfm7hsIC5OFK", "confirmed");
    const { publicKey, signTransaction, sendTransaction } = useWallet();

    useEffect(()=> {
        let sumUSDC = totalPrice.Subtotal + totalPrice.Tax + totalPrice.Shipping
        setResult({...result, ['sumUSDC']: sumUSDC, ['sumNCTR']: totalPrice.$NCTR, ['date']: Date.now()})
    }, [totalPrice])

    let mintNCTRAdress = 'AgnHzGspNu7F3nFM4izuPt5g7m1URjVaTaFNgvqSXcjC'
    let mintUSDCAdress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    let theWallet = '3RWcwYeik3vWh2pWB8KCBvK7XTcWH52Lx9m4vy1UZQdS'

    const handleChange = (e:any) => {
        const fieldName = e.target.name
        setResult({...result, [fieldName]: e.target.value})
    }

    // Создаём тосты*(алармы)
    const succes = () => {
        toast.success('Your order has been accepted!')
    };
    const smhWrong = () => {
        toast.error('Something went wrong!')
    };
    //

    const onClick = useCallback( async () => {

        // Если не присоединили кошелек
        if (!publicKey) {
            let wl: HTMLElement = document.querySelector('.wallet-adapter-button')!
            if (wl instanceof HTMLElement) {
                    wl.click()         
            }  
        }
        // 
        try {
            ////////////////////////SOLANA///////////////////////////////////////////////////////////////////////////////////////////////////////////////   

            if (!publicKey || !signTransaction) throw new WalletNotConnectedError()

            const toPublicKey = new PublicKey(theWallet) //Кошелек, куда пересылать
            const mint1 = new PublicKey(mintNCTRAdress) //Адрес токена ,который нужно переслать
            const mint2 = new PublicKey(mintUSDCAdress) //Адрес токена ,который нужно переслать

            const fromTokenAccount1 = await getOrCreateAssociatedTokenAccount(
                connection,
                publicKey,
                mint1,
                publicKey,
                signTransaction
            )
            const fromTokenAccount2 = await getOrCreateAssociatedTokenAccount(
                connection,
                publicKey,
                mint2,
                publicKey,
                signTransaction
            )

            const toTokenAccount1 = await getOrCreateAssociatedTokenAccount(
                connection,
                publicKey,
                mint1,
                toPublicKey,
                signTransaction
            )
            const toTokenAccount2 = await getOrCreateAssociatedTokenAccount(
                connection,
                publicKey,
                mint2,
                toPublicKey,
                signTransaction
            )

            let lamportsI = LAMPORTS_PER_SOL*result.sumNCTR!;
            let lamportsII = 1000000*result.sumUSDC!;


            const transaction = new Transaction().add(
                createTransferInstruction(
                    fromTokenAccount1.address, // source
                    toTokenAccount1.address, // dest
                    publicKey,
                    lamportsI,
                    [],
                    TOKEN_PROGRAM_ID
                )
            ).add(
                createTransferInstruction(
                    fromTokenAccount2.address, // source
                    toTokenAccount2.address, // dest
                    publicKey,
                    lamportsII,
                    [],
                    TOKEN_PROGRAM_ID
                )
            )

            const blockHash = await connection.getRecentBlockhash()
            transaction.feePayer = await publicKey
            transaction.recentBlockhash = await blockHash.blockhash
            const signed = await signTransaction(transaction)
            await connection.sendRawTransaction(signed.serialize())
            ///////////////////////DATA BASE///////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            succes()
        } catch (error: any) {
            // Закрытие Лоадера
            // 
            smhWrong()
        }

         
    }, [publicKey, sendTransaction, connection]);



    const setOrder = (e:any) => {
        e.preventDefault()
        console.log(result)
        onClick()
    }

    return (
        <form className={styles.SubmitForm} onSubmit={setOrder}>
            
            <div className={styles.SubmitForm_inputs_container}>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="name">Your name*  </label>
                    <input required type="text" name='name' id='name' onChange={handleChange}placeholder=" John"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="surname">Your surname*   </label>
                    <input type="text" name='surname' id='surname' onChange={handleChange}placeholder=" Defo"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="nickname">Your nickname on Telegramm*   </label>
                    <input type="text" name='nickname' id='nickname' onChange={handleChange}placeholder=" @Demiurg"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                 <label htmlFor="mail">Your mail*   </label>
                 <input type="text" name='mail' id='mail' onChange={handleChange} placeholder=" john_defo@example.com"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="country">Your country*  </label>
                    <input type="text" name='country' id='country' onChange={handleChange} placeholder=" Germany"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="city">Your city*   </label>
                    <input type="text" name='city' id='city' onChange={handleChange} placeholder=" Berlin"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="zip">Your Zip*   </label>
                    <input type="text" name='zip' id='zip' onChange={handleChange} placeholder=" 1010"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="adress">Your adress*  </label>
                    <input type="text" name='adress' id='adress' onChange={handleChange} placeholder=" Something Strasse, 10"/>
                </div>
            </div>




            <button className={styles.SubmitForm_button} type="submit">Take Order</button>

            <Toaster
            position="top-center"
            reverseOrder={false}
            />

        </form>
    );
};

export default SubmitForm;