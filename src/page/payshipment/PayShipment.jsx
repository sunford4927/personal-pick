import React, { useEffect, useState } from 'react'
import './PayShipment.scss';
import Back from '../../img/왼쪽.png';
import Triangle from '../../img/역삼각형.png';
import { useNavigate, useParams } from 'react-router-dom';
import { sendDel, sendGet, showPayMent, URL } from '../../util/util';
import { useSelector } from 'react-redux';


const PayShipment = () => {

    const nav = useNavigate();
    const { cos_id, cos_count } = useParams();
    console.log();
    if(typeof(test) === "undefined")
    {
        console.log(true)
    }
    // let check = false;

    // 드롭다운 열림/닫힘 상태 관리 함수
    const [dropdownOpenClose, setDropdownOpenClose] = useState(false);
    // 선택된 옵션 저장 함수
    const [dropdownOptionSelect, setDropdownOptionSelect] = useState('-- 메시지 선택 (선택사항) --');

    const options = [
        "-- 메시지 선택(선택사항) --", "배송전에 미리 연락바랍니다.", "부재시 경비실에 맡겨주세요.",
        "부재시 문앞에 놓아주세요.", "빠른 배송 부탁드립니다.", "택배함에 보관해 주세요"
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



    // 리덕스로 사용자아이디(userID) 데이터베이스에 보내주기
    const state = useSelector((item) => {
        return item.user
    })
    // 데이터베이스에서 받아온 주문상품 화면에 뿌려주기 위한 함수
    const [orderProduct, setOrderProduct] = useState([]);

    const [deliveryAddress, setDeliveryAddress] = useState([]);

    function setDirectData(data){
        let newData = {...data}
        console.log(data);
        // setOrderProduct()
    }

    useEffect(() => {
        if(typeof(cos_id) === "undefined")
        {
            sendGet(URL + '/OrderPage?userid=' + state.user_id, setOrderProduct);
        }
        else{
            sendGet(URL + "/DetailPage?idx=" + cos_id, setOrderProduct); // 화장품 정보
        }
        sendGet(URL + '/addressList?userid=' + state.user_id, setDeliveryAddress);
    }, [state]);
    // 배열 안에 state를 쓰기 전 빈배열일 때 새로고침하면 데이터 날라감
    // 어떻게 해줘야하나?
    // 리덕스에 있는 유저 데이터를 빈배열 안에 불러줘야함(state)

    // 1. 새로고침 시 리덕스 데이터 사라짐
    // 1-1. useEffect [state]이 빈배열로 한 번 새로고침 실행됨
    // 2. 화면 렌더링 후 리덕스에 유저 데이터 추가
    //3 . 유저 데이터 변화 감지 후 코드 실행


    // 총 상품가격 
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let price = 0;
        for (let i = 0; i < orderProduct.length; i++) {
            price += orderProduct[i].total_price;
        }
        setTotalPrice(price)
    }, [orderProduct])


    // 주소 포맷팅 함수(특정 기준으로 분리&추가)
    const formatAddress = (address) => {
        // 주소를 split하여 배열로 변환
        const parts = address.split('///');
        if (parts.length > 0) {
            // 우편번호에 대괄호 추가
            parts[0] = `[${parts[0]}]`;
        }
        // 배열을 다시 문자열로 결합
        return parts.join(' ');
    };

    // 주소 삭제 함수
    const deleteAddress = (address_idx) => {
        sendDel(URL + '/EditAddress', { address_idx: address_idx }, (response) => {
            if (response.success) {
                // 삭제가 성공적으로 완료되면 UI를 업데이트합니다.
                setDeliveryAddress(deliveryAddress.filter(item => item.address_idx !== address_idx));
            }
        });
    };



    return (
        <div>
            <div className='backORtext'>
                <img className='orderpay_back_btn' src={Back} alt="" onClick={() => nav('/cartlist')} />
                <p className='orderpay_text'>주문/결제</p>
            </div>

            <div className='orderpay_body'>
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

                        {/* 기본 배송지가 설정된 경우, 기본 배송지를 화면에 표시  */}
                        {deliveryAddress.map((item, i) => {
                            return item.default_address ? (

                                <div>
                                    <div key={i} className='delivery_container'>
                                        <div className='basic_name'>
                                            <span className='basic'>[기본]</span>
                                            <span className='delivery_name'>{item.receive_name}</span>
                                        </div>
                                        <div className='delivery_address'>{formatAddress(item.user_address)}</div>
                                        <div className='delivery_phone'>{item.phone_num}</div>
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
                                </div>

                            ) : (
                                <div />
                            )
                        })}
                        <hr className='thick_grayline' />

                        <div>
                            <div className='white_text_box'>
                                주문상품
                            </div>

                            <hr className='thin_grayline' />


                            {orderProduct.map((item, i) => {
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
                                                    <span className='order_graytext'>{item.buy_cnt + "개"}</span>
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
                                    <span>{totalPrice + "원"}</span>
                                </div>
                                <div className='gray_text_money'>
                                    <span>배송비</span>
                                    <span className=''>3000원</span>
                                </div>
                            </div>

                            <hr className='thin_grayline' />

                            <div className='pay_fix_box'>
                                <span className='pay_fix_amount'>최종 결제 금액</span>
                                <span className='pay_fix_num'>{totalPrice + 3000 + "원"}</span>
                            </div>

                            <hr className='thin_grayline' />

                        </div>
                        <div className='pay_fix_btn' onClick={() => showPayMent}>
                            {totalPrice + 3000 + "원 결제하기"}
                        </div> </>

                    : <>

                        <div>

                            {deliveryAddress.map((item, i) => {
                                return (
                                    <>
                                        <div className='delivery_list_box'>
                                            <div key={i} className='deliverylist_list'>
                                                <div className='deliverylist_namebasic'>
                                                    {/* <br /> */}
                                                    <span className='deliverylist_name'>{item.receive_name}</span>
                                                    <span className='deliverylist_basic'>{item.default_address}</span>
                                                    {/* {item.default_address && <span>[기본]</span>} */}
                                                </div>
                                                <div className='deliverylist_address'>{formatAddress(item.user_address)}</div>
                                                <div className='deliverylist_phone'>{item.phone_num}</div>
                                                <div className='deliverylist_msg'>{item.msg}</div>
                                            </div>
                                            <div className='deliverylist_btn'>
                                                {/* <button className='deliverylist_delete' onClick={() => deleteAddress(item.address_idx)}>삭제</button> */}
                                                <button onClick={() => sendDel(URL + '/EditAddress', (() => sendGet(URL + '/addressList?userid=' + state.user_id, setDeliveryAddress)), { address_idx: item.address_idx })}>삭제</button>
                                                <button className='deliverylist_edit' onClick={() => nav(`/addressadd/수정/${item.address_idx}`)}>수정</button>
                                                <button className='deliverylist_selete'>선택</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}



                            <div className='delivery_add'>
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