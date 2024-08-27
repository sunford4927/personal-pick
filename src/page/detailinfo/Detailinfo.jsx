import React, { useEffect, useState } from 'react'
import {modalClose, sendGet , sendPost, showModal, showPayMent, showSwal, URL } from '../../util/util'
import { useNavigate } from 'react-router-dom'
import './Detailinfo.scss'
import star1 from '../../img/별.png'
import { useParams } from 'react-router-dom'
import smile from '../../img/smile.png'
import notsmile from '../../img/무표정.png'
import account from '../../img/account.png'
import goback from '../../img/왼쪽.png'
import { FaAngleDown } from "react-icons/fa";
import detailright from '../../img/오른쪽.png'
import caution from '../../img/caution.png'
import allergy from '../../img/allergy.png'
import ScrollToTop from '../../components/scrolltotop/ScrollToTop'
import { setScore } from '../../util/util'
import TempSkin from '../../components/tempskin/TempSkin'
import SkinType from '../../components/skintype/SkinType'
import DetailGraphBar from './DetailGraphBar'
import StarRating from './StarRating'
import InputReview from '../../components/inputreview/InputReview'
import PageHeader from '../../components/pageheader/PageHeader'
import ShoppingCartBtn from './ShoppingCartBtn'
import { useSelector } from 'react-redux'
import { Pagination } from 'antd'
import axios from 'axios'


