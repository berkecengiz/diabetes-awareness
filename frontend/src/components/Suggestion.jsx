import {
  useDisclosure,
  Box,
  Card,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  CardBody,
  Text,
  Image,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ProfileModal } from "./ProfileModal";

export const Suggestion = () => {
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState({
    title: "",
    description: "",
    points_worth: "",
    category: "",
    imageUrl: ""
  });

  const [patient, setPatient] = useState(null);
  useEffect(() => {
    getMe();
    getSuggestions();
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

  const getSuggestions = async () => {
    const token = localStorage.getItem("access_token");
    const { sub } = jwtDecode(token);

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/suggestions", config);
      console.log(data);
      setSuggestions(data);
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

  const onShowDetails = (data) => {
    onDetailOpen();
    setSelectedSuggestion(data);
  };

  return (
    <>
      <Navbar username={user.username} isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose} onModalOpen={onModalOpen} getPatientMe={getPatientMe} />
      {isModalOpen && <ProfileModal username={user.username} isOpen={isModalOpen} onClose={onModalClose} patient={patient} setPatient={setPatient} />}
      {suggestions.map((e, index) => (
        <Box p={5} mb={2} key={index}>
          <Card align='center'>
            <CardHeader>
              <Text fontSize='xl'>{e.description}</Text>
            </CardHeader>
            <CardBody>
              <Box boxSize='190px' className="absolute top-2 left-2 ">
                <Image
                  borderRadius='20'
                  src={e.imageUrl}
                />
              </Box>
            </CardBody>
            <CardFooter>
              <div className="absolute bottom-0 right-0 h-12 w-64">
                <Button colorScheme='green' justifyContent='end'
                  onClick={() => onShowDetails(e)}>
                  I completed this!
                </Button>
              </div>

            </CardFooter>
          </Card>
        </Box>
      ))
      }
    </>
  );
};
