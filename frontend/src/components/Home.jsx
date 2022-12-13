import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Grid, GridItem, Heading, Highlight, Image, SimpleGrid, Stack, Text, useDisclosure } from "@chakra-ui/react";
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

  const [points, setPoints] = useState({
    current_level: 0,
    points_collected: 0,
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

  return (
    <>
      <Navbar username={user.username} isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose} onModalOpen={onModalOpen} getPatientMe={getPatientMe} points={points} />
      {isModalOpen && <ProfileModal username={user.username} isOpen={isModalOpen} onClose={onModalClose} patient={patient} setPatient={setPatient} />}
      <Grid
        templateAreas={`
                  "nav main"
                  `}
        marginTop='20px'
        gridTemplateColumns={"50px 2fr"}
        h='175px'
        gap='1'
        color='blackAlpha.700'
        fontWeight='bold'
      >
        <GridItem pl='2' area={"main"}>
          <Text fontSize='4xl'>Hello {user.username}! Welcome to the</Text>
          <Heading lineHeight='tall' textAlign='left'>
            <Highlight query={["Diabetes awareness platform!"]} styles={{ px: "1", py: "1", bg: "green.400", textColor: "white", textSize: "xxl" }}>
              Diabetes Awareness Platform!
            </Highlight>
          </Heading>
          <Text fontSize='l'>We're here to support you on your journey with diabetes. Explore our platform for tools and resources to help you live a healthy and active life.</Text>
        </GridItem>
      </Grid>
      <SimpleGrid columns={[2, 3]} spacing='20px'>
        <Card maxW='450' mt='10' ml='10'>
          <CardBody>
            <Heading size='xl'>Learning</Heading>
            <Image src='https://image.freepik.com/free-vector/online-medical-education-illustration_9041-136.jpg' alt='Green double couch with wooden legs' borderRadius='lg' />
            <Stack mt='6' spacing='3'>
              <Text>Explore learning module for the latest information and resources on diabetes, including symptoms, management, and treatment options.</Text>
              <Text color='blue.600' fontSize='2xl'></Text>
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
              src='https://static.vecteezy.com/system/resources/previews/001/178/979/original/man-thinking-and-man-having-an-idea-set-vector.jpg'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Text>Get personalized suggestions and support on our suggestion module, tailored to your specific needs as a diabetes patient.</Text>
              <Text color='blue.600' fontSize='2xl'></Text>
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
              src='https://thumbs.dreamstime.com/b/medical-analytics-icon-hospital-statistics-sign-vector-yellow-circles-pattern-classic-geometric-elements-188776009.jpg'
              alt='Green double couch with wooden legs'
              borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Text>Track your progress and manage your diabetes on our dashboard module, with tools for monitoring your blood sugar levels, medication, and more.</Text>
              <Text color='blue.600' fontSize='2xl'></Text>
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
