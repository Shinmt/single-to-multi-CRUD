import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Employee from './Components/Employee'
import Create from './Components/Create'
import Update from './Components/Update'

function App() {

  const [employees, setEmployees] = useState([{
    name: "",
    dob: "",
    job: ""
  }]) // Read Data

  const [showUpdateForm, setShowUpdateForm] = useState(false) // initializing don't show update form
  const [updateEmployee, setUpdateEmployee] = useState([]) // update the new information

  const [showCreate, setShowCreate] = useState(false) // show create form

  const [checked, setChecked] = useState([]) // click the checkbox

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
  }

  function hideCreateForm (e) {
    e.preventDefault();
    setShowCreate(false);
  }

  //Update form
  function handleUpdateForm (e, employee) {
    e.preventDefault()
      setShowUpdateForm(true); //Form while clicking Update button from 3dots
      setUpdateEmployee(employee) //data from looping
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

  //Deleted All using checkbox
  function handleCheckboxChange(id) {
    if (checked.includes(id)) {
      setChecked(checked.filter((employeeId) => employeeId !== id));
    } else {
      setChecked([...checked, id])
    }
  }

  async function handleDeletedAll() {
    if (checked.length === 0) {
      return;
    }

    const promises = checked.map((id) => 
      axios.delete(`https://651cc91935bd4107e3731d66.mockapi.io/svt/${id}`)
    );

    Promise.all(promises)
    .then(() => {
      getEmployee();
      setChecked([]);
    })
    .catch(err => console.log(err))
  }

  const showCard = !showUpdateForm && !showCreate
  const showButton = !showUpdateForm && !showCreate

  return (
    <>
      <h1 className=' text-black font-bold text-3xl font-mono mb-4'>Pledis Ent.</h1>
      { showButton &&
       <>
       <button className="mt-2 mb-2 px-3 py-1 bg-green-500 hover:bg-gray-200 rounded-lg text-white font-mono"
        onClick={handleAddButton}>Add Employee</button>
       <button className="mt-2 mb-2 px-3 py-1 bg-red-500 hover:bg-gray-200 rounded-lg text-white font-mono"
        onClick={handleDeletedAll}>
          Delete All</button>
       </>
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

      
    </>
  )
}

export default App
