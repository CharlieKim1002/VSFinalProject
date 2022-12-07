import CalendarHeaderCSS from './CalendarHeader.module.css';
import { decodeJwt } from "../../../utils/tokenUtils";

function CalendarHeader () {

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    return (
        <>
            <div className={ CalendarHeaderCSS.HeaderDiv }>
                <ul>
                    <li>Schedule</li>
                </ul>

            </div>
        </>
    );

}

export default CalendarHeader;