import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Arrival from "./layers/Arrival.jsx";
import Study from "./layers/Study.jsx";
import Book from "./layers/Book.jsx";
import Reflection from "./layers/Reflection.jsx";
import Conferences from "./layers/Conferences.jsx";
import Conference from "./layers/Conference.jsx";
import Questions from "./layers/Questions.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Arrival />} />
        <Route path="/study" element={<Study />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/book/:id/reflection/:refId" element={<Reflection />} />
        <Route path="/conferences" element={<Conferences />} />
        <Route path="/conference/:no" element={<Conference />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
