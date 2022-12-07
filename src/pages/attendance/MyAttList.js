import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callMyAttListAPI } from "../../apis/AttendanceAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { NavLink } from "react-router-dom";
import MyAttListCSS from "./MyAttList.module.css";

function MyAttList() {

    const dispatch = useDispatch();
    const attendances = useSelector(state => state.attendanceReducer);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    const now = new Date();
    let y = now.getFullYear();
    let m = 1 + now.getMonth();

    const [selectedYear, setSelectedYear] = useState(y);
    const [selectedMonth, setSelectedMonth] = useState(m);

    const handleSelectYear = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleSelectMonth = (e) => {
        setSelectedMonth(e.target.value);
    };

    useEffect(
        () => {
            dispatch(callMyAttListAPI({year : selectedYear, month : selectedMonth}));
        }, [selectedYear, selectedMonth]
    );

    return (
        <>
            <div>
                <section className={MyAttListCSS.submenu}>
                    <br></br>
                    <h3>Attendance</h3>
                    <div className={MyAttListCSS.submenuDiv}>
                        <h4>근태</h4>
                        <ul className={MyAttListCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#505050" }}>날짜별 근태 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br></br>
                    { decoded === "ROLE_MEMBER" && <h3>Off</h3> }
                    { decoded === "ROLE_APP_AUTH" && <h3>Off</h3> }
                    <div className={MyAttListCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <h4>연차</h4> }
                        { decoded === "ROLE_MEMBER" && <ul className={MyAttListCSS.submenuUl} >
                            <li><NavLink to="/off" style={{ textDecoration: "none", color: "#505050" }}>연차 신청 조회</NavLink></li><br></br>
                            <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#505050" }}>연차 신청</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> }
                        { decoded === "ROLE_APP_AUTH" && <h4>연차 관리</h4> }
                        { decoded === "ROLE_APP_AUTH" && <ul className={MyAttListCSS.submenuUl} >
                            <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#505050" }}>결과별 연차 신청 조회</NavLink></li>
                        </ul>
                        }
                    </div>
                </section>
                <div className={MyAttListCSS.MyAttListDiv}>
                    <span>내 근태 월별 조회</span>
                    <select value={selectedMonth} onChange={handleSelectMonth} className={MyAttListCSS.monthSelect}>
                        <option value="12">12월</option>
                        <option value="11">11월</option>
                        <option value="10">10월</option>
                        <option value="09">9월</option>
                        <option value="08">8월</option>
                        <option value="07">7월</option>
                        <option value="06">6월</option>
                        <option value="05">5월</option>
                        <option value="04">4월</option>
                        <option value="03">3월</option>
                        <option value="02">2월</option>
                        <option value="01">1월</option>
                    </select>
                    <select value={selectedYear} onChange={handleSelectYear} className={MyAttListCSS.yearSelect}>
                        <option value="2022">2022년</option>
                        <option value="2021">2021년</option>
                        <option value="2020">2020년</option>
                        <option value="2019">2019년</option>
                        <option value="2018">2018년</option>
                        <option value="2017">2017년</option>
                        <option value="2016">2016년</option>
                        <option value="2015">2015년</option>
                    </select>
                    <table className={MyAttListCSS.MyAttListTable}>
                        <colgroup>
                            <col width="15%"/>
                            <col width="30%"/>
                            <col width="30%"/>
                            <col width="30%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>날짜</th>
                                <th>출근시간</th>
                                <th>퇴근시간</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(attendances) && attendances.map(
                                    (attendance) => (
                                        <tr
                                            key={ attendance.attNo }
                                        >
                                        <td>{ attendance.attNo }</td> 
                                        <td>{ attendance.attDate }</td> 
                                        <td>{ attendance.attIn }</td> 
                                        <td>{ attendance.attOut }</td> 
                                        </tr>
                                    )
                                )        
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );

}

export default MyAttList;