import { Route, Routes } from "react-router-dom";
import Example1 from "../pages/Example1";
import Example2 from "../pages/Example2";

export default function MainRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/" replace />} /> */}
      <Route path="/" element={<Example1 />} />
      <Route path="/example2" element={<Example2 />} />
      {/* <Route path="*" element={<Navigate to={"/"} replace />} /> */}
    </Routes>
  );
}
