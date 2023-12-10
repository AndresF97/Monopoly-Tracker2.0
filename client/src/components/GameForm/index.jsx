import {useState} from "react"
const GameForm = () =>{
    const [name, nameState] = useState('')
    const handleInputChange = (event) =>{
        const {value} = event.target;
        console.log(value)
        nameState(value)
    }
    return (
        <>
        <h3>Game Form</h3>
        <form>
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