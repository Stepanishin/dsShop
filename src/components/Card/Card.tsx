import React, { FC, useEffect, useState } from 'react';
import styles from './ClothesCardsList.module.css'
import db from '../../assets/db.json'
import { ICard } from '../../types/ICard';
import CardItem from '../CardItem/CardItem';
import './Card.css'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Cart from '../UI/Cart/Cart';
import { getCurrentCardSlice } from '../../store/reducers/getCurrentCart';
import { useParams } from 'react-router-dom';

const Card:FC = () => {

    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const history = useParams();

    let {card} = useAppSelector(state => state.getCurrentCardSlice)
    const {getCurrentCard} = getCurrentCardSlice.actions
    const dispatch = useAppDispatch()

    let firstChild = db.products.filter((el:any) => el.id == history.id)

    useEffect(() => {
        dispatch(getCurrentCard(firstChild[0]))
    }, [])

    const handleSize = (size) => {
        return () => {
          setSelectedSize(size);
        };
    };
    
      const handleQuantity = (operand) => {
        return () => {
          switch (operand) {
            case "-":
              setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
              break;
            case "+":
              setQuantity((prev) => (prev < 10 ? prev + 1 : 10));
              break;
            default:
              break;
          }
        };
    };

    return (
            <div id='CardList' className={styles.CardsList}>
                {
                    card && 
                    <div className={styles.CurrentCard}>
                    <div className={styles.CurrentCard_imgName_wrap}>
                        <a  href="#bigSize">
                            <img className={styles.CurrentCard_image} src={card.image} />
                        </a>
                        <a id="bigSize" href="#" className="full" style={{backgroundImage:`url(${card.image})`}}></a>
                        <div>
                            <p>{card.name}</p>
                            {
                                card.size &&
                                <div className='CurrentCard_size_container'>
                                    {
                                    card.size.map((size) => {
                                        return (
                                            <div
                                            className={
                                            "CurrentCard_size" +
                                            (selectedSize === size ? " selected" : "")
                                            }
                                            key={size}
                                            onClick={handleSize(size)}
                                        >
                                            {size}
                                        </div>
                                        )
                                    })
                                    }
                                </div>
                            }
                            {
                                card.isQuantity &&
                                <div className="item_data_quantity_container">
                                    <div className="item_data_quantity_btnsWrapper">
                                        <button className="item_data_quantity_btn" onClick={handleQuantity("-")}  disabled={quantity <= 1}>-</button>
                                        <p>{quantity}</p>
                                        <button className="item_data_quantity_btn" onClick={handleQuantity("+")} disabled={quantity >= 10} >+</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        card.description &&
                        <div className={styles.CurrentCard_pricebtn_wrap}>
                            {card.description}
                        </div>
                    }
                    <div className={styles.CurrentCard_pricebtn_wrap}>
                        
                         <p className={styles.Card_data_price}>
                            <span>Price: </span>
                            <div>
                                {card.priceUSDC > 0 && <><span className={styles.smallLetter}>$USDC</span> <span className={styles.bigLetter}>{card.priceUSDC}</span> <br /> </> }
                                {card.priceNCTR > 0 && <><span className={styles.smallLetter}>$NCTR</span> <span className={styles.bigLetter}>{card.priceNCTR} </span><br /></> }
                                {card.priceSOL > 0 && <><span className={styles.smallLetter}>$SOL</span> <span className={styles.bigLetter}>{card.priceSOL} </span></> }
                            </div>
                        </p>
                        <a className={styles.ray_link} href="https://raydium.io/swap?inputCurrency=sol&outputCurrency=AgnHzGspNu7F3nFM4izuPt5g7m1URjVaTaFNgvqSXcjC&fixed=in" target="_blank" rel="noreferrer">Swap $NCTR on Raydium</a>          
                    </div>
                    <div className={styles.CurrentCard_btn_wrap}>
                        <Cart id={card.id} name={card.name} image={card.image} priceUSDC={card.priceUSDC} priceNCTR={card.priceNCTR} priceSOL={card.priceSOL} isQuantity={card.isQuantity} quantity={quantity} selectedSize={selectedSize} size={card.size} />
                    </div>
                </div>
                }                
            </div>
    );
};

export default Card;