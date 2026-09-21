import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import LandingPage from "./pages/LandingPage";
import { useUserStore } from "./store/userStore";

// CSS import
import "./App.css";
import { useEffect, useRef } from "react";

function App() {
  const hasFetchedRef = useRef(false);
  const fetchGuestUser = useUserStore((state) => state.fetchGuestUser);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchGuestUser();
  }, [fetchGuestUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Toaster richColors position="bottom-center" />
    </>
  );
}

export default App;
