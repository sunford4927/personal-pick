import React from 'react'
import { useState, useEffect } from 'react';
import { modalClose } from '../../util/util'
import { URL } from '../../util/util';
import { sendGet } from '../../util/util';
import { sampleSize } from 'lodash';
import { Link } from 'react-router-dom';


const ShoppingCartBtn = ({ func}) => {

  const [data, setData] = useState([]);
  // 추천받는 화장품
  const [recoData, setRecoData] = useState([]);
  // 추천 화장품 경로
  const [navi, setNavi] = useState();

  const [randomIndex1, setRandomIndex1] = useState(0);
  const [randomIndex2, setRandomIndex2] = useState(1); // 초기값을 다르게 설정

  const min = 1; // 최솟값
  const max = 120; // 최댓값
  const idx = Math.floor(Math.random() * (max - min + 1)) + min;



  useEffect(() => {
    sendGet(URL + "/DetailPage?idx=" + idx, setData); // 화장품 정보
  }, []);

  useEffect(() => {
    if (data.length >= 2) {
      const randomIndices = sampleSize([...Array(data.length).keys()], 2);
      setRandomIndex1(randomIndices[0]);
    } else {
      console.error('데이터가 부족하여 랜덤 추천 상품을 표시할 수 없습니다.');
    }
  }, [data.length]); // data.length만 의존성에 추가

  // useEffect(() => {
  //   if (randomIndex1 !== undefined) {
  //     const randomIndex2 = sampleSize([...Array(data.length).keys()], 1)[0];
  //     // randomIndex1과 다른 값으로 설정하기 위해 추가적인 로직 필요
  //     setRandomIndex2(randomIndex2);
  //   }
  // }, [data.length, randomIndex1]);
  
  // console.log('func : ',func);
  
  

    
    
    // // 성분 기반 추천
    // useEffect(() => {
      //   sendGet(URL + "/RecoIng?idx=" + idx, setRecoData); // 화장품 정보
      // }, []);
  
  // 추천 함수
  useEffect(() => {
    console.log('요청 idx : ', func);
    sendGet(URL + "/RecoIng?idx=" + func, setRecoData);
  }, []);
  console.log('recoData : ', recoData);
  
  // 추천 테스트
  const handleTest = () => {
    console.log('요청 idx : ', func);
    sendGet(URL + "/RecoIng?idx=" + func, setRecoData);
    console.log('recoData : ',recoData);
  };

  // 제품 클릭 시 detailinfo 페이지로 이동하는 함수
  const handleClick = (idx) => {
    console.log('idx : ',idx+1);
    window.location.href = '/target-page'; // 페이지 이동
    // nav(`/detailinfo/${idx}`);
    
  }

  return (
    <>
      <div class="shoppingcart mt-8 px-20">장바구니 담기</div>
      <hr class='shoppingcartbar' />
      <div className='shoppingcart_box'>
      <span class="addshopping">장바구니에 추가되었습니다.</span>
      </div>
      <div class="shoppincartmainbox">
        <div class='godetailmain'>
          {/* <div class="godetailbutton">
            <a class="godetailbutton btn1 first flex" onClick={() => modalClose()}>쇼핑계속하기</a>
          </div> */}
            <a class="godetailbutton" onClick={() => modalClose()}>쇼핑계속하기</a>
        </div>
        <div class='gotoshoppingmain'>
          {/* <div class="gotoshoppingbutton">
            <a className="gotoshoppingbutton btn1 first flex" onClick={() => func("/cartlist")}>장바구니 이동</a>
          </div> */}
          <a className="gotoshoppingbutton" onClick={() => func("/cartlist")}>장바구니 이동</a>
        </div>
      </div>

      <div className='simillarrecommend'>
        비슷한 성분 추천 상품
      </div>

{/* 랜덤 추천 상품 */}
      {/* <div className='modalimgmain'> */}
        {/* 랜덤 이미지1 */}
        {/* <button onClick={handleTest}>test</button> */}
        <div className="modalimg" onClick={{}} style={{padding:'0'}}>
          {recoData?<>
            <div className='flex_col'
            style={{maxWidth: '100%', overflowX:'auto'}}>
          {recoData.map((item) => (
            <div className='flex_col'
            style={{minWidth: '150px', overflowX:'auto', flexWrap: 'wrap'}}>
              <img
                src={item.cos_img_src}
                alt="코스메틱 이미지"
                style={{height:'150px'}}
                onClick={{}}
                />
                {/* {item.idx+1} */}
              <span className='randombrandname'>{item.cos_name}</span>
            </div>

            // <span className='randomimgname'>{data[randomIndex1]?.cos_name || '데이터 없음'}</span>
            // <div className='randomcosinfo'>
            // <span className='randomvolname'>({data[randomIndex1]?.vol})</span>
            // <span className='randomrankingname'>{data[randomIndex1]?.ranking}</span>
            // </div>
            // <span className='randomimgprice'>{data[randomIndex1]?.price ? `${data[randomIndex1]?.price}원` : '가격 정보 없음'}</span>
            
          ))}
          </div>
          </>:<></>
          }
          {!data[randomIndex1] && <div>데이터가 없습니다.</div>}
        </div>





        {/* <div className="modalimg" onClick={{}}>
          {data[randomIndex1] && (
            <>
              <img src={data[randomIndex1]?.cos_img_src || '/no_image.png'} alt="코스메틱 이미지" width={185} height={185} />
              <div className='randomcosinfo'>
              <span className='randombrandname'>[{data[randomIndex1]?.brand_name}]</span>
              <span className='randomimgname'>{data[randomIndex1]?.cos_name || '데이터 없음'}</span>
              <span className='randomvolname'>({data[randomIndex1]?.vol})</span>
              <span className='randomrankingname'>{data[randomIndex1]?.ranking}</span>
              </div>
              <span className='randomimgprice'>{data[randomIndex1]?.price ? `${data[randomIndex1]?.price}원` : '가격 정보 없음'}</span>
            </>
          )}
          {!data[randomIndex1] && <div>데이터가 없습니다.</div>}
        </div> */}

        {/* <div className='w-[1px] bg-gray-300 modalimgbar' /> */}

        {/*  랜덤 이미지2 */}
         {/* <div className="modalimg">
          {data[randomIndex2] && (
            <>
              <img src={data[randomIndex2]?.cos_img_src || '/no_image.png'} alt="코스메틱 이미지" width={200} height={200} />
              <span className='randomimgname'>이름: {data[randomIndex2]?.cos_name || '데이터 없음'}</span>
              <span className='randomimgprice'>가격: {data[randomIndex2]?.price ? `${data[randomIndex2]?.price}원` : '가격 정보 없음'}</span>
            </>
          )}
          {!data[randomIndex2] && <div>데이터가 없습니다.</div>}
        </div> */}
    </>
  )
}

export default ShoppingCartBtn