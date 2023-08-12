import React from 'react'
import { AiFillFacebook,AiOutlineInstagram,AiOutlineMail } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import NavLogo from './NavLogo';
function Footer() {
  return (
    <div className='Footer'>
      <div className="left-Fotter-container">
      {/* <h3>Contact Us:</h3> */}

      <p> &copy; 2020 BaTov, Inc. All rights reserved. </p>
      <NavLogo/>
      </div>
      <div className="right-Fotter-container">

      <ul>
        <li><AiOutlineInstagram/></li>
        <li><BsFacebook/></li>
         
         <li  > <a  href="mailto:admin@gmail.com" ><AiOutlineMail/></a>  </li>
        
      </ul>
      </div>
    </div>
  )
}

export default Footer