import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "@/pages";
import axios from "axios";
import { Toaster } from "./components";

const App = () => {
  // setup axios defaults
  axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Toaster />
    </main>
  );
};

export default App;
