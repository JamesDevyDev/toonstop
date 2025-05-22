import React from 'react'
import { Menu } from 'lucide-react'

const Drawer = () => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer" className="btn bg-black drawer-button">   <Menu size={20}  color={'#d7af57'}/></label>
            </div>
            <div className="drawer-side z-[50]">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#d7af57] text-base-content min-h-full w-80 p-4 ">
                    <div className='w-full h-[80px]  flex items-center justify-center'>
                        <div className='w-[50%] h-full'>
                            <img src='/assets/logo.png' className='h-[100%] w-[100%] relative' />
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default Drawer