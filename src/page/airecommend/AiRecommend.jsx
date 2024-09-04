import React, { useEffect, useState } from 'react'
import './AiRecommend.scss'
// import useCountUp from './UseCountUp'
import { useCountUp } from 'react-countup';
import { getDay, titleList, userAgeList, userTypeList } from "../../util/utilStr";
import { useSelector } from 'react-redux';
import Itemview from "../../components/itemview/Itemview"

import Star from '../../img/별.png'
import { setIcon } from '../../util/util'
import { useNavigate } from 'react-router-dom';
import { LogoutSession, getLoginSession } from '../../util/session'
import axios from 'axios';
import reducer from '../../redux/reducer/reducer'
import { URL } from '../../util/util'


const AiRecommend = () => {
    const nav = useNavigate();

    // 로그인 유저 데이터 저장
    const [userData, setUserData] = useState();
    
    // redux에서 데이터 가져오기
    // const user = useSelector(state => state.user)
    // const skin_type = user.skin_type
    // const user_age = user.user_age
    // const user_sex = user.user_sex
    // console.log('피부타입 : ', skin_type);
    // console.log('연령 : ', user_age);
    // console.log('성별 : ', user_sex);

    useEffect(() => {
        
        const LoadUsersData = async () => {
            const user_nm = getLoginSession().username
            console.log('user_nm : ', user_nm);
            console.log('url : ', URL);
            // 1. 유저 데이터
            const user_response = await axios.get(URL + '/TestDY', {
                params: {
                    user_nm: user_nm
                }
            });
            
            // const user = user_response.data[0]
            // const skin_type = user.skin_type
            // const user_age = user.user_age
            // const user_sex = user.user_sex
            // console.log('피부타입 : ', skin_type);
            // console.log('연령 : ', user_age);
            // console.log('성별 : ', user_sex);

            // // 2. 추천 데이터
            // const reco_response = await axios.get(URL + '/Recommend', {
            //     params: {
            //         user_nm : user_nm,
            //         user_age : user_age,
            //         user_sex : user_sex,
            //         skin_type : skin_type
            //     }
            // });
            // console.log(reco_response);
            

        }


        // 화면이 첫 랜더링 될 때 함수 실행
        LoadUsersData();
    }, []);
    



    // const slowCount = useCountUp(3000, 0, 4000);

    const CountUp = () => {
        useCountUp({ ref: 'counter', end: 3000});
        return <span id="counter" />;
      };

      const CountUp1 = () => {
        useCountUp({ ref: 'counter1', end: 10000});
        return <span id="counter1" />;
      };

      













    
  return (
    <div>

        {/* 회원 추천 쪽 */}
        <div className='airecommenduser'>
            xxx님의 맞춤형 추천 화장품
        </div>

        {/* 비구독자 전용 화장품 구역 */}
        <div className='notsubscribe'>
            <span className='notsubscribetext'>
                비구독자 전용 
            </span>

            <div className='countup'>
            <CountUp/>
            <div className='notsubscribetext1'>
            개의 회원들의 데이터 분석을 통해 추천해주는 화장품
            </div>
            </div>


            <div>

            </div>


            




        </div>

        {/* 비구독자 추천 화장품 목록 */}


        {/* 구독자 전용 화장품 구역 */}
        <div className='subscribe'>
            <span className='subscribetext'>
                구독자 전용 
            </span>

            <div className='countup1'>
            <CountUp1/>
            <div className='subscribetext1'>
            개의 회원들의 데이터 분석을 통해 추천해주는 화장품
            </div>
            </div>
            <span>
                {/* <Itemview data={homeCateMain.data} /> */}
            </span>
        </div>

        {/* 구독자 추천 화장품 목록 */}

    </div>
  )
}

export default AiRecommend