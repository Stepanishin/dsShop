import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Basket from '../../components/Basket/Basket';
import CardsList from '../../components/CardsList/CardsList';
import { MainRoutes } from '../../router';
import styles from './ShopPage.module.css'

const ShopPage:FC = () => {

    return (
        <main className={styles.ShopPage}>
            <div className={styles.ShopPage_bg_container}>
                <div className={styles.ShopPage_bg}></div>
            </div>
            <Routes>
                    {
                    MainRoutes.map(route => 
                        <Route 
                        path={route.path}
                        key={route.path}
                        element={<route.component />}
                        />
                    )
                    }
            </Routes>
            <Basket />
        </main>
    );
};

export default ShopPage;