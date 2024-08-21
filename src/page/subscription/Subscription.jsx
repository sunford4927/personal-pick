import React, { useEffect, useState } from 'react'
import './Subscription.scss';
import { useNavigate } from 'react-router-dom';

// 메뉴창에서 정기배송 클릭 시 나타나는 화면
const Subscription = () => {

    const nav = useNavigate();
    // 사용자가 로그인했는지 여부(로그인되어있는지 안되어있는지 모르겠지만 일단 안되어있다고(false) 설정해놓겠다는 말)
    const [ isLogin, setIsLogin ] = useState(false);

    // 로그인 여부 관리(사용자가 로그인했는지를 확인)
    useEffect(() => {
        let Id = sessionStorage.getItem("username");
        if (Id) {  // 근데 만약 사용자가 로그인했다면
            setIsLogin(true);            
        }
    }, []);
 

    // "기초/색조 화장품 구독하러 가기" 버튼 클릭 시 "기초/색조 화장품"라는 글자를 beforepayment에 보내줄 거야~~
    // "기초 화장품 구독하러 가기" 버튼 클릭 시
    const basicMakeup = () => {
        if (isLogin) {  // 로그인되어 있을 시
            // "productType"이라는 키에 "기초 화장품"이라는 값을 저장하여 BeforePayment 페이지로 전달
            nav('/BeforePayment', { state: { productType: '기초 화장품' } });
        } else {  // 로그인되어 있지 않을 시
            nav('/login');
        }
        
    };

    // "색조 화장품 구독하러 가기" 버튼 클릭 시
    const colorMakeup = () => {
        if(isLogin) {
            nav('/BeforePayment', { state: { productType: '색조 화장품' } });
        } else {
            nav('/login');
        }
    };


    return (

        <div id='wrapper'>
            <div>
                <div>
                    <h2>
                        쓸모없는 고민은 그만<br />
                        미루니를 위한 샘플 정기 배송
                    </h2>

                    <div>
                        <ul className='flex_row writing_box'>
                            <br />
                            <li className='writing_itembox'>
                                <div>
                                <strong>
                                    다양한 샘플들을 구독제로
                                </strong>
                                <div>
                                    여러 상품을 다양하게 써보고 싶을 때,<br />
                                    피부에 잘 맞는 제품을 찾고 싶을 때,
                                </div>
                                </div>
                            </li>
                            <br />
                            <li>
                                <strong>
                                    고민할 필요 없이 맞춤형
                                </strong>
                                <div>
                                    피부에 맞는 화장품을 고르는 건 이제 그만! <br />
                                    빅데이터 기반 맞춤형 샘플 화장품으로<br />
                                    개인에게 맞는 화장품 정기 배송
                                </div>
                            </li>
                            <br />
                            <li>
                                <strong>
                                    언제든지 해지 가능한 구독
                                </strong>
                                <div>
                                    나에게 맞는 화장품을 찾았다면 바로 구독 해지
                                </div>
                            </li>
                            <br />
                            <li>
                                <strong>
                                    구독 제품은 배송비 무료
                                </strong>
                                <div>
                                    정기 배송 상품은 무료 배송!
                                </div>
                            </li>
                            <br />
                            <li>
                                <strong>
                                    편리한 자동결제/자동배송
                                </strong>
                                <div>
                                    정해진 날에 자동으로 결제하고 알아서 집까지! 
                                </div>
                            </li>
                            <br />
                            <li>
                                <strong>
                                    구독 후 설문 작성으로 포인트까지!
                                </strong>
                                <div>
                                    구독자들에게만 주는 혜택!<br />
                                    구독 후 달마다 오는 설문 타임~~!<br />
                                    설문 작성 시 최대 2000 포인트 제공
                                </div>
                            </li>
                        </ul>

                        <div>
                            <div>
                                <div>
                                    나에게 맞는 기초 화장품,<br />
                                    고민 없이 사용해보고 싶다면?
                                </div>
                                <div>
                                    피부 특성 분석 후 사용자 맞춤형 기초 화장품 샘플 4개를 보내드립니다.<br />
                                    <b>배송비 무료</b>
                                </div>
                                <button onClick={basicMakeup}>기초 화장품 구독하러 가기</button>
                                <img src="" alt="" />
                            </div>
                            <div>
                                <div>
                                    나에게 맞는 색조 화장품,<br />
                                    고민 없이 사용해보고 싶다면?
                                </div>
                                <div>
                                    피부 특성 분석 후 사용자 맞춤형 색조 화장품 샘플 4개를 보내드립니다.<br />
                                    <b>배송비 무료</b>
                                </div>
                                <button onClick={colorMakeup}>색초 화장품 구독하러 가기</button>
                                <img src="" alt="" />
                            </div>
                        </div>

                        <div>
                            <div>
                                Personal Pick 개인 맞춤형 화장품 정기구독
                            </div>
                            <div>
                                맞춤형 화장품, 나의 피부 타입은?
                            </div>
                            <button>피부 설문하러 가기</button>
                            <button>뭐 넣을 거 있음 넣어야징~~</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Subscription