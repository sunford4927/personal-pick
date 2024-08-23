import React, { useState } from 'react'
import './PayShipment.scss';
import Back from '../../img/왼쪽.png';
import Triangle from '../../img/역삼각형.png';

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



const PayShipment = () => {

    // const nav = useNavigate();

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
    const optionSelect =(option) => {
        setDropdownOptionSelect(option);  // 선택된 옵션 상태에 저장
        setDropdownOpenClose(false);   // 드롭다운 닫기
    };


    return (
        <div>
            <div className=''>
                <img className='back' src={Back} alt="" onClick={() => nav('/cartlist')} />
                <p>주문/결제</p>
            </div>

            <div>
                <div>
                    <span className=''>배송지</span>
                    <span className=''>배송지 목록</span>
                </div>
                <div>
                    <div>
                        <span>[기본]</span>
                        <span>오세원</span>
                    </div>
                    <div>[우편번호] 광주광역시 서구 상무공원로 94 (치평동) 대주아파트 000동 000호</div>
                    <div>010-0000-0000</div>
                </div>
                <hr className='thin_grayline' />
                <div className='delivery_dropdown'>
                    <button className='dropdown_toggle' onClick={dropdownToggle}>{dropdownOptionSelect}<img className='dropdown_triangle' src={Triangle} /></button>
                    {dropdownOpenClose && (<ul className='dropdown_menu'>
                        {options.map((option, idx) => (
                        <li  onClick={() => optionSelect(option)}>{option}</li>
                    ))}
                        </ul>
                        )}
                </div>

                {/* {check ? <div>1</div> : <div>2</div>} */}
            </div>

        </div>
    )
}

export default PayShipment