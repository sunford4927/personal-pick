import React from 'react'
import './AiRecommend.scss'
// import useCountUp from './UseCountUp'
import { useCountUp } from 'react-countup';



const AiRecommend = () => {

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
        </div>

        {/* 구독자 추천 화장품 목록 */}

    </div>
  )
}

export default AiRecommend