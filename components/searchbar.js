'use client'
import {Input} from "./ui/input";
import {Button} from "./ui/button";
import {IoSearch} from "react-icons/io5";
import Link from "next/link";
import {LuArrowUpRight, LuSearch} from "react-icons/lu";
import {useRef} from "react";



export function SearchBar() {
    const search_panel = useRef(null)
    const handleSearch = () => {
        search_panel.current.classList.remove('hidden')
    }

    const handleBlur = () => {
        search_panel.current.classList.add('hidden')
    }

    return <>
        <div className="px-2 xl:px-7 flex justify-end w-full mt-2 xl:mt-1">
            <div className=" relative w-full justify-center max-w-sm ">
                <div className='flex items-center space-x-2'>
                    <Input autocomplete="off"  onBlur={handleBlur} onFocus={handleSearch} type="text" placeholder="খুজুন......"/>
                    <Button type="submit">
                        <IoSearch/>
                    </Button>
                </div>

                <div ref={search_panel} id='search-bar'
                     className='absolute hidden lg:left-0 left-[-20px] rounded  w-full bg-white  py-3 min-h-[250px] shadow-2xl top-[40px]'>
                    <ul>
                        <li>
                            {new Array(10).fill(0).map((_, i) => (
                                <Link href='#'
                                      className='flex p-2  hover:bg-gray-50 items-center justify-between space-x-2'>
                                    <div className='flex items-center space-x-2'>
                                        <LuSearch/>
                                        <span>আজহারি নতুন ওয়াজ</span>
                                    </div>
                                    <i className='px-2'>
                                        <LuArrowUpRight/>
                                    </i>
                                </Link>
                            ))}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}