import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from "./Header.module.css";
import { decodeJwt } from "../../utils/tokenUtils";
import LoginModal from './LoginModal';


function Header() {

    const navigate = useNavigate();
    const [loginModal, setLoginModal] = useState(false);

    const onClickMyPageHandler = () => {
        
        const token = decodeJwt(window.localStorage.getItem('accessToken'));
        if(token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return;
        }
        navigate("/main", { replace : true });
    }

    return (
      
        <>
            { loginModal ? <LoginModal setLoginModal={ setLoginModal} /> : null }
            <div className={ HeaderCSS.HeaderDiv }>
                <ul>
                    <li><button 
                        className={ HeaderCSS.HeaderBtn }
                        onClick={ onClickMyPageHandler }
                    >
                        마이페이지
                    </button></li>
                </ul>

            </div>

            {/* <div className={HeaderCSS.SubmenuDiv}>
                <h2>내 정보</h2>
                <ul>
                    <li><NavLink to="/">&#9654; 내 정보</NavLink></li>
                </ul>
            </div> */}
        </>

    );

}

export default Header;