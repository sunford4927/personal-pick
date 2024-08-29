import React from 'react';
import './OrderComplete.scss'
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const OrderComplete = () => {
    const [Uri,setUri] = useSearchParams();
    const user = useSelector(state=>state.user)
    
    return (
        <div className='orderC'>
            <p className='orderC_title'>주문완료</p>
            <div>
                <p>주문이 완료되었습니다.</p>
                <p>주문번호 : {Uri.get("orderId")}</p>
            </div>
            <div className='flex_col'>
                <div className='basket_middle_btn'>주문내역보기</div>
                <div className='basket_middle_btn'>계속 쇼핑하기</div>
            </div>

            <div>
                <p>배송정보</p>

                <p>받는 분 오세원(000-0000-0000)</p>
                <p>배송지 광주광역시</p>
            </div>
            <div>
                <p>배송정보</p>
                <p>이메일</p>
            </div>
            <div>
                <span>결제금액</span> 
                <span>{Uri.get("amount") + "원"}</span>
            </div>
        </div>
    );
};

export default OrderComplete;