import React, { FC } from 'react';
import styles from './ClothesCardsList.module.css'
import db from '../../assets/db.json'
import { ICard } from '../../types/ICard';
import CardItem from '../CardItem/CardItem';
import "swiper/css";
import "swiper/css/pagination";


const ClothesCardsList:FC = () => {

    return (
            <section id='CardList' className={styles.CardsList}>
                <div className={styles.CardsList_title_container}>
                    <h2 className={styles.CardsList_title}>Shop</h2>
                </div>
                        {
                            db.products.map((card:ICard) => {
                                if (card.category === 'clothes' || card.category === 'nft') {
                                    return (
                                        <div key={card.id} >
                                            <CardItem 
                                                key={card.id}
                                                id={card.id}
                                                name={card.name}
                                                image={card.image}
                                                priceUSDC={card.priceUSDC}
                                                priceNCTR={card.priceNCTR}
                                                isQuantity={card.isQuantity}
                                                size={card.size}
                                            />
                                        </div>
                                    )
                                }
                            })
                        }
            </section>
    );
};

export default ClothesCardsList;