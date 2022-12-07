import { GET_POSITION, POST_POSITION } from "../modules/PositionModule";

/* 전체 직책 조회 API */
export const callPositionListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/position/list`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[PositionAPICalls] callPositionListAPI RESULT : ', result);
            dispatch({ type: GET_POSITION, payload: result.data });
        }
    };
}

/* 직책 등록 API */
export const callPositionRegistAPI = ({form}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/position/position-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                positionName: form.positionName,
                positionRest: form.positionRest
            })
        })
        .then(response => response.json());

        console.log('[PositionAPICalls] callPositionRegistAPI RESULT : ', result);

        if(result.status === 200) {
            dispatch({ type: POST_POSITION, payload: result });
        }
    };
}

/* 직위 삭제 API */
