import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/pageheader/PageHeader';
import { URL } from '../../util/util'
import axios from 'axios';
// import '../itemorderview/ItemOrderView.scss'
import './Typecheck.scss'
import goback from '../../img/왼쪽.png'
import { LogoutSession, getLoginSession } from '../../util/session'
import { useSelector } from 'react-redux';
import Right from "../../img/오른쪽.png"
import Image1 from '../../img/광고배너1.png'
import Image2 from '../../img/광고배너2.png'
import Image3 from '../../img/광고배너3.png'
import Image4 from '../../img/광고배너4.png'
import Image5 from '../../img/광고배너5.png'
import Image6 from '../../img/광고배너6.png'
import Image7 from '../../img/광고배너7.png'
import Image8 from '../../img/광고배너8.png'
import Image9 from '../../img/광고배너9.png'
import cos_img_4 from '../../img/화장품 이미지4.jpg'

const Typecheck = () => {
    // 페이지 이동 함수
    const nav = useNavigate();

    // 사진 데이터 저장
    const [pngData, setPngData] = useState();
    // 진단 타입 저장
    const [skinData, setSkinData] = useState();



    // const order = () => navigate('/itemOrder');
    const point = () => nav('/point');

    // const user = useSelector(state => state.user)

    // 로그인 유저 데이터 저장
    const [userData, setUserData] = useState();
    // 로그인 유저 주문/배송 데이터 저장
    const [orderData, setOrderData] = useState();
    // 주문/배송 상태 저장
    const [delState, setDelState] = useState({});
    // 리뷰 데이터 저장 -> map함수 돌리고싶으면 [] 이용
    const [reviewData, setReviewData] = useState([]);
    

    useEffect(() => {
        const LoadUsersData = async () => {
            // session에 로그인 정보가 있으면 해당 유저의 데이터를 가져옴
            if (getLoginSession().username) {
                console.log('user_id : ', getLoginSession().username);

                // 1. 유저 데이터
                const responseUserData = await axios.get(URL + '/TestUserData', {
                    params: {
                        user_id: getLoginSession().username
                    }
                });
                console.log('res_user : ', responseUserData.data[0]);

                const res_user = responseUserData.data[0]
                setUserData(res_user)
    //             // 2. 주문/배송 데이터
    //             const responseOrderData = await axios.get(URL + '/TestOrderData', {
    //                 params: {
    //                     user_id: res_user.user_id
    //                 }
    //             });

                // 3. 리뷰 데이터
                // const responseReviewData = await axios.get(URL + '/TestReviewData', {
                //     params: {
                //         user_id: res_user.user_id
                //     }
                // });
                // console.log('review_data : ', responseReviewData.data);

    //             console.log('order_data : ', responseOrderData.data);
                
    //             setOrderData(responseOrderData.data)
                // setReviewData(responseReviewData.data)
                

            }
        };

        // 화면이 첫 랜더링 될 때 함수 실행
        LoadUsersData();
    }, []);

        // 광고배너 이미지 목록
        const images = [Image1, Image2, Image3,Image4,Image5,Image6,Image7,Image8,Image9];
        const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
        // 이미지가 일정 시간마다 변경되도록 설정
        useEffect(() => {
            console.log('Current Image Path:', images[currentImageIndex]);
            const interval = setInterval(() => {
                setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
            }, 3000); // 3초마다 이미지 변경
    
            return () => clearInterval(interval);
        }, [images.length]);

    // 날짜 문자열을 원하는 형식으로 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 포맷
    
        return `${year}-${month}-${day}`;
    };



    const [inputOpacity, setInputOpacity] = useState(1); // 초기 투명도 설정
    
    const photoInput = useRef(null);
    const [imageSrc, setImageSrc] = useState('');

    // 버튼 클릭 시 파일 입력 요소를 클릭
    const handleButtonClick = (e) => {
        photoInput.current.click();
    };

    const handleChange = (e) => {
        // 선택한 파일 정보를 콘솔에 출력
        console.log(e.target.files[0]);
        setPngData(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const checkButtonClick = async (e) => {
        if (skinData){
            setSkinData(null)
        }
        else{
            e.preventDefault();
            if (!pngData) {
                alert('No file selected');
                return;
            }
        
            const formData = new FormData();
            formData.append('file', pngData);
        
            //   // FileList 객체의 각 파일을 FormData에 추가
            //   for (let i = 0; i < selectedFiles.length; i++) {
            //     formData.append('files', selectedFiles[i]);
            //   }
        
            console.log('보낸 데이터 : ', pngData);
            
            const response = await axios.post(URL + "/SkinCheck", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('진단 결과 : ', response);
            setSkinData(response)
            // console.log('response : ', response);
        }
    };

    


    return (
        <div id='Typecheck'>
            <div id='head'>
                <div>
                <img src={goback} className="aigoback" onClick={() => nav(-1)} width={20} height={20}></img>
                <div className='airecommenduser'>
                    <span className='recommendid'>{getLoginSession().username}</span>님의 피부타입 진단
                </div>
                </div>
            </div>

            <div id='main'>
            <div className='fst'>
                    {skinData?
                    <div className='top'>
                        <div className='top1'>

                        </div>
                        <div className='top2'>
                            <h1/>{userData?userData.user_nm:'방문고객'}님의 피부타입은
                            <h1/>{skinData.data} 입니다!
                            
                            <button>화장품 추천받기</button> 

                        </div> 
                    </div>:
                    <div className='top'>
                        <div className='top1'>
                            <input
                            type="file" 
                            ref={photoInput}
                            onChange={handleChange}
                            style={{display: 'none'}} 

                        />
                        {imageSrc && (
                            <img 
                            src={imageSrc} 
                            alt="미리보기" 
                            style={{ marginTop: '10px', maxWidth: '100%' }} 
                            />
                        )}
                        </div>
                        <div className='top2'>
                        <button
                            onClick={handleButtonClick}>사진 등록</button> 
                        </div>
                        
                    </div>
                    }



                    {/*        
                    <h2>Personal Pick 피부진단
                    </h2>
                    <br />
                    <p>사진을 업로드하고 피부진단 받아보세요</p>
                    <br />*/}

                    <span className='bottom'>
                    {skinData?
                        <button onClick={checkButtonClick}>다시 하기</button>:
                        <button onClick={checkButtonClick}>진단 시작</button>
                    }
                    </span>
                    </div>
                    </div>

        </div>
    );
};

export default Typecheck;
