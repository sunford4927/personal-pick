import React from 'react'
import './DetailGraphBar.scss'

let cnt = {
    count : 3,
    value : "개"
}


const DetailGraphBar = ( {list} ) => {
    return (
        <div className='detailgraphbar_main'>
            {list.map((cnt,idx)=>{
                return (
                    <div >
                        <div className='detailgraphbar_Container' key={idx}>
                            <div>{cnt.count}</div>
                            <div className='detailgraphbarchart_back'>
                                <div className='detailgraphbarchart' style={{height : cnt.count*10+"%", backgroundColor:"#0099FC"}}>
                                </div>
                            </div>
                            <div className='detailgraphbar_Title'>{cnt.value}</div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default DetailGraphBar