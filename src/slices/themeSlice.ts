import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface IGlobal {
    isLight: boolean;
  }
  
  const initialState: IGlobal = {
    isLight: true,
  };
  const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      toggleTheme: (state, action: PayloadAction<boolean>) => ({
        ...state,
        isLight: action.payload,
      }),
    },
  });
  
  export const { toggleTheme } = themeSlice.actions;
  export const selectTheme = (state : RootState) => state.theme.isLight
  export default themeSlice.reducer;

