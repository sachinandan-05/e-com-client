import React, { useEffect } from 'react'
import "../index.css"
import Logo from './Logo.js'
import { CiSearch } from "react-icons/ci";

import { RiAccountCircleLine } from "react-icons/ri";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from "../store/userSlice";
import summeryApi from '../common/index.js';
import ROLE from '../common/role.js';

const Header = () => {

  

  const dispatch=useDispatch()
  const user= useSelector(state=>state?.user.user)
  // console.log("users header:",user);
  const handleLogout=async()=>{
    const fetchLogout= await fetch(summeryApi.logOut.url,
    { method:summeryApi.logOut.method,
    credentials:'include'
    
    }
    )

    const response= await fetchLogout.json()
    console.log("logout fetched successfully",response)

    if (response.success) {
      toast.success(response.message)
      dispatch(setUserDetails(null))
    }
    if(response.error){
      toast.error(response.message)
    }
  }
  
  return (
    <header className='h-16 shadow-md bg-white'>
      <div className='container-max-auto h-full flex items-center w-100vh justify-between '>
          <div>
            <Link to={"/"}>
            <Logo h={50} w={100}/>

            </Link>
            
          </div>

          <div className='hidden  lg:flex w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
            <input type='text' placeholder='search' className=' w-full outline-none pl-2 '/>
            <div className='text-xl min-w-[50px] h-9 bg-red-400 items-center pt-1 rounded-r-full flex justify-center cursor-pointer hover:bg-red-500 '>
            <CiSearch />

            </div>
            

          </div>

          <div className='flex gap-7'>

           {user?._id && ( <div className='relative group flex justify-center '>
              <Link to={"/admin"}>
              <div className='text-4xl cursor-pointer h-10 w-10 rounded-full flex justify-center'>
                { user?.profilePic ? (<img className=' h-10 w-10 rounded-full' src={user?.profilePic} alt=''/>):(<RiAccountCircleLine />) }
              </div>
              
              </Link>
              
             {user?.role===ROLE.ADMIN && ( <div className=' absolute hidden group-hover:block rounded shadow-sm p-1 bottom-0 top-11 h-fit bg-slate-300 text-slate-400 hover:bg-slate-100 hover:text-slate-500'>
                <nav>
                  <Link to="/admin" className=' whitespace-nowrap'> Admin pannel</Link>
                </nav>
              </div>)}


            </div>)}
              

              <div className='text-3xl pt-2 flex relative cursor-pointer'>
                <span>
                  <FaCartShopping />
                </span>

              <div className='text-white rounded-full bg-red-500 h-5 items-center flex justify-center w-5  absolute -top-1 -right-2'>
                <p className=' text-xs'>0</p>
              </div>

              
          
            </div>
            <div className='items-center '>
              {user?._id ? (

            
            <button onClick={handleLogout} className='bg-red-600 text-white px-4 py-1 rounded-full text-center hover:bg-red-700  '>logot</button>
            


              ):(
                <Link to={"/login"}>
                <button className='bg-red-600 text-white px-4 py-1 rounded-full text-center hover:bg-red-800  '>login</button>
                </Link>

              ) 
              }
                
              </div>

          
        </div>

    </div>
    </header>
  )
}

export default Header
