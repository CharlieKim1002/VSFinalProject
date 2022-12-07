import modal from './ApprovalModal.module.css'
import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { decodeJwt } from "../../utils/tokenUtils";
import {callApprovalListAPI, callDocumentInsertAPI } from '../../apis/ApprovalAPICalls';
import { callMyInfoAPI } from '../../apis/MyAPICalls';



function ApprovalModal (  { props, setModalOpen }) {


    
    const params = useParams();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [form, setForm] = useState({
        docTitle : '',
        docContent : ''
    });


    // const approvals = useSelector(state => state.approvalReducer);
    // useEffect(()=> {
    //     dispatch(callApprovalListAPI({
    //         docNo : params.docNo
    //     }));
    // }, []);



    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const myInfo = useSelector(state => state.myReducer);
    useEffect(() => {
        if(token) {
            dispatch(callMyInfoAPI({
                memberId: token.sub
            }));
        }
    }, []);



    // useEffect(
    //     () => {
    //         dispatch(callApprovalListAPI({
    //             currentPage : currentPage
    //         }));
    //     }
    //     , [currentPage]
    // );


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };



    const onClickApprovalInsertHandler = () => {
        console.log('== ApprovalModal : start ==');

        
        const formData = new FormData();

        formData.append("productName", form.productName);
        formData.append("productPrice", form.productPrice);
        formData.append("productOrderable", form.productOrderable);
        formData.append("productStock", form.productStock);
        formData.append("productDescription", form.productDescription);
        
        formData.append("category.categoryCode", form.categoryCode);
       
        dispatch(callDocumentInsertAPI({	
            form: form
        }));

        setModalOpen(false);

        alert('기안서 등록이 완료되었습니다.');

        console.log('== ApprovalModa : End ==');

    }



    const closeModal = () => {
        setModalOpen(false);
        console.log('== ApprovalModa : Close ==');
    };



    /* 값 */
    const[date, setDate] = useState((new Date()).toLocaleDateString());
    


    return (
        <>
        <div className={modal.container}>
            <from >
                <table className={modal.modalTable}  >
                <thead>
                    <tr>
                        <th colspan="7" >기 안 서</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th >기안부서</th>
                        <td> { myInfo.dept?.deptName || '' } </td>
                        <th className={modal.modalTh}>기안자</th>
                        <td>{ myInfo.memberName || '' } </td>
                    </tr>

                    <tr>
                        <th className={modal.modalTh}>기안일자</th>
                        <td>{date}</td>
                        <th className={modal.modalTh}>참조부서</th>
                        <td><select>
                                <option>인사팀</option>
                                <option>개발팀</option>
                                <option>총무팀</option>
                                <option>마케팅팀</option>
                                <option>관리팀</option>
                                <option>영업팀</option>
                            </select></td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colspan="6">
                            <input 
                            size="130" 
                            type="text" 
                            name="docTitle"
                            autoComplete='off'
                            onChange={ onChangeHandler } />
                        </td>
                    </tr>
                    {/* <tr>
                        <td>코멘트</td>
                        <td colspan="6"><input size="80" type="text" name="comment"/></td>
                    </tr> */}
                </tbody>   
                    
                </table>
                <Editor
                initialValue="<h1>기안서</h1>
                <h5>아래와 같이 기안서를 제출하니 검토 후 결재해 주시기 바랍니다</h5>"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg" //wysiwyg,markdown
                useCommandShortcut={false}
                />
                <span  className={modal.modalBtn}>
                <button  onClick={onClickApprovalInsertHandler}>
                    제출하기
                </button >
                <button className={modal.close} onClick={closeModal}>
                    취소
                </button>
                </span>
            </from>

            


            
          
        </div>

      

        </>
    );


}

export default ApprovalModal;