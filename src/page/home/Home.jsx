import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"
import CustomSwiper from '../../components/customswiper/CustomSwiper'
import { Navigate, useNavigate } from "react-router-dom";
import InputBox from "../../components/inputbox/InputBox";
import { sendGet, sendPost, showMap, showPayMent, URL } from "../../util/util";
import Category from "../../components/category/Category";
import Itemview from "../../components/itemview/Itemview"
import './Home.scss'
import Right from '../../img/오른쪽.png'

import { getDay, titleList, userAgeList, userTypeList } from "../../util/utilStr";
import { useDispatch, useSelector } from "react-redux";





function show(data) {
    // console.log(data)
}


const Home = () => {
    // 페이지 이동 함수
    const nav = useNavigate();
    
    const homeCateMain = useSelector(state => state.homeCategory)
    const skinCateMain = useSelector(state => state.homeSkin)
    const ageCateMain = useSelector(state => state.homeAge)
    // 화해 고객들이 직접 선택한 랭킹🎁
    const [data, setData] = useState([]);

    // [] -> 첫 렌더링에만 실행

    useEffect(() => {
        sendGet(URL + '/MainPage', setData);
    }, [])

    function temp(data){
        setUserId(data)
    }
    const [userId, setUserId] =useState({});
    useEffect(()=>{
        let nick =sessionStorage.getItem("username");
        if(nick!=="")
        {
            sendGet(URL+'/TestSearch?user_nm='+ nick, temp)
        }
    },[])

    useEffect(()=>{
    },[userId])

    // 오늘날짜
    let today = new Date()

    function nextTotalPage(pageidx) {
        nav('/totalitem/' + pageidx);
    }


    return (
        <div  className="inner"  >
            {/* // <div id='wrapper' >     */}

            
            {/* Main */}

            <div className='flex_col width' >
                <InputBox func={show} />
            </div>

             {/* 추천 화장품 광고 배너 */}

             <div className="adbannermain" onClick={() => nav('/airecommend')}>
                <div className="adbannercontainer">
                <span className="adbannertext">회원 맞춤 추천 화장품 보러가기</span>
                <a className="adbannerbutton">내 맞춤 추천이 궁금하다면?</a>
                </div>
            </div>

            <div className="basic-text cursor" onClick={() => nextTotalPage(1)}>
                {(today.getMonth()+1) + "월 " + today.getDate() + "일 " + getDay(today.getDay())}
                <span> AI 모델 생성하면 그때 결정할 거🎁 </span> 급상승
                <img className="category_arrow" src={Right} alt="" />
            </div>


            <div>
                <CustomSwiper list={data} />
            </div>

            {/* 스크롤 내릴시 생기는 애니메이션 div */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                ease: 'easeInOut',
                duration: 0.5,
                x: { duration: 1 },
                }}
                >
            <div className="basic-text cursor" onClick={() => nextTotalPage(2)}>
                화해 고객들이 직접
                <span> 선택한 랭킹🎁 </span>
                <img className="category_arrow" src={Right} alt="" /> 
            </div>

            <Category categoryData={titleList} />
            <Itemview data={homeCateMain.data} />

            <div className="home_page_btn cursor" onClick={() => nextTotalPage(2)}>
                카테고리 전체보기
                <img className="homeright" src={Right} alt="" />
            </div>
            </motion.div>

            {/* <div className="flex_row perfume">
                <img src="https://dn5hzapyfrpio.cloudfront.net/product/533/533472c0-785a-11ee-82a0-977fcb093fe5.jpeg?w=456" alt="" />
                <div className="basket_fix_btn">
                    향수 매칭 하러 가기
                </div>
            </div> */}

            {/* sendGet으로 필요한 데이터 세 가지 받아오고 그 데이터 이름을 data라는 키 값으로 보내주면 됨! */}

            {/* 스크롤 내릴시 생기는 애니메이션 div */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                ease: 'easeInOut',
                duration: 0.5,
                x: { duration: 1 },
                }}
                >
            <div className="basic-text cursor" onClick={() => nextTotalPage(3)}>
                내 피부에 꼭 맞는 제품 랭킹🏆
                <img className="category_arrow" src={Right} alt="" /> 
            </div>
            
            <Category categoryData={userTypeList} />
            <Itemview data={skinCateMain.data} />

            <div className="home_page_btn cursor" onClick={() => nextTotalPage(3)}>
                {skinCateMain.choiceKey + ' 전체보기'}
                <img className="homeright" src={Right} alt="" />
            </div>
            </motion.div>

            {/* 스크롤 내릴시 생기는 애니메이션 div */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{
                ease: 'easeInOut',
                duration: 0.5,
                x: { duration: 1 },
                }}
                >
            <div className="basic-text cursor" onClick={() => nextTotalPage(3)}>
                나이대별 추천💡
                <img className="category_arrow" src={Right} alt="" /> 
            </div>
            
            
            <Category categoryData={userAgeList} />
            <Itemview data={ageCateMain.data} />
            <div className="home_page_btn cursor" onClick={() => nextTotalPage(4)}>
                {ageCateMain.choiceKey + " 전체보기"}
                <img className="homeright" src={Right} alt="" />
            </div>
            </motion.div>
        </div>
        

    );
};

export default Home;