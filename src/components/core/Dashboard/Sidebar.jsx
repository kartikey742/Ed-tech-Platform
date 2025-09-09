import React from 'react'
import { useSelector } from 'react-redux'
import {sidebarLinks} from '../../../data/dashboard-links'
import { SidebarLink } from './SidebarLink'
import { VscSignOut } from 'react-icons/vsc'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import ConfirmationModal from '../common/ConfirmationModal'
import { logout } from '../../../services/operations/authAPI'
export const Sidebar = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
const{loading:authLoading}=useSelector((state)=>state.auth)
const{user,loading:profileLoading}=useSelector((state)=>state.profile)
const [confirmationModal,setConfirmationModal]=useState(null)
    if(authLoading || profileLoading){
        return (
            <div className='spinner'></div>
        )
    }
    else{
        return(
            <div id='main-sidebar'>{
            sidebarLinks.map((link)=>{
                return(
                    <SidebarLink link={link} iconName={link.icon}></SidebarLink>
                )
            })}
            
            <div id='liner'></div>
            
                <SidebarLink link={{name:'Settings',path:'/dashboard/settings'}} iconName={'VscSettingsGear'}/>
            
            <br></br>
            <div>
            <button id='logoutbtn' onClick={()=>setConfirmationModal({
                text1:'Are you sure ?',
                text2:'You will be logged out',
                btn1Text:'Logout',
                btn2Text:'Cancel',
                btn1Handler:()=>dispatch(logout(navigate)),
                btn2Handler:()=>setConfirmationModal(null)
            })}>
            <div id='btnlogout'>
            <VscSignOut size={20}></VscSignOut>
            <div>Logout</div>
            </div>
            
            </button>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} ></ConfirmationModal>}
            </div>
        )
    }
}
