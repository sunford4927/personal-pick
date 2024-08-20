import React from 'react';

const Menu = ({ isView }) => {
    return (
        <>
            { 
                isView && 
                <div>
                    <img src="" alt="" />
                    <p>로그인/회원가입</p>   
                    <hr />
                    <p>제품</p>                
                    <hr />
                    <p>본품</p>
                    <p>샘플</p>
                    <hr />
                    <p>정기배송/구독</p>
                    <hr />
                    

                </div>


            }
        </>
    );
};

export default Menu;