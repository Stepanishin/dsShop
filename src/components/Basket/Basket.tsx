import React, { FC,useState, useEffect } from 'react';
import styles from './Basket.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addCardSlice } from '../../store/reducers/getProductToBasket';
import SubmitForm from '../SubmitForm/SubmitForm';
import close from '../../assets/img/delete.svg'
import { showCart } from '../../helpers/showModalWindow';


const Basket:FC = () => {

    const [totalPrice, setTotalPrice] = useState({
        $USDC: 0,
        $NCTR: 0,
        $SOL: 0,
    })

    let {cards} = useAppSelector(state => state.addCardSlice)
    const {addCard} = addCardSlice.actions
    const dispatch = useAppDispatch()

    // Calculating the total price in the cart
    useEffect(() => {  
        let sumUSDC:number = 0
        let sumNCTR:number = 0
        let sumSOL:number = 0
        cards.map(card => {
            sumUSDC += (card.priceUSDC! * card.quantity!)
            sumNCTR += (card.priceNCTR! * card.quantity!)
            sumSOL += (card.priceSOL! * card.quantity!)
        })
        setTotalPrice(state => ({ ...state, $USDC: sumUSDC, $NCTR: sumNCTR, $SOL: sumSOL}));
    }, [cards])

    // Removing an item from the cart
    const deleteCard = (e:React.MouseEvent<HTMLButtonElement>) => {
        const newCards = cards.filter(card => card._id != parseInt((e.target as HTMLInputElement).id));
        dispatch(addCard(newCards))
    }

    return (
                <nav id='basket' className={styles.Basket}>
                    <div className={styles.Basket_title_container}>
                        <h2 className={styles.Basket_title}>Basket</h2>
                    </div>
                    {
                    cards.length > 0
                    ?
                    <div className={styles.Basket_order_container}>
                    {
                        cards.map(item => {
                            return (
                                <div className={styles.Basket_order_item_container} key={item._id}>
                                    <img className={styles.item_data_image} src={item.image} alt="box" width='90px' height='51px' />
                                    <div className={styles.item_data_container}>
                                        <h3 style={{fontWeight: '600'}}>{item.name}</h3>
                                        <div className={styles.item_data_quantity_container}>
                                            <p>Quantity: {item.quantity}</p>
                                            {
                                                item.selectedSize && <p>Size: {item.selectedSize}</p>
                                            }
                                            <button className={styles.item_data_quantity_removeBtn} onClick={deleteCard} id={`${item._id}`}>Remove</button>
                                        </div>
                                    </div>
                                    <div className={styles.item_data_quantity_priceWrap}>   
                                        <p><b>
                                            {item.priceUSDC > 0 && <><span style={{fontSize:'80%'}}>$USDC</span> {(item.priceUSDC! * item.quantity!).toLocaleString('ru')} <br /></>}  
                                            {item.priceNCTR > 0 && <><span style={{fontSize:'80%'}}>$NCTR</span> {(item.priceNCTR! * item.quantity!).toLocaleString('ru')} <br /></>}  
                                            {item.priceSOL > 0 && <><span style={{fontSize:'80%'}}>$SOL</span> {(item.priceSOL! * item.quantity!).toLocaleString('ru')}</>}  
                                        </b></p>
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
                        <p><b>Total</b></p>
                        <p><b>
                            {totalPrice.$USDC > 0 && <><span style={{fontSize:'80%'}}>$USDC</span> {(totalPrice.$USDC).toLocaleString('ru')} <br /> </>}
                            {totalPrice.$NCTR > 0 && <><span style={{fontSize:'80%'}}>$NCTR</span> {(totalPrice.$NCTR).toLocaleString('ru')} <br /> </>}
                            {totalPrice.$SOL > 0 && <><span style={{fontSize:'80%'}}>$SOL</span> {(totalPrice.$SOL).toLocaleString('ru')}</>}
                        </b></p>
                    </div>  
                </div>

                <SubmitForm totalPrice={totalPrice} />
            </nav>
    );
};

export default Basket;