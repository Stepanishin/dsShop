import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Basket from '../../components/Basket/Basket';
import CardsList from '../../components/ClothesCardsList/ClothesCardsList';
import CategoryNav from '../../components/CategoryNav/CategoryNav';
import Profile from '../../components/Profile/Profile';
import { showCart } from '../../helpers/showModalWindow';
import { MainRoutes } from '../../router';
import styles from './ShopPage.module.css'

const ShopPage:FC = () => {

    return (
        <main className={styles.ShopPage}>
            <div className={styles.ShopPage_bg_container}>
                <div className={styles.ShopPage_bg}></div>
            </div>
            {/* <div onClick={showCart} id='modalAll' className={styles.modal}></div> */}
            {/* <div onClick={useShowProfile} id='modalAllProfile' className={styles.modal}></div> */}
            <div className={styles.ShopPage_wrapper}>
                <CategoryNav />
                <div  className={styles.ShopPage_container}  id="shopPage" >
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
                </div>
            </div>
        </main>
    );
};

export default ShopPage;