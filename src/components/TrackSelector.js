import { useState } from 'react'
import vocalOptions from '../songs' // All available songs

const TrackSelector = ({ onSelectionChange }) => {

    const [gender, setGender] = useState("")
    const [vocalType, setVocalType] = useState("")

    // Handle song type selection by gender
    const handleGenderChange = (e) => {
        setGender(e.target.value)
        setVocalType("") // Reset vocal type selection
    }

    // Handle song type selection by vocal type
    const handleVocalTypeChange = (e) => {
        setVocalType(e.target.value)
        onSelectionChange(e.target.value, gender)
    }

    return (
        <div>
            <h2>Choose Song Type</h2>

            <div className='selector-container'>
                {/* Gender selector */}
                <label>Select Gender:</label>
                <select value={gender} onChange={handleGenderChange}
                className='selector'>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                {/* Vocal type selector */}
                <label>Select Vocal Type:</label>
                <select value={vocalType} onChange={handleVocalTypeChange} disabled={!gender}>
                    <option value="">Select</option>
                    {/* If gender selected, map over all available vocal types and format them*/}
                    {gender &&
                        Object.keys(vocalOptions[gender]).map((type) => (
                            <option key={type} value={type}>
                                {type.replaceAll("_", " ").toUpperCase()}
                            </option>
                        ))}
                </select>
            </div>
        </div>
    )
}

export default TrackSelector

