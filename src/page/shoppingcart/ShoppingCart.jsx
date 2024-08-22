import React from 'react';
import LeftArrow from "../../img/왼쪽.png"
import { useNavigate } from 'react-router-dom';
import XBtn from '../../img/회색엑스.png'
import './ShoppingCart.scss'
const data = [
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
const ShoppingCart = () => {
    const nav = useNavigate();
    return (
        <div id='wrapper'>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>장바구니</p>
            </div>

            <p>샘플로드 배송상품</p>

            <div>
                <input type="checkbox" className='basket_check' />
                <span>전체선택</span>
                <span style={{textAlign : "right"}}>품절삭제</span>
                <span>선택삭제</span>
            </div>
            <hr />
            <div>
                {data.map((item, i)=>{
                    return (
                        <>
                            <div key={i} className='flex_col'>
                                <input className='basket_check' type="checkbox" />
                                <img className='basket_img' src={item.cos_img_src} alt="" />
                                <div>
                                    <p>
                                        {item.brand_name}
                                    </p>
                                    <p>
                                        {item.cos_name}
                                    </p>
                                    <p>
                                        {item.grade_count}
                                    </p>
                                </div>
                                <img className='basket_x_btn margin_left_pull' src={XBtn} alt="" />
                            </div>
                            <div className='flex_col basket_under_container'>
                                <div className='flex_col basket_under_content_box'>
                                    <div className='basket_sum_btn'>-</div>
                                    <div>0</div>
                                    <div className='basket_sum_btn'>+</div>
                                </div>
                                <p className='margin_left_pull'>{item.price}</p>
                            </div>
                            <div className='grayline'></div>
                        </>
                    )
                })}


            </div>
        </div>
    );
};

export default ShoppingCart;