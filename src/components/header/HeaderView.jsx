import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLogo from '../../img/메인로고.png'
import MenuImg from "../../img/햄버거메뉴.png"
import Menu from "../../components/menu/Menu";
import { setMenuView } from "../../redux/type/typefunc";
import { useNavigate } from 'react-router-dom';
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
    const nav = useNavigate();
    return (
        <>
            <div className="flex_col home_header">
                <img src={MainLogo} className="logoimg cursor" alt="팀로고" onClick={() => nav("/")}/>
                <img src={MenuImg} className="home_menu cursor" alt="" onClick={(e) => showMenu(e)} />
            </div>
            <Menu isView={isMenu} />
        </>
    );
};

export default HeaderView;