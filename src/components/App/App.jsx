import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Signin,
  Signup,
  Home,
  Dashboard,
  Tasks,
  TaskEdit,
  Reset,
  Fof,
} from "../../pages/Index";
import Navbar from "../Navbar/Navbar";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/signin" element={<Signin />}></Route>
          <Route exact path="/task/:id" element={<Tasks />}></Route>
          <Route exact path="/task/:id/edit" element={<TaskEdit />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/reset" element={<Reset />}></Route>
          <Route path="*" element={<Fof />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
