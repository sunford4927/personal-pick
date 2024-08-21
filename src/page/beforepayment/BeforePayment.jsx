import React , {useState} from 'react';
import './BeforePayment.scss';
import Dropdown from './Dropdown';



const BeforePayment = () => {

  const [selected , setSelected] = useState("");


  return (
    <div id='wrapper'>  

      {/* 정기 구독 결제 주기 텍스트 */}
       <div className='subscribetitle'>
        <span className='subtitletext'>정기 구독 결제 주기</span>
       </div>


       {/* 드롭박스 창 */}
       <Dropdown selected={selected} setSelected = {setSelected}/>

    </div>
  )
}

export default BeforePayment