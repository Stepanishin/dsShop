import React, { FC } from 'react';
import styles from './Profile.module.css'
import close from '../../assets/img/delete.svg'
import { useShowProfile } from '../../helpers/showModalProfile';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppSelector } from '../../hooks/redux';
import avatar from './img/avatar.gif'


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
                <div  className={styles.Profile_info_wrapper}>
                    <div className={styles.Profile_avatar_container}>
                        <img src={avatar} alt="Avatar" />
                    </div>
                    <p className={styles.Profile_info_wallet}>
                        {publicKey && publicKey.toString('base58').slice(0, 8) +"..."+ publicKey.toString('base58').slice(publicKey.toString('base58').length - 8, publicKey.toString('base58').length)}
                    </p>

                </div>
                {
                    <h2 className={styles.Profile_title}>Orders:</h2>
                }

                {
                    userData && userData.length > 0 && userData !== null && userData !== undefined
                    &&
                    userData.map((order, index) => {
                        return (
                            <div key={index}  className={styles.Profile_wrapper}>
                                    {
                                        order.userOrder.map((item, index) => {
                                            return (
                                                <div className={styles.Profile_order_item_container} key={index}>
                                                    <p>{item.name}</p>
                                                    <img width={45} height={35} src={item.image} alt="" />
                                                    <p>Quantity : {item.quantity}</p>
                                                </div>
                                            )
                                        })
                                    }
                                    <p>Total Price: $USDC {order.sumUSDC} + $NCTR {order.sumNCTR}</p>
                                    <p>Status: {order.status}</p>
                            </div>  
                        )
                    })
                }
                {
                    userData && userData.length === 0 && userData !== null && userData !== undefined && <div className={styles.Profile_wrapper}>You have no open orders</div>
                }
                {
                    userData === null && <div className={styles.Profile_wrapper}>You must log in and subscribe message from your wallet</div>
                }
                    
            </nav>
    );
};

export default Profile;