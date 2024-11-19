import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainPage/MainPage";
import SingleMode from "./pages/singlemode/SingleMode";

function App() {
  const routes = (
    <Routes>
      <Route path="/" Component={MainPage} />
      <Route path="/singlemode" Component={SingleMode} />
      {/* <Route path="/*" element={<Navigate to="/" />} /> */}
    </Routes>
  );
  return (
    <div className="App">
      <Router>{routes}</Router>
    </div>
  );
}

export default App;
