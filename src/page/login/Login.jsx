import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { sendGet, URL } from '../../util/util'
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import { LoginSession, LogoutSession, getLoginSession } from '../../util/session'
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/type/typefunc';

const Login = () => {
    // 페이지 이동 함수
    const navigate = useNavigate();
    const home = () => navigate('/');
    const join = () => navigate('/join');
    const mypage = () => navigate('/mypage');
    const dispatch = useDispatch();
    // 로그인에 필요한 변수들
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');

    // 에러 메세지 저장
    const [error, setError] = useState('');
    // 로그인 상태 정보 저장
    const [isLogin, setIsLogin] = useState(getLoginSession());

    // 로그인 함수
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL + '/TestLogin', {
                user_id : id,
                user_pw : pw
            });
            const responseData = response.data[0];
            console.log(responseData);
            dispatch(setUser(responseData));
            
            if (responseData) {
                LoginSession(responseData.user_nm);
                setIsLogin(true);
                console.log('로그인 유저 : ',getLoginSession().user_nm);
                setError('');
                alert('로그인 성공!');
                navigate('/'); // 로그인 성공 시 홈 화면으로 이동
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
        console.log('Login User : ',getLoginSession().user_nm);
    }, [isLogin]);

    return (
        <div id='login'>
            <div id='wrapper'>
                <div id='head'>
                    <div className='left'>
                        <h1 onClick={home}>Personal Pick</h1>
                    </div>
                    <div className='right'>
                        {getLoginSession().username ?
                        <button onClick={handleLogout}>로그아웃</button> :
                        <button onClick={join}>회원가입</button>}
                    </div>
                </div>
                
                <div id='main'>
                    <form className='join_form' onSubmit={handleLogin}>
                        {getLoginSession().username ?
                        <>
                        <div>
                            <button onClick={mypage}>마이 페이지</button>
                        </div>
                        </> :

                        (<>

                        <div className='textbox'>
                            <label className='inputLabel'>ID</label>
                            <input
                                className='inputbox'
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className='textbox'>
                            <label className='inputLabel'>Password</label>
                            <input
                                className='inputbox'
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                required
                            />
                        </div>

                        <div className='button_login'>
                            <button type="submit">로그인</button>
                        </div>
                        
                        <div className='button_login'>
                            <button onClick={join}>회원가입</button>
                        </div>

                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        </>)}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;