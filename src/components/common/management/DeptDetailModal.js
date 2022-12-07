import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callDeptDetailAPI, callDeptUpdateAPI } from "../../../apis/DeptAPICalls";

function DeptDetailModal({setDeptUpdateModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const dept = useSelector(state => state.deptReducer);
    const deptDetail = dept.data
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});

    useEffect(
        () => {
            console.log('[DeptDetailModal] DeptNo : ', params.deptNo);

            dispatch(callDeptDetailAPI({
                deptNo: params.deptNo
            }));
        }
        ,[]
    );

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyHandler = () => {
        
        dispatch(callDeptUpdateAPI({
            form: form
        }));

        navigate()
    }
    
}