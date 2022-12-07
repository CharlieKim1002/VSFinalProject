import { NavLink } from 'react-router-dom';
import MypageHeaderCSS from "./MypageHeader.module.css";


function Header() {

    return (
        <>
            <div className={ MypageHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/mypage">MY PAGE</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default Header;