import React from 'react'
import { AiOutlineRight } from "react-icons/ai";
import './sidebar.css'

export function Sidebar() {
  return (
    <div className='sidebar'>
    <button>
      Orders
     <AiOutlineRight/>
    </button>
  </div>
  )
}

