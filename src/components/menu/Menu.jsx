

import React, { useEffect, useState } from 'react';
import "./Menu.scss"
import UserImg from "../../img/사용자프로필.png"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Menu = ({ isView }) => {
    const nav = useNavigate()
    const [name, setName] = useState("")
    
    const isMenuView = useSelector(state => state.isMenu)

    useEffect(()=>{
        let Id = sessionStorage.getItem("username")
        
        setName(Id);
    },[])

    useEffect(()=>{
        console.log(name)
    },[name])
    
    return (
        <>
            { 
                isMenuView && 
                <div className="menucontainer" style={{position : "absolute", top : isView.y, left : isView.x}}>
                    <div className='flex_col home_header'>
                        <img className='home_menu float_l' src={UserImg} alt="" />
                        <p className='menu_title' onClick={() => nav("/login")}>{name === null ? "로그인/회원가입" : name + "님 환영합니다"}</p>   
                    </div>
                    <div className='menu_box'>
                        <hr />
                        <p className='menu_sub_title cursor'>제품</p>  
                        <hr />
                        <p className='menu_sub_title cursor'>본품</p>
                        <p className='menu_sub_title cursor'>샘플</p>
                        <hr />
                        <p className='menu_sub_title cursor' onClick={() => nav("/subscription")}>정기배송/구독</p>
                        <hr />
                        <p className='menu_sub_title cursor'>리뷰</p>
                        {name !== null && <p className='menu_sub_title cursor' onClick={()=>nav("/mypage")}>마이페이지</p>}
                    </div>
                </div>


            }
        </>
    );
};

export default Menu;