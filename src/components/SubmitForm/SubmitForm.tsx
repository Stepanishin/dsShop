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
import { getDatabase, ref, update } from "firebase/database";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCardSlice } from '../../store/reducers/getProductToBasket';
import Loader from '../UI/Loader/Loader';
import baseUrl from '../../assets/config';


const SubmitForm:FC<ISubmitFormProps> = ({totalPrice}) => {

    const [result, setResult] = useState<ISubmitFormResult>({
        name: '',
        surname: '',
        nickname: '',
        mail: '',
        country: '',
        city: '',
        zip: '',
        adress: '',
        phone: '',
        status: 'In processing',
        statusPayment: 'checking'
    });
    const connection = new Connection("https://solana-mainnet.g.alchemy.com/v2/IjcuUmymeTy65r4Z0KPaWfm7hsIC5OFK", "confirmed");
    const { publicKey, signTransaction, sendTransaction, signedMessage } = useWallet();
    const db = getDatabase();
    let {cards} = useAppSelector(state => state.addCardSlice)
    const {addCard} = addCardSlice.actions
    const dispatch = useAppDispatch()

    let loader : HTMLElement

    useEffect(()=> {
        setResult({...result, ['sumUSDC']: totalPrice.$USDC, ['sumNCTR']: totalPrice.$NCTR, ['sumSOL']: totalPrice.$SOL, ['wallet']: publicKey?.toBase58(), ['userOrder']: cards})
    }, [totalPrice,publicKey])

    let mintNCTRAdress = 'AgnHzGspNu7F3nFM4izuPt5g7m1URjVaTaFNgvqSXcjC'
    let mintUSDCAdress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
    let theWallet = '3RWcwYeik3vWh2pWB8KCBvK7XTcWH52Lx9m4vy1UZQdS'

    const handleChange = (e:any) => {
        const fieldName = e.target.name
        setResult({...result, [fieldName]: e.target.value})
    }

    // ?????????????? ??????????*(????????????)
    const succes = () => {
        toast.success('Your order has been accepted!')
    };
    const smhWrong = () => {
        toast.error('Something went wrong!')
    };
    const basketEmpty = () => {
        toast.error('Cart is empty!')
    };

    const onClick = useCallback( async () => {
        loader = document.querySelector('#Loader')!
        // ???????? ???? ???????????????????????? ??????????????
        if (!publicKey) {
            let wl: HTMLElement = document.querySelector('.wallet-adapter-button')!
            if (wl instanceof HTMLElement) {
                    wl.click()         
            }  
        }
        // ???????? ?????????????? ????????????
        if (cards.length === 0) {
            basketEmpty()
            return
        }
        try {
            ////////////////////////SOLANA///////////////////////////////////////////////////////////////////////////////////////////////////////////////   
            
            if (!publicKey || !signTransaction) throw new WalletNotConnectedError()
            
            loader.style.display = 'flex'

            const toPublicKey = new PublicKey(theWallet) //??????????????, ???????? ????????????????????
            const mint1 = new PublicKey(mintNCTRAdress) //?????????? ???????????? ,?????????????? ?????????? ??????????????????
            const mint2 = new PublicKey(mintUSDCAdress) //?????????? ???????????? ,?????????????? ?????????? ??????????????????
            
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
            let lamportsIII = LAMPORTS_PER_SOL*result.sumSOL!

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
            ).add(
                SystemProgram.transfer(
                    {
                        fromPubkey: publicKey,
                        toPubkey: new PublicKey(theWallet),
                        lamports: lamportsIII,
                    }
                )
            )

            const blockHash = await connection.getRecentBlockhash()
            transaction.feePayer = await publicKey
            transaction.recentBlockhash = await blockHash.blockhash
            const signed = await signTransaction(transaction)
            await connection.sendRawTransaction(signed.serialize())
            
            ///////////////////////DATA BASE///////////////////////////////////////////////////////////////////////////////////////////////////////////
            const updateDb = () => {
                const token:string = localStorage.getItem('authToken')
                const options = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: token
                    },
                    body: JSON.stringify(result)
                  };
                  
                  fetch(`${baseUrl}/orders`, options)
                    .then(response => response.json())
                    .then(response => console.log(response))
                    .catch(err => console.error(err));
    
                // ???????????????? ??????????????
                const closeLoader =() => {
                    loader.style.display = 'none'
                }
                setTimeout(closeLoader, 1500)
                // ???????????? , ?????? ?????? ???????????? ??????????????
                succes()
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            updateDb()
            setResult({
                name: '',
                surname: '',
                nickname: '',
                mail: '',
                country: '',
                city: '',
                zip: '',
                adress: '',
                phone:'',
                status: 'In processing',
                statusPayment: 'checking'
            })
            const newCards = [];
            dispatch(addCard(newCards))
        } catch (error: any) {
            // ???????????????? ??????????????
            const closeLoader =() => {
                loader.style.display = 'none'
            }
            setTimeout(closeLoader, 1000)
            // 
            smhWrong()
        }

         
    }, [publicKey, sendTransaction, connection]);

    const setOrder = (e:any) => {
        e.preventDefault()
        onClick()
    }

    return (
        <form className={styles.SubmitForm} onSubmit={setOrder}>

            <h2 className={styles.SubmitForm_title}>Checkout</h2>
            
            <div className={styles.SubmitForm_inputs_container}>

                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="name">Name*  </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='name' id='name' onChange={handleChange} placeholder=" John" value={result.name}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="surname">Surname*   </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='surname' id='surname' onChange={handleChange} placeholder=" Defo" value={result.surname}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="nickname">Nickname on Telegram*   </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='nickname' id='nickname' onChange={handleChange} placeholder=" @Demiurg"  value={result.nickname}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="phone">Contact Phone*   </label>
                    <div className={styles.link_block}>
                        <input required type='tel' name='phone' id='phone' onChange={handleChange} placeholder=" +386 696505644"  value={result.phone}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                 <label className={styles.title}  htmlFor="mail">Mail*   </label>
                    <div className={styles.link_block}>
                        <input required type="email" name='mail' id='mail' onChange={handleChange} placeholder=" john_defo@example.com"  value={result.mail}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="country">Country*  </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='country' id='country' onChange={handleChange} placeholder=" Germany"  value={result.country}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="city">City*   </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='city' id='city' onChange={handleChange} placeholder=" Berlin"  value={result.city}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="zip">Zip Code*   </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='zip' id='zip' onChange={handleChange} placeholder=" 1010"  value={result.zip}/>
                    </div>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label className={styles.title}  htmlFor="adress">Adress*  </label>
                    <div className={styles.link_block}>
                        <input required type="text" name='adress' id='adress' onChange={handleChange} placeholder=" Something Strasse, 10"  value={result.adress}/>
                    </div>
                </div>

            </div>


            <button className={styles.SubmitForm_button} type="submit">Take Order</button>

            <Loader />



        </form>
    );
};

export default SubmitForm;