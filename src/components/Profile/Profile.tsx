import React, { FC, useEffect } from 'react';
import styles from './Profile.module.css'
import close from '../../assets/img/delete.svg'
import { useWallet } from '@solana/wallet-adapter-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import avatar from './img/avatar.gif'
import baseUrl from '../../assets/config';
import { getOrdersSlice } from '../../store/reducers/getProductFromOrderDB';


const Profile:FC = () => {

    const { publicKey } = useWallet();

    let {orders} = useAppSelector(state => state.getOrdersSlice)
    const {getOrders} = getOrdersSlice.actions
    const dispatch = useAppDispatch()

    let userData:any

    let authToken = JSON.parse(localStorage.getItem('userData'))

    useEffect(() => {
        showProfile()
    }, [])

    // Функция получения открытых ордеров пользователя
    const showProfile = () => {    
        if (publicKey) {
            const token:string = localStorage.getItem('authToken')
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                  },
            };
            fetch(`${baseUrl}/user/`, options)
              .then(response => response.json())
              .then((response) => {
                dispatch(getOrders(response.userOrders))
              })
              .catch(err => console.error(err));
        }
    }
    

    return (
            <nav id='profile' className={styles.Profile}>
                <div className={styles.Profile_title_container}>
                    <h2 className={styles.Profile_title}>Profile</h2>
                </div>

                <div  className={styles.Profile_info_wrapper}>
                    <div className={styles.Profile_avatar_container}>
                        <img className={styles.Profile_avatar} src={avatar} alt="Avatar" />
                    </div>
                    <p className={styles.Profile_info_wallet}>
                        {
                            publicKey
                            ? publicKey.toString('base58').slice(0, 8) +"..."+ publicKey.toString('base58').slice(publicKey.toString('base58').length - 8, publicKey.toString('base58').length)
                            : "You have not connected your wallet"
                        }
                    </p>
                </div>

                {   
                <div className={styles.Profile_title_container}>
                    <h2 className={styles.Profile_title}>Orders:</h2>
                </div>
                }

                {
                    orders &&
                    orders.map((order, index) => {
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
                                    <p>Status: <span style={{color:'#FFCC15'}} >{order.status}</span></p>
                            </div>  
                        )
                    })
                }
                {
                    orders && orders.length === 0 && orders !== null && orders !== undefined && publicKey && <div className={styles.Profile_wrapper}>You have no open orders</div>
                }
                {
                    !publicKey && <div className={styles.Profile_wrapper}>You must log in and subscribe message from your wallet</div>
                }
                    
            </nav>
    );
};

export default Profile;