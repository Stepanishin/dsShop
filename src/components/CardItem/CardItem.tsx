import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentCardSlice } from '../../store/reducers/getCurrentCart';
import { ICard } from '../../types/ICard';
import styles from './CardItem.module.css'
import db from '../../assets/db.json'
import './CardItem.css'



const CardItem:FC<ICard> = ({ id, name, image, priceUSDC, priceNCTR}) => {

    let {card} = useAppSelector(state => state.getCurrentCardSlice)
    const {getCurrentCard} = getCurrentCardSlice.actions
    const dispatch = useAppDispatch()



    const chooseCurrenCard = (e:any) => {
        e.stopPropagation()
        let card = db.products.filter((el:any) => el.id == e.target.id)
        dispatch(getCurrentCard(card[0]))
    }

    
    return (
            <div className={styles.Card}   
  
            >
                <div  
                className={styles.Card_cover} 
                id={id.toString()}                                      
                onClick = {chooseCurrenCard}>
                </div>
                {
                    image && <img src={image} alt='box'  className={styles.Card_img}  />
                } 
                {

                }
                <h2 
                    id={id.toString() + 'title'} 
                    className={card.id == (id.toString() + 'title')[0] ? "Card_name_active" : "Card_name"}
                    >
                        {name}
                </h2> 
            </div>     
    );
};

export default CardItem;