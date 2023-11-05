"use client";

import { selectServices } from "@/redux/slices/selectors";
import { useDispatch, useSelector } from "react-redux";
import ErrorComponent from "@/components/ErrorComponent";
import { ServicesItemState } from "@/redux/slices/slicesStateTypes";
import { useEffect } from "react";
import { loadAllServices } from "@/redux/sagas/sagasActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";
import LoadingSpinner from "@/components/loadingSpinner";

export default function List() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => selectServices(state));

  useEffect(() => {
    dispatch(loadAllServices());
  }, [dispatch]);

  if (state.error) {
    return <ErrorComponent />;
  }

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (!state.services || state.services.length === 0) {
    return <div>No services</div>;
  }

  return (
    <div className="sm:w-2/4 sm:mx-auto pt-4">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {state.services.map((service: ServicesItemState) => (
          <Link key={service.id} href={`/${service.id}/details`}>
            <Card>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                Price: {service.price}
              </CardContent>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
}
