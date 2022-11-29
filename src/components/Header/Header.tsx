import React, {FC, useEffect, useState} from 'react';
import ConnectWallet from '../UI/ConnectWallet/ConnectWallet';
import Logo from '../UI/Logo/Logo';
import cart from './img/Cart.svg'
import './header.css'
import { useAppSelector } from '../../hooks/redux';


const Header: FC = () => {

    let [ quantity, setQuantity ] = useState('')
    const {cards} = useAppSelector(state => state.addCardSlice)
    let basketImg :HTMLElement
    let basket:HTMLElement

    const [size, setSize] = useState({});
    const ref = React.useRef<any | HTMLDivElement> (null);  

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

    //   Function that shows or hides the shopping cart
    const changeCart = () => {
        let basket = document.getElementById('basket')!
        let cardList = document.getElementById('CardList')!
        basket.classList.toggle('display_flex')
        cardList.classList.toggle('display_none')
    }

    // Function to change event listeners based on screen width
    const resizeHandler = () => {
        const { clientHeight, clientWidth } = ref.current;
        setSize({ clientHeight, clientWidth });
        if (clientWidth < 1190 ) {
            basketImg.addEventListener('click',changeCart)
        }
        if (clientWidth > 1190 ) {
            basketImg.removeEventListener('click',changeCart)   
        }
    };

    // Applying the overlay function of event listeners based on screen width
    useEffect(() => {
        basket = document.getElementById('basket')!
        basketImg = document.getElementById('basketImg')!
        window.addEventListener("resize", resizeHandler);
        resizeHandler();   
        return () => {
          window.removeEventListener("resize", resizeHandler);
          basketImg.removeEventListener('click',changeCart)
        };
      }, []);

    return (
        <header className='Header' ref={ref}>
            <div className="container Header_container">
                <Logo />
                <div className="header_btns_container">
                    <div className="header_btns_container">
                        <img id='basketImg' className="header_cart" src={cart} alt="Cart" width='24px' height='21px' />
                        <p id='cartQuantity' className="header_cart_quantity">{quantity}</p>
                    </div>
                    <ConnectWallet />
                </div>
            </div>
        </header>
    );
};

export default Header;