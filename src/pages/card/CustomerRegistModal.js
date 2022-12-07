import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callCustomerRegistAPI } from "../../apis/CardAPICalls";
import CustomerRegistCSS from "./CustomerRegistModal.module.css";

function CustomerRegistModal({setCustomerRegistModal}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        customerName: '',
        customerEmployee: '',
        customerPhone: '',
        customerEmail: '',
        customerPosition: '',
        customerShare: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickCustomerRegistHandler = () => {

        dispatch(callCustomerRegistAPI({
            form: form
        }));

        setCustomerRegistModal(false);

        alert('거래처 명함 등록이 완료되었습니다.');

        navigate('/card/customers');
        window.location.reload();

    }

    const onClickCloseHandler = () => {
        setCustomerRegistModal(false);
    }

    return (
        <div className={CustomerRegistCSS.container}>
            <div>
                <div>
                    <span>거래처 명함 등록</span>
                    <div className={CustomerRegistCSS.table}>
                        <table>
                            <colgroup>
                                <col width="30%"/>
                                <col width="70%"/>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>회사명</th>
                                    <td>
                                    <input
                                        type="text"
                                        name='customerName'
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>이름</th>
                                    <td>
                                    <input
                                        type="text"
                                        name='customerEmployee'
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>전화번호</th>
                                    <td>
                                    <input
                                        type="text"
                                        name='customerPhone'
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>이메일</th>
                                    <td>
                                    <input
                                        type="text"
                                        name='customerEmail'
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    /> 
                                    </td>
                                </tr>
                                <tr>
                                    <th>직책</th>
                                    <td>
                                    <input
                                        type="text"
                                        name='customerPosition'
                                        autoComplete='off'
                                        onChange={ onChangeHandler }
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <th>부서 공유 여부</th>
                                    <td>
                                    <select onChange={ onChangeHandler } name='customerShare'>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <button
                        onClick={ onClickCustomerRegistHandler }
                        className={CustomerRegistCSS.registBtn}
                    >
                        등록
                    </button>
                    <button
                        onClick={ onClickCloseHandler }
                        className={CustomerRegistCSS.backBtn}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );

}

export default CustomerRegistModal;