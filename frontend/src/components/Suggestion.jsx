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
          <Card >
            <CardHeader>
            </CardHeader>
            <CardBody>
              {/* <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div >
                  <div class="row-start-2 row-span-2 ...">
                    <Box boxSize='190px' className="absolute top-2 left-2 ">
                      <Image
                        borderRadius='20'
                        // boxSize='75px 150px'
                        src={e.imageUrl}
                        class="object-contain"
                      />
                    </Box>
                  </div>
                </div>
                <div class="row-end-3 row-span-2 ...">
                  <p class="text-2xl ...">The quick brown fox ...</p>
                </div>
                <div class="row-start-1 justrow-end-4 ...">
                  <Button colorScheme='green' className='ml-20'>
                    I completed this!
                  </Button>
                </div>
              </div> */}
              <div class="flex justify-between">
                <div>
                  <Box boxSize='200px' className="justify top-2 left-2 ">
                    <Image
                      borderRadius='20'
                      boxSize='75px 150px'
                      src={e.imageUrl}
                      class="object-contain"
                    />
                  </Box></div>
                <div>
                  <p class="font-3xl">{e.description}</p>
                </div>
                <div>
                  <Button colorScheme='green' className='ml-20'>
                    I completed this!
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
          {isDetailOpen && (
            <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Suggestion details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <p>Title: {selectedSuggestion.title}</p>
                  <p>Description: {selectedSuggestion.description}</p>
                  <p>Points Worth: {selectedSuggestion.points_worth}</p>
                  <p>Status: {selectedSuggestion.status ? <Badge colorScheme='green'>Active</Badge> : <Badge colorScheme='red'>Inactive</Badge>}</p>
                  <p>Category: {selectedSuggestion.category}</p>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onDetailClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </Box>
      ))
      }
    </>
  );
};
