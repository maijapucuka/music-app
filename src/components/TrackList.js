import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

const TrackList = ({ tracks }) => {

    const [savedTracks, setSavedTracks] = useState([])
    const [entries, setEntries] = useState([])
    const [newEntry, setNewEntry] = useState({ title: "", text: "", song: "" })
    const [showEntryForm, setShowEntryForm] = useState(false)
    const [selectedEntry, setSelectedEntry] = useState(null)
    const [editingEntry, setEditingEntry] = useState(null)

    // Load saved song tracks and diary entries from localStorage on component mount
    useEffect(() => {
        const storedTracks = JSON.parse(localStorage.getItem("savedTracks")) || []
        setSavedTracks(storedTracks)
        const storedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || []
        setEntries(storedEntries)
    }, []);

    // Function to add a song track to saved songs
    const saveTrack = (track) => {
        if (!savedTracks.includes(track)) {
            const updatedTracks = [...savedTracks, track];
            setSavedTracks(updatedTracks)
            localStorage.setItem("savedTracks", JSON.stringify(updatedTracks))
        }
    }

    // Function to delete a song track from saved songs
    const deleteTrack = (trackUrl) => {
        const updatedTracks = savedTracks.filter(track => track !== trackUrl)
        setSavedTracks(updatedTracks);
        localStorage.setItem("savedTracks", JSON.stringify(updatedTracks))
    }
    
    // Function to create a new diary entry and save it to local storage
    const createEntry = () => {
        const newEntryData = {
          ...newEntry,
          date: new Date().toLocaleDateString()
        };
        const updatedEntries = [...entries, newEntryData]
        setEntries(updatedEntries);
        localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
        setShowEntryForm(false);
        setNewEntry({ title: "", text: "", song: "" })
    }
    
    // Function to delete diary entry from local storage
    const deleteEntry = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries)
        localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries))
        setSelectedEntry(null) // Close selected diary entry window
    }

    // Function to edit a diary entry (title and text)
    const editDiaryEntry = (id, newTitle, newText) => {
        setSelectedEntry(null);
        const updatedEntries = entries.map(entry =>
          entry.id === id ? { ...entry, title: newTitle, text: newText } : entry
        );
        setEntries(updatedEntries);
        localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries))
        setEditingEntry(null)
      };

    return (
        <>
            <div className="track-container">
                {/* Display selected song tracks*/}
                {tracks.length > 0 ? (
                    tracks.map((track, index) => (
                        <div key={index} className="track-item">
                            <iframe
                                title={track.title}
                                src={track.url}
                                width="300"
                                height="80"
                                allow="encrypted-media"
                            ></iframe>
                            <div className="btn-container">
                                {/* Save song btn */}
                                <button
                                    onClick={() => saveTrack(track)}
                                    disabled={savedTracks.includes(track)}
                                    className="btn btn-save"
                                >
                                    {/* Text depending if song is saved */}
                                    {savedTracks.includes(track) ? "Saved" : "Save"}
                                </button>
                                {/* Create a new diary entry about this song btn */}
                                <button onClick={() => { setShowEntryForm(true); setNewEntry({ ...newEntry, song: track }); }}
                                className="btn btn-new-entry"
                                >
                                    Create New Diary Entry
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tracks selected.</p>
                )}
            </div>
            
             {/* Display saved song tracks */}
            <div id="savedTracks">
                <h2>Saved Tracks</h2>
                <div className="track-container">
                    {savedTracks.length > 0 ? (
                        savedTracks.map((track, index) => (
                            <div key={index} className="track-item">
                                <iframe
                                    title={track.title}
                                    src={track.url}
                                    width="300"
                                    height="80"
                                    allow="encrypted-media"
                                ></iframe>
                                <div className="btn-container">
                                    {/* Delete song from saved songs btn */}
                                    <button onClick={() => deleteTrack(track)}
                                    className="btn btn-delete"
                                    >
                                        Delete
                                    </button>
                                    {/* Create a new diary entry about this song btn */}
                                    <button onClick={() => { setShowEntryForm(true); setNewEntry({ ...newEntry, song: track }); }}
                                    className="btn btn-new-entry"
                                    >
                                        Create New Diary Entry
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tracks saved.</p>
                    )}
                </div>
            </div>
            {/* Create a new diary entry window */}
            {showEntryForm && (
                <div className="entry-form">
                    <button onClick={() => setShowEntryForm(false)} className="btn-close">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h2>Create New Entry</h2>
                    <label>Entry title</label>
                    <input
                        className="entry-title"
                        type="text"
                        placeholder="My title"
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({...newEntry, title: e.target.value})} />
                    <label>Entry text</label>
                    <textarea 
                        className="entry-text"
                        placeholder="Write your thoughts..."
                        value={newEntry.text}
                        onChange={(e) => setNewEntry({...newEntry, text: e.target.value})}
                    ></textarea>
                    <button onClick={createEntry} className="btn btn-save-entry"
                    >
                        Save Entry
                    </button>
                </div>
            )}

            {/* Show all created diary entries */}
            <div id="diaryEntries">
                <h2>Diary Entries</h2>
                <div className="entries-container">
                    {entries.length > 0 ? (
                        entries.map((entry, index) => (
                            <div
                            key={index}
                            className="entry-preview"
                            onClick={() => setSelectedEntry(entry)}>
                                <h3>{entry.title}</h3>
                                <p>{entry.song.name}</p>
                            </div>
                        ))
                    ) : (
                        <p>No entries yet.</p>
                    )}
                </div>
            </div>
            
            {/* Display selected diary entry window */}
            {selectedEntry && (
                <div className="entry-modal">
                    <button onClick={() => setSelectedEntry(null)} className="btn-close">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h2>{selectedEntry.title}</h2>
                    <p><strong>Song:</strong> {selectedEntry.song.name}</p>
                    <p><strong>Date created:</strong> {selectedEntry.date}</p>
                    <p className="entry-text">{selectedEntry.text}</p>
                    <button onClick={() => deleteEntry(entries.indexOf(selectedEntry))} className="btn btn-delete-entry"
                    >Delete</button>
                    <button onClick={() => setEditingEntry (selectedEntry)} className="btn btn-edit"
                    >Edit</button>
                </div>
            )}

            {/* Edit selected diary entry window */}
            {editingEntry && (
                <div className="edit-modal">
                    <button onClick={() => setEditingEntry(null)} className="btn-close">
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <h2>Edit Entry</h2>
                    <label>Entry title</label>
                    <input
                        type="text"
                        className="entry-title"
                        value={editingEntry.title}
                        onChange={(e) => setEditingEntry({...editingEntry, title: e.target.value})}
                    />
                    <label>Entry text</label>
                    <textarea
                        value={editingEntry.text}
                        className="entry-text"
                        onChange={(e) => setEditingEntry({...editingEntry, text: e.target.value})}
                    />
                    <button onClick={() => editDiaryEntry(editingEntry.id, editingEntry.title, editingEntry.text)} className="btn btn-save-entry"
                    >Save Entry</button>
                </div>
            )}
        </>
    );
};

export default TrackList;