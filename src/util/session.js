// 로그인 정보 저장
export function LoginSession(username, usernm) {
// function LoginSession(username, token) {
    // token : 보안용
    // print('로그인 성공');
    sessionStorage.setItem('userid', username);
    sessionStorage.setItem('usernm', usernm);
    // sessionStorage.setItem('token', token);
}

// 로그인 정보 삭제
export function LogoutSession() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('usernm');
    // sessionStorage.removeItem('token');
}

// get
export function getLoginSession() {
    return {
        username: sessionStorage.getItem('userid'),
        usernm: sessionStorage.getItem('usernm'),
        // token: sessionStorage.getItem('token')
    };
}