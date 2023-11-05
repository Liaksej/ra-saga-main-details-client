import { useDispatch, useSelector } from "react-redux";
import { selectServices } from "@/redux/slices/selectors";
import ErrorComponent from "@/components/ErrorComponent";
import { useEffect } from "react";
import { loadService } from "@/redux/sagas/sagasActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import LoadingSpinner from "@/components/loadingSpinner";

export default function DetailsItem({ params }: { params: { id: string } }) {
  const state = useSelector((state: any) => selectServices(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadService(params.id));
  }, [dispatch, params.id]);

  if (state.error) {
    return <ErrorComponent />;
  }

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (!state.serviceItem) {
    return null;
  }

  return (
    <div className="sm:w-1/4 sm:mx-auto pt-4">
      <Link href={`/`}>
        <Card>
          <CardHeader>
            <CardTitle>{state.serviceItem.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            {state.serviceItem.name}
          </CardContent>
          <CardContent className="text-sm">
            Цена: {state.serviceItem.price} р.
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
