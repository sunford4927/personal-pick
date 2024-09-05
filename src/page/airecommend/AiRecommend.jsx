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


    // redux 임시 데이터로 이용
    const homeCateMain = useSelector(state => state.homeCategory)
    // 데이터 저장
    const [user, setUser] = useState();
    const [data, setData] = useState();

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
            const user_temp = user_response.data[0]       
            console.log('피부타입 : ', user_temp.skin_type);
            console.log('연령 : ', user_temp.user_age);
            console.log('성별 : ', user_temp.user_sex);
            setUser({
                user : user_response.data[0],
                user_age : user_temp.user_age,
                user_sex : user_temp.user_sex,
                skin_type : user_temp.skin_type
            })

            // 2. 추천 데이터
            // const reco_response = await axios.get(URL + '/Recommend', {
            //     params: {
            //         user_nm : user_nm,
            //         user_age : user_temp.user_age,
            //         user_sex : user_temp.user_sex,
            //         skin_type : user_temp.skin_type
            //     }
            // });
            // const data = reco_response.data
            // console.log('data : ', reco_response.data);
            // setData(reco_response.data)
            


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
            {getLoginSession().username}님의 맞춤형 추천 화장품
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

        </div>

        {/* 비구독자 추천 화장품 목록 */}
        <div className='notsubcoslist'>
        <span>
                {data ?
                <Itemview data={data} />:
                <Itemview data={homeCateMain.data} />}
                </span>
            
        </div>



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
             {data ?
             <Itemview data={data} />:
             <Itemview data={homeCateMain.data} />}
            </span>
        </div>

        {/* 구독자 추천 화장품 목록 */}

    </div>
  )
}

export default AiRecommend