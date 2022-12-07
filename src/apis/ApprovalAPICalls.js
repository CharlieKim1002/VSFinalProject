import { GET_APPROVALS } from "../modules/ApprovalModule.js";
import { POST_APPROVAL } from "../modules/ApprovalModule.js";


export const callApprovalListAPI = ({docNo, currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/aproval/list?page=${currentPage}`; 

    return async (dispatch, getState) => {

        console.log('callApprovalListAPI 동작 확인');

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[AprovalAPICalls] callApprovalListAPI result : ', result);
            dispatch({ type: GET_APPROVALS, payload: result.data });
        }
    }
}



/* 결재등록 */
export const callDocumentInsertAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/aproval/aprovals`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json())
        
        if(result.status === 200) {
            console.log('[DocumentAPICalls] callDocumentRegistAPI result : ', result);
            dispatch({ type: POST_APPROVAL, payload : result.data });
        }
    }

}