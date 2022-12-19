import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCurrentCardSlice } from '../../store/reducers/getCurrentCart';
import { ICard } from '../../types/ICard';
import db from '../../assets/db.json'
import './CardItem.css'
import { Link } from 'react-router-dom';



const CardItem:FC<any> = ({ id, name, image }) => {

    let {card} = useAppSelector(state => state.getCurrentCardSlice)
    const {getCurrentCard} = getCurrentCardSlice.actions
    const dispatch = useAppDispatch()

    const chooseCurrenCard = (e:any) => {
        e.stopPropagation()
        let card = db.products.filter((el:any) => el.id == e.target.id)
        dispatch(getCurrentCard(card[0]))
    }
    
    return (
            <div className="Card"   
            >
                {
                    image && 
                    <div className='Card_img_container' >
                        <img src={image} alt='image'  className="Card_img" />
                    </div> 
                } 
                {

                }
                <h2 
                    // id={id.toString() + 'title'} 
                    // className={card.id == (id.toString() + 'title')[0] ? "Card_name_active" : "Card_name"}
                    >
                        {name}
                </h2> 
                <Link
                    to={`/${id}`}
                    className="Card_btn"
                    >
                    Buy
                </Link>
            </div>     
    );
};

export default CardItem;