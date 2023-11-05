import { call, put, takeLatest } from "redux-saga/effects";
import { SagasActions } from "@/redux/sagas/sagasActions";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  loading,
  fetchError,
  serviceItemUpdate,
} from "@/redux/slices/dataSlice";
import { ServicesItemState } from "@/redux/slices/slicesStateTypes";
import { z } from "zod";

const dataItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  content: z.string(),
});

function* fetchData(action: PayloadAction<string>) {
  try {
    yield put(loading());

    const id = encodeURIComponent(action.payload);
    const response: Response = yield call(
      fetch,
      `http://localhost:7070/api/services/${id}`,
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: ServicesItemState = yield call([response, response.json]);
    const validatedData = dataItemSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Missing Fields. Failed to fetch service.");
    }

    yield put(serviceItemUpdate(validatedData.data));
  } catch (error: unknown) {
    yield put(fetchError(error));
  }
}

export function* watchLoadService() {
  yield takeLatest(SagasActions.LOAD_SERVICE, fetchData);
}
