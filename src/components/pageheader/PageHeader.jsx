import React from 'react';
import { useNavigate } from 'react-router-dom';
import LeftArrow from '../../img/왼쪽.png'

const PageHeader = ( {title} ) => {
    const nav = useNavigate();
    return (
        <div className='management_title itemname' >
            <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
            <p>{title}</p>
        </div>
    );
};

export default PageHeader;