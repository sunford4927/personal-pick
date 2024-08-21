import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../util/util'
import axios from 'axios';
import './Mypage.scss'
import { LogoutSession, getLoginSession } from '../../util/session'

const Join = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    const home = () => navigate('/');
    // const join = () => navigate('/join');
    // const login = () => navigate('/login');
    const order = () => navigate('/order');
    const point = () => navigate('/point');

    

    // 로그인 유저 데이터 저장
    const [userData, setUserData] = useState();
    // 로그인 유저 주문/배송 데이터 저장
    const [orderData, setOrderData] = useState();
    
    useEffect(() => {
        const LoadUsersData = async () => {
            // session에 로그인 정보가 있으면 해당 유저의 데이터를 가져옴
            if(getLoginSession().username){
                console.log('user_name : ',getLoginSession().username);

                // 1. 유저 데이터
                const responseUserData = await axios.get(URL + '/TestUserData',{
                    params : {
                        user_name : getLoginSession().username
                    }
                });
                
                // 2. 주문/배송 데이터
                const responseOrderData = await axios.get(URL + '/TestOrderData',{
                    params : {
                        user_name : getLoginSession().username
                    }
                });
                
                
                
                console.log('UserData : ',responseUserData.data[0]);
                console.log('OrderData : ',responseOrderData.data);
                
                setUserData(responseUserData.data[0])
                setOrderData(responseOrderData.data)

            }
        };

        // 화면이 첫 랜더링 될 때 함수 실행
        LoadUsersData();
    }, []);
    // console.log('userData : ',userData);
    

    return (
        <div id='mypage'>
        <div id='wrapper'>
            <div id='head'>
                <span className="left">
                    <h1>MyPage</h1>
                </span>
                <span className="right">
                    <img src="https://cdn-icons-png.flaticon.com/512/4991/4991422.png" alt=""
                    title="공고 아이콘 제작자: JessHG - Flaticon"/> 

                    <img src="https://cdn-icons-png.flaticon.com/512/6861/6861505.png" alt=""
                    title="쇼핑백 아이콘 제작자: IYAHICON - Flaticon"/> 
                </span>
            </div>

            <div id='main'>
                <div className='fst'>
                    <img src="https://cdn-icons-png.flaticon.com/512/6063/6063734.png" alt="" />
                    <span className='middle'>
                        <h1>{userData?userData.user_nm:'이름'}</h1>
                        <p>{userData?(
                            '연령대 : ' +
                            (userData.user_age<10?'10세 이하':
                            userData.user_age<20?'10대':
                            userData.user_age<30?'20대':
                            userData.user_age<40?'30대':
                            userData.user_age<50?'40대':
                            userData.user_age<60?'50대':
                            userData.user_age<70?'60대':'70세 이상')
                            ):'-'}</p>
                    </span>
                    <span className='right'>
                        <img src="https://cdn-icons-png.flaticon.com/512/54/54366.png" alt="" />
                    </span>
                </div>

                <div className='scd'>
                    <span className='left'>
                        <h2 onClick={order}>주문/배송</h2>
                        <p>{userData?orderData.length:0}</p>
                    </span>
                    <span className='middle'>
                        <h2 onClick={point}>포인트</h2>
                        <p>0 P</p>
                    </span>
                    <span className='right'>
                        <h1>쿠폰</h1>
                        <p>0</p>
                    </span>
                </div>

                <div className='text'>
                    <h1>리뷰</h1>
                    <p>사용한 제품 리뷰 쓰기</p>
                    <p>화해 구매 제품 리뷰 쓰기</p>
                    <p>내가 쓴 리뷰</p>
                </div>

                <div className='ad'>
                    <h1>AD</h1>
                </div>

                <div className='text'>
                    <h1>나의 관심</h1>
                    <p>최근 본 제품</p>
                    <img src="https://img.hwahae.co.kr/products/2021890/2021890_20230127164932.jpg?format=webp&size=600x600" alt="" />
                    <br />
                    <p>찜한 상품</p>
                    <p>즐겨찾는 제품</p>
                    <p>즐겨찾는 브랜드</p>
                    <p>즐겨찾는 성분</p>

                </div>

                <div className='text'>
                    <h1>소식/스크랩</h1>
                    <p>소식받는 사용자</p>
                    <p>소식받는 에디터</p>
                    <p>스크랩한 뷰티ON/리뷰</p>
                </div>

                <div className='text'>
                    <h1>이벤트</h1>
                    <p>이벤트 신청/당첨 내역</p>
                    <p>찜한 이벤트</p>
                    <p>이벤트 배송지 수정</p>
                </div>

                <div className='text'>
                    <h1>구독</h1>
                    <p className="cursor" onClick={()=> navigate("/subscriptionmanagement")}>구독관리</p>
                </div>
                <div className='ad2'>
                    <p>출석체크, 친구초대 등 다양한 이벤트는</p>
                    <p>혜택 앱을 통해 참여할 수 있어요</p>
                </div>

                <div className='last'>
                    <h1>고객센터</h1>
                    <p>제품 등록 요청</p>
                    <p>등록 요청 제품</p>
                    <p>FAQ</p>
                    <p>1:1 문의</p>
                    <p>설정</p>
                </div>

            </div>
            
        </div>
        </div>
    );
};

