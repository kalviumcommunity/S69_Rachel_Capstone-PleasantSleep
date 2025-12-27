import { Routes, Route } from "react-router-dom";
import Upload from "../pages/Upload";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
}

export default AppRoutes;
