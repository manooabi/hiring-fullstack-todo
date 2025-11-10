import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

// function App() {
//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Private route wrapper
//   const PrivateRoute = ({ children }) => {
//     return token ? children : <Navigate to="/" />;
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard token={token} user={user} />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }
function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));

  const PrivateRoute = ({ children }) => {
    return token ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login setToken={setToken} setUser={setUser} />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard token={token} user={user} />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
