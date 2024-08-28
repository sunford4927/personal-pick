import React from 'react'
import './DetailGraphBar.scss'
import { useState , useEffect} from 'react';
import { sendGet , URL } from '../../util/util';
import { useParams } from 'react-router-dom';



const DetailGraphBar = () => {

    const {idx} = useParams()

    const [scorecnt , setScoreCnt] = useState([]);

    useEffect(()=>{
        sendGet(URL + "/RatingCnt?idx="+idx ,setScoreCnt); // 그래프 바 평점 개수
   },[]);


    return (
        <div className='detailgraphbar_main'>
            {scorecnt.map((cnt,idx)=>{
                return (
                    <div key={idx}>
                        <div className='detailgraphbar_Container' >
                            <div>{cnt.count}</div>
                            <div className='detailgraphbarchart_back'>
                                <div className='detailgraphbarchart' style={{height : cnt.count*1+"%", backgroundColor:"#0099FC"}}>
                                </div>
                            </div>
                            <div className='detailgraphbar_Title'>★{cnt.rating}</div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default DetailGraphBar