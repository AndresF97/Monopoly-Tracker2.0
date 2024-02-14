import {useState} from "react";
const PropertiesCard = ({ playerProperties, takenProperties }) => {
    const [showProperties, setShowProperties] = useState(false)
    return (
        <section>
            {showProperties ? (
                <>
                    <h1>Boom Cards go here</h1>
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
                    <select>
                        {takenProperties?.map((propertie) => {
                            return (
                                <option
                                    key={Math.floor(Math.random() * 100) + propertie.name}
                                    data-color={propertie.hex}
                                    value={propertie.name}>
                                    {propertie.name}
                                </option>
                            )
                        })}
                    </select>
                    <br></br>
            <button onClick={(event) => { event.preventDefault(); setShowProperties(false) }}>Hide propreties</button>
                </>
            ) : (
                <>
                  <br></br>
            <button onClick={(event) => { event.preventDefault(); setShowProperties(true) }}>Show propreties</button>
                </>
            )}
            {/* <br></br>
            <button onClick={(event) => { event.preventDefault(); setShowProperties(true) }}>Show propreties</button> */}
        </section>
    )
}

export default PropertiesCard;