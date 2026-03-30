export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">Zero to Web Hero 🚀</h1>

      <div className="mt-6 flex gap-4">
        <a href="/login" className="bg-black text-white px-6 py-2 rounded">
          Login
        </a>
        <a href="/register" className="border px-6 py-2 rounded">
          Register
        </a>
      </div>
    </div>
  );
}
