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

        alert('????????? ????????? ?????????????????????.');

        console.log('== ApprovalModa : End ==');

    }



    const closeModal = () => {
        setModalOpen(false);
        console.log('== ApprovalModa : Close ==');
    };



    /* ??? */
    const[date, setDate] = useState((new Date()).toLocaleDateString());
    


    return (
        <>
        <div className={modal.container}>
            <from >
                <table className={modal.modalTable}  >
                <thead>
                    <tr>
                        <th colspan="7" >??? ??? ???</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th >????????????</th>
                        <td> { myInfo.dept?.deptName || '' } </td>
                        <th className={modal.modalTh}>?????????</th>
                        <td>{ myInfo.memberName || '' } </td>
                    </tr>

                    <tr>
                        <th className={modal.modalTh}>????????????</th>
                        <td>{date}</td>
                        <th className={modal.modalTh}>????????????</th>
                        <td><select>
                                <option>?????????</option>
                                <option>?????????</option>
                                <option>?????????</option>
                                <option>????????????</option>
                                <option>?????????</option>
                                <option>?????????</option>
                            </select></td>
                    </tr>
                    <tr>
                        <th>??????</th>
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
                        <td>?????????</td>
                        <td colspan="6"><input size="80" type="text" name="comment"/></td>
                    </tr> */}
                </tbody>   
                    
                </table>
                <Editor
                initialValue="<h1>?????????</h1>
                <h5>????????? ?????? ???????????? ???????????? ?????? ??? ????????? ????????? ????????????</h5>"
                previewStyle="vertical"
                height="600px"
                initialEditType="wysiwyg" //wysiwyg,markdown
                useCommandShortcut={false}
                />
                <span  className={modal.modalBtn}>
                <button  onClick={onClickApprovalInsertHandler}>
                    ????????????
                </button >
                <button className={modal.close} onClick={closeModal}>
                    ??????
                </button>
                </span>
            </from>

            


            
          
        </div>

      

        </>
    );


}

export default ApprovalModal;