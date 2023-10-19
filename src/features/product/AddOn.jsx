import React from 'react'

export default function AddOn({addOn, onClick, name}) {


    return (
        <label className={`rounded py-2 px-6 outline-none ring ring-gray-300  hover:outline-none hover:ring hover:ring-orange-300 ${addOn ? 'outline-none ring ring-orange-300' : ''}`}>
            <input
                onClick={onClick}
                className="sr-only"
                type="radio"
            />
            <div className="flex flex-col">
                <span className="text-gray-600 text-md">{name}</span>
            </div>
        </label>
    )
}
