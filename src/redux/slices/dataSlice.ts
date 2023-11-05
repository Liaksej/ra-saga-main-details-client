import { createSlice } from "@reduxjs/toolkit";
import { ServicesItemState } from "@/redux/slices/slicesStateTypes";

interface State {
  services: Omit<ServicesItemState, "content">[];
  serviceItem: ServicesItemState | null;
  error: Error | null;
  loading: boolean;
}

const initialState = {
  services: [],
  serviceItem: null,
  error: null,
  loading: false,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    servicesUpdate: (state: State, action) => {
      state.services = action.payload;
      state.error = null;
      state.loading = false;
    },
    serviceItemUpdate: (state: State, action) => {
      state.serviceItem = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchError: (state: State, action) => {
      state.error = action.payload;
      state.services = [];
      state.serviceItem = null;
      state.loading = false;
    },
    loading: (state: State) => {
      state.services = [];
      state.serviceItem = null;
      state.error = null;
      state.loading = true;
    },
    reset: () => initialState,
  },
});

export const { servicesUpdate, serviceItemUpdate, fetchError, loading } =
  dataSlice.actions;
export default dataSlice.reducer;
