import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import { callAttListForAdminAPI } from "../../apis/AttendanceAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import AttListForAdminCSS from "./AttListForAdmin.module.css";

function AttListForAdmin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const attendances = useSelector(state => state.attendanceReducer);
    const attendanceList = attendances.data;
    const [currentPage, setCurrentPage] = useState(1);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    const now = new Date();
    const [date, setDate] = useState(now);

    function toStringByFormatting(source, delimiter = "-") {
        const year = source.getFullYear();
        const month = source.getMonth() + 1;
        const day = source.getDate();

        return [year, (month < 10 ? "0"+month : month), (day < 10 ? "0"+day : day)].join(delimiter);
    }

    const handleSelectDate = (selectedDate) => {
        setDate(new Date(selectedDate));
        console.log('selectedDate : ', toStringByFormatting(new Date(selectedDate)));
        dispatch(callAttListForAdminAPI({search : toStringByFormatting(new Date(selectedDate)), currentPage : currentPage}));
    };

    useEffect(
        () => {
            dispatch(callAttListForAdminAPI({search : toStringByFormatting(date), currentPage : currentPage}));
        }, [date, currentPage]
    );

    const pageBtn = attendances.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return (
        <>
            <div>
                <section className={AttListForAdminCSS.submenu}>
                    <br></br>
                    <h3>Attendance</h3>
                    <div className={AttListForAdminCSS.submenuDiv}>
                        <h4>근태</h4>
                        <ul className={AttListForAdminCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#505050" }}>날짜별 근태 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br></br>
                    { decoded === "ROLE_MEMBER" && <h3>Off</h3> }
                    { decoded === "ROLE_APP_AUTH" && <h3>Off</h3> }
                    <div className={AttListForAdminCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <h4>연차</h4> }
                        { decoded === "ROLE_MEMBER" && <ul className={AttListForAdminCSS.submenuUl} >
                            <li><NavLink to="/off" style={{ textDecoration: "none", color: "#505050" }}>연차 신청 조회</NavLink></li><br></br>
                            <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#505050" }}>연차 신청</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> }
                        { decoded === "ROLE_APP_AUTH" && <h4>연차 관리</h4> }
                        { decoded === "ROLE_APP_AUTH" && <ul className={AttListForAdminCSS.submenuUl} >
                            <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#505050" }}>결과별 연차 신청 조회</NavLink></li>
                        </ul>
                        }
                    </div>
                </section>
            </div>
            <div className={AttListForAdminCSS.AttListForAdminDiv}>
                <span>날짜별 근태 조회</span>
                <DatePicker
                    locale={ko}
                    dateFormat="yyyy-MM-dd"
                    maxDate={new Date()}
                    selected={date}
                    onChange={handleSelectDate}
                    popperPlacement="bottom-end"
                    showPopperArrow={false}
                    className={AttListForAdminCSS.AttDatepicker}
                />
                <div>
                    <table className={AttListForAdminCSS.AttListForAdminTable}>
                        <colgroup>
                            <col width="5.5%"/>
                            <col width="13.5%"/>
                            <col width="13.5%"/>
                            <col width="13.5%"/>
                            <col width="13.5%"/>
                            <col width="13.5%"/>
                            <col width="13.5%"/>
                            <col width="13.5%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>근무유형</th>
                                <th>날짜</th>
                                <th>출근시간</th>
                                <th>퇴근시간</th>
                                <th>부서</th>
                                <th>직책</th>
                                <th>이름</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(attendanceList) && attendanceList.map(
                                    (attendance) => (
                                        <tr
                                            key={ attendance.attNo }
                                        >
                                            <td>{ attendance.attNo }</td> 
                                            <td>{ attendance.attType }</td> 
                                            <td>{ attendance.attDate }</td> 
                                            <td>{ attendance.attIn }</td> 
                                            <td>{ attendance.attOut }</td>
                                            <td>{ attendance.member.dept.deptName }</td>
                                            <td>{ attendance.member.position.positionName }</td>
                                            <td>{ attendance.member.memberName }</td>
                                        </tr>
                                    )
                                )      
                            }
                        </tbody>
                    </table>
                </div>
                <div className={AttListForAdminCSS.adminPageDiv}>
                    {
                        Array.isArray(attendanceList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage - 1) }
                            disabled={ currentPage === 1 }
                            className={AttListForAdminCSS.pagingBtn}
                        >
                            &lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                            <button
                                onClick={ () => setCurrentPage(num) }
                                className={AttListForAdminCSS.num}
                            >
                                {num}
                            </button>
                        ))
                    }
                    {
                        Array.isArray(attendanceList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage + 1) }
                            disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                            className={AttListForAdminCSS.pagingBtn}
                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </>
    );

}

export default AttListForAdmin;