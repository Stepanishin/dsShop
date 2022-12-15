import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryNav.module.css'

const CategoryNav = () => {

    return (
        <div className={styles.nav} >
            <Link className={styles.link} to='/' >Clothes</Link>
            <Link className={styles.link} to='/' >NFT</Link>
        </div>
    );
};

export default CategoryNav;