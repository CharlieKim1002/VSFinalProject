import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_APPROVAL = 'room/GET_APPROVAL';
export const GET_APPROVALS = 'room/GET_APPROVALS';
export const POST_APPROVAL = 'room/POST_APPROVAL';

const actions = createActions({
    [GET_APPROVAL]: () => {},
    [GET_APPROVALS]: () => {},
    [POST_APPROVAL]: () => {}
});

/* 리듀서 */
const approvalReducer = handleActions(
    {
        [GET_APPROVAL] : (state, { payload }) =>{
            return payload;
        },
        [GET_APPROVALS] : (state, { payload }) =>{
            return payload;
        },
        [POST_APPROVAL] : (state, { payload }) =>{
            return payload;
        }
    },
    initialState
);

export default approvalReducer;