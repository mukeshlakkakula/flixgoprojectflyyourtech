import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Appwrite/Login";
// Create this component for the admin panel
// import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./components/AdminPanel";
import MovieList from "./components/AdminPanel/MovieList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" Component={Login} />
        <Route exact path="/admin" Component={AdminPanel} />
        <Route exact path="/admin/update" Component={MovieList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
