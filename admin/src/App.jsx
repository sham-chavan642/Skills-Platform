import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import Home from './pages/Home';
import Add from "./pages/Add";
import List from "./pages/List";
import Bookings from './pages/Bookings';

const AdminAuthGate = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <p role="status" className="p-6 text-center">Loading admin access...</p>;
  }

  if (!isSignedIn) {
    return (
      <main className="p-6 text-center">
        <p className="mb-4">Sign in with an authorized admin account to continue.</p>
        <SignInButton mode="modal">
          <button type="button" className="rounded bg-blue-600 px-4 py-2 text-white">
            Sign in
          </button>
        </SignInButton>
      </main>
    );
  }

  return children;
};

const App = () => {
  return (
    <AdminAuthGate>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addcourse" element={<Add />} />
        <Route path="/listcourse" element={<List />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AdminAuthGate>
  )
}

export default App;