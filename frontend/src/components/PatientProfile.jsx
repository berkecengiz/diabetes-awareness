import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Dashboard } from "./Dashboard";
import Navbar from "./Navbar";
import { ProfileModal } from "./ProfileModal";

export default function PatientProfile() {
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [points, setPoints] = useState({
    current_level: 0,
    points_collected: 0,
  });

  const [patient, setPatient] = useState(null);
  useEffect(() => {
    getMe();
    
    getPointsInfo();
  }, []);

  const getMe = async () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/users/me", config);
      setUser({ username: data.username, email: data.email });
    } catch (err) {
      console.log("Error", err);
    }
  };

  const getPointsInfo = async () => {
    const token = localStorage.getItem("access_token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/patient/me", config);
      setPoints({ points_collected: data.points_collected, current_level: data.current_level });
    } catch (err) {
      console.log("Error", err);
    }
  };

  const getPatientMe = async () => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.get(`http://localhost:3000/patient/${sub}`, config);
      setPatient(data);
      return data;
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <Navbar username={user.username} isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose} onModalOpen={onModalOpen} getPatientMe={getPatientMe} points={points} />
      <Dashboard />
      {isModalOpen && <ProfileModal username={user.username} isOpen={isModalOpen} onClose={onModalClose} patient={patient} setPatient={setPatient} />}
    </div>
  );
}
