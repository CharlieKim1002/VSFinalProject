import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callLoginAPI } from '../../apis/MemberAPICalls';
import MainCSS from './Main.module.css';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useSelector(state => state.memberReducer);

    useEffect(() => {
            if(login.status === 200) {
                console.log("[Login] Login SUCCESS {}", login);
                navigate("/main", { replace: true });
            }
        }
        ,[login]
    )


    const[form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const onClickHandler = () => {
        dispatch(callLoginAPI({
            form : form
        }))
    }

    const onClickFindHandler = () => {
        navigate('/findId', { replace : true });
    }

    return (
        <div className={MainCSS.backgroundDiv}>
            <div className={ MainCSS.loginDiv }>
                <img  src= {process.env.PUBLIC_URL + '/assets/img/logo.png'} alt="로고"/>
                <h2>GROUPWARE SYSTEM</h2>

                <h3>ID</h3>
                <input
                    type="text"
                    name="memberId"
                    autoComplete='off'
                    placeholder='아이디를 입력해주세요'
                    onChange={ onChangeHandler }
                />
                <h3>PASSWORD</h3>
                <input
                    type="password"
                    name="memberPassword"
                    autoComplete='off'
                    placeholder='비밀번호를 입력해주세요'
                    onChange={ onChangeHandler }
                />
                <br/>
                <div className={ MainCSS.buttonArea }>
                    <button
                        onClick={ onClickHandler }
                        className={ MainCSS.loginBtn }
                    >
                        로그인
                    </button>
                    <div>
                    <button
                        onClick={ onClickFindHandler }
                        className={ MainCSS.findBtn}
                    >아이디 찾기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;