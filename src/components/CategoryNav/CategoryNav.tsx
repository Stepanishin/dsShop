import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './CategoryNav.module.css'
import './Category.css'

const CategoryNav = () => {

    const switchEfect = () => {
        let shopPage = document.getElementById('shopPage')
        shopPage.classList.add('switchAnimation')
        setTimeout((() => {
            shopPage.classList.remove('switchAnimation')
        }), 200)
    }

    return (
        <div className={styles.nav} >
            <NavLink 
                to='/'                   
                className={({ isActive }) =>
                [
                "category_link",
                isActive ? "category_link_active" : null,
                ]
                .filter(Boolean)
                .join(" ")
                }
                end
                onClick={switchEfect}
            >
                Clothes
            </NavLink>

            <NavLink 
                to='/NFT'                   
                className={({ isActive }) =>
            [
              "category_link",
              isActive ? "category_link_active" : null,
            ]
              .filter(Boolean)
              .join(" ")
            }
            end
            onClick={switchEfect}
            >
                NFT
            </NavLink>
        </div>
    );
};

export default CategoryNav;