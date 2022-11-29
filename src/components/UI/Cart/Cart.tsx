import React, { FC,useState,useEffect } from 'react';
import styles from './Cart.module.css'
import cart from '../../../assets/img/Cart2.svg'
import added from '../../../assets/img/added.svg'
import { Link } from 'react-router-dom';
import { ICard } from '../../../types/ICard';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCardSlice } from '../../../store/reducers/getProductToBasket';




const Cart:FC<ICard> = ({ id, name, image, priceUSDC, priceNCTR}) => {

    const [isProductInBasket, setIsProductInBasket] = useState(false)

    let {cards} = useAppSelector(state => state.addCardSlice)
    const {addCard} = addCardSlice.actions

    const dispatch = useAppDispatch()

    // a function that determines whether there are goods in the cart
    useEffect(() => {
        const is = cards.filter((card)=> card.id === id )
        is.length > 0 ? setIsProductInBasket(true) :  setIsProductInBasket(false)
    }, [cards])

    // function to add items to the cart
    const addToBasket = () => {
        cards = [...cards, {
            id: id,
            name: name,
            image: image,
            priceUSDC: priceUSDC,
            priceNCTR: priceNCTR,
            quantity: 1,
        }]
        dispatch(addCard(cards))
    }

    return (
        <>              
            {
                isProductInBasket
                ?
                <img className={styles.Cart_data_button_complete} src={added} alt="added" />
                :
                <button onClick={addToBasket} className={styles.Cart_data_button_add}><img src={cart} alt="Cart" /></button>
            }      
        </>
    );
};

export default Cart;