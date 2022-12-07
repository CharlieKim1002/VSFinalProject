import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { callPositionListAPI } from "../../../apis/PositionAPICalls";
import RegistModal from "../../../components/common/management/PositionRegistModal";
import PositionCSS from './Position.module.css';
import { decodeJwt } from '../../../utils/tokenUtils';

function Position() {

    const dispatch = useDispatch();
    const params = useParams();
    const positions = useSelector(state => state.positionReducer);
    const [registModal, setRegistModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);

    const openModal = () => {
        setRegistModal(true);
    }

    const onClickDetailHandler = () => {
        setDetailModal(true);
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    useEffect(
        () => {
            console.log('useEffect 동작 확인')
            dispatch(callPositionListAPI({
                positionNo: params.positionNo
            }));
        },
        []
    )

    console.log(positions);

    return (
        <>
            <section className={PositionCSS.submenu}>
                    <br/>
                    <h3>MANAGEMENT</h3>
                    <div className={PositionCSS.submenuDiv}>
                        <h4>직책</h4>
                        <ul className={PositionCSS.submenuUl} >
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/position" style={{ textDecoration: "none", color: "#505050" }}>직책 관리</NavLink></li> }
                        </ul>
                    </div>
                    <br/>
                </section>

            <div>
                <button 
                className={ PositionCSS.registBtn }
                onClick={ openModal }>직책 등록</button>
                { registModal && <RegistModal setRegistModal= {setRegistModal}/> }
            </div>
            <div className={PositionCSS.positionTableDiv}>
                <table>
                    <colgroup>
                        <col width="10%" />
                        <col width="2%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>명칭</th>
                            <th>직책코드</th>
                            <th>생성일</th>
                            <th>지급연차일수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(positions) && positions.map(
                                (position) => (
                                    <tr
                                        key={position.positionNo}
                                        onClick={() => onClickDetailHandler(position.positonNo)}
                                    >
                                        <td>{position.positionName}</td>
                                        <td>{position.positionNo}</td>
                                        <td>{position.positionDate}</td>
                                        <td>{position.positionRest}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>

            
        </>
    );
}

export default Position;