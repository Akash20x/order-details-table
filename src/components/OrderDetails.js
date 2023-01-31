import React, { useEffect, useRef, useState } from 'react'
import "./orderDetails.css"
import OrdersTable from './OrdersTable'
import searchIcon from '../assets/search-icon.svg'
import filterIcon from '../assets/filter-icon.svg'
import calenderIcon from '../assets/calender-icon.svg'
import dropDownIcon from '../assets/dropdown-icon.svg'
import { useDispatch, useSelector } from "react-redux";
import { 
  searchQuery,
  setOrderStatus,
  setOrderType,
  setPayment
} from '../feature/filterSlice'


function OrderDetails() {
  const dispatch = useDispatch();
  const {orderType, orderStatus, payment} = useSelector((state) => state.filter);
  const node = useRef();
  const [dropDown, setDropdown] = useState(false)
  const [query, setQuery] = useState("");

  
  const clickOutside = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setDropdown(false);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
    dispatch(searchQuery(e.target.value));
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);


  return (
    <div className='order-container'>
      <h1>Order details</h1>
      <div className='nav-container'>
          <div className='search'>
            <img src={searchIcon} alt='search'/>
            <input type="search" placeholder='Search' value={query} onChange={handleQuery} />
          </div>
          <div className='filter' ref={node} onClick={()=>setDropdown(!dropDown)}>
            <img src={filterIcon} alt='filter'/>
            Filters
            <div className={dropDown ? 'filter-dropdown' : 'filter-dropdown none'}>
            <div>
              Order status
                <label class="filter-option">
                  <input type="checkbox" value="New Order" checked={orderStatus.includes('New Order')}
                    onClick={(e) => dispatch(setOrderStatus(e.target.value))} />
                    New Order
                  <span class="checkmark"></span>
                </label>
                
                <label class="filter-option">
                  <input type="checkbox" value="Order Updated" checked={orderStatus.includes('Order Updated')}
                    onClick={(e) => dispatch(setOrderStatus(e.target.value))} />
                  Order Updated
                  <span class="checkmark"></span>
                </label>
              </div> 

              <div>
              Payment
                <label class="filter-option">
                  <input type="checkbox" value="Paid" checked={payment.includes('Paid')}
                  onClick={(e) => dispatch(setPayment(e.target.value))} />
                  Paid
                  <span class="checkmark"></span>
                </label>
                
                <label class="filter-option">
                  <input type="checkbox" value="Un-Paid" checked={payment.includes('Un-Paid')}
                  onClick={(e) => dispatch(setPayment(e.target.value))} />
                  Un-Paid
                  <span class="checkmark"></span>
                </label>
              </div> 


              <div>
              Order type
                <label class="filter-option">
                  <input type="checkbox" value="Dine In" checked={orderType.includes('Dine In')} 
                  onClick={(e) => dispatch(setOrderType(e.target.value))} />
                  Dine In
                  <span class="checkmark"></span>
                </label>
                
                <label class="filter-option">
                  <input type="checkbox" value="Delivery" checked={orderType.includes('Delivery')} 
                  onClick={(e) => dispatch(setOrderType(e.target.value))} />
                  Delivery
                  <span class="checkmark"></span>
                </label>

                <label class="filter-option">
                  <input type="checkbox" value="Take Away" checked={orderType.includes('Take Away')} 
                  onClick={(e) => dispatch(setOrderType(e.target.value))} />
                  Take Away
                  <span class="checkmark"></span>
                </label>
              </div> 
            </div>
          </div>
          <div className='date'>
            <img src={calenderIcon} alt='calender'/>
            Today
            <img src={dropDownIcon} alt='dropdown'/>
        </div>
      </div>
      <div className='table-container'>
      <OrdersTable/>
      </div>
    </div>
  )
}

export default OrderDetails
