import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/pageheader/PageHeader';
import './ItemOrderDetail.scss'
function getCnt(str, idx)
{
    let list = str.split(",")
    return list[idx];
}

const ItemOrderDetail = () => {
    const { state } = useLocation();
    const nav = useNavigate();
    return (
        <>
            <PageHeader title={"주문상세"}/>
            <p className='detail_orderKey detail_p'>주문번호 {state[0].payment_key}</p>
            <p className='detail_p'>결제날짜 {state[0].order_date}</p>
        
            {state.map((item, i) =>{
                return (
                <div className='detail_container'>                    
                    <div className='flex_col'>
                        <img src={item.cos_img_src} alt="" />
                        <div className='detail_text'>
                            <p>{item.brand_name} {item.cos_name} {item.vol}</p>
                            <p>{item.price*getCnt(item.idx_cnt, i)}원 {getCnt(item.idx_cnt, i)}개</p> 
                        </div>
                    </div>
                    <div className='detail_btn' onClick={()=> nav('/itemOrderReview',{state : item})}>
                        리뷰 작성 포인트 {item.price*getCnt(item.idx_cnt, i) * 0.01}원
                    </div>
                </div>
                )
            })}
        </>
    );
};

export default ItemOrderDetail;