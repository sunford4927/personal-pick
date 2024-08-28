import React from 'react'

const Ingredient = () => {
  return (
    <div>

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



    </div>
  )
}

export default Ingredient