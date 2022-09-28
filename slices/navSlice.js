import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null, //point A (where are you right now)
  destination: null, //point B (where you want to be)
  travelTimeInformation: null, //time it takes to go from A to B
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    //current state, action is when we dispatch
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },

    setDestination: (state, action) => {
      state.destination = action.payload;
    },

    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

//to use actions in other parts of code
export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

//Selectors //direct return is without curly braces
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
