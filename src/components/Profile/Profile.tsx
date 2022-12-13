import React, { FC,useState, useEffect } from 'react';
import styles from './Profile.module.css'
import close from '../../assets/img/delete.svg'
import { useShowProfile } from '../../helpers/showModalProfile';
import { useWallet } from '@solana/wallet-adapter-react';
import baseUrl from '../../assets/config';
import { useAppSelector } from '../../hooks/redux';


const Profile:FC = () => {

    const { publicKey } = useWallet();

    let {orders} = useAppSelector(state => state.getOrdersSlice)

    const userData = JSON.parse(localStorage.getItem('userData'))

    return (
            <nav id='profile' className={styles.Profile}>
                <h2 className={styles.Profile_title}>My Profile</h2>
                <button className={styles.closeProfile} id='closeProfile' onClick={useShowProfile} >
                    <img src={close} alt="close" />
                </button>
                {/* <button onClick={getData} >Get data</button> */}
                {
                    userData
                    ?
                    userData.map((order, index) => {
                        return (
                            <div key={index}>
                                <p>{order.name}</p>  
                            </div>
                        )
                    })
                    :
                    <p>You must log in and subscribe message from your wallet</p>
                }
                    
            </nav>
    );
};

export default Profile;