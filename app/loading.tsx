export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="animate-spin w-40 h-40 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      <p className="text-2xl text-gray-500 mt-4">Loading...</p>
    </div>
  );
}
