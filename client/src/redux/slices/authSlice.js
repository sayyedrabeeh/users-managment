import { createSlice } from '@reduxjs/toolkit'

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

const authSlice = createSlice({
    name:'auth',
    initialState:{
        name : user || null,
        token : token || null ,
        isAuthenticated: !!token
    },
    reducers :{
        setAuth : (state,action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticated = true
            localStorage.setItem(JSON.stringify(action.payload.user))
            localStorage.setItem(action.payload.token)
        },
        logout:(state) =>{
            state.user = null
            state.token = null
            state.isAuthenticated =false
            localStorage.clear()
        }
    }
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer