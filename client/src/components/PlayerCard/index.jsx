import { useState } from 'react'
import PropertiesCard from '../PropertiesCard'
import { useMutation } from '@apollo/client'
import { REMOVE_ONE_PLAYER_FROM_GAME } from "../../utils/mutations"

const PlayerCard = ({ player, currentGameId, takenProperties }) => {
    // create current Player State to use in the update
    const [removeOnePlayerFromGame, { error }] = useMutation(REMOVE_ONE_PLAYER_FROM_GAME)
    const [showPlayerUpdateForm, setShowPlayerUpdateForm] = useState(false)
    const deletePlayer = async (event) => {
        let playerId = event.target.getAttribute('data-playerid')
        let gameId = currentGameId
        try {
            const { data } = await removeOnePlayerFromGame({
                variables: { gameId, playerId }
            })
            window.location.reload()
        } catch (err) {
            console.error(err)
        }
    }
    const updatePlayerFunc = (event) => {
        event.preventDefault()
        console.log(event.target.parentNode.querySelector('.playerMoney').value)
        // CREATE A VARIABLE TO STORE UPDATED MONEY 

        // CREATE A VARIABLE TO STORE UPDATED POSITION
    }

    return (
        <>
            <form>
                <p>Name: {player.name}</p>
                <p>Token: {player.token}</p>

                {showPlayerUpdateForm ? (
                    <>
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
                    </>

                ) : (
                    <>
                        <p>Money:{player.money}</p>
                        <p>Position:{player.position}</p>
                    </>
                )}

                <PropertiesCard playerProperties={player.playerPropreties} takenProperties={takenProperties} />
                <br></br>
                {showPlayerUpdateForm ? (
                    <>
                        <button data-playerid={player._id} onClick={(event) => { updatePlayerFunc(event) }}>Update</button>
                        <button onClick={(event)=>{ event.preventDefault(); setShowPlayerUpdateForm(false)}}>Player info</button>
                    </>
                ) : (
                    <>

                        <button onClick={(event)=>{ event.preventDefault(); setShowPlayerUpdateForm(true)}}>Update Player Info</button>
                        <button data-playerid={player._id} onClick={(event) => deletePlayer(event)}>Delete</button>
                    </>
                )}

            </form>
        </>
    )
}


export default PlayerCard;