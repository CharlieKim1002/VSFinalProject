import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callCustomersAPI } from "../../apis/CardAPICalls";
import CustomerRegistModal from "./CustomerRegistModal";
import CustomerDetailModal from "./CustomerDetailModal";
import { decodeJwt } from "../../utils/tokenUtils";
import { NavLink } from "react-router-dom";
import CustomerListCSS from "./CustomerList.module.css";

function CustomerList () {

    const dispatch = useDispatch();
    const customers = useSelector(state => state.cardReducer);
    const customerList = customers.data
    const [currentPage, setCurrentPage] = useState(1);
    const [customerRegistModal, setCustomerRegistModal] = useState(false);
    const [customerDetailModal, setCustomerDetailModal] = useState(false);

    const [customer, setCustomer] = useState();

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }

    useEffect(
        () => {
            dispatch(callCustomersAPI({currentPage : currentPage}));
        }, [currentPage]
    );

    const onClickCustomerRegistHandler = () => {
        setCustomerRegistModal(true);
    }

    const onClickCustomerDetailHandler = (customer) => {
        setCustomer(customer);
        setCustomerDetailModal(true);
    }

    const pageBtn = customers.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    console.log('customerList', customerList);

    return (
        <>
            <div>
                <section className={CustomerListCSS.submenu}>
                    <br></br>
                    <h3>Card</h3>
                    <div className={CustomerListCSS.submenuDiv}>
                        <h4>명함</h4>
                        <ul className={CustomerListCSS.submenuUl} >
                            <li> <NavLink to="/card/office" style={{ textDecoration: "none", color: "#505050" }}>사내 명함 조회</NavLink></li><br></br>
                            <li> <NavLink to="/card/customers" style={{ textDecoration: "none", color: "#505050" }}>거래처 명함 조회</NavLink></li>
                        </ul>
                        <button
                            onClick={ onClickCustomerRegistHandler }
                        >
                            거래처 명함 등록
                        </button>
                    </div>
                </section>
                {
                    customerRegistModal ?
                    <CustomerRegistModal
                        setCustomerRegistModal={ setCustomerRegistModal }
                    />
                    : null
                }
                {
                    customerDetailModal ?
                    <CustomerDetailModal
                        customer={customer}
                        setCustomerDetailModal={ setCustomerDetailModal }
                    />
                    : null
                }
                <div className={CustomerListCSS.title}>
                    <span>거래처 명함</span>
                </div>
                <div className={CustomerListCSS.container}>
                    <div className={CustomerListCSS.cardContainer}>
                        {
                            Array.isArray(customerList) && customerList.map(
                                (customer) => (
                                    <div key={ customer.customerNo } className={CustomerListCSS.CardDiv} onClick={ () => onClickCustomerDetailHandler(customer) }>
                                        <h3>{ customer.customerEmployee }</h3><hr></hr>
                                        <h4>회사명　　　{ customer.customerName }</h4>
                                        <h4>직책　　　　{ customer.customerPosition }</h4>
                                        <h4>전화번호　　{ customer.customerPhone }</h4>
                                        <h4>이메일　　　{ customer.customerEmail }</h4>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className={CustomerListCSS.pageDiv}>
                        {
                            Array.isArray(customerList) &&
                            <button
                                onClick={ () => setCurrentPage(currentPage - 1) }
                                disabled={ currentPage === 1 }
                                className={CustomerListCSS.pagingBtn}
                            >
                                &lt;
                            </button>
                        }
                        {
                            pageNumber.map((num) => (
                                    <button
                                        onClick={ () => setCurrentPage(num) }
                                        className={CustomerListCSS.num}
                                    >
                                        {num}
                                    </button>
                            ))
                        }
                        {
                            Array.isArray(customerList) &&
                            <button
                                onClick={ () => setCurrentPage(currentPage + 1) }
                                disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                                className={CustomerListCSS.pagingBtn}
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

export default CustomerList;