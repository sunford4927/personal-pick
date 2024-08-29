import React, { useEffect, useState } from 'react';
import './InputReview.scss'
import { sendGet, sendPost, URL } from '../../util/util';
import { setStarMenu } from '../../util/util';


const InputReview = ({item , setReview , setReviewCnt , setScoreCnt}) => {
    const [contents, setContents] = useState("")
    const [user, setUser] = useState({});
    const [index , setIndex] = useState(1);

    function temp(data) {
        console.log(data)
        setUser(data[0])
    }

    // useEffect(() => {
    //     sendGet(URL + "/ReviewPage?idx=" + idx, setReview); // 리뷰데이터 쪽
    // }, []);
    
    useEffect(() => {
        let nick = sessionStorage.getItem("username");
        if (nick !== "") {
            sendGet(URL + '/TestSearch?user_nm=' + nick, temp)
        }

    }, [])
    useEffect(() => {

        console.log(user)
    }, [user])

    useEffect(() => {

        console.log(index)
    }, [index])

function test (data)
{
    console.log(data)
    setReview(data)
}

function threeget ()
{
    sendGet(URL + "/ReviewPage?idx=" + item.idx, test)
    sendGet(URL + "/ReviewCnt?idx=" + item.idx, setReviewCnt)
    sendGet(URL + "/RatingCnt?idx=" + item.idx, setScoreCnt)
}


    function sendReview() {
        if (user.user_id == "") {
            alert("로그인 해 주세요")
            return
        }

        console.log(item.idx);
        

        sendPost(URL + '/InsertReview',  threeget ,
            {
                user_nm: user.user_nm,
                cos_name: item.cos_name,
                rating: index,
                review: contents

            })
    }


    return (
        <>
            {/* 댓글 쓰는 창 */}
            <div className='reviewcommentmainbox'>
            <div className='settingstar'>
                <span className='settingstartext px-20'>
                    화장품 만족도는 어떠셨나요? 후기 남겨주세요!
                </span>
            </div>

            <div className='setstarmenu px-20'>
            <span className='setstarmenutext'>평점 남기기</span>
            {setStarMenu(setIndex)}
            </div>

            <div className='review_containerbox'>
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
                <button className='reviewenter' onClick={() => sendReview()}>
                    등록
                </button>
            </div>
            </div>

        </>
    );
};

export default InputReview;