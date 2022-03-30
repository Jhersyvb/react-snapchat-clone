import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import CloseIcon from '@material-ui/icons/Close'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CreateIcon from '@material-ui/icons/Create'
import CropIcon from '@material-ui/icons/Crop'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import NoteIcon from '@material-ui/icons/Note'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import { db, storage } from './firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadString } from 'firebase/storage'
import './Preview.css'
import { selectUser } from './features/appSlice'

function Preview() {
  const cameraImage = useSelector(selectCameraImage)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!cameraImage) {
      navigate('/')
    }
  }, [cameraImage, navigate])

  const closePreview = () => {
    dispatch(resetCameraImage())
  }

  const sendPost = async () => {
    const docRef = await addDoc(collection(db, 'posts'), {
      username: user.username,
      read: false,
      profilePic: user.profilePic,
      timestamp: serverTimestamp(),
    })

    const imageRef = ref(storage, `posts/${docRef.id}`)

    await uploadString(imageRef, cameraImage, 'data_url').then(async () => {
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc(doc(db, 'posts', docRef.id), {
        imageUrl: downloadURL,
      })
      navigate('/chats')
    })
  }

  return (
    <div className="preview">
      <CloseIcon onClick={closePreview} className="preview__close" />
      <div className="preview__toolbar-right">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImage} alt="" />
      <div onClick={sendPost} className="preview__footer">
        <h2>Send Now</h2>
        <SendIcon className="preview__send-icon" />
      </div>
    </div>
  )
}

export default Preview
