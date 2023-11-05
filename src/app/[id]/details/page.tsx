"use client";

import DetailsItem from "@/components/DetailsItem";
import { StoreProvider } from "@/components/StoreProvider";

export default function Details({ params }: { params: { id: string } }) {
  return (
    <StoreProvider>
      <DetailsItem params={params} />
    </StoreProvider>
  );
}
