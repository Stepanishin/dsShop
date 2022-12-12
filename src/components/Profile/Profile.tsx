import React, { FC,useState, useEffect } from 'react';
import styles from './Profile.module.css'
import close from '../../assets/img/delete.svg'
import { showProfile } from '../../helpers/showModalProfile';


const Profile:FC = () => {

    return (
            <nav id='profile' className={styles.Profile}>
                <h2 className={styles.Profile_title}>My Profile</h2>
                <button className={styles.closeProfile} id='closeProfile' onClick={showProfile} >
                    <img src={close} alt="close" />
                </button>
                    
            </nav>
    );
};

export default Profile;