import { useState } from "react";

const PlayerForm =  ({currentGameId})=>{
    const [playerForm, setPlayerForm] = useState({name:'',token:"",money:'',position:'',gameId:currentGameId})
    const playerSubmitForm = (event)=>{
        event.preventDefault()
        console.log(playerForm.name)
        console.log(playerForm.token)
        console.log(playerForm.money)
        console.log(playerForm.position)
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
                name="token"
                value={playerForm.token}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Money:</label>
                <input 
                type="text"
                name="money"
                value={playerForm.money}
                onChange={handleInputChange}
                ></input>
                <br></br>
                <label>Position:</label>
                {/* might need to change this to a dropdown menu */}
                <input 
                type="text"
                name="position"
                value={playerForm.position}
                onChange={handleInputChange}
                ></input>
                <button type="submit" >Submit</button>
            </form>
        </section>
        
    )
}

export default PlayerForm;