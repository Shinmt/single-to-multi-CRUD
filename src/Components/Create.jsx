import { useState } from "react"
import axios from "axios"

// eslint-disable-next-line react/prop-types
const Create = ({getEmployee, hideCreateForm}) => {

    const [newEmployees, setNewEmployees] = useState([])
    const [countForm, setCountForm] = useState(1)

    const CreateNew = async (e) => {
        e.preventDefault();
        await axios.post(`https://651cc91935bd4107e3731d66.mockapi.io/svt/`, {
            name: newEmployees[e.target.id].name,
            dob: newEmployees[e.target.id].dob,
            job: newEmployees[e.target.id].job
        })
        .then(() => {
            getEmployee();
        })
        .catch(err => console.log(err))
        
        hideCreateForm(e);
    }

    function handleAddMore(e) {
        e.preventDefault();
        setCountForm(countForm + 1);
    }

    function handleRemoveForm(e) {
        e.preventDefault();
        const formIndex = parseInt(e.target.getAttribute('data-index'), 10);
        const updatedEmployees = {...newEmployees};
        delete updatedEmployees[formIndex];
        setCountForm(countForm - 1);
        setNewEmployees(updatedEmployees);
    }

    function handleInputChange(e) {
        e.preventDefault();
        const {id, name, value} = e.target;
        setNewEmployees({
            ...newEmployees, 
            [id]: {
                ...newEmployees[id],
                [name] : value
            },
        });
    }
      
    async function handleSubmitAll(e) {
        e.preventDefault();
        for(let index in newEmployees) {
            await axios.post(`https://651cc91935bd4107e3731d66.mockapi.io/svt/`, newEmployees[index])
            .then(() => getEmployee())
            .catch(err => console.log(err))
        }
        hideCreateForm(e);
    }

  return (
    <>
    <button onClick={(e) => handleSubmitAll(e)}
    className="mt-2 mb-2 px-3 py-1 font-mono bg-green-500 hover:bg-gray-200 rounded-lg text-white"
    >Submit All</button>

    { Array.from({length : countForm}, (_, index) => (
        
    <div key={index}
    className=" grid grid-flow-col w-52 mt-2 bg-white shadow-lg shadow-black rounded-lg mx-4 font-mono border border-green-500 ">
    <form 
    className="space-y-6" 
    action="#" 
    id={index}
    >
        <button 
        className=" flex justify-start px-2 bg-red-500 hover:bg-gray-200 rounded-full text-white"
        data-index={index}
        onClick={handleRemoveForm}> X </button>
        <div>
            <h1 className="text-lg font-semibold text-gray-900 -mt-1">
                Name</h1>
            <input
            type="text"
            placeholder="Type your name"
            className=" text-sm"
            name="name"
            id={index}
            onChange={(e) => handleInputChange(e)} />
        </div>

        <div>
            <h1 className="text-lg font-semibold text-gray-900 -mt-1">
                DoB</h1>
            <input
            type="text"
            className=" text-sm"
            placeholder="Type your birthday"
            name="dob"
            id={index}
            onChange={(e) => handleInputChange(e)} />
        </div>

        <div>
            <h1 className="text-lg font-semibold text-gray-900 -mt-1">
                Job</h1>
            <input 
            type="text"
            className=" text-sm"
            placeholder="What is your job?"
            name="job"
            id={index}
            onChange={(e) => handleInputChange(e)} />
        </div>
        <div className=" grid grid-flow-col justify-around">
            <button type="submit" 
            onClick={CreateNew} 
            id={index}
            className="mt-2 mb-2 px-3 py-1 bg-green-500 hover:bg-gray-200 rounded-lg text-white">
                Create</button>
            <button type="submit"
            className="mt-2 mb-2 px-3 py-1 bg-green-500 hover:bg-gray-200 rounded-lg text-white"
            onClick={handleAddMore}>
                Add more</button>
        </div>
    </form>
    </div>
    ))
    
    
    }</>
  )
}

export default Create