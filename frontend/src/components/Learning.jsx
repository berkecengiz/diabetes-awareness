import {
  useDisclosure,
  Box,
  Card,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ProfileModal } from "./ProfileModal";

export const Learning = () => {
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  const [points, setPoints] = useState({
    current_level: 0,
    points_collected: 0,
  });

  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState({
    title: "",
    description: "",
    imgUrl: "",
    points_worth: "",
    category: "",
  });

  const handleSetPoints = () => {
    setPoints({
      ...points,
      points_collected: points.points_collected + 100,
    });
  };

  const [patient, setPatient] = useState(null);
  useEffect(() => {
    getMe();
    getSuggestions();

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

  const getSuggestions = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get("http://127.0.0.1:8000/api/v1/learning", config);
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

  const onShowDetails = (data) => {
    onDetailOpen();
    setSelectedSuggestion(data);
  };

  const handleOnComplete = async (data) => {
    handleSetPoints();
    const token = localStorage.getItem("access_token");
    const { points_worth } = data;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const payload = {
      points_worth,
    };
    try {
      const { data } = await axios.put("http://127.0.0.1:8000/api/v1/patient-update-points", payload, config);
    } catch (err) {
      console.log("Error", err);
    }
    onDetailClose();
  };

  return (
    <>
      <Navbar username={user.username} isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose} onModalOpen={onModalOpen} getPatientMe={getPatientMe} points={points} />
      {isModalOpen && <ProfileModal username={user.username} isOpen={isModalOpen} onClose={onModalClose} patient={patient} setPatient={setPatient} />}
      {suggestions.map((e, index) => (
        <Box p={5} mb={2} key={index}>
          <Card align='center'>
            <Flex>
              <CardHeader>
                <Heading size={{ sm: "100%", md: "80%", lg: "60%", xl: "40%" }}>{e.title}</Heading>
              </CardHeader>
            </Flex>
            <Flex>
              <CardFooter>
                <Button colorScheme='green' onClick={() => onShowDetails(e)}>
                  View details
                </Button>
                <div className='absolute bottom-0 right-0 h-12 w-64'>
                  <p className='font-bold m-2'>{e.category}</p>
                </div>
                <Box boxSize='190px' className='absolute top-2 left-2 '>
                  <Image borderRadius='20' boxSize='100px 300px' src={e.imgUrl} className='object-contain' />
                </Box>
              </CardFooter>
            </Flex>
          </Card>
          {isDetailOpen && (
            <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <p className='text-left mr-8'>{selectedSuggestion.title}</p>
                </ModalHeader>
                <p className='text-right mr-8'>{selectedSuggestion.category}</p>
                <ModalCloseButton />
                <ModalBody>
                  <Image borderRadius='20' boxSize='500px 600px' src={selectedSuggestion.imgUrl} alt='Dan Abramov' className='object-contain' />
                  <p className='mt-6'>{selectedSuggestion.description}</p>
                  {/* <p>Status: {selectedSuggestion.status ? <Badge colorScheme='green'>Active</Badge> : <Badge colorScheme='red'>Inactive</Badge>}</p> */}
                </ModalBody>

                <ModalFooter>
                  {/* add compleete learning api here */}
                  <Button colorScheme='green' mr={3} onClick={() => handleOnComplete(selectedSuggestion)}>
                    Complete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Box>
      ))}
    </>
  );
};
