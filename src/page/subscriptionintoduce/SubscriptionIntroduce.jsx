import React from 'react'
import './SubscriptionIntroduce.scss'

const SubscriptionIntroduce = () => {
    return (
        <div>

            {/* 가격 부분 */}
            <div className='subintropricemainbox'>
                <div className='w-[2px] bg-gray-300 subintroducebar' />
                <span className='subintroprice'>가격</span>
                <div className='w-[2px] bg-gray-300 subintroduce1bar' />
            </div>

            {/* 구독 박스 */}
            <div className='subintrobox'>
                <span className='basicintroboxtext'>기초 샘플 구독</span>
                <span className='basicintroboxtext1'>20,000/월</span>
                <span className='basicintroboxtext2'>월 정기결제, 기초 샘플 기준</span>
            </div>

            {/* 결제하기 버튼 */}

            <div className='buysubscriptionmain'>
                <div className="buysubscriptionbutton">
                    <a className="buysubscription btn first flex">구매하기</a>
                </div>
            </div>



        </div>
    )
}

export default SubscriptionIntroduce