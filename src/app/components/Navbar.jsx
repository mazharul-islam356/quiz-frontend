"use client";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-between p-4 bg-black text-white">
      <h1 className="font-bold">Zero to Web Hero</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
