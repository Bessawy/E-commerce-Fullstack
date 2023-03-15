import { createSlice } from "@reduxjs/toolkit";

const modeState: string = localStorage.getItem('theme') || 'dark'
document.body.className = "body-"+ modeState

const themeSlice = createSlice({
    name: "themeSlice",
    initialState: modeState,
    
    reducers:{
        toggleThemeMode: (state)=> {
            const mode = state === "light" ? 'dark' : 'light'
            document.body.className = "body-"+ mode
            return mode
        },        
    }
})

const themeReducer = themeSlice.reducer
export const {toggleThemeMode} = themeSlice.actions
export default themeReducer