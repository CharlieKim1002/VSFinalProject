import { GET_MEMBERS, GET_MEMBER, PATCH_MEMBER, POST_LOGIN, POST_REGISTER, POST_FINDID } from "../modules/MemberModules";

/* 로그인 API */
export const callLoginAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/account/login`;

    return async (dispatch, getState) => {
        
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            },
            body : JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword
            })
        })
        .then(response => response.json());
        
        if(result.status === 200) {
            console.log('[MemberAPICalls] callLoginAPI result : ', result);
            window.localStorage.setItem('accessToken', result.data.accessToken);
            dispatch({ type: POST_LOGIN, payload: result });
        }
    }
}

/* 로그아웃 API */
export const callLogoutAPI = () => {

    return async (dispatch, getState) => {
        
        dispatch({ type: POST_LOGIN, payload: ''});
        console.log('[MemberAPICalls] callLogoutAPI result : SUCCESS');
    }
}

/* 아이디 찾기 API */
export const callFindIdAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/account/find`;
    
    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "*/*"
            },
            body : JSON.stringify({
                memberName : form.memberName,
                memberEmail : form.memberEmail
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] callFindIdAPI result : ', result);
            dispatch({ type: POST_FINDID, payload : result });
        }
    }
}

/* 사원 등록 API */
export const callRegisterAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: form
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callsRegisterAPI RESULT : ', result);

        if(result.status === 201) {
            dispatch({ type: POST_REGISTER, payload: result.data });
            window.location.reload();
        }
    }
}

/*  전체 사원 조회 API */
export const callMemberListAPI = ({currentPage}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/member?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callMemberListAPI RESULT : ', result);

        if(result.status === 200){
            dispatch({ type: GET_MEMBERS, payload: result.data });
        }
    };
}

/* 사원 상세 조회 API */
export const callMemberDetailAPI = ({memberNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/member/${memberNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            dispatch({ type: GET_MEMBER, payload: result.data });
        }
    }
}

/* 사원 정보 수정 API */
export const callMemberUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/auth/member/update`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MemberAPICalls] callMemberUpdateAPI RESULT : ', result);
            dispatch({ type: PATCH_MEMBER, payload: result.data });
        }
    }
}

