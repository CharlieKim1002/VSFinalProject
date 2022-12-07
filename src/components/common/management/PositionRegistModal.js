import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callPositionRegistAPI } from "../../../apis/PositionAPICalls";
import PositionRegistModalCSS from './PositionRegistModal.module.css';

function PositionRegistModal({setRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        positionName : '',
        positionRest : ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickRegisterHandler = () => {
        console.log('[PositionRegistModal] Regist Process Start');
        dispatch(callPositionRegistAPI({
            form : form
        }));

        setRegistModal(false);
        alert("직책 등록이 완료되었습니다.");

        navigate("/position", { replace : true });
        window.location.reload();

        console.log('[PositionRegistModal] Regist Process End');
    }

    const onClickBackHandler = () => {
        setRegistModal(false);
    }

    return (
        <div className={ PositionRegistModalCSS.backgroundDiv }>
            <div className={ PositionRegistModalCSS.inputDiv }>
            <h3>직책 등록</h3>
                <div className={ PositionRegistModalCSS.inputNameDiv }>
                    <p>직책명</p>
                    <input
                        type="text"
                        name='positionName'
                        placeholder="직책명을 입력하세요"
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                </div>
                <div className={ PositionRegistModalCSS.inputRestDiv }>
                    <p>지급연차일수</p>
                    <input
                        type="number"
                        name='positionRest'
                        placeholder="연차일수를 입력하세요"
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                </div>
                <button
                    onClick={ onClickRegisterHandler }
                    className={ PositionRegistModalCSS.RegistPositionBtn }
                >
                    등록
                </button>
                <button
                    onClick={ onClickBackHandler }
                    className={ PositionRegistModalCSS.cancelBtn }
                >
                    취소
                </button>
            </div>
        </div>
    );
}

export default PositionRegistModal;