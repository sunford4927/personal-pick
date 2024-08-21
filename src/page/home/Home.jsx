import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"
import CustomSwiper from '../../components/customswiper/CustomSwiper'
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/inputbox/InputBox";
import { sendGet, sendPost, showPayMent, URL } from "../../util/util";
import Category from "../../components/category/Category";
import Itemview from "../../components/itemview/Itemview"
import './Home.scss'
import Right from '../../img/오른쪽.png'
// import Logo from '../../img/로고.png'
import { getDay, titleList, userAgeList, userTypeList } from "../../util/utilStr";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";



// 데이터 6개만 받아올 예정!
let itemDic = [
    {
        idx: 1,
        brand_name: '브랜드이름1',
        cos_name: '코스네임일',
        // cos_name: '여기이름길면줄바꿈되게해야함',
        cos_img_src: 'https://img.hwahae.co.kr/products/2008579/2008579_20230522181131.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '1'
    },
    {
        idx: 2,
        brand_name: '브랜드이름2',
        cos_name: '코스네임이',
        cos_img_src: 'https://img.hwahae.co.kr/products/1942105/1942105_20230216173808.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 3,
        brand_name: '브랜드이름3',
        cos_name: '코스네임삼',
        cos_img_src: '	https://img.hwahae.co.kr/products/1914381/1914381_20230202180621.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 4,
        brand_name: '브랜드이름4',
        cos_name: '코스네임사',
        cos_img_src: 'https://img.hwahae.co.kr/products/1872716/1872716_20240227094302.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 5,
        brand_name: '브랜드이름5',
        cos_name: '코스네임오',
        cos_img_src: "https://img.hwahae.co.kr/products/1858863/1858863_20220801000000.jpg?format=webp&size=600x600",
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 6,
        brand_name: '브랜드이름6',
        cos_name: '코스네임육',
        cos_img_src: 'https://img.hwahae.co.kr/products/1944992/1944992_20230602135720.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 7,
        brand_name: '브랜드이름4',
        cos_name: '코스네임사',
        cos_img_src: 'https://img.hwahae.co.kr/products/1832892/1832892_20220801000000.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 8,
        brand_name: '브랜드이름5',
        cos_name: '코스네임오',
        cos_img_src: "https://img.hwahae.co.kr/products/1897092/1897092_20220801000000.jpg?format=webp&size=600x600",
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    },
    {
        idx: 9,
        brand_name: '브랜드이름6',
        cos_name: '코스네임육',
        cos_img_src: 'https://img.hwahae.co.kr/products/2058047/2058047_20230808102719.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: 4000,
        vol: 40,
        ranking: '34'
    }
]

function show(data) {
    console.log(data)
}


const Home = () => {
    // 페이지 이동 함수
    const nav = useNavigate();
    const dispatch = useDispatch();
    // 화해 고객들이 직접 선택한 랭킹🎁
    const [categoryDic, setCategoryDic] = useState({
        list: [],
        maintitle: "카테고리 전체",
        subtitle: ""

    });
    const [data, setData] = useState([]);
    const [userChoiceRank, setUserChoiceRank] = useState([...itemDic])
    // 내피부에 꼭 맞는 제품 랭킹
    const [userItemRank, setUserItemRank] = useState("건성");
    // 나이대별 추천
    const [userAgePick, setUserAgePick] = useState("10대");



    
    // [] -> 첫 렌더링에만 실행

    useEffect(() => {
        sendGet(URL + '/MainPage', setData);
        // let App = document.getElementsByClassName("App")
        // App[0].removeEventListener('click',(e)=> setView(e))
        // App[0].addEventListener('click', (e)=> setView(e))
    }, [])
    // useEffect(()=>{

      
    //     console.log(isMenu.isView)
    // },[isMenu])

    useEffect(() => {
        sendGet(URL + '/CategorySel?category=' + categoryDic.subtitle, setUserChoiceRank)

    }, [categoryDic])



    // 오늘날짜
    let today = new Date()

    function nextTotalPage(pageidx) {
        nav('/totalitem/' + pageidx);
    }
    const secretKey = "test_sk_ex6BJGQOVDJ2beaYow4Q8W4w2zNb";
    const [payment, setPayment] =useState({});
    useEffect(()=>{
        
        // console.log(payment)
        // sendPost(URL+"/payment",null, payment);
        // const url = 'https://api.tosspayments.com/v1/payments/confirm';
        // const encodedKey = secretKey.toString('base64');

        // const options = {
        //   method: 'POST',
        //   headers: {
        //     Authorization: `Basic ${encodedKey}`,
        //     'Content-Type': 'application/json'
        //   },
        //     data: {
        //         paymentKey: payment.paymentKey,
        //         orderId: payment.orderId,
        //         amount: payment.amount
        //     }
        // };

        // axios(url, options)
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    },[payment])

    return (
        <div id='wrapper' className="inner"  >
            {/* // <div id='wrapper' >     */}

            
            {/* Main */}

            <div className='flex_col width' >
                <InputBox func={show} />
            </div>
            <div className="basic-text cursor" onClick={() => nextTotalPage(1)}>
                {(today.getMonth()+1) + "월 " + today.getDate() + "일 " + getDay(today.getDay())}
                <span> 조회수🎁 </span> 급상승
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

            <Category dic={categoryDic} setDic={setCategoryDic} categoryData={titleList} />
            <Itemview data={userChoiceRank} />

            <div className="home_page_btn cursor" onClick={() => nextTotalPage(2)}>
                카테고리 전체보기
                <img className="homeright" src={Right} alt="" />
            </div>
            </motion.div>

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
                내 피부에 꼭 맞는 제품 랭킹
                <img className="category_arrow" src={Right} alt="" /> 
            </div>
            
            <Category dic={userItemRank} setDic={setUserItemRank} categoryData={userTypeList} />
            <Itemview data={itemDic} />

            <div className="home_page_btn cursor" onClick={() => nextTotalPage(3)}>
                {userItemRank + ' 전체보기'}
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
                나이대별 추천
                <img className="category_arrow" src={Right} alt="" /> 
            </div>
            
            
            <Category dic={userAgePick} setDic={setUserAgePick} categoryData={userAgeList} />
            <Itemview data={itemDic} />
            <div className="home_page_btn cursor" onClick={() => nextTotalPage(4)}>
                {userAgePick + " 전체보기"}
                <img className="homeright" src={Right} alt="" />
            </div>
            </motion.div>
            <div className="home_page_btn cursor" onClick={() =>showPayMent("상현", 1000, "색조구독")}>로그인</div>
            
        </div>
        

    );
};

export default Home;