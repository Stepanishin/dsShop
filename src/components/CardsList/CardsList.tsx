import React, { FC } from 'react';
import styles from './CardsList.module.css'
import db from '../../assets/db.json'
import { ICard } from '../../types/ICard';
import CardItem from '../CardItem/CardItem';

const CardsList:FC = () => {

    return (
            <section id='CardList' className={styles.CardsList}>
                <div className={styles.CardsList_nav}>
                    {
                        db.products.map((card:ICard) => {
                            if (card.category === 'gift') {
                                return (
                                    <CardItem 
                                        key={card.id}
                                        id={card.id}
                                        name={card.name}
                                        image={card.image}
                                        priceUSDC={card.priceUSDC}
                                        priceNCTR={card.priceNCTR}
                                    />
                                )
                            }
                        })
                    }
                </div>

            </section>
    );
};

export default CardsList;