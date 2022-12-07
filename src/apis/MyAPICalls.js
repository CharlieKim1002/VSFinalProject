import { GET_MYINFO, PATCH_MYINFO } from "../modules/MyModule"; 

/* 내 정보 조회 API */
export const callMyInfoAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/my/member`;

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
            console.log('[MyAPICalls] callMyInfoAPI result : ', result);
            dispatch({ type: GET_MYINFO, payload: result.data });
        }
    }

}

/* 내 정보 수정 API */
export const callMyInfoUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/my/member`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PATCH",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[MyAPICalls] callMyInfoUpdateAPI result : ', result);
            dispatch({ type: PATCH_MYINFO, payload: result.data });
        }
    }
}
