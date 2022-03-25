import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cameraImage: null,
  status: 'idle',
}

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCameraImage: (state, action) => {
      state.cameraImage = action.payload
    },
    resetCameraImage: state => {
      //
    },
  },
})

export const { setCameraImage, resetCameraImage } = cameraSlice.actions

export const selectCamera = state => state.camera.cameraImage

export default cameraSlice.reducer
