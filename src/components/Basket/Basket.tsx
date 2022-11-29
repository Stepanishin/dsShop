import React, { FC,useState, useEffect } from 'react';
import styles from './Basket.module.css'
import minus from '../../assets/img/minus.svg'
import plus from '../../assets/img/plus.svg'
import deleteCardSvg from '../../assets/img/delete.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCardSlice } from '../../store/reducers/getProductToBasket';


const Basket:FC = () => {

    const [totalPrice, setTotalPrice] = useState({
        Subtotal: 0,
        Tax: 5,
        Shipping: 10,
        $NCTR: 0,
    })

    let {cards} = useAppSelector(state => state.addCardSlice)
    const {addCard} = addCardSlice.actions
    const dispatch = useAppDispatch()

    // Calculating the total price in the cart
    useEffect(() => {
        let sumUSDC:number = 0
        let sumNCTR:number = 0
        cards.map(card => {
            sumUSDC += (card.priceUSDC! * card.quantity!)
            sumNCTR += (card.priceNCTR! * card.quantity!)
        })
        setTotalPrice(state => ({ ...state, Subtotal: sumUSDC, $NCTR: sumNCTR}));
    }, [cards])

    // Removing an item from the cart
    const deleteCard = (e:React.MouseEvent<HTMLButtonElement>) => {
        const newCards = cards.filter(card => card.id != parseInt((e.target as HTMLInputElement).id));
        dispatch(addCard(newCards))
    }

    // Increase the number of items in the cart
    const incrementQuantity = (e:React.MouseEvent<HTMLButtonElement>) => {
        let currentId = parseInt((e.target as HTMLInputElement).id)!
        let newCards = cards.map(card => {
            if (card.id == currentId) {
                let quantity = card.quantity! + 1
                return card = {...card, quantity : quantity}
            } else {
                return card
            }
        })
        dispatch(addCard(newCards))
    }

    // Reducing the number of items in the cart
    const decrementQuality = (e:React.MouseEvent<HTMLButtonElement>) => {
        let currentId = parseInt((e.target as HTMLInputElement).id)!
        let newCards = cards.map(card => {
            if (card.id == currentId) {
                let quantity = card.quantity! - 1
                return card = {...card, quantity : quantity}
            } else {
                return card
            }
        }).filter(card => card.quantity != 0)
        dispatch(addCard(newCards))
    }

    return (
                <aside id='basket' className={styles.Basket}>
                    <h2 className={styles.Basket_title}>My basket</h2>
                    {
                    cards.length > 0
                    ?
                    <div className={styles.Basket_order_container}>
                    {
                        cards.map(item => {
                            return (
                                <div className={styles.Basket_order_item_container} key={item.id}>
                                    <img className={styles.item_data_image} src={require(`../../assets/img/gift.webp`)} alt="sneakers" width='90px' height='51px' />
                                    <div className={styles.item_data_container}>
                                        <h3>{item.name}</h3>
                                        <div className={styles.item_data_quantity_container}>
                                            <button onClick={decrementQuality} ><img id={`${item.id}`} src={minus} alt="minus" /></button>
                                            <p>{item.quantity}</p>
                                            <button onClick={incrementQuantity} ><img id={`${item.id}`} src={plus} alt="plus" /></button>
                                            <p>$ {(item.priceUSDC! * item.quantity!).toLocaleString('ru')}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={deleteCard} ><img id={`${item.id}`} src={deleteCardSvg} alt="delete" /></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    :
                    <div className={styles.Basket_order_container}>
                        <p >Basket is empty, buy something!</p>
                    </div>
                }

                <div className={styles.Basket_list_container}>
                    <div className={styles.Basket_price_container}>
                        <p>Subtotal</p>
                        <p>$ {(totalPrice.Subtotal).toLocaleString('ru')}</p>
                    </div>
                    <div className={styles.Basket_price_container}>
                        <p>Tax</p>
                        <p>$ {(totalPrice.Subtotal === 0 ? 0 : 5)}</p>
                    </div>
                    <div className={styles.Basket_price_container}>
                        <p>Shipping</p>
                        <p>$ {totalPrice.Subtotal === 0 ? 0 : 10}</p>
                    </div>
                    <div className={styles.Basket_price_container}>
                        <p>$NCTR</p>
                        <p>{(totalPrice.$NCTR).toLocaleString('ru')}</p>
                    </div>
                    <div className={styles.Basket_price_container}>
                        <p><b>Total</b></p>
                        <p><b>$ {(totalPrice.Subtotal === 0 ? 0 : totalPrice.Shipping + totalPrice.Subtotal + totalPrice.Tax).toLocaleString('ru')} + $NCTR {totalPrice.$NCTR}</b></p>
                    </div>                   
                </div>
            </aside>
    );
};

export default Basket;