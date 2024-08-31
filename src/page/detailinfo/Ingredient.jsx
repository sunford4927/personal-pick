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
  const { idx } = props;

  useEffect(() => {
    sendGet(URL + "/DetailPage?idx=" + idx, setData); // 화장품 정보
  }, []);
  
  useEffect(() => {
    if (data.length > 0) {
      sendGet(URL + "/GetIngredient?cos_name=" + data[0].cos_name, setCosIngredient);
      console.log("Fetched Ingredient Data:", cosingredient); // Log the data after fetching
    }
  }, [data]);



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
      <span className='totaling'>{totalIngredients}개</span>
    </div>

    
    {/* 성분 구성 위험 단계 */}
    <div className="colordanger flex justify-between mt-16">
      <div className="bluecolor gap-x-4">
        <div className="w-[10px] h-[10px] rounded-full bg-mint-600"></div>
        <div className="lowdanger">
          <span className="hds-text-smalltext-large text-mint-600">1-2</span>
          <span className="hds-text-smalltext-large text-gray-tertiary">낮은 위험</span>
        </div>
      </div>

      <div className="yellowcolor gap-x-4">
        <div className="w-[10px] h-[10px] rounded-full bg-yellow-600"></div>
        <span className="hds-text-smalltext-large text-yellow-600">3-6</span>
        <span className="hds-text-smalltext-large text-gray-tertiary">중간 위험</span>
      </div>

      <div className="redcolor gap-x-4">
        <div className="w-[10px] h-[10px] rounded-full bg-red-600"></div>
        <span className="hds-text-smalltext-large text-red-600">7-10</span>
        <span className="hds-text-smalltext-large text-gray-tertiary">높은 위험</span>
      </div>

      <div className="graycolor gap-x-4">
        <div className="w-[10px] h-[10px] rounded-full bg-gray-600"></div>
        <span className="hds-text-smalltext-large text-gray-tertiary">등급 미정</span>
      </div>
    </div>

    {/* 성분 목록 */}
    {cosingredient.map((ingredient) => (
    <div key={ingredient.ing_idx}>
        <div className="ingmaintext">
              <span className='ingscore'>{ingredient.score}</span>
              <span className='ingeng'>{ingredient.eng_name}</span>
              <span className='ingkor'>{ingredient.kor_name}</span>
              <span className='inguse'>{ingredient.use}</span>
            </div>
        </div>
        ))}
    </div>
  )
}

export default Ingredient