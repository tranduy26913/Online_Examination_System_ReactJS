import { createSlice } from "@reduxjs/toolkit";


  
  const initialState = {
    isLight: true,
    role:'student'
  };
  const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
      toggleTheme: (state, action) => ({
        ...state,
        isLight: action.payload,
      }),
      changeRole:(state,action) => ({
        ...state,
        role:action.payload
      })
    },
  });
  
  export const { toggleTheme,changeRole } = settingSlice.actions;
  export default settingSlice.reducer;

