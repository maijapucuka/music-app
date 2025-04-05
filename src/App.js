// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import TrackSelector from './components/TrackSelector';
import TrackList from './components/TrackList';
import vocalOptions from './songs';

function App() {

  const [tracks, setTracks] = useState([]);
  const [introduction, setIntroduction] = useState(true)

  const handleSelectionChange = (vocalType, gender) => {
      if (vocalType && gender) {
          setTracks(vocalOptions[gender][vocalType] || []);
      } else {
          setTracks([]);
      }
  };

  return (
    <div className="App">
      <header>
        <nav>
          <button onClick={() => setIntroduction(true)} className='btn btn-introduction'>?</button>
          <a href='#savedTracks' className='btn header-element'>My Saved Tracks</a>
          <a href='#diaryEntries' className='btn header-element'>My Diary Entries</a>
          </nav>
        <h1 className='app-title'>Music app</h1>
      </header>
      <div className='container'>
        <TrackSelector onSelectionChange={handleSelectionChange} />
        <TrackList tracks={tracks} />
      </div>
      {introduction && <div className='introductory-text'>
        <button onClick={() => setIntroduction(false)} className="btn-close">X</button>
        <p>
          Your baby begins hearing and distinguishing sounds as early as 16 weeks. It is time to start introducing him to the different timbres of the human voice.
        </p>
        <p>
          Could you listen and try out which voices your child likes the most, to which he responds? Music and the sound waves of the human voice are like a light vibrating massage for the child's body. Higher sounds affect the upper part of the body, and lower ones affect the lower part.
          </p>
        <p>
          You can create your playlist with selected songs and also write down your impressions and your child's reaction.
          </p>
      </div>}
    </div>
  );
}

export default App;
