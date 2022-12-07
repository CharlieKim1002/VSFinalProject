import {useState} from "react";
import { useDispatch } from "react-redux";
import { callLoginAPI } from "../../apis/MemberAPICalls";
import LoginModalCSS from './LoginModal.module.css';

function LoginModal({setLoginModal}) {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickLoginHandler = () => {
        console.log('[LoginModal] Login Process Start');
        window.localStorage.removeItem('accessToken');

        dispatch(callLoginAPI({
            form: form
        }));

        setLoginModal(false);
        console.log('[LoginModal] Login Process End');
        alert('로그인이 완료되었습니다.');
        window.location.reload();
    }

    return (
        <div className={ LoginModalCSS.modal}>
            <div className={ LoginModalCSS.modalContainer }>
                <div className={ LoginModalCSS.loginModalDiv }>
                    <h2>LOGIN</h2>
                    <p>ID</p>
                    <input
                        type="text"
                        name='memberId'
                        placeholder="Id"
                        autoComplete='off'
                        onChange={ onChangeHandler }
                    />
                    <p>PW</p>
                    <input
                        type="password"
                        name='memberPassword'
                        placeholder="password"
                        autoComplete="off"
                        onChange={ onChangeHandler }
                    />
                    <button
                        onClick={ onClickLoginHandler }
                    >
                        LOGIN
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;
    