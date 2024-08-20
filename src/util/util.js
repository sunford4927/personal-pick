import axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import 'animate.css';
import { IP } from './setIp';
import emptyStar from '../img/빈별.png'
import star from '../img/별.png'

export function sendGet(url, func=null ) {
    axios
        .get(url)
        .then(res => {
            if (func) {
                func(res.data);
            }
        })
        .catch(error => {
            console.error("요청 실패 : ", error);
        });
}

export function sendPost(url, func=null, data = null) {
    axios
        .post(url, {
            data : data
        })
        .then(res => {
            // func()
        })
        .catch(error => {
            console.error("요청 실패 : ", error);
        });
        
}


export function sendDel(url, func=null, data=null)
{
    axios
        .delete(url, {
            data : data
        })
        .then(res => {
            // func(res.data)
        })
}

export const URL = IP;


export function showSwal(strTag, func){
    withReactContent(Swal).fire({
        // title: "Custom animation with Animate.css",
        html : strTag,
        showConfirmButton : false, // ok 버튼 숨기기,
        position :'bottom',
        width : "100%",
        
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        },
        didOpen : () => {               
            let list = document.getElementsByClassName("subtitle");
            for(let i = 0; i < list.length; i++)
            {
                
                list[i].addEventListener("click",function(e){
                    func(e, i)
                })
            }
        },
    })
}

export function modalClose(){
    withReactContent(Swal).close();
}

let rankingDic = [
    { id: 1, rank: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="37" fill="none" viewBox="0 0 30 36" className="mb-2" aria-label="[object Object]등"><path fill="#FA0" d="m23.34 10.75-8 2.94c-.22.08-.47.08-.69 0l-7.99-2.94c-.39-.14-.66-.52-.66-.94V4.75c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5.06c0 .42-.26.79-.66.94"></path><path fill="#FFCD28" d="M15 32.25c6.351 0 11.5-5.149 11.5-11.5S21.351 9.25 15 9.25 3.5 14.399 3.5 20.75s5.149 11.5 11.5 11.5"></path><path fill="#FF961E" d="m15.34 13.68 6.3-2.31a11.464 11.464 0 0 0-13.28 0l6.3 2.31c.22.08.47.08.69 0z"></path><path fill="#fff" d="M14.945 16.75H16.5v9h-1.893v-7.104l-2.107.911v-1.746l2.445-1.05z"></path></svg> },
    { id: 2, rank: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="37" fill="none" viewBox="0 0 30 36" className="mb-2" aria-label="[object Object]등"><path fill="#999" d="m23.34 10.75-8 2.94c-.22.08-.47.08-.69 0l-7.99-2.94c-.39-.14-.66-.52-.66-.94V4.75c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5.06c0 .42-.26.79-.66.94"></path><path fill="#C4C4C4" d="M15 32.25c6.351 0 11.5-5.149 11.5-11.5S21.351 9.25 15 9.25 3.5 14.399 3.5 20.75s5.149 11.5 11.5 11.5"></path><path fill="#AAA" d="m15.34 13.68 6.3-2.31a11.464 11.464 0 0 0-13.28 0l6.3 2.31c.22.08.47.08.69 0z"></path><path fill="#fff" d="M14.9 22.69h3.3v1.62h-5.98v-1.07l3.17-3.31c.7-.73.91-1.15.91-1.61 0-.56-.47-1-1.17-1-.79 0-1.24.54-1.24 1.09h-1.72c.11-1.64 1.28-2.65 2.96-2.65s2.88.88 2.88 2.49c0 .88-.33 1.56-1.26 2.51l-1.85 1.92z"></path></svg> },
    { id: 3, rank: <svg xmlns="http://www.w3.org/2000/svg" width="30" height="37" fill="none" viewBox="0 0 30 36" className="mb-2" aria-label="[object Object]등"><path fill="#B96928" d="m23.34 10.75-8 2.94c-.22.08-.47.08-.69 0l-7.99-2.94c-.39-.14-.66-.52-.66-.94V4.75c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v5.06c0 .42-.26.79-.66.94"></path><path fill="#BF9A67" d="M15 32.25c6.351 0 11.5-5.149 11.5-11.5S21.351 9.25 15 9.25 3.5 14.399 3.5 20.75s5.149 11.5 11.5 11.5"></path><path fill="#A86127" d="m15.34 13.67 6.3-2.305a11.481 11.481 0 0 0-13.28 0l6.3 2.305c.22.08.47.08.69 0z"></path><path fill="#fff" d="M18.25 21.92c0 1.44-1.14 2.53-3 2.53-1.7 0-3.01-1-3.09-2.74h1.71c.05.77.55 1.24 1.38 1.24.7 0 1.28-.43 1.28-1.12 0-.69-.59-1.12-1.28-1.12h-.79v-1.44h.73c.64 0 1.1-.42 1.1-1.01 0-.59-.47-1.01-1.1-1.01-.8 0-1.15.5-1.16 1.06h-1.71c.02-1.64 1.4-2.55 2.89-2.55 1.61 0 2.81.97 2.81 2.39 0 .84-.46 1.43-1.14 1.78.86.36 1.38 1.07 1.38 1.99z"></path></svg> },
]

export function setIcon(idx){
    switch(idx){
        case 0:
            return <div>{rankingDic[0].rank}</div>
        case 1:
            return <div>{rankingDic[1].rank}</div>
        case 2:
            return <div>{rankingDic[2].rank}</div>
        default:
            return <div>{idx+1}</div>
    }
}

// 댓글 쓰기용 별점 출력
export function setStarMenu(func)
{
    let List = []
    for(let i =1; i< 6; i++)
    {
        List.push(<img key={i} className={'star comdStar'} src={emptyStar} onClick={(e)=>{
            func(i);
            changeStar(List,i);
        }}/>)
    }
    return List;
}
function changeStar(list, idx)
{
    let before = document.getElementsByClassName('comdStar');
    for(let i = 0; i< before.length; i++)
    {
        if(i<idx)
        {
            before[i].src = star;
        }
        else
        {
            before[i].src = emptyStar;
        }
    }
}


// 상세페이지에서 리뷰 별점 출력

export function setScore(idx){
    let stars = []
    for(let i = 0; i<5; i++)
    {
        if(i<idx)
        {
            stars.push(<img key={i} className='star' src={star} alt='별'/>)
        }
        else{
            stars.push(<img key={i} className='star' src={emptyStar} alt='별'/>)
        }
    }
    return stars;
}