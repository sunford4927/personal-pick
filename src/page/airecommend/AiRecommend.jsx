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
    const [data_sub, setDataSub] = useState();
    const [data_non_sub, setDataNonSub] = useState();

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

            // const user_data = {
            //     user_nm : user_nm,
            //     user_age : user_temp.user_age,
            //     user_sex : user_temp.user_sex,
            //     skin_type : user_temp.skin_type
            // }
            // console.log('비구독자 : ', user_data);
            
            // 2. 비구독자 추천 데이터
            const reco_non_sub = await axios.get(URL + '/Recommend', {
                params: {
                    sub : 0,
                    user_nm : user_nm,
                    user_age : user_temp.user_age,
                    user_sex : user_temp.user_sex,
                    skin_type : user_temp.skin_type
                }
            });
            console.log('data_non_sub : ', reco_non_sub);
            setDataNonSub(reco_non_sub.data)
            
            // 2. 구독자 추천 데이터
            const reco_sub = await axios.get(URL + '/Recommend', {
                params: {
                    sub : 1,
                    user_nm : user_nm,
                    user_age : user_temp.user_age,
                    user_sex : user_temp.user_sex,
                    skin_type : user_temp.skin_type
                }
            });
            console.log('data_sub : ', reco_sub.data);
            setDataSub(reco_sub.data)

            // // 2. 구독자 추천 데이터
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



    // 숫자 올라가는 기능 함수

    const CountUp = () => {
        useCountUp({ ref: 'counter', end: 3000});
        return <span id="counter" />;
      };

      const CountUp1 = () => {
        useCountUp({ ref: 'counter1', end: 10000});
        return <span id="counter1" />;
      };

      
    // 제품 클릭 시 detailinfo 페이지로 이동하는 함수
    const gotoinfoHandleClick = (idx) => {
        nav(`/detailinfo/${idx}`);
    };

    
    
  return (
    <div>

        {/* 회원 추천 쪽 */}
        <div className='airecommenduser'>
            <span className='recommendid'>{getLoginSession().username}</span>님의 맞춤형 추천 화장품
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

        {/* 비구독자 추천 화장품 목록 */}
        <div>
        <span className='notsubcoslist'>
            {data_non_sub ? 
            <Itemview data={data_non_sub} onclick = {gotoinfoHandleClick}/>:
            <Itemview data={homeCateMain.data} />}
            </span>
        </div>
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

            <div className='maketosub'>
                <span className='maketosubtext'>구독자 전용 추천 화장품이 보고 싶다면?</span>
                <button className='maketosubbtn'>구독하러 가기</button>
            </div>

            {/* 구독자 추천 화장품 목록 */}
            <span className='subscribecos'>
             {data_sub ?
             <Itemview data={data_sub} />:
             <Itemview data={homeCateMain.data} />}
            </span>
        </div>

        

    </div>
  )
}

export default AiRecommend