const Detailinfo = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    const home = () => navigate('/');
    

    const state = useSelector(user => user.user)


    


    const [data , setData] = useState([]);
    const [review , setReview] = useState([]);
    const [scoreavg , setScoreAvg] = useState([]);
    const [scorecnt , setScoreCnt] = useState([]);
    const [reviewcnt , setReviewCnt] = useState([]);
    // const [starscore , setStarScore] = useState(0);

    const [itemadd, setItemAdd] = useState(1);
    const [isDecreasing, setIsDecreasing] = useState(false);

    

    const {idx} = useParams()

    useEffect(()=>{
         sendGet(URL + "/DetailPage?idx="+idx , setData); // 화장품 정보
         sendGet(URL + "/ReviewPage?idx="+idx , setReview); // 리뷰데이터 쪽
         sendGet(URL + "/RatingAvg?idx="+idx ,setScoreAvg); // 평점 평균
         sendGet(URL + "/RatingCnt?idx="+idx ,setScoreCnt); // 그래프 바 평점 개수
         sendGet(URL + "/ReviewCnt?idx="+idx ,setReviewCnt); // 리뷰 개수
         
    },[]);
    
    // // 페이지네이션 함수

    // const [currentPage , setCurrentPage] = useState(1);
    // const recordsPerPage = 5;
    // const lastIndex = currentPage * recordsPerPage;
    // const firstIndex =  lastIndex - recordsPerPage;
    // const records = review.slice(firstIndex , lastIndex);
    // const npage = Math.ceil(review.length / recordsPerPage);
    // const numbers = [...Array(npage + 1).keys()].slice(1)

    // function prePage() {
    //     if(currentPage !== firstIndex) {
    //         setCurrentPage(currentPage - 1);
    //     }
    // }

    // function nextPage() {
    //     if(currentPage !== lastIndex){
    //         setCurrentPage(currentPage + 1);
    //     }
    // }

    // function changeCPage(id) {
    //     setCurrentPage(id)
    // }


    

    const [total, setTotal] = useState(0); // Initialize total to 0 (if needed)
    const [page, setPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(5);
    
    // Calculate pagination indices (assuming review data is already available)
    const indexOfLastPage = Math.min(page * postPerPage, review.length); // Use review length
    const indexOfFirstPage = Math.max(indexOfLastPage - postPerPage, 0); // Ensure first page is non-negative
    const currentPosts = review.slice(indexOfFirstPage, indexOfLastPage); // Use slice on review data
    
    const onShowSizeChange = (current, pageSize) => {
      setPostPerPage(pageSize);
    };

    useEffect(()=> {
            setReview(review);
            setTotal(review.length);
    });
    
    const itemRender = (current, type, originalElement) => {
      if (type === 'prev') {
        return <a disabled={page === 1}>이전</a>; // Disable prev button on first page
      }
      if (type === 'next') {
        return <a disabled={page === Math.ceil(review.length / postPerPage)}>다음</a>; // Disable next button on last page
      }
    
      return originalElement;
    };
  

    useEffect(()=>{
       console.log(review)
   },[review]);

   useEffect(()=>{
    console.log(data)
    },[data]);
   
   useEffect(()=>{
    console.log(scoreavg)
   },[scoreavg]);

   useEffect(()=>{
    console.log(scorecnt)
   },[scorecnt]);

   useEffect(()=>{
    console.log(reviewcnt)
   },[reviewcnt]);

   useEffect(()=>{
    console.log(state)
   })


    const showSwal = (e) => {
        let str = ``
        str += `<div class = "subtitle">화장품 1</div>`
        str += `<div class = "subtitle">화장품 2</div>`
        showSwal(str,test)

        
    }


    const showSwal1= (e) => {

        let str = ``
        str += `<div class = "subtitle">랭킹/수상 정보</div>`
        showSwal(str,test1)
    }


    const func = () => {
        navigate('/cartlist')
        modalClose();
    }


    const test = (e) => {
        console.log(12)
    }

    const test1 = (e) => {
        console.log(e.target.innerText)
    }

    let skinList = [
        {
            count : 1,
            value : "피부 보습1"
        },{
            count : 2,
            value : "피부 보습2"
        },{
            count : 3,
            value : "피부 보습3"
        },{
            count : 4,
            value : "피부 보습4"
        },{
            count : 3,
            value : "피부 보습5"
        },{
            count : 3,
            value : "피부 보습"
        },{
            count : 3,
            value : "피부 보습"
        },{
            count : 3,
            value : "피부 보습"
        },{
            count : 3,
            value : "피부 보습"
        },{
            count : 3,
            value : "피부 보습"
        },{
            count : 3,
            value : "피부 보습"
        },
        {
            count : 3,
            value : "피부 보습"
        },
        {
            count : 3,
            value : "피부 보습"
        }
    ]

    
    let cntList = [
        {
            count : 5,
            value : "5점"
        },{
            count : 1,
            value : "4점"
        },{
            count : 2,
            value : "3점"
        },{
            count : 2,
            value : "2점"
        },{
            count : 1,
            value : "1점"
        }   
]

const calculateTotalPrice = (price, quantity) => {
    console.log(price)
    return price * quantity;
  };



  return (

    
        <div>
            {/* Main */}
            {/* 데이터를 성공적으로 불러오면 실행 */}
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index}>

                    {/* 화장품 이름 */}
                
                    <div className='itemname'>
                    <img src={goback} className = "gobackimg" onClick={()=> navigate('/Search')} width={20} height={20}></img>
                    <span className='cosmeticname'>{item.cos_name}</span>
                    </div>



                        <div id = 'main1'>

                        {/* 화장품 사진 */}
                        <img className='w-full' src ={item.cos_img_src}/>


                        {/* 화장품 브랜드 이미지, 이름 */}
                        <div className='brandmain my-24'>
                        <div className='brand flex items-center px-20'>
                        <span id='brandname'>{item.brand_name}</span>
                        </div>

                        {/* 화장품 정보 */}
                        <div className ='iteminfo'>
                        <div className='nameinfo mt-8 px-20'>
                        {item.cos_name}
                        </div>

                        <div className='starinfo hds-flex hds-items-center hds-space-x-2 px-20 mt-16'>
                        <img src = {star1} className='star' width={18}/><span className='starinfotext'>{item.grade}({item.grade_count})</span>
                        </div>

                        <div className='priceinfo px-20 mt-24'>
                        <div className='price'>
                        <span className='price1'>정가 :</span><span className='pricetext'>{item.price}원 / {item.vol}</span>
                        </div>
                        </div>

                        <div className='rankinginfo' onClick={(e)=>showSwal1(e)}>
                        <div className='ranking px-20 mt-24'>
                        <span className='ranking1'>랭킹 :</span><span className='rankingtext'>{item.ranking}</span>
                        </div>
                        <img src = {detailright} width={23} height={23}/>
                        </div>
                        </div>
                        </div>

                        <hr className='bar'/>


                        {/* 배송비 화면 영역 */}

                        <div className='deliveryprice'>
                            <span className='deliverytitle mt-8 px-20'>배송비</span><span className='deliverytitle2 mt-8 px-20'>3000원</span>
                            </div>
                        <div className='iffivetitle'>
                            <span className='iffive mt-8 px-20'>
                                50,000원 이상 구매시 무료배송
                            </span>
                        </div>
                            
                        <hr className='deliverybar'/>

                        {/* 수량 변경 부분 */}

                        <div className='itemtitlebox'>
                            <span className='itemtitlebox2'>{item.cos_name}</span><span className='amount'>({item.vol})</span>
                            <div className='flex_col itemtitlecontentbox'>
                            <div className='itemtitlebtn' onClick={() => {
                            if (itemadd > 0) {
                                setItemAdd(itemadd - 1);
                                setIsDecreasing(true);
                                } else {
                                 setIsDecreasing(false);
                                }
                                }}>-</div>
                            <div>{itemadd}</div>
                            <div className='itemtitlebtn' onClick={() => {
                            setItemAdd(itemadd + 1);
                            setIsDecreasing(false);
                            }}>+</div>
                            </div>
                            </div>


                        {/* 상품금액 합계 부분 */}  
                        <div className='amountallpricebox flex'>
                        <span className='amountallpricetext mt-8 px-20'>상품금액 합계</span>
                         {itemadd >= 1 && (
                            <span className='amountallprice mt-8 px-20'>
                            {calculateTotalPrice(item.price, itemadd)}원
                             </span>
                            )}
                        </div>

                            <hr className='amountpricebar'/>

                        {/* 구매하기 및 장바구니 버튼 */}

                        <div className='buybasketmain'>
                        <div className="buyitembutton">
                            <a className="buyitembutton btn first flex" onClick={()=>showPayMent(`${state.user_id}`, parseInt(item.price*itemadd), `${item.cos_name}`, `${state.user_adress}`)}>구매하기</a>
                        </div>

                        <div className="basketbutton">
                        <button className='basketbutton btn' onClick={() => {showModal(<ShoppingCartBtn func = {func}/>) ; 
                        sendPost(URL + '/AddCart' , null , 
                        {userid : state.user_id , 
                        categorynumber : idx ,  
                        cosmeticprice : item.price , 
                        cosmeticcount : itemadd , 
                        cosmetictotal : item.price*itemadd}  )}}>장바구니</button>
                        </div>
                        </div>
                    

                        {/*ai 리뷰 */}
                        <span className='aireview mt-8 px-20'><span className='ai'>AI</span>가 분석한 리뷰</span>

                        <div className='flex justify-between px-20 my-24 reviewinfo'>
                        <div className='likereview grow mr-24 w-1/2'>
                        <img src ={smile}  width={26} height={26} className='smileimg'/>
                            <span className='like'>좋아요</span>
                            <span className='margintop1'>진정되는<span className='reviewdata hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop1'>쿨링되는<span className='reviewdata hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop1'>수분있는<span className='reviewdata hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop1'>모공관리되는<span className='reviewdata1 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop1'>자극없는<span className='reviewdata hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop1'>향에 만족한<span className='reviewdata2 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop1'>보습되는<span className='reviewdata hds-text-body-medium text-gray-tertiary'>0</span></span>
                        </div>
                        <div className='w-[1px] bg-gray-300 aireviewbar'/>

                        <div className='dislike grow mr-24 w-1/2'>
                        <img src ={notsmile}  width={23} height={23} className='notsmileimg'/>
                            <span className='dontlike'>아쉬워요</span>
                            <span className='margintop2'>가루날림이 있는<span className='reviewdata3 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop2'>마르는<span className='reviewdata4 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop2'>흘러내리는<span className='reviewdata5 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop2'>잔여물이 남는<span className='reviewdata6 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop2'>노폐물 제거 안되는<span className='reviewdata7 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop2'>가려운<span className='reviewdata8 hds-text-body-medium text-gray-tertiary'>0</span></span>
                            <span className='margintop2'>내장 도구가 안좋은<span className='reviewdata7 hds-text-body-medium text-gray-tertiary'>0</span></span>
                        </div>
                        </div>

                        <hr className='bar2'/> 

                        {reviewcnt.map((item)=> (
                            <div className='detailreview mt-8 px-20'>
                            리뷰
                        <div className='reviewcount'>
                            {item.review_count}
                            </div>
                            </div>
                        ))}
                        
                        

                        <div className="reviewall flex justify-between px-20 my-24">
                        {/* 평점 구간 */}
                        {scoreavg.map((item, index) => (
                        <div className="reviewratemain" key={index}>
                        {/* rating_avg 값을 숫자로 변환 */}
                            <span className="reviewtext">{parseFloat(item.rating_avg).toFixed(2)}</span>
                            <div className="reviewstar">
                        {/* StarRating 컴포넌트를 사용하여 별점을 표시 */}
                        <StarRating rating={parseFloat(item.rating_avg)} starColor="gold" />
                        <div className='detail_backboard' style={{marginLeft:item.rating_avg*20}}></div>
                         </div>
                         </div>
                          ))}


                        <div className='w-[1px] bg-gray-300'/>
                            
                        {/* 평점 별점그래프 구간 */}   
                        <div className="flex gap-x-8 h-[95px]">
                        <DetailGraphBar list = {cntList}/>
                        </div>
                        </div>


                         {/* 계정 정보 및 사용자 리뷰 */}
                         {currentPosts.map((item) =>(
                         <div className='accountmain'>
                        <div className='accountinfo flex items-center'>
                        <img src = {account} width={50} className='w-40 h-40 rounded-full object-cover object-center'/>
                        <div className='textonly'>
                        <span className='nickname hds-text-subtitle-medium text-gray-primary'>{item.user_id}</span>
                        <span className='skintype hds-text-smalltext-large ml-2 text-gray-secondary'>{item.user_age}/{item.user_sex}/{item.skin_type}</span><br/>
                        </div>
                        <div className='accountstar'>
                        {setScore(`${item.rating}`)}
                            </div>
                        <span className='hds-text-smalltext-large ml-8 text-gray-quaternary accountdate'>{item.review_up_dt}</span>
                        </div>
                        
                        <div className='reviewcommentmain flex items-start gap-x-8 mt-24'>
                            <span className='reviewcomment'>{item.review}</span>
                            </div>
                            </div>
                        ))}
                        <Pagination 
                        className='pagination'
                        onChange={(value) => setPage(value)}
                        pageSize={postPerPage}
                        total={total}
                        current={page}
                        showSizeChanger
                        showQuickJumper
                        onShowSizeChange={onShowSizeChange}
                        itemRender={itemRender}
                        />



                        {/* <nav>
                            <ul className='pagination'>
                                <li className='page-item'>
                                    <a href='#' className='page-link'
                                    onClick={prePage}>Prev</a>
                                </li>
                                {
                                    numbers.map((item,i) => (
                                        <li className={`page-item ${currentPage === item ? 'active' : ''}`} key = {i}>
                                            <a href='#' className='page-item'
                                            onClick={() => changeCPage(item)} >{item}</a>
                                        </li>
                                    ))
                                }
                                <li className='page-item'>
                                    <a href='#' className='page-link'
                                    onClick={nextPage}>Next</a>
                                </li>
                            </ul>
                        </nav> */}


                        <hr className='bar3'/>

                        {/* 댓글 쓰는 창 */}
                        <InputReview/>

                        <hr className='bar4'/>


                            {/* 리뷰 전체보기 버튼
                            <div class="allreviewbtncontainer">
                            <a class="allreviewbtn btn-5" href='https://play.google.com/store/search?q=%EC%83%98%ED%94%8C%EB%A1%9C%EB%93%9C&c=apps&hl=ko'>리뷰 전체보기</a>
                            </div> */}

                        {/* 성분 */}

                        <div className='ingredientmain mt-8 px-20'>
                            <span>성분</span>
                            </div>

                        <hr className='ingredientbar'/>

                        <div className='ingredientdropbox' onClick={(e)=>showSwal(e)}> 
                        <input id="dropdown" type="checkbox"/>
                        <label className="dropdownLabel" for="dropdown">
                        <div>화장품 성분보기</div>
                        <FaAngleDown className="caretIcon" />
                        </label>
                        </div>

                        {/* 성분 구성 */}
                        <div className='ingredientcomposition mt-8 px-20'>
                            <span className='compositiontext'>성분 구성</span>
                            </div>



                        {/* 성분 구성 위험 단계 */}

                        <div class="colordanger flex justify-between mt-16">
                        <div className="flex items-center gap-x-4">
                        <div className="w-[10px] h-[10px] rounded-full bg-mint-600"></div>
                        <span className="hds-text-smalltext-large text-mint-600">1-2</span>
                        <span className="hds-text-smalltext-large text-gray-tertiary">낮은 위험</span>
                        </div>

                        <div className="flex items-center gap-x-4">
                        <div className="w-[10px] h-[10px] rounded-full bg-yellow-600"></div>
                        <span className="hds-text-smalltext-large text-yellow-600">3-6</span>
                        <span className="hds-text-smalltext-large text-gray-tertiary">중간 위험</span>
                        </div>

                        <div className="flex items-center gap-x-4">
                        <div className="w-[10px] h-[10px] rounded-full bg-red-600"></div>
                        <span className="hds-text-smalltext-large text-red-600">7-10</span>
                        <span className="hds-text-smalltext-large text-gray-tertiary">높은 위험</span>
                        </div>

                        <div className="flex items-center gap-x-4">
                        <div className="w-[10px] h-[10px] rounded-full bg-gray-600"></div>
                        <span className="hds-text-smalltext-large text-gray-tertiary">등급 미정</span>
                        </div>
                        </div>

                        {/* 성분 구성 막대 */}
                        <div className="flex flex-row-reverse mt-16 h-12 rounded-4 bg-gray-600">
                        </div>

                        <hr className='allingredientbar'/>


                        {/* 전체 성분 */}
                        <div className='allingredient mt-8 px-20'>
                            <span>전체 성분 (들어올값)개</span>
                        </div>

                        <div className= 'caution mt-8 px-20'>
                            <div className='flex gap-x-8'>
                            <img src={caution} alt="caution"/>
                            <span className = 'cautiontext hds-text-body-medium text-gray-secondary'>
                                20가지 주의성분
                                </span>
                                <div className='ingredientbetween'>
                                    <span className='ingredientnumber text-gray-primary'>0</span>
                                    <span className='hds-text-body-medium text-gray-secondary'>개</span>
                                </div>
                            </div>
                        </div>

                        <div className= 'allergy mt-8 px-20'>
                            <div className='flex gap-x-8'>
                            <img src={allergy} alt="allergy"></img>
                            <span className = 'allergytext hds-text-body-medium text-gray-secondary'>
                                알레르기 주의성분
                                </span>
                                <div className='ingredientbetween1'>
                                    <span className='ingredientnumber text-gray-primary'>0</span>
                                    <span className='hds-text-body-medium text-gray-secondary'>개</span>
                                </div>
                            </div>
                        </div>
                        </div>

                        {/* 하단 고정 버튼 쪽*/}

                        {/* 댓글쓰기 쓸때 쓸 별점 */}
                        {/* {setStarMenu(setStarScore) */}
                        <hr className='purposeingredientbar'/>

                        {/* 목적별 성분 */}
                        <div className='purpose mt-8 px-20'>
                            <span className='purposetext'>목적별 성분</span>
                            </div>
                        <TempSkin list = {skinList}/>
                        
                        {/* 회색 텍스트 박스1 */}
                        <div className='graybox px-20 py-16 background-gray-secondary-disabled rounded-8'>
                            <p className='hds-text-smalltext-large text-gray-tertiary'>목적별 성분 정보는 포함된 성분의 배합목적에 관한 정보로서, 완제품인 화장품의 기능성 효능ㆍ효과에 관한 정보가 아니며, 해당 성분의 포함 사실만으로 관련 기능이 보장되지 않습니다.</p>
                            </div>

                        <hr className='grayboxareabar'/>
                        

                        {/*피부 타입별 성분 */}
                        <div className='skintypeingredient mt-8 px-20'>
                            <span className='skintypeingredienttext'>피부 타입별 성분</span>
                            </div>
                        <SkinType/>

                        {/* 회색 텍스트 박스2 */}

                        <ul className='graybox2 pt-12 px-20 pb-16 background-gray-secondary-disabled rounded-8'>
                            <li className='flex items-start gap-x-8 mt-4'>
                                <span className='hds-text-smalltext-large text-gray-tertiary'>ㆍ</span>
                                <span className='hds-text-smalltext-large text-gray-tertiary'>구매 전에 제조판매업자가 표기한 전성분 표를 한 번 더 확인하시길 권장드립니다.</span>
                            </li>

                            <li className='flex items-start gap-x-8 mt-4'>
                                <span className='hds-text-smalltext-large text-gray-tertiary'>ㆍ</span>
                                <span className='hds-text-smalltext-large text-gray-tertiary'>정보를 허가없이 상업적으로 활용할 경우, 법적 조치를 받을 수 있습니다.</span>
                            </li>

                            <li className='flex items-start gap-x-8 mt-4'>
                                <span className='hds-text-smalltext-large text-gray-tertiary'>ㆍ</span>
                                <span className='hds-text-smalltext-large text-gray-tertiary'>성분별 해당 제품 내 배합 비율은 브랜드사에서 제공한 정보로 모든 책임은 브랜드사에 있습니다.</span>
                            </li>
                        </ul>

                        {/* 페이지업 버튼 */}

                        <ScrollToTop/>

                        {/* 앱으로 보기 버튼 */}
                        {/* <div className='fixed bottom-[0] left-[0] w-full z-10 pointer-events-none z-10'>
                            <div className='max-w-[600px] mx-auto bg-white'>
                            <div className="allreviewbtncontainer1">
                            <a className="allreviewbtn1 btn-6" href='https://play.google.com/store/search?q=%EC%83%98%ED%94%8C%EB%A1%9C%EB%93%9C&c=apps&hl=ko'>앱으로 보기</a>
                            </div>
                            </div>
                            </div> */}
                        

                        </div>
                ))
            ) : (
            // 데이터를 불러오는데 실패하면 실행
                <p>데이터 연결 실패</p>
            )}
            </div>
  )
}



export default Detailinfo