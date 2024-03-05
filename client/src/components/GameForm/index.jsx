import {useState} from "react"
import { CREATE_GAME } from "../../utils/mutations"
import { useMutation } from "@apollo/client"

const GameForm = () =>{
    // TODO:
    // CREATE ALERT TO SHOW LOG IN
    const [name, nameState] = useState('')
    const [createGame, createGameSet] = useMutation(CREATE_GAME)
    const handleInputChange = (event) =>{
        const {value} = event.target;
        nameState(value)
    }
    const gameFormSubmit = async(event)=>{
        event.preventDefault();
        try{
            console.log(name)
            const {data} = await createGame({
                variables:{
                    name: name
                }
            })
            console.log(data)
            if(data){
                window.location.assign('/History')
            }
        }catch(err){
            // Must create alert for issues
            console.error(err)
        }
    }
    return (
        <>
        <h3 className="text-xl mb-1">Game Form</h3>
        <form onSubmit={gameFormSubmit}>
            <label className="text-l">Name of Game</label>
            <input 
            placeholder="Name of Game Here"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="min-h-[auto] w-full g-slate-50 rounded px-3 py-0.5 border-b-2 focus:outline-none focus:border-rose-600"
            ></input>
            <button 
            type="submit"
            className="px-4 py-2 font-bold bg-[#EC2027] rounded text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-800 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] my-3"
            >Add Game</button>
        </form>
        </>
    )
}

export default GameForm;