import { useEffect, useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import SearchIcon from '@material-ui/icons/Search'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import './Chats.css'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'
import Chat from './components/Chat'

function Chats() {
  const [posts, setPosts] = useState([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        snapshot => {
          setPosts(snapshot.docs)
        }
      ),
    []
  )

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input placeholder="Friends" type="text" />
        </div>
        <ChatBubbleIcon className="chats__chat-icon" />
      </div>
      <div className="chats__posts">
        {posts.map(post => (
          <Chat key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  )
}

export default Chats
