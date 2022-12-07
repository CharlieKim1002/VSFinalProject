import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_MEMBERS = 'member/GET_MEMBERS';
export const GET_MEMBER = 'member/GET_MEMBER';
export const PATCH_MEMBER = 'member/PUT_MEMBER';
export const POST_LOGIN = 'member/POST_LOGIN';
export const POST_REGISTER = 'member/POST_REGISTER';
export const POST_FINDID = 'member/POST_FINDID';

const actions = createActions({
    [GET_MEMBERS]: () => {},
    [GET_MEMBER]: () => {},
    [PATCH_MEMBER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [POST_FINDID]: () => {}
});

const memberReducer = handleActions(
    {
        [GET_MEMBERS] : (state, { payload }) => {
            return payload;
        },
        [GET_MEMBER] : (state, { payload }) => {
            return payload;
        },
        [PATCH_MEMBER] : (state, { payload }) => {
            return payload;
        },
        [POST_LOGIN] : (state, { payload }) => {
            return payload;
        },
        [POST_REGISTER] : (state, { payload }) => {
            return payload;
        } ,
        [POST_FINDID] : (state, { payload }) => {
            return payload;
        }       
    },
    initialState
);

export default memberReducer;