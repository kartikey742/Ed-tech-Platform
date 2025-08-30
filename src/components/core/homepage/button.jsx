import React from 'react'
import { Link } from 'react-router-dom'
export const CTAButton = ({active,children,linkto}) => {
  return (
    <Link to={linkto}>
    <div id='CTAButton' style={{backgroundColor:active?'#FFD60A':"#161D29",color:active?'black':'white'}}>{children}</div>
    </Link>
  )
}
