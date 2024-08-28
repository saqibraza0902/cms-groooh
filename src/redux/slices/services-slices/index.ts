import { createSlice } from "@reduxjs/toolkit";

interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  sub_services: {
    title: string;
    url: string;
  }[];
}

interface ServicesState {
  services: ServiceItem[];
}

const initialState: ServicesState = {
  services: [],
};
export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    addservices: (state, action) => {
      state.services = action.payload;
    },
  },
});

export const { addservices } = servicesSlice.actions;

export default servicesSlice.reducer;
