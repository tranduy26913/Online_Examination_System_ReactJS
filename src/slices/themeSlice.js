import { createSlice } from "@reduxjs/toolkit";


  
  const initialState = {
    isLight: true,
  };
  const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      toggleTheme: (state, action) => ({
        ...state,
        isLight: action.payload,
      }),
    },
  });
  
  export const { toggleTheme } = themeSlice.actions;
  export default themeSlice.reducer;

