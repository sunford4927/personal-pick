import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/pageheader/PageHeader';
import OrderView from '../../components/orderview/OrderView';
import { sendGet, URL } from '../../util/util';
import { useSelector } from 'react-redux';
const _ = require('lodash');
const ItemOrderView = () => {
    const [data, setData] = useState([]);
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

        duplementName = _.uniqBy(list, "order_name")

        setData(_.uniqBy(duplementName, "order_date"))
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <>
            <PageHeader title={"주문내역"} />
            {data.map(date => {
                return (
                    duplementName.map(item => {
                        return item.order_date === date.order_date &&
                            <>
                                <p>{date.order_date}</p>
                                <p>{item.order_name}</p>
                            </>



                    })
                )
            })}
        </>
    );
};

export default ItemOrderView;
