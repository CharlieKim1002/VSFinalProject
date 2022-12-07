import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { callMyCardAPI } from "../../apis/CardAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import MyCardDetailModal from "./MyCardDetaillModal";
import CardCSS from "../card/Card.module.css";

function Card () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const card = useSelector(state => state.cardReducer);
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const [myCardDetailModal, setMyCardDetailModal] = useState(false);

    useEffect(
        () => {
            
            if(token) {
            dispatch(callMyCardAPI({
                memberId: token.sub
            }));
            }

        }, []
    );

    const onClickMyCardHandler = () => {
        setMyCardDetailModal(true);
    }

    const onClickCustomerCardHandler = () => {
        navigate('/card/customers');
    }

    const onClickOfficeCardHandler = () => {
        navigate('/card/office');
    }

    console.log('card', card);

    return (
        <>
            <div>
                <section className={CardCSS.submenu}>
                    <br></br>
                    <h3>Card</h3>
                    <div className={CardCSS.submenuDiv}>
                        <h4>명함</h4>
                        <ul className={CardCSS.submenuUl} >
                            <li> <NavLink to="/card/office" style={{ textDecoration: "none", color: "#505050" }}>사내 명함 조회</NavLink></li><br></br>
                            <li> <NavLink to="/card/customers" style={{ textDecoration: "none", color: "#505050" }}>거래처 명함 조회</NavLink></li>
                        </ul>
                    </div>
                </section>
                {
                    myCardDetailModal ?
                    <MyCardDetailModal
                        card={card}
                        setMyCardDetailModal={ setMyCardDetailModal }
                    />
                    : null
                }
                <div>
                    <span className={CardCSS.text}>내 명함</span>
                    <button
                            className={CardCSS.modify}
                            onClick={ onClickMyCardHandler }
                        >
                        수정
                    </button>
                    <div className={CardCSS.MyCardDiv}>
                        { card &&
                        <div>
                            <h3>{ card.memberName }</h3>
                            <hr></hr>
                            <table className={CardCSS.MyCardTable}>
                                <colgroup>
                                    <col width="30%"/>
                                    <col width="70%"/>
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>부서</th>
                                        <td>{ card?.dept?.deptName }</td>
                                    </tr>
                                    <tr>
                                        <th>직책</th>
                                        <td>{ card?.position?.positionName }</td>
                                    </tr>
                                    <tr>
                                        <th>전화번호</th>
                                        <td>{ card.memberPhone }</td>
                                    </tr>
                                    <tr>
                                        <th>이메일</th>
                                        <td>{ card.memberEmail }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        }
                    </div>
                </div>
                <button
                    className={CardCSS.officeBtn}
                    onClick={ onClickOfficeCardHandler }
                >
                    사내 명함 조회
                </button>
                <button
                    className={CardCSS.customerBtn}
                    onClick={ onClickCustomerCardHandler }
                >
                    거래처 명함 조회
                </button>
            </div>
        </>
    );

}

export default Card;