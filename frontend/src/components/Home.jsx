import {
  useDisclosure,
  Box,
  Flex,
  Card,
  CardHeader,
  Stack,
  Divider,
  ButtonGroup,
  Image,
  Heading,
  Highlight,
  SimpleGrid,
  Grid,
  GridItem,
  CardFooter,
  Button,
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
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ProfileModal } from "./ProfileModal";

export const Home = () => {
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
      const { data } = await axios.get("http://127.0.0.1:3000/learning");
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
      const { data } = await axios.get(`http://127.0.0.1:3000/patient/${sub}`, config);
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
      <Grid
        templateAreas={`
                  "nav main"
                  `}
        marginTop='20px'
        gridTemplateColumns={'50px 2fr'}
        h='175px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >


        <GridItem pl='2' area={'main'}>
          <Text fontSize='6xl'>Welcome to</Text>
          <Heading lineHeight='tall' textAlign='left' >
            <Highlight query={['Diabetes awareness platform!']}
              styles={{ px: '1', py: '1', bg: 'green.200', textColor: 'white' }}>
              Diabetes Awareness Platform!
            </Highlight>
          </Heading>
          <Text fontSize='l'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </GridItem>
      </Grid>
      <SimpleGrid columns={[2, 3]} spacing='20px'>
        <Card maxW='450' mt='10' ml='10'>
          <CardBody>
            <Heading size='xl'>Learning</Heading>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, cum dolore porro reiciendis asperiores aut quam quaerat voluptatibus nesciunt adipisci fugiat consequatur velit ipsa delectus numquam officiis facilis dolor praesentium?
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2' alignContent='center'>
              <Button variant='solid' colorScheme='green'>
                Take me there!
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card maxW='450' mt='10' ml='10'>
          <CardBody>
            <Heading size='xl'>Suggestions</Heading>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Text>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius, expedita porro animi quos ipsa et voluptatem repellat officia cum quibusdam dolorum autem mollitia dolores, corporis voluptatum modi hic harum ut!
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='green'>
                Take me there!
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Card maxW='450' mt='10' ml='10'>
          <CardBody>
            <Heading size='xl'>Dashboard</Heading>
            <Image
              src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error natus pariatur, tenetur eligendi voluptatum quibusdam sapiente quos voluptatibus dolores debitis mollitia nostrum id! Inventore, porro architecto? Totam facere atque harum?
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                $450
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='green'>
                Take me there!
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </SimpleGrid>
    </>
  );
};
