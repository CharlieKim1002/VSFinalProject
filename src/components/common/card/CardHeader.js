import { NavLink } from 'react-router-dom';
import CardHeaderCSS from "./CardHeader.module.css";
import { decodeJwt } from "../../../utils/tokenUtils";

function CardHeader() {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    return (
        <>
            <div className={ CardHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/card">Card</NavLink></li>
                </ul>

            </div>
        </>
    );

}

export default CardHeader;