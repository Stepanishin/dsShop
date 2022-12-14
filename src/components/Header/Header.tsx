import React, {FC, useEffect, useState} from 'react';
import ConnectWallet from '../UI/ConnectWallet/ConnectWallet';
import Logo from '../UI/Logo/Logo';
import cart from './img/Cart.svg'
import profile from './img/profile.svg'
import './header.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { showCart } from '../../helpers/showModalWindow';
import baseUrl from '../../assets/config';
import { getOrdersSlice } from '../../store/reducers/getProductFromOrderDB';
import { useWallet } from '@solana/wallet-adapter-react';


const Header: FC = () => {

    const { publicKey } = useWallet();

    let [ quantity, setQuantity ] = useState('')
    const {cards} = useAppSelector(state => state.addCardSlice)

    // let {cards} = useAppSelector(state => state.getOrdersSlice)
    const {getOrders} = getOrdersSlice.actions
    const dispatch = useAppDispatch()

    // Changing the number of items on the cart icon
    useEffect(() => {
        let cartQuantity = document.getElementById('cartQuantity')!
        if (cards.length !== 0) {
            cartQuantity.style.display = 'block'
            setQuantity('' + cards.length)
        } else {
            cartQuantity.style.display = 'none'
        }
    }, [cards])

    // Функция получения открытых ордеров пользователя
    const useShowProfile = () => {  
        
            let profile = document.getElementById('profile')!
            let modalAll = document.getElementById('modalAllProfile')!
            let cardList = document.getElementById('CardList')!
            profile.classList.toggle('showProfile')
            modalAll.classList.toggle('showModal')
            cardList.classList.toggle('display_none_cardList')

            if (profile.classList.value.includes('showProfile') && publicKey) {
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
        <header className='Header'>
            <div className="container Header_container">
                <Logo />
                <div className='Header_links_container'>
                    <a className='Header_links_item' href='https://dustcity.world/'  target="_blank" rel="noreferrer">Dust City World</a>
                    <a className='Header_links_item' href='https://dustcity.world/'  target="_blank" rel="noreferrer">Dust City Court</a>
                    <a className='Header_links_item' href='https://dustcity.world/'  target="_blank" rel="noreferrer">NFT Builder</a>
                </div>
                <div className="header_btns_container">
                    <div className="header_btns_container">
                        <img onClick={useShowProfile} className="header_profile" src={profile} alt="Cart" width='24px' height='21px' />
                        <img onClick={showCart} id='basketImg' className="header_cart" src={cart} alt="Cart" width='24px' height='21px' />
                        <p id='cartQuantity' className="header_cart_quantity">{quantity}</p>
                    </div>
                    <ConnectWallet />
                </div>
            </div>
        </header>
    );
};

export default Header;