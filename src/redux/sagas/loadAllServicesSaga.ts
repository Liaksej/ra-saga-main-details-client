import { call, put, takeLatest } from "redux-saga/effects";
import { SagasActions } from "@/redux/sagas/sagasActions";
import { fetchError, loading, servicesUpdate } from "@/redux/slices/dataSlice";
import { ServicesItemState } from "@/redux/slices/slicesStateTypes";
import { z } from "zod";

const dataSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
  }),
);

export function* fetchData() {
  try {
    yield put(loading());
    const response: Response = yield call(
      fetch,
      `http://localhost:7070/api/services`,
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data: ServicesItemState[] = yield call([response, response.json]);
    console.log(data);
    const validatedData = dataSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Missing Fields. Failed to fetch services.");
    }
    yield put(servicesUpdate(data));
  } catch (error: unknown) {
    yield put(fetchError(error));
  }
}

export function* watchLoadAllServices() {
  yield takeLatest(SagasActions.LOAD_ALL_SERVICES, fetchData);
}
