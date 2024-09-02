

import React, { useEffect, useState } from 'react';
import "./Menu.scss"
import UserImg from "../../img/사용자프로필.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LogoutSession } from '../../util/session';
import { setUser } from '../../redux/type/typefunc';




const Menu = ({ isView }) => {
    const nav = useNavigate()
    
    const isMenuView = useSelector(state => state.isMenu)
    const name = useSelector(state => state.user);
    console.log(name)
    const dispatch = useDispatch();
    function logout(){
        LogoutSession();
        dispatch(setUser({}));
    }
    return (
        <>
            { 
                isMenuView && 
                <div className="menucontainer" style={{position : "absolute", top : isView.y, left : isView.x}}>
                    <div className='flex_col home_header'>
                        <img className='home_menu float_l' src={UserImg} alt="" />
                        <p className='menu_title' onClick={() => nav("/login")}>{typeof(name) === "undefined" ? "로그인/회원가입" : name.user_nm + "님 환영합니다"}</p>   
                    </div>
                    <div className='menu_box'>
                        <hr />
                        <p className='menu_sub_title cursor'>피부타입별</p>
                        <p className='menu_sub_title cursor'>나이대별</p>
                        <p className='menu_sub_title cursor' onClick={() => nav("/subscription")}>정기배송/구독</p>
                        {name !== undefined && 
                        <>
                            <p className='menu_sub_title cursor' onClick={()=>nav("/mypage")}>마이페이지</p>
                            <hr/>
                            <p className='menu_sub_title cursor' onClick={()=>nav("/cartlist")}>장바구니</p>
                            <hr />
                            <p className='menu_sub_title cursor' >나의 리뷰</p>
                            <hr />
                            <p className='menu_sub_title cursor' onClick={()=>nav("/addressListAll")}>배송지</p>
                            <hr />
                            <p className='menu_sub_title cursor' onClick={()=>logout()}>로그아웃</p>
                        </>
                        }
                    </div>
                </div>


            }
        </>
    );
};

export default Menu;


