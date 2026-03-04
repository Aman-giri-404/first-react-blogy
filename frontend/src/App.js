import Adminpanel from "./pages/Adminpanel";
import Loginuser from "./pages/Loginuser";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";
import Writingblog from "./components/Writingblog";
import Userblog from "./components/Userblog";
import Blogmore from "./components/Blogmore";
import Edit from "./components/Edit";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <div>
      <header className="App-header">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-panel" element={<Adminpanel />} />
            <Route path="/sign-in" element={<Loginuser />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/write-blog/:id?" element={<Writingblog />} />
            <Route path="/user-blog" element={<Userblog />} />
            <Route path="/blog/:id" element={<Blogmore />} />
            <Route path="/update/:id" element={<Edit />} />
            <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
