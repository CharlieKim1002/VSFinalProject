import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callDeptRegistAPI } from "../../../apis/DeptAPICalls";
import DeptRegistModalCSS from './DeptRegistModal.module.css';

function DeptRegistModal({setRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [form, setForm] = useState({
        deptName : ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickRegisterHandler = () => {
        console.log('[DeptRegistModal] Regist Process Start');
        dispatch(callDeptRegistAPI({
            form : form
        }));

        setRegistModal(false);
        alert("부서 등록이 완료되었습니다.");

        navigate("/dept", { replace : true });
        window.location.reload();

        console.log('[DeptRegistModal] Regist Process End');
        
    }

    const onClickBackHandler = () => {
        setRegistModal(false);
        navigate("/dept", { replace : true });
    }


    return (
        <div className={ DeptRegistModalCSS.backgroundDiv }>
            <p>부서 등록</p>
            <div className={ DeptRegistModalCSS.registerDiv }>
                <p>부서명</p>
                <input
                    type="text"
                    name='deptName'
                    placeholder="부서명을 입력하세요"
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
            </div>
            <div className={DeptRegistModalCSS.btnDiv}>
                <button
                    onClick={ onClickRegisterHandler }
                    className={ DeptRegistModalCSS.RegistPositionBtn }
                >
                    등록
                </button>
                <button
                    onClick={ onClickBackHandler }
                    className={ DeptRegistModalCSS.cancelBtn }
                >
                    취소
                </button>
            </div>
        </div>
    );
}

export default DeptRegistModal;