import React, { useState } from 'react'
import './PayShipment.scss';
import Back from '../../img/왼쪽.png';
import Triangle from '../../img/역삼각형.png';
import { useNavigate } from 'react-router-dom';
import XBtn from '../../img/회색엑스.png'


const data = [
    {
        idx: 5,
        brand_name: '토리든',
        cos_name: '밸런스풀 시카 토너 패드',
        cos_img_src: "https://img.hwahae.co.kr/products/1858863/1858863_20220801000000.jpg?format=webp&size=600x600",
        grade: 4.74,
        grade_count: 2456,
        price: '23,000원',
        vol: '60ea',
        ranking: '34'
    },
    {
        idx: 6,
        brand_name: '라운드어라운드',
        cos_name: '그린티 시카 선로션[SPF50+/PA++++]',
        cos_img_src: 'https://img.hwahae.co.kr/products/1944992/1944992_20230602135720.jpg?format=webp&size=600x600',
        grade: 4.74,
        grade_count: 2456,
        price: '20,000원',
        vol: '100ml',
        ranking: '34'
    }
]

const deliveryAddress = {
    name: '오세원',
    address: '광주광역시 서구 상무공원로 94 (치평동) 대주아파트 000동 000호',
    phone: '010-0000-0000'
};



const PayShipment = () => {

    const nav = useNavigate();

    // let check = false;

    // 드롭다운 열림/닫힘 상태 관리 함수
    const [dropdownOpenClose, setDropdownOpenClose] = useState(false);
    // 선택된 옵션 저장 함수
    const [dropdownOptionSelect, setDropdownOptionSelect] = useState('-- 메시지 선택 (선택사항) --');

    const options = [
        '배송 전에 미리 연락바랍니다.',
        '부재 시 경비실에 맡겨주세요.',
        '부재 시 문 앞에 놓아주세요.',
        '빠른 배송 부탁드립니다.',
        '택배함에 보관해 주세요.',
        '직접 입력'
    ]

    // 드롭다운 열림/닫힘 상태 변경 함수
    const dropdownToggle = () => {
        setDropdownOpenClose(!dropdownOpenClose);
    };

    // 드롭다운의 옵션 선택 시 호출되는 함수
    const optionSelect = (option) => {
        setDropdownOptionSelect(option);  // 선택된 옵션 상태에 저장
        setDropdownOpenClose(false);   // 드롭다운 닫기
    };

    // 배송지 or 배송지 목록 중 배송지를 기본값으로 잡아둠(삼항연산자 사용해 true or false 구분)
    const [check, setCheck] = useState(true);




    return (
        <div>
            <div className='backORtext'>
                <img className='cart_back_btn' src={Back} alt="" onClick={() => nav('/cartlist')} />
                <p className='orderpay_text'>주문/결제</p>
            </div>

            <div>
                <div className='delivery_boxes'>
                    <ul className='delivery_btn'>
                        <li className='delivery_text active' onClick={() => setCheck(true)}>배송지</li>
                    </ul>
                    <ul className='delivery_btn'>
                        <li className='delivery_text' onClick={() => setCheck(false)}>배송지 목록</li>
                    </ul>
                </div>

                {check ?
                    <>
                        <div>
                            <div>
                                <br />
                                <span>[기본]</span>
                                <span>{deliveryAddress.name}</span>
                            </div>
                            <div>{deliveryAddress.address}</div>
                            <div>{deliveryAddress.phone}</div>
                        </div>


                        {/* <hr className='thin_grayline' /> */}

                        {/* 배송지 드롭다운 */}
                        <div className='delivery_dropdown'>
                            <button className='dropdown_toggle' onClick={dropdownToggle}>
                                {dropdownOptionSelect} {/* 배송지 선택된 옵션*/}
                                <img className='dropdown_triangle' src={Triangle} />
                            </button>
                            {dropdownOpenClose && (<ul className='dropdown_menu'>
                                {options.map((option, idx) => (
                                    <li key={idx} onClick={() => optionSelect(option)}>{option}</li>
                                ))}
                            </ul>
                            )}
                        </div>
                        {/* <hr className='thick_grayline' /> */}
                        <div>
                            <div className='white_text_box'>
                                주문상품
                            </div>
                            {/* <hr className='thin_grayline' /> */}
                            <div>
                                {data.map((item, i) => {
                                    return (
                                        <>
                                            <div key={i} className='order_product'>
                                                <input className='order_check' type="checkbox" />
                                                <img className='order_img' style={{ width: '80px', height: '80px' }} src={item.cos_img_src} alt="" />
                                                <div className='order_content_text'>
                                                    <div>
                                                        <span className='order_product_brand'>
                                                            {item.brand_name}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='order_product_name'>
                                                            {item.cos_name}
                                                        </span>
                                                        <span className='order_product_text'>
                                                            {item.vol}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span>{item.price}</span>
                                                        <span className='order_price'>1개</span>
                                                    </div>
                                                </div>
                                                <img className='order_x_btn ' src={XBtn} alt="" style={{ marginLeft: "58%", width: '10px', height: '10px' }} />
                                            </div>

                                        </>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <div className='white_text_box'>
                                결제정보
                            </div>

                            <div className='gray_text'>
                                <div>
                                    <span>총 상품금액</span>
                                    <span>43,000원</span>
                                </div>
                                <div>
                                    <span>배송비</span>
                                    <span>3,000원</span>
                                </div>
                            </div>
                            <div className='pay_fix_box'>

                                <span className='pay_fix_amount'>최종 결제 금액</span>
                                <span className='pay_fix_num'>46,000원</span>

                            </div>
                        </div>
                        <div className='pay_fix_btn'>
                            46,000원 결제하기
                        </div> </>
                    : <>
                    <div>
                        <div className='delivery_list_box'>
                        <div>
                            <div>
                                <br />
                                <span>{deliveryAddress.name}</span>
                                <span>[기본배송지]</span>
                            </div>
                            <div>{deliveryAddress.address}</div>
                            <div>{deliveryAddress.phone}</div>
                            <div>{dropdownOptionSelect}</div>
                        </div>
                                <div>
                                    <button>삭제</button>
                                    <button onClick={() => nav('/addressadd?수정')}>수정</button>
                                    <button>선택</button>
                                </div>
                                </div>
                                
                                <div className='delivery_plus'>
                                    <button onClick={() => nav('/addressadd?추가')}>배송지추가</button>
                                </div>
                        </div>
                    </>
                }



            </div>

        </div>
    )
}

export default PayShipment