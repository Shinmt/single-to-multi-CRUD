import { useState } from "react"
import axios from "axios"
import { BiAddToQueue } from 'react-icons/bi'
import { BsPersonAdd, BsDashCircle, BsCloudUpload} from 'react-icons/bs'

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

        {countForm > 1 ?
        (
            setCountForm(countForm - 1),
            setNewEmployees(updatedEmployees)
        ) : 
        hideCreateForm(e);
        }
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
    <div className=" flex flex-col justify-center items-center">
        { countForm > 1 
        ?  <button onClick={(e) => handleSubmitAll(e)}
            className=" btn text-yellow-500 hover:bg-yellow-900"
            ><BsCloudUpload /></button>
        : null }

    <div className=' flex flex-row justify-between items-center'>
    { Array.from({length : countForm}, (_, index) => (
    
    <div key={index} 
    className=" container ">
    <div
    className=" grid grid-flow-col w-52 mt-2 bg-white rounded-lg mx-4 font-mono border border-black">
    <form 
    className="space-y-6" 
    action="#" 
    id={index}
    >
        <button 
        className=" flex justify-start rounded-full text-red-700 hover:bg-red-900 "
        data-index={index}
        onClick={handleRemoveForm}> <BsDashCircle /> </button>
        <div>
            <h1 className="text-lg font-semibold text-gray-900 -mt-1">
                Name</h1>
            <input
            type="text"
            placeholder="Type your name"
            className=" text-sm rounded-md"
            name="name"
            id={index}
            onChange={(e) => handleInputChange(e)} />
        </div>

        <div>
            <h1 className="text-lg font-semibold text-gray-900 -mt-1">
                DoB</h1>
            <input
            type="text"
            className=" text-sm rounded-md"
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
            className="text-sm rounded-md"
            placeholder="What is your job?"
            name="job"
            id={index}
            onChange={(e) => handleInputChange(e)} />
        </div>

        <div className=" grid grid-flow-col justify-around">
            <button type="submit" 
            onClick={CreateNew} 
            id={index}
            className=" btn text-green-700 hover:bg-green-900 ">
                <BsPersonAdd /></button>
            <button type="submit"
            className=" btn text-indigo-700 hover:bg-indigo-900 "
            onClick={handleAddMore}>
                <BiAddToQueue /></button> 
        </div>
    </form>
    </div>
    </div>
    ))
    
    
    }
    </div>
    </div>
  )
}

export default Create