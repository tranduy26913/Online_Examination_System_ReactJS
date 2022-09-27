import { createSlice } from "@reduxjs/toolkit";


  
  const initialState = {
    value: [],
  };
  const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState,
    reducers: {
      changeBreadcrumb: (state, action) => {
        const newBreadcrumb = {
          ...action.payload
        }
        return {
        ...state,
        value: [newBreadcrumb]
        }
      },
      addBreadcrumb: (state, action) => ({
        ...state,
        value:[...state.value, action.payload]
      }),
      clearBreadcrumb: (state, action) => ({
        ...state,
        value:[]
      }),

    },
  });
  
  export const { changeBreadcrumb,addBreadcrumb,clearBreadcrumb } = breadcrumbSlice.actions;
  export default breadcrumbSlice.reducer;

