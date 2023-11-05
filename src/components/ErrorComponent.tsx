import { useRouter } from "next/navigation";

export default function ErrorComponent() {
  const router = useRouter();
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => window.location.reload()}
      >
        Try again
      </button>
    </main>
  );
}
