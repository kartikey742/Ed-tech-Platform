import { logDOM } from '@testing-library/dom'
import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
export const SidebarLink = ({link,iconName}) => {
  const {accountType}=useSelector((state)=>state.profile.user)
    const Icon=Icons[iconName]
    const location=useLocation()
    const dispatch=useDispatch()
  
 
  
    
  if  (link.type===accountType || link.type == null){
  return (
    <NavLink to={link.path} id='navlink'>
      <div id='comp' style={{backgroundColor:link.path==location.pathname?'#3D2A01':'inherit',
        color:link.path==location.pathname?'#FFD60A':'white'
      }}>
        {console.log(link.path,location.pathname)}
        
        
        {Icon && <Icon size={20}/>}
            <p>{link.name}</p>
      </div>
    </NavLink>)
    }
//     if(link.type==='Instructor' ||  link.type == null ){
//     return (
//      <NavLink to={link.path} id='navlink'>
//       <div id='comp' style={{backgroundColor:link.path==location.pathname?'#3D2A01':'inherit',
//         color:link.path==location.pathname?'#FFD60A':'white'
//       }}>
//         {Icon && <Icon/>}
//             <p>{link.name}</p>
//       </div>
//     </NavLink> 
//     )
// }
    
}
