/* eslint-disable react/prop-types */
import axios from "axios"

const Update = ({updateEmployee, setUpdateEmployee, getEmployee, setShowUpdateForm}) => {

  const handleUpdate = (event) => {
    event.preventDefault()

    axios.put(`https://651cc91935bd4107e3731d66.mockapi.io/svt/${updateEmployee.id}`, 
      {
        name: updateEmployee.name,
        dob: updateEmployee.dob,
        job: updateEmployee.job
      })
      .then(() =>{
        getEmployee()
        setShowUpdateForm(false)
      })
      .catch(err => console.log(err))
    }

    const handleCancle = (e) => {
      e.preventDefault()
      setShowUpdateForm(false)
    }

  return (
    <div>
      <div className="flex flex-col items-center pb-10 mt-3">
        <div className=" flex items-center justify-between mx-auto">
          <h1 className="text-lg font-semibold text-gray-900 -mt-1">
            <span className=" font-mono  ms-1">Name : </span>
            <input 
            value={updateEmployee.name} 
            onChange={e => setUpdateEmployee({...updateEmployee, name: e.target.value})}/>
          </h1>
        </div>

        <div className="mt-4 flex items-center mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 -mt-1">
            <span className=" font-mono  ms-1">DoB : </span>
            <input 
            value={updateEmployee.dob} 
            onChange={e => setUpdateEmployee({...updateEmployee, dob: e.target.value})}/>
            </h3>
        </div>

        <div className="mt-4 flex items-center mx-auto">
          <h4 className="text-lg font-semibold text-gray-900 -mt-1">
            <span className=" font-mono ms-1">Job : </span>
            <input 
            value={updateEmployee.job} 
            onChange={e => setUpdateEmployee({...updateEmployee, job: e.target.value})}/>
          </h4>
        </div>
        <div className=" grid grid-flow-col justify-start font-mono">
          <button  className="mt-2 mb-2 px-3 py-1 hover:bg-gray-200 rounded-lg bg-red-500 text-white" 
          onClick={(event) => handleCancle(event)}>
            Cancle</button>
          <button  className="mt-2 mb-2 px-3 py-1 hover:bg-gray-200 rounded-lg bg-green-500 text-white font-mono ml-3" 
          onClick={(event) => handleUpdate(event)}>
            Update</button>
        </div>
      </div>
    </div>
  )
}

export default Update