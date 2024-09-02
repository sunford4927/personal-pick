import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLogo from '../../img/메인로고.png'
import MenuImg from "../../img/햄버거메뉴.png"
import CartImg from "../../img/장바구니.png"
import Menu from "../../components/menu/Menu";
import { setMenuView, setUser } from "../../redux/type/typefunc";
import { useNavigate } from 'react-router-dom';
import { sendGet, URL } from '../../util/util';
const HeaderView = () => {
    const [isMenu, setIsMenu] = useState({
        x : 0,
        y : 0,
    });
    const isMenuView = useSelector(state => state.isMenu)
    const dispatch = useDispatch();
    function showMenu(e){
        e.stopPropagation();
        dispatch(setMenuView(!isMenuView))
        setIsMenu({
            x : e.target.offsetLeft-280,
            y : e.target.offsetTop+40
        })        
    }

    function consolea (data){
        dispatch(setUser(data[0]))
    }
    useEffect(()=>{
        let usernm = sessionStorage.getItem("username");
        sendGet(URL+'/TestSearch?user_nm='+ usernm, consolea)
    },[])

    const nav = useNavigate();
    return (
        <>
            <div className="flex_col home_header">
                <img src={MainLogo} className="logoimg cursor" alt="팀로고" onClick={() => nav("/")}/>
                <img src={CartImg} className="header_cart cursor" alt="" onClick={() => nav("/cartlist")} />
                <img src={MenuImg} className="home_menu cursor" alt="" onClick={(e) => showMenu(e)} />
            </div>
            <Menu isView={isMenu} />
        </>
    );
};

export default HeaderView;