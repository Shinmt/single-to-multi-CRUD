import { useState } from "react"
/* eslint-disable react/prop-types */
const Employee = ({employee, handleDelete, handleUpdateForm, checked, handleCheckboxChange}) => {
    const [showDropDown, setShowDropDown] = useState(false) //react နဲ့ ပြန်ချိတ်ထား//

    return (
    <>
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
        <input
        type="checkbox"
        name="checked"
        checked={checked}
        onChange={handleCheckboxChange}
        />
        <div className="flex justify-end px-4 pt-4">
            <button id="dropdownButton" data-dropdown-toggle="dropdown" 
            onClick={() => setShowDropDown(!showDropDown)}
            className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5" 
            type="button">
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>

            <div id="dropdown" 
            className={ showDropDown ? "absolute top-16 right-0 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44" 
            : "hidden"}>
                <ul className="py-2" aria-labelledby="dropdownButton">
                <li>
                    <a href="#" 
                    className="block px-4 py-2 text-sm font-mono text-blue-600 hover:bg-gray-100"
                    onClick={(e) => handleUpdateForm(e, employee)}>Update</a>
                </li>
                <li>
                    <a href="#" 
                    className="block px-4 py-2 text-sm font-mono text-red-600 hover:bg-gray-100"
                    onClick={(e) => handleDelete(employee.id, e)}>Delete</a>
                </li>
                </ul>
            </div>
        </div>

        <div className="flex flex-col items-center pb-10">
        <div className=" flex items-center justify-between mx-auto">
                <h1 className="text-lg font-semibold text-gray-900 -mt-1"> <span className=" font-mono  ms-1">Name : </span>{employee.name}</h1>
            </div>

            <div className="mt-4 flex items-center mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 -mt-1"> <span className=" font-mono  ms-1">DoB : </span>{employee.dob}</h3>
            </div>

            <div className="mt-4 flex items-center mx-auto">
            <h4 className="text-lg font-semibold text-gray-900 -mt-1"> <span className=" font-mono ms-1">Job : </span>{employee.job}</h4>
            </div>
        </div>
    </div>
    </>
  )
}

export default Employee


