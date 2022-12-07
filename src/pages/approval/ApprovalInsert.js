import ApprovalMainCSS from "./ApprovalMain.module.css"
import { Navigate, useNavigate } from "react-router-dom";
import ApprovalModal from "../../components/approvals/ApprovalModal";
import { useState } from 'react';

function ApprovalInsert() {

    const navigate = useNavigate();

    const ApprovalInsert = () =>{
        console.log('결재 등록 페이지');
        navigate(`/approval/approval-management`, { replace : false })
    }

      // 모달창 노출 여부 state
      const [modalOpen, setModalOpen] = useState(false);


      // 모달창 노출
      const showModal = () => {
          setModalOpen(true);
      };
  

return(

<>
        <div>
            {/* 서브메뉴 */}
            <section className={ApprovalMainCSS.submenu}>
            <h3>DRAFTER</h3>
            <button 
             onClick={ ApprovalInsert }> 
                New Document
            </button>
            
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

        <div>
            <button onClick={showModal}>모달 띄우기</button>
            {modalOpen && <ApprovalModal setModalOpen={setModalOpen} />}
        </div>

</>

);











}

export default ApprovalInsert;