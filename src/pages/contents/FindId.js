import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callFindIdAPI } from "../../apis/MemberAPICalls";
import FindIdCSS from './FindId.module.css';
import FindIdResultModal from "../../components/common/FindIdResultModal";

function FindId() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [findIdResultModal, setFindIdResultModal] = useState(false);

    const [form, setForm] = useState({
        memberName: '',
        memberEmail: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickFindIdResultHandler = () => {
        dispatch(callFindIdAPI({form}));
        console.log("form", form);
        setFindIdResultModal(true);
    }

    const onClickBackHandler = () => {
        navigate("/", {replace : true});
    }

    return (
        <div className={ FindIdCSS.backgroundDiv}>
            <div className={ FindIdCSS.formDiv}>
                <div className={ FindIdCSS.textDiv }>
                    <p>이름</p>
                    <input 
                        type="text"
                        name='memberName'
                        placeholder="이름을 입력하세요."
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <p>이메일</p>
                    <input 
                        type="text"
                        name='memberEmail'
                        placeholder="이메일을 입력하세요."
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                </div>
                <div className={ FindIdCSS.buttonDiv }>
                    <div>
                        <button 
                            className={ FindIdCSS.findBtn} 
                            onClick={ onClickFindIdResultHandler }>아이디 찾기</button>
                            { findIdResultModal && <FindIdResultModal setFindIdResultModal = { setFindIdResultModal}/>}
                    </div>
                    <button className={ FindIdCSS.cancelBtn } onClick={ onClickBackHandler }>취소</button>
                </div>
            </div>
        </div>
    );


}

export default FindId;