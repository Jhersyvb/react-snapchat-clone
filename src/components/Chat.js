import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import ReactTimeago from 'react-timeago'
import { useDispatch } from 'react-redux'
import { selectImage } from '../features/appSlice'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'

function Chat({ id, post }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const open = async () => {
    if (!post.read) {
      dispatch(selectImage(post.imageUrl))
      await setDoc(
        doc(db, 'posts', id),
        {
          read: true,
        },
        { merge: true }
      )
      navigate('/chats/view')
    }
  }

  return (
    <div onClick={open} className="chat">
      <Avatar className="chat__avatar" src={post.profilePic} />
      <div className="chat__info">
        <h4>{post.username}</h4>
        <p>
          {!post.read && 'Tap to view -'}{' '}
          <ReactTimeago
            date={new Date(post.timestamp?.toDate()).toUTCString()}
          />
        </p>
      </div>

      {!post.read && <StopRoundedIcon className="chat__read-icon" />}
    </div>
  )
}

export default Chat
