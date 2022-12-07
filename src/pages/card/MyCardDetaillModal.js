import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callMyCardUpdateAPI } from "../../apis/CardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import MyCardDetailCSS from "./MyCardDetailModal.module.css";

function MyCardDetailModal({card, setMyCardDetailModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    const [modifyMode, setModifyMode] = useState(false);
    const [form, setForm] = useState({});

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            memberName: card.memberName,
            memberPhone: card.memberPhone,
            memberEmail: card.memberEmail
        });
    }

    const onClickMyCardUpdateHandler = () => {
        dispatch(callMyCardUpdateAPI({
            form: form
        }));

        alert('내 명함 수정이 완료되었습니다.');

        navigate(`/card`, { replace: true });
        window.location.reload();
    }

    const onClickCloseHandler = () => {
        setMyCardDetailModal(false);
    }

    return (
        <>
            <div className={MyCardDetailCSS.container}>
                {
                    card &&
                    <div>
                        <span>내 명함 수정</span>
                    <div className={MyCardDetailCSS.table}>
                        <table>
                            <colgroup>
                                <col width="30%"/>
                                <col width="70%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>이름</th>
                                        <td>
                                            <input
                                                name='memberName'
                                                readOnly={modifyMode ? false : true}
                                                onChange={ onChangeHandler }
                                                value={ (!modifyMode ? card.memberName : form.memberName) || ''}
                                            />
                                        </td>
                                </tr>
                                <tr>
                                    <th>부서</th>
                                    <td>
                                        <input
                                            name='dept.deptName'
                                            readOnly={true}
                                            onChange={ onChangeHandler }
                                            value={ card.dept?.deptName }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>직책</th>
                                    <td>
                                        <input
                                            name='position.positionName'
                                            readOnly={true}
                                            onChange={ onChangeHandler }
                                            value={ card.position?.positionName }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>전화번호</th>
                                        <td>
                                            <input
                                                name='memberPhone'
                                                readOnly={modifyMode ? false : true}
                                                onChange={ onChangeHandler }
                                                value={ (!modifyMode ? card.memberPhone : form.memberPhone) || ''}
                                            />
                                        </td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                        <td>
                                            <input
                                                name='memberEmail'
                                                readOnly={modifyMode ? false : true}
                                                onChange={ onChangeHandler }
                                                value={ (!modifyMode ? card.memberEmail : form.memberEmail) || ''}
                                            />
                                        </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                }
                {
                    card &&
                    <div>
                        <button
                            onClick={ onClickCloseHandler }
                            className={MyCardDetailCSS.backBtn}
                        >
                            뒤로
                        </button>

                        { token &&
                            (token.sub === card.memberId)
                            ?
                                <div>
                                {!modifyMode &&
                                    <button
                                        onClick={ onClickModifyModeHandler }
                                        className={MyCardDetailCSS.modifyBtn1}
                                    >
                                        수정
                                    </button>
                                }
                                {modifyMode &&
                                    <button
                                        onClick={ onClickMyCardUpdateHandler }
                                        className={MyCardDetailCSS.modifyBtn2}
                                    >
                                        수정
                                    </button>
                                }
                                </div>
                            : null
                        }

                    </div>
                }
            </div>
        </>
    );

}

export default MyCardDetailModal;