import React, { useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import './SubscriptionManagement.scss'
import { useNavigate } from 'react-router-dom';
import Itemveiw from '../../components/itemview/Itemview';

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
    const nav = useNavigate();
    const isSubscript = true;

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
                <Itemveiw data={itemDic}/>
            </div>  
        </div>   
    </>;
    return (
        <div id='wrapper'>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>구독관리</p>
            </div>
            <div className='flex_col management_subtitle'>
                <p className='cursor'>구독상품 내역</p>
                <p className='cursor'>결제정보 변경</p>
                <p className='cursor'>구독 해지</p>
            </div>
            <div >
                {isSubscript ? tag : "구독이 필요합니다!"}
            </div>
        </div>
    );
};

export default SubscriptionManagement;