export default Join;



// --- old ---

// import React, { useEffect, useState } from 'react';
// import axios from 'axios'
// import { URL } from '../../util/util'
// import { useNavigate } from 'react-router-dom';

// import './Mypage.scss'
// import { useDispatch, useSelector } from 'react-redux';

// const Join = () => {
//     // 페이지 이동 함수
//     const navigate = useNavigate();
//     const home = () => navigate('/');
//     const join = () => navigate('/join');
//     const login = () => navigate('/login');
//     // redux
//     // 상태 저장
//     const state = useSelector(state => state);
//     // 상태 변경
//     const dispatch = useDispatch();
//     // 상태 출력
//     useEffect(() => {
//         console.log('login : ',state.isUser);
//         console.log('userData : ',state.userData);
//     }, [state]);

//     return (
        
//         <div id='mypage'>
//         <div id="Mypage">
//         <div id='wrapper'>
//             <div id='head'>
//                 <span className="left">마이페이지</span>
//                 <span className="right">
//                     <img src="https://cdn-icons-png.flaticon.com/512/4991/4991422.png" alt=""
//                     title="공고 아이콘 제작자: JessHG - Flaticon"/> 

//                     <img src="https://cdn-icons-png.flaticon.com/512/6861/6861505.png" alt=""
//                     title="쇼핑백 아이콘 제작자: IYAHICON - Flaticon"/> 
//                 </span>
//             </div>

//             <div id='main'>
//                 <div className='fst'>
//                     <img src="https://cdn-icons-png.flaticon.com/512/6063/6063734.png" alt="" />
//                     <span className='middle'>
//                         <h1>{state.isUser?state.userData.user_nm:'이름'}</h1>
//                         <p>연령대 피부타입</p>
//                     </span>
//                     <span className='right'>
//                         <img src="https://cdn-icons-png.flaticon.com/512/54/54366.png" alt="" />
//                     </span>
//                 </div>

//                 <div className='scd'>
//                     <span className='left'>
//                         <h1>주문/배송</h1>
//                         <p>0</p>
//                     </span>
//                     <span className='middle'>
//                         <h1>포인트</h1>
//                         <p>0 P</p>
//                     </span>
//                     <span className='right'>
//                         <h1>쿠폰</h1>
//                         <p>0</p>
//                     </span>
//                 </div>

//                 <div className='text'>
//                     <h1>리뷰</h1>
//                     <p>사용한 제품 리뷰 쓰기</p>
//                     <p>화해 구매 제품 리뷰 쓰기</p>
//                     <p>내가 쓴 리뷰</p>
//                 </div>

//                 <div className='ad'>
//                     <h1>AD</h1>
//                 </div>

//                 <div className='text'>
//                     <h1>나의 관심</h1>
//                     <p>최근 본 제품</p>
//                     <img src="https://img.hwahae.co.kr/products/2021890/2021890_20230127164932.jpg?format=webp&size=600x600" alt="" />
//                     <br />
//                     <p>찜한 상품</p>
//                     <p>즐겨찾는 제품</p>
//                     <p>즐겨찾는 브랜드</p>
//                     <p>즐겨찾는 성분</p>

//                 </div>

//                 <div className='text'>
//                     <h1>소식/스크랩</h1>
//                     <p>소식받는 사용자</p>
//                     <p>소식받는 에디터</p>
//                     <p>스크랩한 뷰티ON/리뷰</p>
//                 </div>

//                 <div className='text'>
//                     <h1>이벤트</h1>
//                     <p>이벤트 신청/당첨 내역</p>
//                     <p>찜한 이벤트</p>
//                     <p>이벤트 배송지 수정</p>
//                 </div>

//                 <div className='ad2'>
//                     <p>출석체크, 친구초대 등 다양한 이벤트는</p>
//                     <p>혜택 앱을 통해 참여할 수 있어요</p>
//                 </div>

//                 <div className='last'>
//                     <h1>고객센터</h1>
//                     <p>제품 등록 요청</p>
//                     <p>등록 요청 제품</p>
//                     <p>FAQ</p>
//                     <p>1:1 문의</p>
//                     <p>설정</p>
//                 </div>

//             </div>
//             <div id='foot'>
//                 <span className='icon'>
//                     <img
//                     src="https://cdn-icons-png.flaticon.com/512/8304/8304806.png"
//                     alt="" 
//                     title='Home'
//                     onClick={home}/>
//                     <p>Home</p>
//                 </span>
//                 <span className='icon'>
//                     <img src="https://cdn-icons-png.flaticon.com/512/636/636600.png" alt="" />
//                 </span>
//                 <span className='icon'>
//                     <img src="https://cdn-icons-png.flaticon.com/512/5058/5058903.png" alt="" />
//                 </span>
//                 <span className='icon'>
//                     <img src="https://cdn-icons-png.flaticon.com/512/5264/5264565.png" alt="" />
//                 </span>
//                 <span className='icon'>
//                     <img src="https://cdn-icons-png.flaticon.com/512/2824/2824318.png" alt="" />
//                 </span>
//             </div>
//         </div>
//         </div>
//         </div>
//     );
// };

// export default Join;
