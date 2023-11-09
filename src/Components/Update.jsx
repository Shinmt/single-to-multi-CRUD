/* eslint-disable react/prop-types */
import axios from "axios"
import { MdCancelPresentation } from 'react-icons/md'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'

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
        getEmployee();
        setShowUpdateForm(false);
      })
      .catch(err => console.log(err))
    }

    const handleCancle = (e) => {
      e.preventDefault()
      setShowUpdateForm(false)
    }

  return (
    <div className=" container">
      <div className=" grid grid-flow-col w-52 mt-2 border border-black rounded-lg mx-4 font-mono text-center">
      <form 
        className="space-y-6" 
        action="#" 
      >
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Name</h1>
            <input 
            className="text-center rounded-md "
            value={updateEmployee.name} 
            onChange={e => setUpdateEmployee({...updateEmployee, name: e.target.value})}/>
        </div>

        <div>
          <h1 className="text-lg font-semibold text-gray-900">
              DoB</h1>
              <input 
              className="text-center rounded-md "
              value={updateEmployee.dob} 
              onChange={e => setUpdateEmployee({...updateEmployee, dob: e.target.value})}/>
        </div>

        <div>
        <h1 className="text-lg font-semibold text-gray-900">
            Job</h1>
            <input 
            className="text-center rounded-md "
            value={updateEmployee.job} 
            onChange={e => setUpdateEmployee({...updateEmployee, job: e.target.value})}/>
        </div>
        <div className=" grid grid-flow-col justify-around font-mono">
          <button  className="btn text-red-700 hover:bg-red-300 " 
          onClick={(event) => handleCancle(event)}>
            <MdCancelPresentation /></button>
          <button  className="btn text-blue-700 hover:bg-blue-300 " 
          onClick={(event) => handleUpdate(event)}>
            <IoMdCheckmarkCircleOutline /></button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Update