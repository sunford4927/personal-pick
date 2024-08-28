import React, { useEffect, useState } from 'react';
import './InputReview.scss'
import { sendGet, sendPost, URL } from '../../util/util';
import { useParams } from 'react-router-dom';


const InputReview = () => {
    const [contents, setContents] = useState("")
    const [user, setUser] = useState({});
    const [data, setData] = useState([]);
    const [review, setReview] = useState([]);

    function temp(data) {
        console.log(data)
        setUser(data)
    }

    const { idx } = useParams()

    useEffect(() => {
        sendGet(URL + "/DetailPage?idx=" + idx, setData); // 화장품 정보
        sendGet(URL + "/ReviewPage?idx=" + idx, setReview); // 리뷰데이터 쪽
    }, []);

    useEffect(() => {
        let nick = sessionStorage.getItem("username");
        if (nick !== "") {
            sendGet(URL + '/TestSearch?user_nm=' + nick, temp)
        }

    }, [])
    useEffect(() => {

        console.log(user)
    }, [user])

    function sendReview() {
        if (user[0].user_id == "") {
            alert("로그인 해 주세요")
            return
        }
         sendPost(URL + '/InsertReview' , null,
         {
            usernm:user.user_nm,
            usercosmeticname:data.cos_name,
            userrating:review.rating,
            userreview:review.review
        })
    }
    return (
        <>

<div className='review_containerbox' style={{ marginTop: "40px" }}>
    <input
        className="review_container"
        type="text"
        placeholder='댓글을 입력해주세요...'
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        style={{ height: '40px', lineHeight: '40px' }} // 추가된 스타일
    />
</div>

        {/* 등록버튼 */}
        <div className='reviewenterbox'>
        <div className='reviewenter' onClick={()=>sendReview()}>
            등록
        </div>
        </div>

        </>
    );
};

export default InputReview;