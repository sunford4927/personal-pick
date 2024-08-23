import React from 'react';
import LeftArrow from '../../img/왼쪽.png'
import { useNavigate } from 'react-router-dom';
import PageHeader from '../pageheader/PageHeader';

const AddressManagement = () => {
    const nav = useNavigate()
    const check = true;
    return (
        <>
            <PageHeader title={check ? "배송지 수정" : "배송지 등록"}/>

            <div style={{border : "1px solid #000"}}>
                <p>{check ? "배송지 수정" : "배송지 등록"}</p>
                <div style={{border : "1px solid #000"}}>
                    <div className='flex_col address_container_row'>
                        <div>
                            받는사람 <span style={{color : "red"}}>*</span>
                        </div>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressManagement;