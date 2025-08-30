import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import {Sidebar} from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div>
        <div style={{color:'black'}}>Loading...</div>
      </div>
    )
  }

  return (
    <div id="dashboard">
    
        <Sidebar />
 

      
          <Outlet />  
      
    </div>
  )
}

export default Dashboard