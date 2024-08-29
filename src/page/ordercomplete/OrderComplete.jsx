import React, { useEffect, useState } from 'react';
import './OrderComplete.scss'
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sendGet, URL } from '../../util/util';
const OrderComplete = () => {
    const [Uri,setUri] = useSearchParams();
    const user = useSelector(state=>state.user)
    const [data, setData] = useState({})
    function addrParse(str){
        let list = str.spilt("///")
        
    }
    useEffect(()=>{
        sendGet(URL+"/OrderHistory?payment="+Uri.get("orderId")+"&a_idx="+Uri.get("address_id"),setData);
    },[])
    
    useEffect(()=>{
        console.log(data)
    },[data])
    return (
        <>
            {data &&
                <div className='orderC'>
                <p className='orderC_title'>주문완료</p>
                <div className='orderC_contents1'>
                    <p className='orderC_contents1_title'>주문이 완료되었습니다.</p>
                    <p>주문번호 : {Uri.get("orderId")}</p>
                </div>
                <div className='flex_col orderC_contents1_btn'>
                    <div className='basket_middle_btn'>주문내역보기</div>
                    <div className='basket_middle_btn'>계속 쇼핑하기</div>
                </div>

                <div>
                    <p className='orderC_subtitle'>배송정보</p>
                    <div className=''>
                        <p><span className='orderC_gray'>받는 분</span> {data[0].receive_name}({data[0].phone_num})</p>
                        <p><span className='orderC_gray'>배송지 </span>광주광역시</p>

                    </div>
                </div>
                <div>
                    <p>배송정보</p>
                    <p>이메일</p>
                </div>
                <div>
                    <span>결제금액</span> 
                    <span>{0 + "원"}</span>
                </div>
            
            
                </div>
            }
        </>
    );
};

export default OrderComplete;