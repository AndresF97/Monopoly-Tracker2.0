import {useState} from "react"
import { CREATE_GAME } from "../../utils/mutations"
import { useMutation } from "@apollo/client"

const GameForm = () =>{
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