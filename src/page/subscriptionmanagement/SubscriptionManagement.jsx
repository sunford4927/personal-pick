import React, { useEffect, useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import './SubscriptionManagement.scss'
import { useNavigate } from 'react-router-dom';

import { sendGet, sendPost, showClearPayMent, URL } from '../../util/util';
import ItemAll from '../../components/totalrank/TotalRankItem';
import Star from '../../img/별.png'
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

const SubscriptionManagement = () => {
    const [subTitle, setSubTitle] = useState("기초케어 제품");
    const [mainTitle, setMainTitle] = useState("구독상품 내역")
    const nav = useNavigate();
    const isSubscript = true;
    const [data, setData] = useState([])
    useEffect(() => {
        sendGet(URL + '/MainPage', setData);
    }, [])
    const tag = 
    <>
        <div className='flex_col management_content_box'>
            <div className='management_content_label cursor' onClick={()=>setSubTitle("기초케어 제품")}>
                기초케어
            </div>
            <div className='management_content_label cursor' onClick={()=>setSubTitle("화장품")}>
                화장품
            </div>
        </div> 

        <div className='management_contents'>
            <div>{subTitle}</div>  
            <div >
                {data.map((item)=>{
                    return (
                        <div className='flex_col '>
                            <img src={item.cos_img_src} style={{ width: 80, height: 80 }} alt="" />
                            <div style={{alignContent: "center", lineHeight: "25px"}}>
                                <span>{item.brand_name}</span><br/>
                                <span>{item.cos_name}</span>&nbsp;&nbsp; <span></span>
                                <div style={{display:"inline-block"}}>
                                    <img className='star' src={Star} alt="" />
                                    <span className='rank_cos_grade'>&nbsp;{item.grade}</span>
                                    <span className='rank_cos_grade_cnt'> {"(" + item.grade_count + ")"}</span>
                                </div>
                                &nbsp;&nbsp;
                                <div style={{display:"inline-block"}} >
                                    <span className='rank_text'>정가&nbsp;</span>
                                    <span className='rank_cos_price'>{item.price + "원"}</span>
                                    <span className='rank_vol'>{"/" + item.vol}</span>
                                </div>
                            </div>
                            <div style={{alignContent: "center", marginLeft : "auto", lineHeight: "25px"}}>
                                <p className='rank_cos_price'>주문날짜</p>
                                <p className='rankrank_cos_price_vol'>2024/10/12</p>
                            </div>
                        </div>
                    )
                })}
                
            </div>  
        </div>   
    </>; 

    const clearTag = 
    <>
        <div className='management_inlinetext'>
            구독을 해지하시면, 더 이상 맞춤형 샘플을 정기적으로 받아보실 수 없습니다. 해지를 원하실 경우, 아래 버튼을 눌러 주세요.

        </div>
        <div className='flex_col management_btn_container'>
            <div className='allreviewbtn btn-5 management_btn' onClick={() =>sendPost(URL+"/clearpayment",null, "tviva20240822101135DSLH3")}>
                구독 해제
            </div>
            <div className='allreviewbtn btn-5 management_btn' onClick={() => nav(-1)}>
                취소하기
            </div>
        </div>
    </>
    ;
    return (
        <>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>구독관리</p>
            </div>
            <div className='flex_col management_subtitle'>
                <p className='cursor' onClick={()=> setMainTitle("구독상품 내역")}>구독상품 내역</p>
                <p className='cursor' onClick={()=> setMainTitle("구독 해지")}>구독 해지</p>
            </div>
            <div >
                {isSubscript ? mainTitle=== "구독상품 내역"? tag  : clearTag: "구독이 필요합니다!"}
            </div>
        </>
    );
};

export default SubscriptionManagement;