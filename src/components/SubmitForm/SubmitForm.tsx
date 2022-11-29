import React, { FC, useState } from 'react';
import { ICard } from '../../types/ICard';
import styles from './SubmitForm.module.css'
import { Link } from 'react-router-dom';





const SubmitForm:FC<ICard> = ({ id, name, image, priceUSDC, priceNCTR}) => {

    const [result, setResult] = useState<any>({});

    let mintNCTRAdress = 'AgnHzGspNu7F3nFM4izuPt5g7m1URjVaTaFNgvqSXcjC'

    const handleChange = (e:any) => {
        const fieldName = e.target.name
        setResult({...result, [fieldName]: e.target.value})
    }

    const setOrder = (e:any) => {
        e.preventDefault()
        console.log(result)
    }

    return (
        <form className={styles.SubmitForm} onSubmit={setOrder}>
            
            <div className={styles.SubmitForm_inputs_container}>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="name">Your name*  </label>
                    <input required type="text" name='name' id='name' onChange={handleChange}placeholder=" John"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="surname">Your surname*   </label>
                    <input required type="text" name='surname' id='surname' onChange={handleChange}placeholder=" Defo"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="nickname">Your nickname on Telegramm*   </label>
                    <input required type="text" name='nickname' id='nickname' onChange={handleChange}placeholder=" @Demiurg"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                 <label htmlFor="mail">Your mail*   </label>
                 <input required type="text" name='mail' id='mail' onChange={handleChange} placeholder=" john_defo@example.com"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="country">Your country*  </label>
                    <input required type="text" name='country' id='country' onChange={handleChange} placeholder=" Germany"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="city">Your city*   </label>
                    <input required type="text" name='city' id='city' onChange={handleChange} placeholder=" Berlin"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="zip">Your Zip*   </label>
                    <input required type="text" name='zip' id='zip' onChange={handleChange} placeholder=" 1010"/>
                </div>
                <div className={styles.SubmitForm_input_wrapper}>
                    <label htmlFor="adress">Your adress*  </label>
                    <input required type="text" name='adress' id='adress' onChange={handleChange} placeholder=" Something Strasse, 10"/>
                </div>
            </div>




            <button className={styles.SubmitForm_button} type="submit">Take Order</button>

        </form>
    );
};

export default SubmitForm;