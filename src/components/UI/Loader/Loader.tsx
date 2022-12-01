import React from 'react';
import styles from './Loader.module.css'



const Loader = () => {

    return (
        <section id='Loader' className={styles.loader_wrap}>
            <div className={styles.loader}>
            <div className={styles.loader_inner}></div>
            </div>
        </section>
    );
};

export default Loader;