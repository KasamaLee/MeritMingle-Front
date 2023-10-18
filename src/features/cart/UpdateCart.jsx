import React from 'react'

export default function UpdateCart({children}) {
    return (
        <div className="z-50 fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-gray-100  w-[80vw] h-[80vh] py-10 px-20 flex flex-col gap-10 relative justify-center">
                <div className="absolute top-6 right-8 text-gray-500 cursor-pointer" >X</div>
                {children}
            </div>
        </div>
    )
}
