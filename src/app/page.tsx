import List from "@/components/List";
import { StoreProvider } from "@/components/StoreProvider";

export default function Home() {
  return (
    <StoreProvider>
      <List />
    </StoreProvider>
  );
}
