import { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import './Chats.css'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from './firebase'
import Chat from './components/Chat'
import { useSelector } from 'react-redux'
import { selectUser } from './features/appSlice'
import { signOut } from 'firebase/auth'

function Chats() {
  const [posts, setPosts] = useState([])
  const user = useSelector(selectUser)

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        snapshot => {
          setPosts(
            snapshot.docs.map(doc => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        }
      ),
    []
  )

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          onClick={() => signOut(auth)}
          className="chats__avatar"
        />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chat-icon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({
            id,
            data: { profilePic, username, timestamp, imageUrl, read },
          }) => (
            <Chat
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Chats
