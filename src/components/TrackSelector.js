import { useState } from 'react';
import vocalOptions from '../songs';

const TrackSelector = ({ onSelectionChange }) => {

    const [gender, setGender] = useState("");
    const [vocalType, setVocalType] = useState("");

    const handleGenderChange = (e) => {
        setGender(e.target.value);
        setVocalType(""); // Reset vocal type selection
    };

    const handleVocalTypeChange = (e) => {
        setVocalType(e.target.value);
        onSelectionChange(e.target.value, gender);
    };

    return (
        <div>
            <h2>Choose a Vocal Type</h2>

            <div className='selector-container'>
                <label>Select Gender:</label>
                <select value={gender} onChange={handleGenderChange}
                className='selector'>
                    <option value="">--Select--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label>Select Vocal Type:</label>
                <select value={vocalType} onChange={handleVocalTypeChange} disabled={!gender}>
                    <option value="">--Select--</option>
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

