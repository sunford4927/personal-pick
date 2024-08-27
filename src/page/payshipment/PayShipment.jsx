import React, { useEffect, useState } from 'react'
import './PayShipment.scss';
import Back from '../../img/왼쪽.png';
import Triangle from '../../img/역삼각형.png';
import { useNavigate } from 'react-router-dom';
import XBtn from '../../img/회색엑스.png'
import { sendGet, showPayMent } from '../../util/util';
import { useSelector } from 'react-redux';


const data = [
    {
        idx: 5,
        brand_name: '토리든',
        cos_name: '밸런스풀 시카 토너 패드',
        cos_img_src: "https://img.hwahae.co.kr/products/1858863/1858863_20220801000000.jpg?format=webp&size=600x600",
        price: '23,000원',
        vol: '60ea'
    },
    {
        idx: 6,
        brand_name: '라운드어라운드',
        cos_name: '그린티 시카 선로션[SPF50+/PA++++]',
        cos_img_src: 'https://img.hwahae.co.kr/products/1944992/1944992_20230602135720.jpg?format=webp&size=600x600',
        price: '20,000원',
        vol: '100ml'
    }
]

const deliveryAddress = [
    {
        idx: 1,
        name: '오세원',
        address: '광주광역시 서구 상무공원로 94 (치평동) 대주아파트 000동 000호',
        phone: '010-0000-0000',
        default_address: true
    },
    {
        idx: 2,
        name: '회사',
        address: '광주광역시 동구 스마트인재개발원',
        phone: '010-0000-0000',
        default_address: false
    }
]



const PayShipment = () => {

    const nav = useNavigate();

    // let check = false;

    // 드롭다운 열림/닫힘 상태 관리 함수
    const [dropdownOpenClose, setDropdownOpenClose] = useState(false);
    // 선택된 옵션 저장 함수
    const [dropdownOptionSelect, setDropdownOptionSelect] = useState('-- 메시지 선택 (선택사항) --');

    const options = [
        '-- 메시지 선택 (선택사항) --',
        '배송 전에 미리 연락바랍니다.',
        '부재 시 경비실에 맡겨주세요.',
        '부재 시 문 앞에 놓아주세요.',
        '빠른 배송 부탁드립니다.',
        '택배함에 보관해 주세요.'
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

    // 기본 배송지 관리 함수
    // const [defaultAddress, setDefaultAddress] = useState(null);

    // // 기본 배송지 설정: 컴포넌트가 마운트될 때 실행
    // useEffect(() => {
    //     // deliveryAddress 배열에서 default_address가 true인 주소를 찾음
    //     const defaultAddr = deliveryAddress.find(addr => addr.default_address === true);
    //     setDefaultAddress(defaultAddr);  // 기본 배송지 설정
    // }, []);


    // 배송지 목록
    const [ addresses, setAddresses ] = useState(deliveryAddress);

    const handleDelete = (idx) => {
        // 선택한 인덱스에 해당하는 주소를 제외한 새로운 배열 생성
        const updatedAddresses = addresses.filter(address => address.idx !== idx);
        // 상태 업데이트
        setAddresses(updatedAddresses);
    };

    // sendGet으로 사용자아이디(userID) 데이터베이스에 보내주기(왜? )
    // 리덕스 가져오기
    const state = useSelector(user => user.user)

    useEffect(() => {
    sendGet(URL + '/OrderPage' , null , {userid : state.user_id} )
    console.log(state.user_id);
    
}, []);

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

                        {/* 기본 배송지가 설정된 경우, 기본 배송지를 화면에 표시 */}
                        {/* {defaultAddress ? (
                            <div className='delivery_container'>
                                <div className='basic_name'>
                                    <span className='basic'>[기본]</span>
                                    <span className='delivery_name'>{defaultAddress.name}</span>
                                </div>
                                <div className='delivery_address'>[우편번호] {defaultAddress.address}</div>
                                <div className='delivery_phone'>{defaultAddress.phone}</div>
                            </div>
                        ) : (
                            <div className='delivery_container'>
                                <p>기본 배송지가 설정되지 않았습니다.</p>
                            </div>
                        )} */}

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

                            <hr className='thin_grayline' />


                            {data.map((item, i) => {
                                return (
                                    <>
                                    
                                        <div key={i} className='order_product' >
                                            <img className='order_img' style={{ width: '80px', height: '80px' }} src={item.cos_img_src} alt="" />
                                            <div className='order_content_text' >
                                                <div className='order_product_brandxbtn'>
                                                    <span className='order_graytext'>
                                                        {item.brand_name}
                                                    </span>
                                                </div>
                                                <div className='order_product_nametext'>

                                                    <span className='order_product_name'>
                                                        {item.cos_name}
                                                    </span>
                                                    <span className='order_product_vol'>
                                                        {item.vol}
                                                    </span>

                                                </div>
                                                <div>
                                                    <span className='order_product_price'>{item.price}</span>
                                                    <span className='order_graytext'>1개</span>
                                                </div>
                                            </div>

                                            {/* <img className='order_x_btn ' src={XBtn} alt="" style={{ marginLeft: "50%", width: '10px', height: '10px' }} /> */}


                                        </div>

                                    </>
                                )
                            })}

                        </div>

                        <hr className='thick_grayline' />

                        <div>
                            <div className='white_text_box'>
                                결제정보
                            </div>

                            <hr className='thin_grayline' />

                            <div className='gray_text'>
                                <div className='gray_text_money'>
                                    <span>총 상품금액</span>
                                    <span>43,000원</span>
                                </div>
                                <div className='gray_text_money'>
                                    <span>배송비</span>
                                    <span className=''>3,000원</span>
                                </div>
                            </div>

                            <hr className='thin_grayline' />

                            <div className='pay_fix_box'>
                                <span className='pay_fix_amount'>최종 결제 금액</span>
                                <span className='pay_fix_num'>46,000원</span>
                            </div>

                            <hr className='thin_grayline' />

                        </div>
                        <div className='pay_fix_btn' onClick={() => showPayMent}>
                            46,000원 결제하기
                        </div> </>
                    : <>
                        <div>

                            {deliveryAddress.map((item, i) => {
                                return (
                                    <>
                                        <div className='delivery_list_box'>
                                            <div key={i}>
                                                <div>
                                                    <br />
                                                    <span>{item.name}</span>
                                                    {/* <span>{item.basic}</span> */}
                                                    {item.default_address && <span>[기본]</span>}
                                                </div>
                                                <div>{item.address}</div>
                                                <div>{item.phone}</div>
                                                <div>{dropdownOptionSelect}</div>
                                            </div>
                                            <div>
                                                <button onClick={() => handleDelete(item.idx)}>삭제</button>
                                                <button onClick={() => nav('/addressadd/수정/1')}>수정</button>
                                                <button>선택</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}



                            <div className='delivery_plus'>
                                <button onClick={() => nav('/addressadd/추가/-100')}>배송지추가</button>
                            </div>
                        </div>
                    </>
                }



            </div>

        </div>
    )
}

export default PayShipment