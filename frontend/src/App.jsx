import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react";
import Login from "./components/Login";
import PatientProfile from "./components/PatientProfile";
import { PublicRoute, PrivateRoute } from "./components/ProtectedRoute";
import { Home } from "./components/Home";
import Register from "./components/Register";
import { Suggestion } from "./components/Suggestion";
import { Learning } from "./components/Learning";
import { PatientHabbits } from "./components/PatientHabbits";
import PatientDetails from "./components/PatientDetails";
import { Dashboard } from "./components/Dashboard";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/dashboard' element={<PatientProfile />} />
            <Route exact path='/suggestions' element={<Suggestion />} />
            <Route exact path='/learning' element={<Learning />} />
            <Route exact path='/patientdetails' element={<PatientDetails />} />
            <Route exact path='/patienthabits' element={<PatientHabbits />} />
          </Route>
          <Route exact path='/login' element={<PublicRoute />}>
            <Route exact path='/login' element={<Login />} />
          </Route>
          <Route exact path='/register' element={<PublicRoute />}>
            <Route exact path='/register' element={<Register />} />
          </Route>
          {/* <Route exact path='/patientdetails' element={<PublicRoute />}>
        </Route> */}
        </Routes>
      </Router>
    </ChakraProvider >
  );
}

export default App;
