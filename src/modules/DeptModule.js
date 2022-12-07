import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_DEPTS = 'dept/GET_DEPTS';
export const GET_DEPT = 'dept/GET_DEPT';
export const POST_DEPT = 'dept/POST_DEPT';
export const PUT_DEPT = 'dept/PUT_DEPT';

const actions = createActions({
    [GET_DEPTS]: () => {},
    [GET_DEPT]: () => {},
    [POST_DEPT]: () => {},
    [PUT_DEPT]: () => {},
});

const deptReducer = handleActions(
    {
        [GET_DEPTS] : (state, { payload }) => {
            return payload;
        },
        [GET_DEPT] : (state, { payload }) => {
            return payload;
        },
        [POST_DEPT] : (state, { payload }) => {
            return payload;
        },
        [PUT_DEPT] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default deptReducer;