import { useState } from 'react'
import PropertiesCard from '../PropertiesCard'
import { useMutation } from '@apollo/client'
import {REMOVE_ONE_PLAYER_FROM_GAME} from "../../utils/mutations"

const PlayerCard = ({player, currentGameId, takenProperties}) => {
    const [removeOnePlayerFromGame, {error}] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
    const deletePlayer = async (event)=>{
        let playerId = event.target.getAttribute('data-playerid')
        let gameId = currentGameId
        try{
            const {data} = await removeOnePlayerFromGame({
                variables:{gameId,playerId}
            })
            window.location.reload()
        }catch(err){
            console.error(err)
        }
    }
    const updatePlayerFunc = (event)=>{
        event.preventDefault()
        console.log(event.target.parentNode.querySelector('.playerMoney').value)
        // CREATE A VARIABLE TO STORE UPDATED MONEY 

        // CREATE A VARIABLE TO STORE UPDATED POSITION
    }

    return (
        <>
            <h3>Player Card</h3>
            <form>
                <p>Name: {player.name}</p>
                <p>Token: {player.token}</p>
                <label>Money</label>
                <br></br>
                <input
                    type="text"
                    placeholder={player.money}
                    className="playerMoney"
                ></input>
                <br></br>
                <label>Position</label>
                <br></br>
                <input
                    type="text"
                    placeholder={player.position}
                ></input>
                <br></br>
                <PropertiesCard playerProperties={player.playerPropreties} takenProperties={takenProperties} />
                <br></br>
                <button data-playerid={player._id} onClick={(event) => { updatePlayerFunc(event) }}>Update</button>
                <button data-playerid={player._id} onClick={(event) => deletePlayer(event)}>Delete</button>
            </form>
        </>
    )
}


export default PlayerCard;