import React, { useState } from 'react'
import './PayShipment.scss';
import Back from '../../img/왼쪽.png';
import Triangle from '../../img/역삼각형.png';
import { useNavigate } from 'react-router-dom';

import img1 from '../../img/화장품 이미지1.jpg';
import img2 from '../../img/화장품 이미지2.jpg';

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
    }
]

const deliveryAddress = {
    name : '오세원',
    address: '광주광역시 서구 상무공원로 94 (치평동) 대주아파트 000동 000호',
    phone : '010-0000-0000'
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

        // 배송지 수정/추가 페이지로 이동하는 함수
        const 배송지수정추가 = () => {
            nav('배송지 수정/추가');
        };


    return (
        <div>
            <div>
                <img className='back' src={Back} alt="" onClick={() => nav('/cartlist')} />
                <p>주문/결제</p>
            </div>

            <div>
                <div>
                    <ul>
                    <li className='delivery_btn active' onClick={배송지수정추가}>배송지</li>
                    <li className='delivery_btn' onClick={배송지수정추가}>배송지 목록</li>
                    </ul>
                </div>
                    

                    <div>
                    <div>
                    <br />
                        <span>[기본]</span>
                        <span>{deliveryAddress.name}</span>
                    </div>
                    <div>{deliveryAddress.address}</div>
                    <div>{deliveryAddress.phone}</div>
                </div>


                <hr className='thin_grayline' />

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
                <hr className='thick_grayline' />
                <div>
                    <div className='white_text_box'>
                        주문상품
                    </div>
                    {/* <hr className='thin_grayline' /> */}
                    <div>
                        <br />
                        <div>
                            <img src={img1} style={{ width: '80px', height: '80px' }} alt={img1} className='productimg'></img>
                            <img src={img2} style={{ width: '80px', height: '80px' }} alt={img2} className='productimg'></img>
                        </div>
                        <div className='items'>
                            <div className='searchfont'>
                                <span className='searchbrand'>토리든</span>
                            </div>
                            <div>
                                <span>밸런스풀 시카 토너 패드</span>
                            </div>
                            <div className='searchprice'>
                                <span className='won'>23,000원</span>
                                <span className='gray'>1개</span>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
                <hr className='thick_grayline' />
                <div>
                    <div className='white_text_box'>
                        결제정보
                    </div>
                    {/* <hr className='thin_grayline' /> */}
                    <div className='gray_text'>
                        <span>총 상품금액</span>
                        <span>43,000원</span>
                        <span>배송비</span>
                        <span>3,000원</span>
                    </div>
                    <div className='pay_fix_box'>
                        {/* <hr className='thin_grayline' /> */}
                        <span className='pay_fix_amount'>최종 결제 금액</span>
                        <span className='pay_fix_num'>46,000원</span>
                        {/* <hr className='thin_grayline' /> */}
                    </div>
                </div>
                <div className='pay_fix_btn'>
                    46,000원 결제하기
                </div>
                {/* {check ? <div>1</div> : <div>2</div>} */}
            </div>

        </div>
    )
}

export default PayShipment