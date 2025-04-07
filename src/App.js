import { useState, useEffect } from 'react'
import './App.css'
import vocalOptions from './songs' // All available songs
// Components
import TrackSelector from './components/TrackSelector'
import TrackList from './components/TrackList'
// Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faXmark, faArrowUp} from '@fortawesome/free-solid-svg-icons'

function App() {

  const [tracks, setTracks] = useState([])
  const [introduction, setIntroduction] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Display songs depending on gender and vocal type selections
  const handleSelectionChange = (vocalType, gender) => {
      if (vocalType && gender) {
          setTracks(vocalOptions[gender][vocalType] || []);
      } else {
          setTracks([])
      }
  }

  // Back to top button functionality
    useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > window.innerHeight/3) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth"})
  }

  return (
    <div className="App">
      <header>
        <nav>
          {/* Introduction text btn */}
          <button onClick={() => setIntroduction(true)} className='btn btn-introduction'><FontAwesomeIcon icon={faInfo} /></button>
          <a href='#savedTracks' className='btn header-element'>My Saved Tracks</a>
          <a href='#diaryEntries' className='btn header-element'>My Diary Entries</a>
          </nav>
        <h1 className='app-title'>Music app</h1>
      </header>
      <div className='container'>
        <TrackSelector onSelectionChange={handleSelectionChange} />
        <TrackList tracks={tracks} />
      </div>
      {/* Introduction text */}
      {introduction && 
      <div className='introduction-container'>
        <button onClick={() => setIntroduction(false)} className="btn-close"><FontAwesomeIcon icon={faXmark} /></button>
        <div className='introduction-text'>
          <p>
            Your baby begins hearing and distinguishing sounds as early as 16 weeks. It is time to start introducing him to the different timbres of the human voice.
          </p>
          <p>
            Could you listen and try out which voices your child likes the most, to which he responds? Music and the sound waves of the human voice are like a light vibrating massage for the child's body. Higher sounds affect the upper part of the body, and lower ones affect the lower part.
          </p>
          <p>
            You can create your playlist with selected songs and also write down your impressions and your child's reaction.
          </p>
          <p>This is just a prototype. Feel free to add more songs.</p>
        </div>
      </div>}
      {/* Back to top btn */}
      <a 
          href='#top'
          className={`back-to-top ${isVisible ? "visible" : ""}`}
          onClick={scrollToTop}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </a>
    </div>
  );
}

export default App;
