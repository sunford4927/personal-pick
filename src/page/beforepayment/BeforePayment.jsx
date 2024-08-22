import React, { useState } from 'react';
import './BeforePayment.scss';
import Dropdown from '../../components/dropdown/Dropdown'
import {motion} from "framer-motion"



const BeforePayment = () => {


  const [selected , setSelected] = useState("");
  const [selected2 , setSelected2] = useState("");
  const [selected3 , setSelected3] = useState("");


  return (
    <div id='wrapper'>
      {/* 정기 구독 결제 주기 텍스트 */}
      <div className='subscribetitle'>
        <span className='subtitletext'>정기 구독 결제 주기</span>
      </div>

      <Dropdown/>


      <div className='maintextbox'>
      <div className='textbox'>
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
        <span className='hitext'>안녕하세요</span>
        </motion.div>
      </div>

      <div className='textbox1'>
        <span className='hitext1'>누구일까요</span>
      </div>
      </div>

      <div className='maintextbox1'>
      <div className='textbox2'>
        <span className='hitext2'>메롱</span>
      </div>

      <div className='textbox3'>
        <span className='hitext3'>바보</span>
      </div>
      </div>
      

      {/* 드롭박스 창 
      <div className='dropboxstyle'>
        <div className='dropboxstylecontent'>
          <Dropdown selected={selected} setSelected={setSelected} type={"data1"}/>
      </div>
      */}

      {/* 드롭박스 창2 
      <div className='dropboxstyle1'>
        <div className='dropboxstylecontent1'>
          <Dropdown selected={selected2} setSelected={setSelected2} type ={"data2"}/>
      </div>
      </div>
      */}

      {/* 드롭박스 창3 

      <div className='dropboxstyle2'>
        <div className='dropboxstylecontent2'>
          <Dropdown selected={selected3} setSelected={setSelected3} type ={"data3"}/>
      </div>
      </div>
      */}

      </div>
  )
}

export default BeforePayment;