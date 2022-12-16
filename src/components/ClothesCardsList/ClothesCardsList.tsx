import React, { FC, useEffect, useState } from 'react';
import styles from './ClothesCardsList.module.css'
import db from '../../assets/db.json'
import { ICard } from '../../types/ICard';
import CardItem from '../CardItem/CardItem';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import Cart from '../UI/Cart/Cart';
import { getCurrentCardSlice } from '../../store/reducers/getCurrentCart';

const ClothesCardsList:FC = () => {

    let {card} = useAppSelector(state => state.getCurrentCardSlice)
    const {getCurrentCard} = getCurrentCardSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        let firstChild = db.products.filter((el:any) => el.category === 'clothes')
        dispatch(getCurrentCard(firstChild[0]))
    }, [])

    return (
            <section id='CardList' className={styles.CardsList}>
                <div className={styles.CardsList_nav}>
                    <Swiper
                            slidesPerView={3.5}
                            spaceBetween={20}
                            className="mySwiper"
                            grabCursor={true}
                    >
                        {
                            db.products.map((card:ICard) => {
                                if (card.category === 'clothes') {
                                    return (
                                        <SwiperSlide 
                                        key={card.id} 
                                        id={card.id}
                                        >
                                            <CardItem 
                                                key={card.id}
                                                id={card.id}
                                                name={card.name}
                                                image={card.image}
                                                priceUSDC={card.priceUSDC}
                                                priceNCTR={card.priceNCTR}
                                            />
                                        </SwiperSlide>
                                    )
                                }
                            })
                        }
                    </Swiper>
                </div>
                <div className={styles.CurrentCard}>
                    <div className={styles.CurrentCard_imgName_wrap}>
                        <img className={styles.CurrentCard_image} src={card.image} alt="" />
                        <p>{card.name}</p>
                    </div>
                    <div className={styles.CurrentCard_pricebtn_wrap}>
                        <p className={styles.Card_data_price}>
                            <span>Price: </span>
                            <span className={styles.smallLetter}>$USDC</span> <span className={styles.bigLetter}>{card.priceUSDC.toLocaleString('ru')}</span> +
                            <span className={styles.smallLetter}>$NCTR</span> <span className={styles.bigLetter}>{card.priceNCTR.toLocaleString('ru')}</span>
                        </p>
                    </div>
                    <div className={styles.CurrentCard_pricebtn_wrap}>
                        <Cart id={card.id} name={card.name} image={card.image} priceUSDC={card.priceUSDC} priceNCTR={card.priceNCTR} />
                        
                    </div>
                </div>
            </section>
    );
};

export default ClothesCardsList;