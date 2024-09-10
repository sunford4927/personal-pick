import React from 'react'
import { useState, useEffect } from 'react';
import { getLoginSession } from '../../util/session';
import axios from 'axios';
import account from '../../img/사용자프로필.png'
import { setScore } from '../../util/util'
import { URL } from '../../util/util';


const ShowReview = ({ item }) => {

    const [showreview, setShowReview] = useState(false);

    // 날짜 문자열을 원하는 형식으로 변환하는 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 포맷

        return `${year}-${month}-${day}`;
    };


    return (
        <>
            <tr>
                <td style={{ textAlign: 'left' }}>{item.cos_name}</td>
                <td>{item.rating}</td>
                <td>{formatDate(item.review_reg_dt)}</td>
                <td><button className='reviewbtn' onClick={() => setShowReview(!showreview)}>review</button></td>
            </tr>
            {showreview &&
                <tr style={{border:'1px solid black'}}>
                    <td colspan='3'>
                        <div className='reviewcommentmain flex items-start gap-x-8 mt-24' style={{marginTop:'0' , textAlign:'left' , fontSize:'14px' , marginBottom:'12px' , marginTop:'12px'}}>
                            <span className='reviewcomment'>{item.review}</span>
                        </div>
                    </td>
                    <td>
                        <button className='reviewbtn' style={{background:'gray'}}>삭제</button>
                    </td>
                </tr>

            }
        </>
    );
};

export default ShowReview;