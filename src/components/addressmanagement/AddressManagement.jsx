import React, { useEffect, useState } from 'react';
import LeftArrow from '../../img/왼쪽.png'
import { useNavigate } from 'react-router-dom';
import PageHeader from '../pageheader/PageHeader';
import "./AddressManagement.scss"
const AddressManagement = ({pageType}) => {
    const nav = useNavigate()

    // 받는 사람
    const [receiveUser, setReceiveUser] = useState("");
    // 폰 시작번호
    const [firstNum , setFirstNum] = useState("");
    // 폰 중간 번호
    const [middleNum, setMiddleNum] = useState("");
    // 폰 뒷 번호
    const [lastNum, setLastNum] = useState("");
    // 우편번호
    const [addressNum, setAddressNum] = useState("");
    // 기본주소
    const [address, setAddress] = useState("");
    // 나머지 주소
    const [lastAddress, setLastAddress] = useState("");

    // @우측 데이터
    const [email, setEmail] = useState("");
    // 이메일 "직접입력" 선택여부확인
    const [emailDirect, setEmailDirect] = useState(true);
    // 메시지
    const [message, setMessage] = useState("");
    // 메시지 "직접입력" 선택여부확인
    const [messageDirect, setMessageDirect] = useState(true);

    // 기본배송지 저장 유무
    const [defaultAddr, setDefaultAddr] = useState(false);


    let UserNm = "";
    // pageType 이 true일때는 배송지 수정화면이 출력 false일때는 배송지 등록화면
    useEffect(()=>{
        UserNm =sessionStorage.getItem("username");
        if(pageType)
        {
            // 주소 데이터 받아오는 로직
        }
    },[])

    useEffect(()=>{
       if(email === "direct_email")
       {
            setEmail("");
       }
    },[email])


    useEffect(()=>{
        if(message === "direct_message")
        {
            setMessage("");
        }
     },[message])

    return (
        <>
            <PageHeader title={pageType ? "배송지 수정" : "배송지 등록"}/>

            <div style={{border : "1px solid #000" }}>
                <p className='address_contents_title'>{pageType ? "배송지 수정" : "배송지 등록"}</p>
                <div style={{marginBottom:"20px", borderTop : "1px solid #000", borderBottom: "1px solid #000"}}>
                    <div className='flex_col address_container_row'>
                        <div>
                            받는사람 <span>*</span>
                        </div>
                        <input id='input1' type="text" onChange={(e)=> setReceiveUser(e.target.value)} />
                    </div>
                    <div className='flex_col address_container_row' style={{paddingBottom : "5px"}}>
                        <div>
                            주소<span>*</span>
                        </div> 
                        <input id='input2' style={{flex : 0}} type="text" placeholder='우편번호' onChange={(e)=>setAddressNum(e.target.value)}/>
                        <button>주소검색</button>
                    </div> 
                    <div className='flex_col address_container_row' style={{padding : "0px 20px"}}>
                        <div>
                            &nbsp;
                        </div> 
                        <input id='input3' type="text" placeholder='기본주소' onChange={(e)=>setAddress(e.target.value)}/>
                    </div> 
                    <div className='flex_col address_container_row' style={{paddingTop : "5px"}}>
                         <div>
                            &nbsp;
                        </div>
                        <input id='input4' type="text" placeholder='나머지 주소(선택 입력 가능)' onChange={(e)=>setLastAddress(e.target.value)}/>
                    </div> 
                    <div className='flex_col address_container_row'>
                        <div>
                            휴대전화 <span>*</span>
                        </div>
                        <select className='dropdown' name="" id="" onChange={(e)=> setFirstNum(e.target.value)}> 
                            <option value="010" selected>010</option>
                            <option value="011" >011</option>
                            <option value="016" >016</option>
                            <option value="017" >017 </option>
                            <option value="018" >018</option>
                            <option value="019" >019</option>
                        </select>
                        <span>-</span>
                        <input id='input5' type="text" onChange={(e)=>setMiddleNum(e.target.value)} />
                        <span>-</span>
                        <input id='input6' type="text" onChange={(e)=>setLastNum(e.target.value)}/>
                    </div> 
                    <div className='flex_col address_container_row'>
                        <div>
                            이메일 <span>*</span>
                        </div>
                        <input id='input7' type="text" style={{flex:0}} />
                        <span>@</span>
                        <input id='input8' type="text" style={{display: emailDirect ? "none" : "inline-block"}} placeholder='이메일을 입력해주세요' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <select className='dropdown' name="" id="" onChange={(e)=>{
                            setEmail(e.target.value)
                            if(e.target.value !== "direct_email" )
                            {
                                setEmailDirect(true);
                            }
                            else{
                                setEmailDirect(false);
                            }
                            }}>
                            <option value="choice" selected>-이메일 선택-</option>
                            <option value="naver.com" >naver.com</option>
                            <option value="daum.net" >daum.net</option>
                            <option value="nate.com" >nate.com</option>
                            <option value="hotmail.com" >hotmail.com</option>
                            <option value="yahoo.com" >yahoo.com</option>
                            <option value="empas.com" >empas.com</option>
                            <option value="korea.com" >korea.com</option>
                            <option value="dreamwiz.com" >dreamwiz.com</option>
                            <option value="gmail.com" >gmail.com</option>
                            <option value="direct_email" >직접입력</option>
                        </select>
                    </div> 
                </div>
                    <div  style={{borderTop : "1px solid #000"}}>
                        <p className='address_contents_title'>배송 요청사항</p>
                        <div style={{borderTop : "1px solid #000"}} className='flex_col address_container_row'>
                            <input id='input9' type="text" style={{display: messageDirect ? "none" : "inline-block"}} placeholder='요청사항을 입력해주세요' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                            <select className='dropdown dropflex' name="" id="" onChange={(e)=>{

                                setMessage(e.target.value)
                                if(e.target.value !== "direct_message")
                                {
                                    setMessageDirect(true);
                                }
                                else
                                {
                                    setMessageDirect(false);
                                }
                            }}>
                                <option value="choice" selected>-- 메시지 선택(선택사항)--</option>
                                <option value="배송전에 미리 연락바랍니다." >배송전에 미리 연락바랍니다.</option>
                                <option value="부재시 경비실에 맡겨주세요." >부재시 경비실에 맡겨주세요.</option>
                                <option value="부재시 문앞에 놓아주세요." >부재시 문앞에 놓아주세요.</option>
                                <option value="빠른 배송 부탁드립니다." >빠른 배송 부탁드립니다.</option>
                                <option value="택배함에 보관해 주세요" >택배함에 보관해 주세요</option>
                                <option value="direct_message" >직접입력</option>
                            </select> 
                        </div>

                        <br />
                        <div style={{padding : "0 15px", paddingBottom : "20px", borderBottom : "1px solid #000"}}>
                            <input id='input10' type="checkbox" name=""  onChange={(e)=>setDefaultAddr(e.target.checked)}/>
                            <span>기본 배송지로 저장</span>
                        </div>
                    </div>
            </div>
            <div style={{padding : "30px 60px"}}>
                <button className='basket_fix_btn' style={{position:"static"}}>저장</button>
            </div>
        </>
    );
};

export default AddressManagement;