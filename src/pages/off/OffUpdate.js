import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { callOffDetailAPI, callOffUpdateAPI } from "../../apis/OffAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import OffUpdateCSS from "./OffUpdate.module.css";

function OffUpdate() {

    const params = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const offs = useSelector(state => state.offReducer);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    useEffect(
        () => {
            dispatch(callOffDetailAPI({
                offNo : params.offNo
            }));
         }, []
    );

    const [form, setForm] = useState({
        offStart : offs.offStart,
        offEnd : offs.offEnd,
        offTitle : offs.offTitle,
        offReason : offs.offReason
    });

    const handleSelectStartDate = (selectedStartDate) => {
        setStartDate(new Date(selectedStartDate));
        setForm({
            ...form,
            offStart : toStringByFormatting(new Date(selectedStartDate))
        });
    };

    const handleSelectEndDate = (selectedEndDate) => {
        setEndDate(new Date(selectedEndDate));
        setForm({
            ...form,
            offEnd : toStringByFormatting(new Date(selectedEndDate))
        });
    };

    function toStringByFormatting(source, delimiter = "-") {
        const year = source.getFullYear();
        const month = source.getMonth() + 1;
        const day = source.getDate();

        return [year, (month < 10 ? "0"+month : month), (day < 10 ? "0"+day : day)].join(delimiter);
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const onClickOffUpdateHandler = () => {

        dispatch(callOffUpdateAPI({
            offNo : params.offNo,
            form : form
        }));

        alert('연차 수정이 완료되었습니다.');

        navigate(`/off`);

    } 

    return (
        <>
            <div>
                <section className={OffUpdateCSS.submenu}>
                    <br></br>
                    <h3>Attendance</h3>
                    <div className={OffUpdateCSS.submenuDiv}>
                        <h4>근태</h4>
                        <ul className={OffUpdateCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#505050" }}>날짜별 근태 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br></br>
                    { decoded === "ROLE_MEMBER" && <h3>Off</h3> }
                    { decoded === "ROLE_APP_AUTH" && <h3>Off</h3> }
                    <div className={OffUpdateCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" &&<h4>연차</h4> }
                        { decoded === "ROLE_MEMBER" && <ul className={OffUpdateCSS.submenuUl} >
                            <li><NavLink to="/off" style={{ textDecoration: "none", color: "#505050" }}>연차 신청 조회</NavLink></li><br></br>
                            <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#505050" }}>연차 신청</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> }
                        { decoded === "ROLE_APP_AUTH" && <h4>연차 관리</h4> }
                        { decoded === "ROLE_APP_AUTH" && <ul className={OffUpdateCSS.submenuUl} >
                            <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#505050" }}>결과별 연차 신청 조회</NavLink></li>
                        </ul>
                        }
                    </div>
                </section>
                <div className={OffUpdateCSS.offUpdateDiv}>
                    <span>연차 수정</span>
                    { offs.approval &&
                        <div>
                            <table className={OffUpdateCSS.offUpdateTable}>
                                <colgroup>
                                    <col width="30%"/>
                                    <col width="70%"/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>제목</th>
                                        <td>
                                        <input
                                            type="text"
                                            name='offTitle'
                                            autoComplete='off'
                                            onChange={ onChangeHandler }
                                            value={form.offTitle}
                                            className={OffUpdateCSS.titleInput}
                                        />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>연차 기간</th>
                                        <td>
                                            <div className={OffUpdateCSS.datepickerWrapper}>
                                                <DatePicker
                                                    locale={ko}
                                                    dateFormat="yyyy-MM-dd"
                                                    minDate={new Date()}
                                                    selected={startDate}
                                                    onChange={handleSelectStartDate}
                                                    popperPlacement="bottom-end"
                                                    name='offStart'
                                                    value={form.offStart}
                                                    showPopperArrow={false}
                                                    className={OffUpdateCSS.offUpdateDatepicker}
                                                />~　
                                                <DatePicker
                                                    locale={ko}
                                                    dateFormat="yyyy-MM-dd"
                                                    minDate={new Date(startDate)}
                                                    selected={endDate}
                                                    onChange={handleSelectEndDate}
                                                    popperPlacement="bottom-start"
                                                    name='offEnd'
                                                    value={form.offEnd}
                                                    showPopperArrow={false}
                                                    className={OffUpdateCSS.offUpdateDatepicker}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>연차 사유</th>
                                        <td>
                                        <textarea
                                            name='offReason'
                                            autoComplete='off'
                                            onChange={ onChangeHandler }
                                            value={form.offReason}
                                        >
                                        </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>결재권자</th>
                                        <td>{ offs.approval.memberName }</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h5>상기 이유로 연차를 신청합니다.</h5>
                            <button
                                onClick={ onClickOffUpdateHandler }
                                className={OffUpdateCSS.registBtn}
                            >
                                수정
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className={OffUpdateCSS.backBtn}
                            >
                                뒤로
                            </button>
                        </div>
                    }
                </div>
            </div>
        </>
    );

}

export default OffUpdate;