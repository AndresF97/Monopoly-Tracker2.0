import {useState} from "react"
import { CREATE_GAME } from "../../utils/mutations"
import { useMutation } from "@apollo/client"

const GameForm = () =>{
    const [name, nameState] = useState('')
    const handleInputChange = (event) =>{
        const {value} = event.target;
        nameState(value)
    }
    const gameFormSubmit = async(event)=>{
        event.preventDefault();
        try{
            console.log(name)
        }catch(err){
            console.error(err)
        }
    }
    return (
        <>
        <h3>Game Form</h3>
        <form onSubmit={gameFormSubmit}>
            <label>Name of Game</label>
            <input 
            placeholder="Name of game here"
            name="name"
            value={name}
            onChange={handleInputChange}
            ></input>
            <button type="submit">Add Game</button>
        </form>
        </>
    )
}

export default GameForm;