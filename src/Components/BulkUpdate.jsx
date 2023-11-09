/* eslint-disable react/prop-types */
import axios from 'axios'
import {BiSave} from 'react-icons/bi'
import {MdCancelPresentation} from 'react-icons/md'

// eslint-disable-next-line react/prop-types
const BulkUpdate = ({ bulkUpdateEmployee, setBulkUpdateEmployee, checked, getEmployee, setShowBulkUpdateForm }) => {

    const handleInputChange = (e) => {
        const { id, name, value} = e.target;

        setBulkUpdateEmployee({
            ...bulkUpdateEmployee,
            [id] : {
            ...bulkUpdateEmployee[id],
            [name] : value,
            },
        });
    };

    function handleCancelAllForm (e) {
        e.preventDefault()
        setShowBulkUpdateForm(false)
    }

    async function handleUpdateAllForm(e) {
        e.preventDefault();
        for ( let index in bulkUpdateEmployee) {
            await axios.put(`https://651cc91935bd4107e3731d66.mockapi.io/svt/${bulkUpdateEmployee[index].id}`, 
            {
                name: bulkUpdateEmployee[index].name,
                dob: bulkUpdateEmployee[index].dob,
                job: bulkUpdateEmployee[index].job
            })
            .then(() => {
                getEmployee();
                setShowBulkUpdateForm(false);
            })
            .catch(err => console.log(err))
        }
    }

    return (
    <>
    <div className=' container'>
        <div className=" grid grid-flow-col justify-around">
            <button type="submit"
            className=" btn text-green-700 hover:bg-green-900 "
            onClick={(e) =>handleUpdateAllForm(e)}
            >
                <BiSave />
            </button>
            <button type="submit"
            className=" btn text-red-700 hover:bg-red-900 "
            onClick={(e) =>handleCancelAllForm(e)}
            >
                <MdCancelPresentation />
            </button>
        </div>
    </div>

    { Array.from({length: checked.length}, (_, index) => (
        
        <div key={index}
        className=" flex flex-col justify-center items-center">
        <div
        className=" grid grid-flow-col w-52 items-center mt-2 bg-white rounded-lg mx-4 font-mono border border-black ">
        <form 
        className="space-y-6 text-center" 
        action="#" 
        id={index}
        >
            <div>
                <h1 className="text-lg font-semibold text-gray-900 mt-2">
                    Name</h1>
                <input
                type="text"
                className=" text-sm rounded-md"
                name="name"
                id={index}
                value={bulkUpdateEmployee[index].name}
                onChange={handleInputChange}
                />
            </div>

            <div>
                <h1 className="text-lg font-semibold text-gray-900">
                    DoB</h1>
                <input
                type="text"
                className=" text-sm rounded-md"
                name='dob'
                id={index}
                value={bulkUpdateEmployee[index].dob}
                onChange={handleInputChange}
                />
            </div>

            <div>
                <h1 className="text-lg font-semibold text-gray-900">
                    Job</h1>
                <input 
                type="text"
                className="text-sm rounded-md"
                name='job'
                id={index}
                value={bulkUpdateEmployee[index].job}
                onChange={handleInputChange}
                />
            </div>

        </form>
        </div>
        </div>
    )) 
}
    </>
  )
}

export default BulkUpdate