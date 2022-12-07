import { useDispatch, useSelector } from 'react-redux';
import ApprovalMainCSS from "./ApprovalMain.module.css"
import RoomListCSS from "../../pages/room/RoomList.module.css";
import { useEffect, useState } from 'react';
import { callApprovalListAPI  } from '../../apis/ApprovalAPICalls';
import React from "react";
// import { useNavigate } from "react-router-dom";
import ApprovalModal from "../../components/approvals/ApprovalModal";
import FormModal from '../../components/approvals/FormModal';

function ApprovalMain () {


    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const approvals = useSelector(state => state.approvalReducer);
    const approvalList = approvals.data;
    const [currentPage, setCurrentPage] = useState(1);
    

    useEffect(
        () => {
            dispatch(callApprovalListAPI({
                currentPage : currentPage
            }));
        }
        , [currentPage]
    );

    const pageBtn = approvals.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }


/* 결재 등록 이동 */
//  const ApprovalInsert = () =>{
//     console.log('결재 등록 페이지');
//     navigate(`/approval/approval-management`, { replace : false })
// }


/* 결재등록 모달 */
const [modalOpen, setModalOpen] = useState(false);

const showModal = () => {
    setModalOpen(true);
    };

const [formOpen, setFormOpen] = useState(false);
const showModal_form = () => {
    setFormOpen(true)
}
  


    return (
        <>
            <div>
            {/* 서브메뉴 */}
            <section className={ApprovalMainCSS.submenu}>
            <h3>DRAFTER</h3>

            {/* 결재등록버튼 */}
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

            {/* 자주쓰는결재 , 전체 결재 목록 */}
            <section  className={ApprovalMainCSS.mainCantent}>
                <div className={ApprovalMainCSS.contentForm}>
                    <p>자주쓰는 결재 </p>
                    <span><button onClick={showModal_form} ><img src= {process.env.PUBLIC_URL + '/assets/img/icon_1.png'}/><pre>구매요청서</pre></button>
                    {formOpen && <FormModal setFormOpen={setFormOpen} />}</span>
                    <span><img src= {process.env.PUBLIC_URL + '/assets/img/icon_2.png'}/><pre>업무보고서</pre></span>
                    <span><img src= {process.env.PUBLIC_URL + '/assets/img/icon_3.png'}/><pre>외근신청서</pre></span>
                    <span><img src= {process.env.PUBLIC_URL + '/assets/img/icon_4.png'}/><pre>협조문</pre></span>
                    <span><img src= {process.env.PUBLIC_URL + '/assets/img/icon_5.png'}/><pre>품의서</pre></span>
                    <span><img src= {process.env.PUBLIC_URL + '/assets/img/icon_6.png'}/><pre>휴가신청서</pre></span>
                    <span><img src= {process.env.PUBLIC_URL + '/assets/img/icon_7.png'}/><pre>지출결의서</pre></span>
                    


                </div>

                <div  className={ApprovalMainCSS.contentList}> 
                <p>전체 결재 목록</p>
                <table className={ApprovalMainCSS.approvalTable }>
                <colgroup>
                        <col width="1" />
                        <col width="10%" />
                        <col width="30%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="15%" />
                    </colgroup>
                    <thead>
                        <tr>
                        <th> No </th>
                        <th> 구분 </th>
                        <th align="left"> 제목 </th>
                        <th> 작성자 </th>
                        <th> 작성일자 </th>
                        <th> 결재자 </th>
                        <th> 처리일자 </th>
                        <th> 상태 </th>
                        </tr>
                    </thead>
                        <tbody>  
                        { Array.isArray(approvalList) && approvalList.map(
                                    (a) => (
                                        <tr >
                                            <td> {a.docNo} </td>
                                            <td> {a.form.dfTitle} </td>
                                            <td className={ApprovalMainCSS.approvalTbody}> {a.docTitle} </td>                                
                                            <td> {a.member.memberName} </td>
                                            <td> {a.docDate} </td>
                                            <td> {a.progress[a.progress.length - 1].member.memberName} </td>
                                            <td> {a.progress[a.progress.length - 1].dpSignDate}  </td>
                                            <td> {a.progress[a.progress.length - 1].dpStatus} </td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>

{/*                    
            <div className={ RoomListCSS.roomPgs }>
                {
                    Array.isArray(approvalList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                onClick={ () => setCurrentPage(num) }
                                className= { RoomListCSS.num }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(approvalList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
                </div> */}
                </div>
                
            </section>
          

           

            
     




        </>

        

        
    );

}

export default ApprovalMain;