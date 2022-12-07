import { GET_DEPTS, GET_DEPT, POST_DEPT, PUT_DEPT } from "../modules/DeptModule";


/* 전체 부서 조회 API */
export const callDeptListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/dept/list`;

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

        console.log('[DeptAPICalls] callDeptListAPI RESULT : ', result);

        if(result.status === 200) {
            dispatch({ type: GET_DEPTS, payload: result.data });
        }
    };
}

/* 부서 등록 API */
export const callDeptRegistAPI = ({form}) => {
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/dept/dept-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                deptName: form.deptName
            })
        })
        .then(response => response.json());

        console.log('[DeptAPICalls] callDeptListAPI RESULT : ', result);

        if(result.status === 200){
            dispatch({ type: POST_DEPT, payload: result });
        }
    };
}

/* 부서 상세 API */
export const callDeptDetailAPI = ({deptNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/dept/list/${deptNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[DeptAPICalls] callDeptDetailAPI RESULT : ', result);

            dispatch({ type: GET_DEPT, payload: result});
        }
    }
}

/* 부서 수정 API */
export const callDeptUpdateAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/dept/dept-management`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                deptNo : form.deptNo,
                deptName : form.deptName
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[DeptAPICalls] callDeptUpdateAPI RESULT : ', result);

            dispatch({ type: PUT_DEPT, payload: result});
        }
    }
}

/* 부서 삭제 API */
export const callDeptdeleteAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/dept/delete`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : JSON.stringify({
                deptNo : form.deptNo,
                deptStatus : form.deptStatus
            })
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[DeptAPICalls] callDeptdeleteAPI RESULT : ', result);

            dispatch({ type: PUT_DEPT, payload: result});
        }
    }
}

