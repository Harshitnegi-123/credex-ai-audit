import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SharedAudit from "./pages/SharedAudit";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/audit/:shareId"
          element={<SharedAudit />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;