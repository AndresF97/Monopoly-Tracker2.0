import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PROPERTY_TO_PLAYTER } from "../../utils/mutations";
const PropertiesCard = ({ playerProperties, takenProperties }) => {
    const [addPropertyToPlayer, {error}] = useMutation(ADD_PROPERTY_TO_PLAYTER);
    const [selectedPorpertyId,setSelectedPropertyId] =useState('')
    const [showProperties, setShowProperties] = useState(false)
    const addPropertyToPlayerFunc = (event)=>{
        event.preventDefault();
        console.log('clicked')
        // need playerId and propetyId
        console.log(selectedPorpertyId)
    }

    useEffect(()=>{
        if(takenProperties){
            setSelectedPropertyId(takenProperties[0]?._id)
        }
    },[takenProperties])
    return (
        <section>
            {showProperties ? (
                <>
                    <label>Player property</label>
                    <ul>
                        {playerProperties?.map((item) => {
                            return (
                                <li key={Math.floor(Math.random() * 100) + item.properties[0].name}>{item.properties[0].name}</li>
                            )
                        })}
                    </ul>
                    <label>New Property for user </label>
                    <br></br>
                    <select onChange={ (event)=>{setSelectedPropertyId(event.target.value)}}>
                        {takenProperties?.map((propertie) => {
                            return (
                                <option
                                    key={Math.floor(Math.random() * 100) + propertie.name}
                                    data-color={propertie.hex}
                                    value={propertie._id}>
                                    {propertie.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
                    <button onClick={(event) => { event.preventDefault(); setShowProperties(false) }}>Hide propreties</button>
                    <button onClick={(event)=>{addPropertyToPlayerFunc(event)}}>Add propertie</button>
                </>
            ) : (
                <>
                    <br></br>
                    <button onClick={(event) => { event.preventDefault(); setShowProperties(true) }}>Show propreties</button>
                </>
            )}
        </section>
    )
}

export default PropertiesCard;