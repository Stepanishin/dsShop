import React, {FC} from 'react';
import './Logo.css'
import logo from './img/logoShop.svg'

const Logo: FC = () => {

    return (
        <a href="/" aria-current="page" className='Logo' >
            <img src={logo} alt="Logo" />
        </a>
    );
};

export default Logo;