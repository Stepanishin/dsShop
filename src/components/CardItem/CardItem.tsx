import React, { FC } from 'react';
import { ICard } from '../../types/ICard';
import styles from './CardItem.module.css'
import { Link } from 'react-router-dom';
import Cart from '../UI/Cart/Cart';




const CardItem:FC<ICard> = ({ id, name, image, priceUSDC, priceNCTR}) => {

    return (
        <div className={styles.Card}>
            
                {
                    image && <Link to={`${id}`} ><img src={require(`../../assets/img/gift.webp`)} alt='sneakers' width='228px' height='130px' /></Link>
                }  
                <h2 className={styles.Card_name}>{name}</h2>
                <div className={styles.Card_data_container}>
                    <Cart id={id} name={name} image={image} priceUSDC={priceUSDC} priceNCTR={priceNCTR} />
                    <p className={styles.Card_data_price}>
                        <span className={styles.smallLetter}>$USDC</span> <span className={styles.bigLetter}>{priceUSDC?.toLocaleString('ru')}</span> +
                        <span className={styles.smallLetter}>$NCTR</span> <span className={styles.bigLetter}>{priceNCTR?.toLocaleString('ru')}</span>
                    </p>
                </div>
               
        </div>
    );
};

export default CardItem;