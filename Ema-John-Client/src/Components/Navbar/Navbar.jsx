import React from 'react';
import logo from "../../assets/logo.svg"
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='bg-[#1C2B35] h-[15vh] flex  items-center'>
            <div className='w-[90%] mx-auto flex justify-between items-center'>
                <div className='logo'>
                    <img src={logo} alt="" />
                </div>
                <div className='links text-white flex gap-6'>
                    <NavLink
                        to={"/"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "font-bold text-orange-500" : "hover:text-orange-500"
                        }
                    >
                        Shop
                    </NavLink>

                    <NavLink
                        to={"/order-review"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "font-bold text-orange-500" : "hover:text-orange-500"
                        }
                    >
                        Order Review
                    </NavLink>

                    <NavLink
                        to={"/inventory"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "font-bold text-orange-500" : "hover:text-orange-500"
                        }
                    >
                        Manage Inventory
                    </NavLink>

                    <NavLink
                        to={"/login"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "font-bold text-orange-500" : "hover:text-orange-500"
                        }
                    >
                        Login
                    </NavLink>

                    <NavLink
                        to={"/signup"}
                        className={({ isActive, isPending }) =>
                            isPending ? "pending" : isActive ? "font-bold text-orange-500" : "hover:text-orange-500"
                        }
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;