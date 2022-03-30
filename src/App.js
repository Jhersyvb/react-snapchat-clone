import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import WebcamCapture from './components/WebcamCapture'
import Preview from './Preview'
import Chats from './Chats'
import ChatView from './ChatView'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/appSlice'
import Login from './Login'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useEffect } from 'react'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, authUser => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        )
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            <img
              className="app__logo"
              src="https://live.staticflickr.com/2878/33188781040_5ed0e6f17d.jpg"
              alt=""
            />
            <div className="app__body">
              <div className="app__body-background">
                <Routes>
                  <Route path="/" element={<WebcamCapture />} />
                  <Route path="preview" element={<Preview />} />
                  <Route path="chats" element={<Chats />} />
                  <Route path="chats/view" element={<ChatView />} />
                  <Route path="*" element={<Navigate to="/chats" replace />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  )
}

export default App
