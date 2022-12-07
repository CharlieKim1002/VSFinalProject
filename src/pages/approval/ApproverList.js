import ApprovalMainCSS from "./ApprovalMain.module.css"
import { Navigate, useNavigate } from "react-router-dom";
import ApprovalModal from "../../components/approvals/ApprovalModal";
import { useEffect, useState } from 'react';

import { decodeJwt } from '../../utils/tokenUtils';

function ApproverList() {

    const navigate = useNavigate();
    const ApprovalInsert = () =>{
        console.log('결재 등록 페이지');
        navigate(`/approval/approval-management`, { replace : false })
    }

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    /* 결재 등록 버튼 */
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
        };

    return(

        <>
                <div>
                    {/* 서브메뉴 */}
                    <section className={ApprovalMainCSS.submenu}>
                    <h3>APPROVER</h3>
                    {/* 결재 등록 버튼 */}
                    <div>
                        <button onClick={showModal}>New Document</button>
                        {modalOpen && <ApprovalModal setModalOpen={setModalOpen} />}
                    </div>
                    
                    <div className={ApprovalMainCSS.submenuDiv}>
                    <h6>▶ 요청 결재 목록</h6>
                    <ul className={ApprovalMainCSS.submenuUl} >
                        <li>ㆍ전체 결재함</li>
                        <li>ㆍ대기 결재함</li>
                        <li>ㆍ완료 결재함</li>
                        <li>ㆍ반려 결재함</li>
                    </ul>
                    </div>
                    </section>
                </div>
        </>
        
        )
    
    
    
    
    
    
    
    
    
    
    
}
    
export default ApproverList;