import React from 'react';
import LeftArrow from "../../img/왼쪽.png"
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
    const nav = useNavigate();
    return (
        <div id='wrapper'>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>장바구니</p>
            </div>
        </div>
    );
};

export default ShoppingCart;