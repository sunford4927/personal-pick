import React from 'react'
import './Subscription.scss';
import {motion} from "framer-motion"
import image1 from '../../img/화장품 이미지1.jpg'
import image2 from '../../img/화장품 이미지2.jpg'

const Subscription = () => {
    // 메뉴창에서 정기배송 클릭 시 나타나는 화면

    // const nav = useNavigate();


    // // 제품 클릭 시 detailinfo 페이지로 이동하는 함수
    // const subscripeClick = () => {
    //     nav(`/BeforePayment/`);
    // };

    return (

        <div id='wrapper'>
            {/* 제목 */}
            <div className='subscriptiontitle'>
                <span className='subscriptiontext'>
                쓸모없는 고민은 그만!
                </span>
                <span className='subscriptiontext2'>
                미루니를 위한 샘플 정기 배송
                </span>
            </div>

            {/*  첫줄 정보 박스 */}
            <div className='maintextbox'>
            <div className='firstbox'>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                    ease: 'easeInOut',
                    duration: 0.3,
                    x: { duration: 1 },
                    }}
                >
            <span className='firstboxtext'>다양한 샘플들을 구독제로</span>
             </motion.div>
             <span className='firstboxtext2'>
                여러 상품을 다양하게 써보고 싶을 때,
                </span>
                <span className='firstboxtext2_1'>
                피부에 잘 맞는 제품을 찾고 싶을 때!
                </span>
                <span className='firstboxtext2_2'>
                부담없이 언제든 구독 해지 가능!
                </span>
            </div>

            <div className='secondbox'>
            <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                    ease: 'easeInOut',
                    duration: 0.4,
                    x: { duration: 1 },
                    }}
                >
            <span className='secondboxtext'>
                고민할 필요 없이 맞춤형
                </span>
                </motion.div>
            <span className='secondboxtext2'>
                피부에 맞는 화장품을 고르는 건 이제 그만!
                </span>
                <span className='secondboxtext2_1'>
                빅데이터 기반 맞춤형 샘플 화장품으로
                </span>
                <span className='secondboxtext2_2'>
                개인에게 맞는 화장품 정기 배송
                </span>
            </div>
            </div>

            {/*  둘째줄 정보 박스 */}
            <div className='maintextbox2'>
                <div className='thirdbox'>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    x: { duration: 1 },
                    }}
                >
                <span className='thirdboxtext'>
                    편리한 자동결제/무료배송
                </span>
                </motion.div>
                <span className='thirdboxtext2'>
                    정해진 날에 자동으로 결제하고 알아서 집까지!
                </span>
                <span className='thirdboxtext2_1'>
                    정기 배송 상품은 무료 배송!
                </span>
                </div>

                <div className='fourthbox'>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{
                    ease: 'easeInOut',
                    duration: 0.5,
                    x: { duration: 1 },
                    }}
                >
                <span className='fourthboxtext'>
                    구독 후 설문 작성으로 포인트까지!
                    </span>
                    </motion.div>
                    <span className='fourthboxtext2'>
                        구독자들에게만 주는 혜택!
                    </span>
                    <span className='fourthboxtext2_1'>
                        구독 후 달마다 오는 설문 타임!!
                    </span>
                    <span className='fourthboxtext2_2'>
                        설문 작성 시 최대 200포인트 제공!
                    </span>
                </div>
                </div>

                {/* 기초 구독 설명 영역 */}
                <div className='basictitlemainbox'>
                    <img src ={image1} width={300} height={300} className='image1'/>
                    <span className='basictitle'>
                    나에게 맞는 기초 화장품
                    </span> 
                    <span className='basictitle2'>
                    고민 없이 사용해보고 싶다면?
                    </span>
                </div>

                <div className='basictextbox'>
                    <span className='basictext'>
                        피부 특성 분석 후 사용자 맞춤형 기초 샘플 4개를 보내드립니다.
                    </span>
                    <span className='basictext2'>
                        배송비 무료!
                    </span>
                </div>

                <div class="basicbutton">
                    <a class="basicbutton btn-5">기초 화장품 구독하러 가기</a>
                </div>


                {/* 색조 구독 설명 영역 */}
                <div className='huetitlemainbox'>
                    <img src ={image2} width={250} height={200} className='image2'/>
                    <span className='huetitle'>
                    나에게 맞는 색조 화장품
                    </span> 
                    <span className='huetitle2'>
                    고민 없이 사용해보고 싶다면?
                    </span>
                </div>

                <div className='huetextbox'>
                    <span className='huetext'>
                        피부 특성 분석 후 사용자 맞춤형 색조 샘플 4개를 보내드립니다.
                    </span>
                    <span className='huetext2'>
                        배송비 무료!
                    </span>
                </div>

                <div class="huebutton">
                    <a class="huebutton btn-5">색조 화장품 구독하러 가기</a>
                </div>



                
    
                </div>
    )
}

export default Subscription