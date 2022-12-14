import React, { FC,useState,useEffect } from 'react';
import styles from './Cart.module.css'
import cart from '../../../assets/img/Cart2.svg'
import added from '../../../assets/img/added.svg'
import { Link } from 'react-router-dom';
import { ICard } from '../../../types/ICard';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addCardSlice } from '../../../store/reducers/getProductToBasket';
import toast from 'react-hot-toast';




const Cart:FC<ICard> = ({ id, name, image, priceUSDC, priceNCTR,isQuantity,quantity,selectedSize,size, priceSOL}) => {

    let {card} = useAppSelector(state => state.getCurrentCardSlice)

    const [isProductInBasket, setIsProductInBasket] = useState(false)

    let {cards} = useAppSelector(state => state.addCardSlice)
    const {addCard} = addCardSlice.actions

    const dispatch = useAppDispatch()

    // Создаём тосты*(алармы)
    const succes = () => {
        toast.success('The product has been added to the cart!')
    };
    const error = () => {
        toast.error('Please choose size!')
    };

    // a function that determines whether there are goods in the cart
    useEffect(() => {
        // const is = cards.filter((card)=> card.id === id )
        // is.length > 0 ? setIsProductInBasket(true) :  setIsProductInBasket(false)
        const is = cards.filter((card)=> card.isQuantity === false && card.id == id )
        is.length > 0 ? setIsProductInBasket(true) :  setIsProductInBasket(false)
    }, [cards, card])

    // function to add items to the cart
    const addToBasket = (e:any) => {
        succes()
        cards = [...cards, {
            id: id,
            name: name,
            image: image,
            priceUSDC: priceUSDC,
            priceNCTR: priceNCTR,
            priceSOL: priceSOL,
            quantity: quantity,
            isQuantity: isQuantity,
            selectedSize: selectedSize,
            _id: Date.now()
        }]
        dispatch(addCard(cards))
    }

    return (
        <div className={styles.Cart_container}>    
            {
                isProductInBasket
                ?
                <button className={styles.Cart_data_button_added}><img className={styles.Cart_data_button_complete} src={added} alt="added" /></button>
                :
                size
                ?
                selectedSize
                ?
                <button onClick={addToBasket} className={styles.Cart_data_button_add}><img src={cart} alt="Cart" /></button>
                :
                <button onClick={error} className={styles.Cart_data_button_disabled}><img src={cart} alt="Cart" /></button>
                :
                <button onClick={addToBasket} className={styles.Cart_data_button_add}><img src={cart} alt="Cart" /></button>
            }      
        </div>
    );
};

export default Cart;