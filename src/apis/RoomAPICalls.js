import { GET_ROOM, GET_ROOMS, POST_ROOM, PUT_ROOM, DELETE_ROOM } from "../modules/roomModule";

/* 회의실 조회(회원) */
export const callRoomListAPI = ({currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms?page=${currentPage}`;

    return async (dispatch, getState) => {

        console.log('callRoomListAPI 동작 확인');

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
            console.log('[RoomAPICalls] callRoomListAPI result : ', result);
            dispatch({ type: GET_ROOMS, payload: result.data });
        }
    }
}

export const callRoomListForAdminAPI = ({currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms?page=${currentPage}`;

    return async (dispatch, getState) => {

        console.log('callRoomListAPI 동작 확인');

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
            console.log('[RoomAPICalls] callRoomListAPI result : ', result);
            dispatch({ type: GET_ROOMS, payload: result.data });
        }
    }
}

/* 회의실 상세(공통) */
export const callRoomDetailAPI = ({roomNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms/${roomNo}`;

    return async (dispatch, getState) => {

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
            console.log('[RoomAPICalls] callRoomDetailAPI result : ', result);
            dispatch({ type: GET_ROOM, payload: result.data });
        }
    }

}

/* 회의실 등록(관리자) */
export const callRoomMInsertAPI = ({form}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/room-managements`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data);
        });
        if(result.status === 200) {
            console.log('[RoomAPICalls] callRoomRegistAPI result : ', result);
            dispatch({ type: POST_ROOM, payload : result.data });
        }
    }

}

/* 회의실 수정(관리자) */
export const callRoomMUpdateAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms-managements`

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method : "PUT",
            headers : {
                "Accept" : "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            },
            body : form
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RoomAPICalls] callRoomUpdateAPI RESULT : ', result);
            dispatch({ type: PUT_ROOM, payload : result.data });
        }
    }
}

// export const callRoomMDeleteAPI = ({roomNo}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms-management/${roomNo}`

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method : "DELETE",
//             headers : {
//                 "Accept" : "*/*",
//                 "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
//             }
//         })
//         .then(response => response.json());

//         if(result.status === 204) {
//             console.log('[RoomAPICalls] callRoomMDeleteAPI RESULT : ', result);
//             dispatch({ type: DELETE_ROOM, payload : result.data });
//         }

//     }
// }