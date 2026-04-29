import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Arrival from "./layers/Arrival.jsx";
import Study from "./layers/Study.jsx";
import Book from "./layers/Book.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Arrival />} />
        <Route path="/study" element={<Study />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
