import { useState } from "react";
import { useMutation } from "@apollo/client";
import {CREATE_PLAYER} from "../../utils/mutations"


const PlayerForm =  ({currentGameId, tokenList})=>{
    const [playerForm, setPlayerForm] = useState({name:'',token:tokenList[0].tokenName,money:0,position:'',gameId:currentGameId})
    const [createPlayer, {error}] = useMutation(CREATE_PLAYER)
    const playerSubmitForm = async (event)=>{
        event.preventDefault()
        try{
            playerForm.money = parseInt(playerForm.money)
            const {data} = await createPlayer({
                variables:{...playerForm}
            })
            console.log(data)
            window.location.reload()
        }catch(err){
            console.error(err)
        }

    }
    const handleInputChange= (event)=>{
        const {name, value } = event.target
        setPlayerForm({...playerForm, [name]:value})
    }
    return (
        <section className="md:mx-2 lg:mx-2 border-2 border-black p-5 h-90 w-80 bg-green-300 p-3 my-[8%] text-center">
            <h3 className="underline underline-offset-4"> Add a Player</h3 >
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

                <select 
                onChange={handleInputChange}
                name="token"
                value={playerForm.token}
                
                >
                {tokenList?.map((token, index)=>{
                    return (
                            <option
                            key={index}
                            value={token.tokenName}
                            >
                                {token.tokenName}
                            </option>
                    )
                })}
                </select>
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
                <button className="btn bg-sky-400 text-white border-2 border-black hover:bg-sky-500 m-2" type="submit" >Submit</button>
            </form>
        </section>
        
    )
}

export default PlayerForm;