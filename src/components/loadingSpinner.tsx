export default function LoadingSpinner() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-500"></div>
    </div>
  );
}
