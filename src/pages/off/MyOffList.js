import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callOffAPI } from "../../apis/OffAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { NavLink, useNavigate } from "react-router-dom";
import MyOffListCSS from "./MyOffList.module.css";

function MyOffList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const offs = useSelector(state => state.offReducer);
    const offList = offs.data;
    const [currentPage, setCurrentPage] = useState(1);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    const onClickOffHandler = (offNo) => {
        navigate(`/off/${offNo}`);
    }

    useEffect(
        () => {
            dispatch(callOffAPI({currentPage : currentPage}));
        }, [currentPage]
    );

    const pageBtn = offs.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    return (
        <>
            <div>
                <section className={MyOffListCSS.submenu}>
                    <br></br>
                    <h3>Attendance</h3>
                    <div className={MyOffListCSS.submenuDiv}>
                        <h4>근태</h4>
                        <ul className={MyOffListCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#505050" }}>날짜별 근태 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br></br>
                    { decoded === "ROLE_MEMBER" && <h3>Off</h3> }
                    { decoded === "ROLE_APP_AUTH" && <h3>Off</h3> }
                    <div className={MyOffListCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" && <h4>연차</h4> }
                        { decoded === "ROLE_MEMBER" && <ul className={MyOffListCSS.submenuUl} >
                            <li><NavLink to="/off" style={{ textDecoration: "none", color: "#505050" }}>연차 신청 조회</NavLink></li><br></br>
                            <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#505050" }}>연차 신청</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> }
                        { decoded === "ROLE_APP_AUTH" && <h4>연차 관리</h4> }
                        { decoded === "ROLE_APP_AUTH" && <ul className={MyOffListCSS.submenuUl} >
                            <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#505050" }}>결과별 연차 신청 조회</NavLink></li>
                        </ul>
                        }
                    </div>
                </section>
                <div className={MyOffListCSS.MyOffListDiv}>
                    <span>연차 신청 조회</span>
                    <table className={MyOffListCSS.MyOffListTable}>
                        <colgroup>
                            <col width="15%"/>
                            <col width="30%"/>
                            <col width="40%"/>
                            <col width="15%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>연차기간</th>
                                <th>결과</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(offList) && offList.map(
                                    (off) => (
                                        <tr
                                            key={ off.offNo }
                                            onClick={ () => onClickOffHandler(off.offNo) }
                                        >
                                        <td>{ off.offNo }</td>
                                        <td>{ off.offTitle }</td>
                                        <td>{ off.offStart }~{ off.offEnd }</td>
                                        <td>{ off.offResult }</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                    <div className={MyOffListCSS.pageDiv}>
                        {
                            Array.isArray(offList) &&
                            <button
                                onClick={ () => setCurrentPage(currentPage - 1) }
                                disabled={ currentPage === 1 }
                                className={MyOffListCSS.pagingBtn}
                            >
                                &lt;
                            </button>
                        }
                        {
                            pageNumber.map((num) => (
                                <button
                                    onClick={ () => setCurrentPage(num) }
                                    className={MyOffListCSS.num}
                                >
                                    {num}
                                </button>
                            ))
                        }
                        {
                            Array.isArray(offList) &&
                            <button
                                onClick={ () => setCurrentPage(currentPage + 1) }
                                disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                                className={MyOffListCSS.pagingBtn}
                            >
                                &gt;
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );

}

export default MyOffList;