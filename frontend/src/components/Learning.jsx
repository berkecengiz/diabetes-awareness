import {
  useDisclosure,
  Box,
  Card,
  CardHeader,
  Heading,
  CardFooter,
  Button,
  Image,
  CardBody,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Badge,
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

  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState({
    title: "",
    description: "",
    imgUrl: "",
    points_worth: "",
    category: "",
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
    try {
      const { data } = await axios.get("http://localhost:3000/learning");
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
            <Flex>
              <CardHeader>
                <Heading size='md'>{e.title}</Heading>
              </CardHeader>
            </Flex>
            <Flex>
            </Flex>
            <Flex>
              <CardFooter>
                <Button colorScheme='green' onClick={() => onShowDetails(e)}>
                  View details
                </Button>
                <div class="absolute bottom-0 right-0 h-12 w-64">
                  <p class="font-bold m-2">{e.category}</p>
                </div>
                <Box boxSize='190px' className="absolute top-2 left-2 ">
                  <Image
                    borderRadius='20'
                    boxSize='100px 300px'
                    src={e.imgUrl}
                    alt='Dan Abramov'
                    class="object-contain"
                  />
                </Box>
              </CardFooter>
            </Flex>
          </Card>
          {isDetailOpen && (
            <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>    
                  <p className="text-left mr-8">{selectedSuggestion.title}</p>
                </ModalHeader>
                <p className="text-right mr-8">{selectedSuggestion.category}</p>
                <ModalCloseButton />
                <ModalBody>
                  <Image
                    borderRadius='20'
                    boxSize='500px 600px'
                    src={selectedSuggestion.imgUrl}
                    alt='Dan Abramov'
                    class="object-contain"
                  />
                  <p className="mt-6">{selectedSuggestion.description}</p>
                  {/* <p>Status: {selectedSuggestion.status ? <Badge colorScheme='green'>Active</Badge> : <Badge colorScheme='red'>Inactive</Badge>}</p> */}
                </ModalBody>

                <ModalFooter>
                  {/* add compleete learning api here */}
                  <Button colorScheme='green' mr={3} onClick={onDetailClose}>
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
