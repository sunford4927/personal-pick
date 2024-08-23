import React from 'react';
import LeftArrow from "../../img/왼쪽.png"
import { useNavigate } from 'react-router-dom';
import XBtn from '../../img/회색엑스.png'
import './ShoppingCart.scss'
const data = [
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
        price: 40000,
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
const ShoppingCart = () => {
    const nav = useNavigate();
    return (
        <>
            <div className='management_title'>
                <img className='home_menu float_l cursor' src={LeftArrow} alt=""  onClick={()=>nav(-1)}/>
                <p>장바구니</p>
            </div>

            <p className='basket_text'>샘플로드 배송상품</p>

            <div className='basket_line flex_col ' style={{alignItems:"center"}}>
                <input type="checkbox" className='basket_check' />
                <div className='sub_title'>전체선택</div>
                <div className='basket_text' style={{marginRight : "30px", marginLeft : "auto"}}>품절삭제</div>
                <div className='basket_text'>선택삭제</div>
            </div>
            <hr />
            <div>
                {data.map((item, i)=>{
                    return (
                        <>
                            <div key={i} className='flex_col basket_item_box'>
                                <input className='basket_check' type="checkbox" />
                                <img className='basket_img' src={item.cos_img_src} alt="" />
                                <div className='basket_content_text'>
                                    <p className='sub_title'>
                                        {item.brand_name}
                                    </p>
                                    <p className='basket_text'>
                                        {item.cos_name}
                                    </p>
                                    <p className='basket_text'>
                                        {item.grade_count}
                                    </p>
                                </div>
                                <img className='basket_x_btn ' src={XBtn} alt="" style={{marginLeft: "58%"}}/>
                            </div>
                            <div className='flex_col basket_under_container'>
                                <div className='flex_col basket_under_content_box'>
                                    <div className='basket_sum_btn'>-</div>
                                    <div className='basket_price'>0</div>
                                    <div className='basket_sum_btn'>+</div>
                                </div>
                                <p className='margin_left_pull basket_price'>{item.price+"원"}</p>
                            </div>
                            <div className='grayline'></div>
                        </>
                    )
                })}


            </div>

            <div className='flex_col basket_middle_container'>
                <div className='basket_middle_btn'>선택주문</div>
                <div className='basket_middle_btn'>전체주문</div>
            </div>

            <p className='tax_title'>예상 결제금액</p>
            <div className='basket_line '>
                <span className='sub_title'>총 상품금액</span>
                <span className='float_r basket_price'>43000원</span>
            </div>
            <div className='basket_line'>
                <span className='sub_title'>배송비</span>
                <span className='float_r basket_price'>3,000원</span>
            </div>

            <hr />
            <div className='basket_line'>
                <span className='tax_title'> 총 주문금액</span>
                <span className='float_r basket_price basket_color_text'> 46000원</span>
            </div>
            <div className='basket_fix_btn'>
                46,000원 주문하기
            </div>
        </>
    );
};

export default ShoppingCart;