import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/pageheader/PageHeader';
import './ItemOrderView.scss'
import { sendGet, URL } from '../../util/util';
import { useSelector } from 'react-redux';
import Right from '../../img/오른쪽.png'
const _ = require('lodash');
const ItemOrderView = () => {
    const [data, setData] = useState([]);
    const [nameData, setNameData] = useState([])
    const user = useSelector(state => state.user)
    useEffect(() => {
        sendGet(URL + "/OrderHistory?user_id=" + user.user_id, datafactory);
    }, [user])
    let duplementName = [];
    function datafactory(data) {
        let list = [...data]

        for (let i = 0; i < list.length; i++) {
            let date2 = list[i].order_date.split("T");
            list[i].order_date = date2[0]
        }
        console.log(data)
        setNameData(_.uniqBy(list, "order_name"))

        
    }

    useEffect(() => {
        console.log(nameData)
        setData(_.uniqBy(nameData, "order_date"))
    }, [nameData])
    useEffect(() => {
        console.log(data)
        
    }, [data])
    return (
        <>
            <PageHeader title={"주문내역"} />
            {nameData.map(name => {
                return (
                
                    <div className='itemordercontainer'>
                        <div className='date_title flex_col'>
                            <p>{name.order_date}</p>
                            <div><img src={Right} alt="" /></div>
                        </div>
                        {nameData.map(item => {
                            return item.order_name === name.order_name &&
                                    <div className='under_contents' >{item.order_name}</div>
    
    
    
                        })}
                    
                    </div> 
                )
            })}
        </>
    );
};

export default ItemOrderView;
