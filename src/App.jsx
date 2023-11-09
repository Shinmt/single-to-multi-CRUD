import { useEffect, useState } from 'react'
import {BsPersonAdd, BsFillTrashFill, BsFillPersonCheckFill} from 'react-icons/bs'
import axios from 'axios'
import Employee from './Components/Employee'
import Create from './Components/Create'
import Update from './Components/Update'
import BulkUpdate from './Components/BulkUpdate'

function App() {

  const [employees, setEmployees] = useState([{
    name: "",
    dob: "",
    job: ""
  }]) // Read Data
  
  const [showCreate, setShowCreate] = useState(false) // show create form
  
  const [showUpdateForm, setShowUpdateForm] = useState(false) // initializing don't show update form
  const [updateEmployee, setUpdateEmployee] = useState([]) // update the new information

  const [checked, setChecked] = useState([]) // click the checkbox

  const [ showBulkUpdateForm, setShowBulkUpdateForm ] = useState(false) // show bulk update form
  const [ bulkUpdateEmployee, setBulkUpdateEmployee] = useState([]) // update many employees

  //Get Data from API
  useEffect(() => {
    axios.get(`https://651cc91935bd4107e3731d66.mockapi.io/svt/`)
    .then(res => setEmployees(res.data))
    .catch(err => console.log(err))
  }, [])
  
  //Delete Data
  async function handleDelete(id, e) {
    e.preventDefault();
    await axios.delete(`https://651cc91935bd4107e3731d66.mockapi.io/svt/${id}`)
    .then(() => getEmployee())
    .catch(err => console.log(err))
  }
  
  function handleAddButton (e) {
    e.preventDefault();
    setShowCreate(true);
    setShowBulkUpdateForm(false);
  }

  function hideCreateForm (e) {
    e.preventDefault();
    setShowCreate(false);
  }

  //Update form
  function handleUpdateForm (e, employee) {
    e.preventDefault()
      setShowUpdateForm(true); //Form while clicking Update button from 3dots
      setUpdateEmployee(employee); //data from looping
      setShowBulkUpdateForm(false);
  }
  
  //--!refresh!--//
  const getEmployee = async() => {
    await axios.get(`https://651cc91935bd4107e3731d66.mockapi.io/svt/`)
    .then(res => {
      setEmployees(res.data)
      setUpdateEmployee()
    })
    .catch(err => console.log(err))
  }

  //checkbox
  function handleCheckboxChange(id) {
    if (checked.includes(id)) {
      setChecked(checked.filter((employeeId) => employeeId !== id));
    } else {
      setChecked([...checked, id])
    }
  }

  //Delete all using checkbox ids
  async function handleDeletedAll() {
    if (checked.length === 0) {
      return;
    }

    // eslint-disable-next-line no-unused-vars
    const deletePromises = checked.map((id) => 
      axios.delete(`https://651cc91935bd4107e3731d66.mockapi.io/svt/${id}`)

    // Promise.all(deletePromises)
    .then(() => {
      getEmployee();
    })
    .catch(err => console.log(err)));
    setChecked([]);
  }

  //Update all using checkbox ids

  async function handleBulkUpdate(e) {

    if (checked.length === 0) {
      return;
    } else {
      e.preventDefault();
      setShowBulkUpdateForm(true);
      setBulkUpdateEmployee(gatherBulkUpdateEmployee())
    }
  }

  function gatherBulkUpdateEmployee() {
    const dataToBulkUpdate = [];

    for (const id of checked) {
      const employeeData = employees.find((employee) => employee.id === id);
      if(employeeData) {
        dataToBulkUpdate.push({
          id: employeeData.id,
          name: employeeData.name,
          dob: employeeData.dob,
          job: employeeData.job,
        });
      }
    }    
    return dataToBulkUpdate;
  }

  const showCard = !showUpdateForm && !showCreate && !showBulkUpdateForm
  const showButton = !showUpdateForm && !showCreate && !showBulkUpdateForm

  return (
    <div className='w-full h-full'>
      <h1 className=' text-black hover:text-zinc-500 font-bold text-3xl font-mono mb-4 text-center items-center'>Pledis Ent.</h1>
      { showButton &&
        <div className=' flex flex-row justify-center items-center'>
          <button className=" btn text-green-700 hover:bg-green-300 "
            onClick={handleAddButton}><BsPersonAdd /></button>
          <button className=" btn text-red-700 hover:bg-red-300 "
            onClick={handleDeletedAll}><BsFillTrashFill /></button>
          <button className=" btn text-blue-700 hover:bg-blue-300 "
            onClick={handleBulkUpdate}><BsFillPersonCheckFill /></button>
        </div>
      }

        { showCreate &&
        <div>
          <Create 
            getEmployee={getEmployee}
            hideCreateForm={hideCreateForm}
            />
        </div>
        }

      { showCard && 
      <div className="flex mt-4 space-x-3">
        <div className=' grid grid-cols-5 w-full mb-3 mt-3'>
          {employees.map((employee, i) => (
            <Employee key={i} 
            employee={employee}
            handleDelete={handleDelete}
            handleUpdateForm={handleUpdateForm}
            checked={checked.includes(employee.id)}
            handleCheckboxChange={() => handleCheckboxChange(employee.id)}
            />
            ))}
        </div>
      </div>
      }

      { showUpdateForm && <Update 
      updateEmployee={updateEmployee} 
      setUpdateEmployee={setUpdateEmployee}
      getEmployee={getEmployee}
      setShowUpdateForm={setShowUpdateForm}/>
      }

      { showBulkUpdateForm && <BulkUpdate 
      bulkUpdateEmployee={bulkUpdateEmployee}
      setBulkUpdateEmployee={setBulkUpdateEmployee}
      checked={checked}
      getEmployee={getEmployee}
      setShowBulkUpdateForm={setShowBulkUpdateForm}
      />
      }
      
    </div>
  )
}

export default App
