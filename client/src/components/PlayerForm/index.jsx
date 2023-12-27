import { useState } from "react";

const PlayerForm =  ({currentGameId})=>{
    const [playerForm, setPlayerForm] = useState({name:'',token:"",money:'',position:'',gameId:currentGameId})
    const playerSubmitForm = (event)=>{
        event.preventDefault()
        console.log(playerForm.name)
    }
    const handleInputChange= (event)=>{
        const {name, value } = event.target
        setPlayerForm({...playerForm, [name]:value})
    }
    console.log(currentGameId)
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
                <input 
                type="text"
                ></input>
                <br></br>
                <label>Money:</label>
                <input 
                type="text"
                ></input>
                <br></br>
                <label>Position:</label>
                <input 
                type="text"
                ></input>
                <button type="submit" >Submit</button>
            </form>
        </section>
        
    )
}

export default PlayerForm;