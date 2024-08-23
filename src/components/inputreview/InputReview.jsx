import React, { useEffect, useState } from 'react';
import './InputReview.scss'
import { sendGet, sendPost, URL } from '../../util/util';


const InputReview = () => {
    const [contents, setContents] = useState("")
    const [user, setUser] = useState({});
    function temp(data){
        console.log(data)
        setUser(data)
    }
    useEffect(()=>{
        let nick =sessionStorage.getItem("username");
        if(nick!=="")
        {
            sendGet(URL+'/TestSearch?user_nm='+ nick, temp)
        }
        
    },[])
    useEffect(()=>{

        console.log(user)
    },[user])

    function sendReview(){
        if(user[0].user_id == "")
        {
            alert("로그인 해 주세요")
            return
        }
        sendPost(URL,null, {})
    }
    return (
        <div className='flex_col review_container'>
            <input className="review_container" type="text" value={contents} onChange={(e)=>setContents(e.target.value)}/>
            <div onClick={()=>sendReview()}>등록</div>
        </div>
    );
};

export default InputReview;