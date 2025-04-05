import { useState, useEffect } from "react";

const TrackList = ({ tracks }) => {

    const [savedTracks, setSavedTracks] = useState([]);
    // console.log(savedTracks)
    const [entries, setEntries] = useState([]);
    console.log(entries)
    const [newEntry, setNewEntry] = useState({ title: "", text: "", song: "" });
    const [showEntryForm, setShowEntryForm] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [editingEntry, setEditingEntry] = useState(null);

    // Load saved tracks from localStorage on component mount
    useEffect(() => {
        const storedTracks = JSON.parse(localStorage.getItem("savedTracks")) || [];
        setSavedTracks(storedTracks);
        const storedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        setEntries(storedEntries);
    }, []);

    // Function to save a track
    const saveTrack = (track) => {
        if (!savedTracks.includes(track)) {
            const updatedTracks = [...savedTracks, track];
            // console.log(track)
            setSavedTracks(updatedTracks);
            localStorage.setItem("savedTracks", JSON.stringify(updatedTracks));
        }
    }

    const deleteTrack = (trackUrl) => {
        const updatedTracks = savedTracks.filter(track => track !== trackUrl);
        setSavedTracks(updatedTracks);
        localStorage.setItem("savedTracks", JSON.stringify(updatedTracks));
    }
    
    const createEntry = () => {
        const newEntryData = {
          ...newEntry,
          date: new Date().toLocaleDateString()
        };
        const updatedEntries = [...entries, newEntryData];
        setEntries(updatedEntries);
        localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
        setShowEntryForm(false);
        setNewEntry({ title: "", text: "", song: "" });
    }
    
      const deleteEntry = (index) => {
        const updatedEntries = entries.filter((_, i) => i !== index);
        setEntries(updatedEntries);
        localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
        setSelectedEntry(null)
    }

    const editDiaryEntry = (id, newTitle, newText) => {
        setSelectedEntry(null);
        const updatedEntries = entries.map(entry =>
          entry.id === id ? { ...entry, title: newTitle, text: newText } : entry
        );
        setEntries(updatedEntries);
        localStorage.setItem("diaryEntries", JSON.stringify(updatedEntries));
        setEditingEntry(null);
      };

    return (
        <>
            <div className="track-container">
                {tracks.length > 0 ? (
                    tracks.map((track, index) => (
                        <div key={index} className="track-item">
                            <iframe
                                src={track.url}
                                width="300"
                                height="80"
                                allow="encrypted-media"
                            ></iframe>
                            <div className="btn-container">
                                <button
                                    onClick={() => saveTrack(track)}
                                    disabled={savedTracks.includes(track)}
                                    className="btn btn-save"
                                >
                                    {savedTracks.includes(track) ? "Saved" : "Save"}
                                </button>
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
            <div id="savedTracks">
                <h2>Saved Tracks</h2>
                <div className="track-container">
                    {savedTracks.length > 0 ? (
                        savedTracks.map((track, index) => (
                            <div key={index} className="track-item">
                                <iframe
                                    src={track.url}
                                    width="300"
                                    height="80"
                                    allow="encrypted-media"
                                ></iframe>
                                <button onClick={() => deleteTrack(track)}
                                className="btn btn-delete"
                                >Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No tracks saved.</p>
                    )}
                </div>
            </div>
                {showEntryForm && (
                    <div className="entry-form">
                        <button onClick={() => setShowEntryForm(false)} className="btn-close">X</button>
                        <h2>Create New Entry</h2>
                        {/* <label className="entry-title">Entry title</label> */}
                        <input className="entry-title" type="text" placeholder="Title" value={newEntry.title} onChange={(e) => setNewEntry({...newEntry, title: e.target.value})} />
                        {/* <label>Entry title</label> */}
                        <textarea className="entry-text" placeholder="Write your thoughts..." value={newEntry.text} onChange={(e) => setNewEntry({...newEntry, text: e.target.value})}></textarea>
                        <button onClick={createEntry} className="btn"
                        >Save Entry</button>
                    </div>
                )}

                <div id="diaryEntries">
                    <h2>Diary Entries</h2>
                    <div className="entries-container">
                        {entries.length > 0 ? (
                            entries.map((entry, index) => (
                            <div key={index} className="entry-preview" onClick={() => setSelectedEntry(entry)}>
                                <h3>{entry.title}</h3>
                                <p>{entry.song.name}</p>
                            </div>
                            ))
                        ) : (
                            <p>No entries yet.</p>
                        )}
                    </div>
                </div>

                {selectedEntry && (
                    <div className="entry-modal">
                        <button onClick={() => setSelectedEntry(null)} className="btn-close">X</button>
                        <h2>{selectedEntry.title}</h2>
                        <p><strong>Song:</strong> {selectedEntry.song.name}</p>
                        <p><strong>Date:</strong> {selectedEntry.date}</p>
                        <p>{selectedEntry.text}</p>
                        <button onClick={() => deleteEntry(entries.indexOf(selectedEntry))} className="btn btn-delete"
                        >Delete</button>
                        <button onClick={() => setEditingEntry (selectedEntry)} className="btn"
                        >Edit</button>
                    </div>
                )}

                {editingEntry && (
                    <div className="edit-modal">
                        <button onClick={() => setEditingEntry(null)} className="btn-close">X</button>
                        <h2>Edit Entry</h2>
                        <label className="entry-title">Entry title</label>
                        <input
                            type="text"
                            value={editingEntry.title}
                            onChange={(e) => setEditingEntry({...editingEntry, title: e.target.value})}
                        />
                        <label>Entry text</label>
                        <textarea
                            value={editingEntry.text}
                            onChange={(e) => setEditingEntry({...editingEntry, text: e.target.value})}
                        />
                        <button onClick={() => editDiaryEntry(editingEntry.id, editingEntry.title, editingEntry.text)} className="btn btn-edit"
                        >Save</button>
                    </div>
                )}
        </>
    );
};

export default TrackList;