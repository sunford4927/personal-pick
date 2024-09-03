import React from 'react'
import { useState, useEffect } from 'react';
import { URL } from '../../util/util';
import { sendGet } from '../../util/util';
import { useParams } from 'react-router-dom';
import './Ingredient.scss'



const Ingredient = (props) => {

  const [cosingredient, setCosIngredient] = useState([]);
const [data, setData] = useState([]);
const [totalIngredients, setTotalIngredients] = useState(0);
const [colorCounts, setColorCounts] = useState({
  low: 0,
  medium: 0,
  high: 0,
  unknown: 0,
});
  const { idx } = props;

  const getRiskCategory = (score) => {
    const numericScore = parseInt(score, 10);

    // 100인 경우 먼저 처리

    if (numericScore === 100) {
      return 'unknown';

    } else if (numericScore >= 7 || 
      score === '01-07' || score === '01-08' || score === '01-09' || score === '01-10' || 
      score === '02-07' || score === '02-08' || score === '02-09' || score === '02-10' || 
      score === '03-07' || score === '03-08' || score === '03-09' || score === '03-10' ||
      score === '04-07' || score === '04-08' || score === '04-09' || score === '04-10' ||
      score === '05-07' || score === '05-08' || score === '05-09' || score === '05-10' || 
      score === '06-07' || score === '06-08' || score === '06-09' || score === '06-10' || 
      score === '07-08' || score === '07-09' || score === '07-10' || 
      score === '08-09' || score === '08-10' || score === '09-10') {
      return 'high';
    } else if (numericScore >= 3 || score === '01-04' || score === '01-05' || score === '01-06' || 
      score === '02-03' || score === '02-04' || score === '02-05' || score === '02-06' || 
      score === '03-04' || score === '03-05' || score === '03-06' || score === '04-05' || 
      score === '04-06' || score === '05-06') {
      return 'medium';
    } else if (numericScore >= 1 || score === '01-02' || score === '01-03') {
      return 'low'; 
    } else {
      return 'unknown'; // Default case for unexpected scores
    }
  };

  // 성분 데이터 받아오기

  useEffect(() => {
    sendGet(URL + "/DetailPage?idx=" + idx, (data) => {
      setData(data);
      console.log('Received data:', data); // 데이터 확인
      if (data.length > 0) {
        sendGet(URL + "/GetIngredient?cos_name=" + data[0].cos_name, (cosData) => {
          setCosIngredient(cosData);
          console.log('Received cosingredient:', cosData); // cosingredient 확인
        });
      }
    });
  }, []);

  // 성분 색깔별로 개수 함수

  useEffect(() => {
    if (cosingredient.length > 0) {
      const colorCounts = cosingredient.reduce((acc, ingredient) => {
        const score = ingredient.score;
        const category = getRiskCategory(score); // Call the function
        acc[category]++;
        return acc;
      }, { low: 0, medium: 0, high: 0, unknown: 0 });
      setColorCounts(colorCounts);
      setTotalIngredients(colorCounts.low + colorCounts.medium + colorCounts.high + colorCounts.unknown);
    }
  }, [cosingredient]);




  useEffect(() => {
    console.log(cosingredient);
    console.log(props);
    
  })

  useEffect(() => {
    setTotalIngredients(cosingredient.length);
  }, [cosingredient]);
  



  return (
    <div>
      {/* 성분 구성 */}
      <div className="ingredientcomposition mt-8 px-20">
        <span className="compositiontext">성분 구성</span>
        <span className='totaling'>{totalIngredients}</span>
        개
      </div>
  
      {/* 성분 구성 위험 단계 */}
      <div className="colordanger flex justify-between">
        <div className="bluecolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-mint-600"><span className='colorcnt'>{colorCounts.low}개</span></div>
          <div className="lowdanger">
            <span className="hds-text-smalltext-large text-mint-600">1-2</span>
            <span className="hds-text-smalltext-large text-gray-tertiary">낮은 위험</span>
          </div>
        </div>
  
        <div className="yellowcolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-600"><span className='colorcnt'>{colorCounts.medium}개</span></div>
          <span className="hds-text-smalltext-large text-yellow-600">3-6</span>
          <span className="hds-text-smalltext-large text-gray-tertiary">중간 위험</span>
        </div>
  
        <div className="redcolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-red-600"><span className='colorcnt'>{colorCounts.high}개</span></div>
          <span className="hds-text-smalltext-large text-red-600">7-10</span>
          <span className="hds-text-smalltext-large text-gray-tertiary">높은 위험</span>
        </div>
  
        <div className="graycolor gap-x-4">
          <div className="w-[10px] h-[10px] rounded-full bg-gray-600"><span className='colorcnt'>{colorCounts.unknown}개</span></div>
          <span className="hds-text-smalltext-large text-gray-tertiary">등급 미정</span>
        </div>
      </div>

      <hr className='ingbar'/>
  
      {/* 성분 목록 */}
      <div className='ingmain'>
      {cosingredient.map((ingredient) => (
        <div key={ingredient.ing_idx}>
          <div className="ingmaintext">
            <span
              className={`ingscore ${
                ingredient.score >= 100 ? 'w-[10px] h-[10px] rounded-full bg-gray-600' : 
                ingredient.score >= 7 ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score >= 3 ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score >= 1 ? 'w-[10px] h-[10px] rounded-full bg-mint-600' :
                ingredient.score === '01-02' ? 'w-[10px] h-[10px] rounded-full bg-mint-600' :
                ingredient.score === '01-03' ? 'w-[10px] h-[10px] rounded-full bg-mint-600' :
                ingredient.score === '01-04' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '01-05' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '01-06' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '02-03' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '02-04' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '02-05' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '02-06' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '03-04' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '03-05' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '03-06' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '04-05' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '04-06' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '05-06' ? 'w-[10px] h-[10px] rounded-full bg-yellow-600' :
                ingredient.score === '01-07' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '01-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '01-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '01-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '02-06' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '02-07' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '02-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '02-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '02-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '03-07' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '03-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '03-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '03-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '04-07' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '04-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '04-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '04-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600':
                ingredient.score === '05-07' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '05-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '05-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '05-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '06-07' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '06-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '06-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '06-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '07-08' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '07-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '07-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '08-09' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '08-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                ingredient.score === '09-10' ? 'w-[10px] h-[10px] rounded-full bg-red-600' :
                'w-[10px] h-[10px] rounded-full bg-gray-600'
              }`}
            >
              {ingredient.score}
            </span>
            <div className='ing3'>
            <span className='ingeng'>{ingredient.eng_name}</span>
            <span className='ingkor'>{ingredient.kor_name}</span>
            <span className='inguse'>{ingredient.use}</span>
          </div>
          </div>
          <hr className='ingbar2'/>
        </div>
      ))}
    </div>
    </div>
  )
}
  
export default Ingredient