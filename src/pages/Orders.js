import React from 'react'
import {Sidebar} from '../components/Sidebar'
import OrderDetails from '../components/OrderDetails'


function Orders() {
  return (
    <main className="main">
    <Sidebar/>
    <OrderDetails/>
    </main>
  )
}

export default Orders
