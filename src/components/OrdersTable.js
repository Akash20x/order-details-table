import React, { useEffect, useState } from 'react'
import data from '../data.json'
import './ordersTable.css'
import dropDownFillIcon from '../assets/dropdownfill-icon.svg'
import linkIcon from '../assets/link-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { setOrderStatus, setOrderType } from '../feature/filterSlice'

function  OrdersTable() {
  const dispatch = useDispatch();
  const {orderType, orderStatus, payment, search: query } = useSelector((state) => state.filter);

  let orders = data.filter(
    (curr) =>
      (payment.length > 0 ? payment.includes(curr.Payment) : true) &&
      (orderType.length > 0 ? orderType.includes(curr.Order_type) :true) &&
      (orderStatus.length >0 ? orderStatus.includes(curr.Order_status) : true) &&
       curr.Customer_name.toLowerCase().includes(query.toLowerCase().trim())
  );


  const [dropDown1,setDropdown1] = useState(false)
  const [dropDown2,setDropdown2] = useState(false)

  const order = {
    type:['Delivery','Dine In','Take Away'],
    status:['New Order','Order Updated'],
  }

  const clickOutside = (e) => {
    if(e.target.closest('.order-type')!==null
    || e.target.closest('.order-status')!==null
    || e.target.closest('.filter')!==null){
      return 
    }

    setDropdown1(false);
    setDropdown2(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);


  return (
    <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Table no</th>
        <th>Customer name</th>
        <th className='order-type' onClick={()=>setDropdown1(!dropDown1)}>Order type
       <img src={dropDownFillIcon} className='drop-fill' alt='drop down icon'/>
      <div className={dropDown1 ? 'dropdown-box1' : 'none'}>
      {order.type.map((item)=>{
        return(
          <label class="container">
          <input type="checkbox" value={item} checked={orderType.includes(item)}
          onClick={(e) => { dispatch(setOrderType(e.target.value))}} />
          <span className={
                item === "Delivery"
                  ? "red"
                  :  item === "Dine In"
                  ? "blue"
                  : "yellow"
                  }>{item}</span>
          <span class="checkmark"></span>
          </label>
        )
      })}
      </div>
        </th>
        <th className='order-status' onClick={()=>setDropdown2(!dropDown2)}>Order status
        <img src={dropDownFillIcon} className='drop-fill' alt='drop down icon'/>
        <div className={dropDown2 ? 'dropdown-box2' : 'none'}>
          {order.status.map((item)=>{
            return(
              <label class="container">
              <input type="checkbox" value={item} checked={orderStatus.includes(item)}
                onClick={(e) => dispatch(setOrderStatus(e.target.value))} />
              <span class="box-text">
              <span className={
                  item === "Order Updated"
                  ? "purple"
                  : "orange"
                }>{item}</span></span>
              <span class="checkmark"></span>
              </label>
              )
          })}
        </div>
        </th>
        <th>Payment</th>
        <th>Order date</th>
        <th>View order</th>
      </tr>
    </thead>
    <tbody>
      {orders.map((data) => (
        <tr key={data.Table_No}>
          <td>
           {data.Order_id}
          </td>
          <td>
            {data.Table_No}
          </td>
          <td>
            {data.Customer_name}
          </td>
          <td className={
              data.Order_type === "Delivery"
                ? "red"
                :  data.Order_type === "Dine In"
                ? "blue"
                : "yellow"
            }>
          {data.Order_type}
          </td>
          <td>
          <span className={
            data.Order_status === "Order Updated"
            ? "purple"
            : "orange"
          }>{data.Order_status}</span>
          </td>
          <td>
          <span className={
            data.Payment === "Paid"
            ? "green"
            : "dark-red"
          }> {data.Payment}</span>
          </td>
          <td>
          {data.Date_Time.split(" ").slice(0,3).join(" ")}<br/>
          <span>{data.Date_Time.split(" ").slice(-2).join(" ")}</span>
          </td>
          <td>            
            <img class='link-icon' src={linkIcon}  alt='link' />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default OrdersTable
