import React, { useEffect, useState } from 'react';
import LeftArrow from "../../img/왼쪽.png"
import './SubscriptionManagement.scss'
import { useNavigate } from 'react-router-dom';

import { sendGet, sendPost, URL } from '../../util/util';

import Star from '../../img/별.png'
import { useSelector } from 'react-redux';

const SubscriptionManagement = () => {
    const [subTitle, setSubTitle] = useState("기초케어 제품");
    const [mainTitle, setMainTitle] = useState("구독상품 내역")
    const nav = useNavigate();
    const isSubscript = true;
    const [data, setData] = useState([])
    const user = useSelector(state=>state.user);
    useEffect(() => {
        sendGet(URL + '/SubscribeHistory?user_id='+user.user_id + "&order_name=원더 세라마이드 모찌 토너 외 5건" , setData);
    }, [user])

    useEffect(() => {
        console.log(data)
    }, [data])
    function changeclass(e){
        console.log(e.target.className)
    }
    
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
                        <div className='flex_col ' key={item.cos_name}>
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
                <p className='cursor management_subtitle_contents' onClick={(e)=> {
                    changeclass(e)
                    setMainTitle("구독상품 내역")}
                }>구독상품 내역</p>
                <p className='cursor management_subtitle_contents' onClick={(e)=> {
                    changeclass(e)
                    setMainTitle("구독 해지")}
                }>구독 해지</p>
            </div>
            <div >
                {isSubscript ? mainTitle=== "구독상품 내역"? tag  : clearTag: "구독이 필요합니다!"}
            </div>
        </>
    );
};

export default SubscriptionManagement;