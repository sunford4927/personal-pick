import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../../util/util'
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { LoginSession, LogoutSession, getLoginSession } from '../../util/session'

const Login = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    const home = () => navigate('/');
    const join = () => navigate('/join');
    const mypage = () => navigate('/mypage');

    // 로그인에 필요한 변수들
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 에러 메세지 저장
    const [error, setError] = useState('');
    // 로그인 상태 정보 저장
    // getLoginSession에 값이 없으면 false, 있으면 유저 이름 저장
    // 초기에 로그인 세션이 있으면 로그인 된 페이지 출력
    // 로그인이 안돼있으면 로그인 페이지 출력
    const [isLogin, setIsLogin] = useState(getLoginSession());

    // 로그인 함수
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // URL + /login 경로로 id, pw를 담아서 요청을 보냄
            const response = await axios.post(URL + '/TestLogin', {
                user_id : id,
                user_pw : pw
            });
            const responseData = response.data[0]
            // 반환 데이터 확인
            console.log('responseData : ',responseData);

            // 반환 데이터가 있으면 -> 로그인 성공하면
            if (responseData) {
                // 세션에 로그인한 유저 이름 저장
                LoginSession(responseData.user_name);
                // login 변수에 true 저장
                setIsLogin(true);
                console.log('로그인 유저 : ',getLoginSession().username);
                setError('');
            } else {
                setError('ID, PW가 일치하지 않습니다');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred');
        }
    };

    // 로그아웃 함수
    const handleLogout=()=>{
        LogoutSession();
        setIsLogin(false);
    }
    useEffect(() => {
        // login 상태가 바뀔 때마다 화면 랜더링
        console.log('Login User : ',getLoginSession().username);
    }, [isLogin]);
    

    return (
        <div id='login'>
            <div id='wrapper'>
                <div id='head'>
                    <div className='left'>
                        <h1 onClick={home}>Personal Pick</h1>
                    </div>
                    <div className='right'>
                        {getLoginSession().username?
                        <button onClick={handleLogout}>로그아웃</button>:
                        <button onClick={join}>회원가입</button>
                    }
                    </div>
                </div>
                
                <div id='main'>
                    <form className='join_form' onSubmit={handleLogin}>
                        {getLoginSession().username?
                        <>
                        <h2> 로그인</h2>
                        <div>
                            <button onClick={home}>메인 페이지</button>
                            <button onClick={mypage}>마이 페이지</button>
                        </div>
                        </>:

                        (<>

                        <div className='textbox'>
                            <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div>
                            <input
                                className='inputbox'
                                placeholder='Id'
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className='textbox'>
                            <div className='imgbox'>
                                <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
                            </div>
                            <input
                                className='inputbox'
                                placeholder='Password'
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                required
                            />
                        </div>
                        <div className='button_login'>
                            <button type="submit">로그인</button>
                        </div>
                        {/* 회원가입 실패 시 출력 */}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        </>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;


// --- old ---

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { URL } from '../../util/util'
// import { useNavigate } from 'react-router-dom';
// import './Login.scss'
// import { useSelector, useDispatch } from 'react-redux'
// import { login, logout } from '../../redux/type/typefunc';
// import personalReducer from '../../redux/reducer/reducer';
// // import * as types from '../../redux/type/types'

// const Login = () => {
//     // 페이지 이동 함수
//     const navigate = useNavigate();
//     const home = () => navigate('/');
//     const join = () => navigate('/join');
//     const mypage = () => navigate('/mypage');

//     // 로그인에 필요한 변수들
//     const [id, setId] = useState('');
//     const [pw, setPw] = useState('');

//     // 에러 메세지 저장
//     const [error, setError] = useState('');
//     // state.isUser : true 일 때 유저 정보 저장
//     const [userData, setUserData] = useState();

//     // 상태 저장
//     const state = useSelector(state => state);
    
//     // 상태 변경
//     const dispatch = useDispatch();
    
//     // 첫 랜더링,state 값이 변경될 때만 실행
//     // 로그인 상태 -> isUser
//     // 로그인 유저 데이터 -> userData
//     useEffect(() => {
//         console.log('login : ',state.isUser);
//         console.log('userData : ',state.userData);
//         if(state.isUser){
//             setUserData(state.userData)
//         }
//     }, [state]);
    

//     // 로그인 함수
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             // URL + /login 경로로 id, pw를 담아서 요청을 보냄
//             const response = await axios.post(URL + '/TestLogin', {
//                 user_id : id,
//                 user_pw : pw
//             });
//             const responseData = response.data[0]
//             // 반환 데이터 확인
//             console.log('responseData : ',responseData);

//             // 반환 데이터가 있으면 -> 로그인 성공하면
//             if (responseData) {

//                 // setUserData(responseData);
//                 // state 상태 업데이트
//                 dispatch(login(responseData))
//                 console.log('로그인 성공');
//                 setError('');
//             } else {
//                 setError('ID, PW가 일치하지 않습니다');
//             }
//         } catch (err) {
//             console.error('Login error:', err);
//             setError('An error occurred');
//         }
//     };

//     // 로그아웃 함수
//     const handleLogout =()=>{
//         dispatch(logout())
//     }


//     return (
//         <div id='login'>
//             <div id='wrapper'>
//                 <div id='head'>
//                     <div className='left'>
//                         <h1 onClick={home}>Personal Pick</h1>
//                     </div>
//                     <div className='right'>
//                         {state.isUser?
//                         <button onClick={handleLogout}>로그아웃</button>:
//                         <button onClick={join}>회원가입</button>
//                     }
//                     </div>
//                 </div>
                
//                 <div id='main'>
//                     <form className='join_form' onSubmit={handleLogin}>
//                         {state.isUser?
//                         <>
//                         <h2>{state.userData.user_name} 로그인</h2>
//                         <div>
//                             <button onClick={home}>메인 페이지</button>
//                             <button onClick={mypage}>마이 페이지</button>
//                             <button onClick={handleLogout}>로그아웃</button>
//                         </div>
//                         </>:

//                         (<>

//                         <div className='textbox'>
//                             <div className='imgbox'>
//                                 <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
//                             </div>
//                             <input
//                                 className='inputbox'
//                                 placeholder='Id'
//                                 type="text"
//                                 value={id}
//                                 onChange={(e) => setId(e.target.value)}
//                                 required
//                             />
//                         </div>
                        
//                         <div className='textbox'>
//                             <div className='imgbox'>
//                                 <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" alt="" />
//                             </div>
//                             <input
//                                 className='inputbox'
//                                 placeholder='Password'
//                                 type="password"
//                                 value={pw}
//                                 onChange={(e) => setPw(e.target.value)}
//                                 required
//                             />
//                         </div>
//                         <div className='button_login'>
//                             <button type="submit">로그인</button>
//                         </div>
//                         {/* 회원가입 실패 시 출력 */}
//                         {error && <p style={{ color: 'red' }}>{error}</p>}
//                         </>)}
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;