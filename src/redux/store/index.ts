import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "@/redux/sagas";
import { dataSlice } from "@/redux/slices/dataSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([sagaMiddleware]),
});

sagaMiddleware.run(rootSaga);
