import { useState } from "react";
import { useMutation } from "@apollo/client";
import {CREATE_PLAYER} from "../../utils/mutations"

const PlayerForm =  ({currentGameId})=>{
    const [playerForm, setPlayerForm] = useState({name:'',token:"",money:0,position:'',gameId:currentGameId})
    const [createPlayer, {error}] = useMutation(CREATE_PLAYER)
    const playerSubmitForm = async (event)=>{
        event.preventDefault()
        try{
            playerForm.money = parseInt(playerForm.money)
            const {data} = await createPlayer({
                variables:{...playerForm}
            })
            console.log(data)
        }catch(err){
            console.error(err)
        }

    }
    const handleInputChange= (event)=>{
        const {name, value } = event.target
        setPlayerForm({...playerForm, [name]:value})
    }
    return (
        <section>
            <h3>Player Form</h3 >
            <form onSubmit={(event)=>{playerSubmitForm(event)}}>
                <label>Name of Player:</label>
                <br></br>
                <input 
                type="text"
                name="name"
                value={playerForm.name}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Token of Player:</label>
                <br></br>
                <input 
                type="text"
                name="token"
                value={playerForm.token}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Money:</label>
                <br></br>
                <input 
                type="text"
                name="money"
                value={playerForm.money}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Position:</label>
                <br></br>
                {/* might need to change this to a dropdown menu */}
                <input 
                type="text"
                name="position"
                value={playerForm.position}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <button type="submit" >Submit</button>
            </form>
        </section>
        
    )
}

export default PlayerForm;