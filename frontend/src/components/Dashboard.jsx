import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Stack,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Heading,
  Highlight,
  Stat,
  StatArrow,
  StatLabel,
  StatGroup,
  StackDivider,
  StatNumber,
  StatHelpText,
  Spinner,
  VStack,
  Tooltip ,
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { QuestionIcon } from "@chakra-ui/icons";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:3000/habbits"); //api/v1/get_patient_habits
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  };
  

  return (
    <>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        marginTop="4"
        spacing={8}
        justifyContent="space-between"
      >

        <Box direction='row' as='h2'  size='lg' >
          <Heading lineHeight='tall' textAlign='center'>
            <Highlight query={['here', 'personal insights', 'diabetese']}
              styles={{ px: '1', py: '1', bg: 'green.100' }}>
              Here you can find some personal insights about your diabetese.   
            </Highlight>
            <Tooltip hasArrow label='Here you can find your old data compared with the new and see your progress' bg='gray.300' color='black' paddingLeft="4">
                <QuestionIcon/>
            </Tooltip>
          </Heading>
        </Box>
        <Box alignItems="center">
          <StatGroup marginBottom="4">
          <Stat marginX="100px">
            <Heading> Salt </Heading>
              <CircularProgress value={75} size='220px' color="red.600" >
                <CircularProgressLabel>75%</CircularProgressLabel>
              </CircularProgress>

              <StatNumber>Positive Progress</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                15%
              </StatHelpText>

            </Stat>
            <Stat marginX="100px">
            <Heading> Bread </Heading>
              <CircularProgress value={60} size='220px' color="orange.500">
                <CircularProgressLabel>60%</CircularProgressLabel>
              </CircularProgress>

              <StatNumber>Negative Progress</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                10%
              </StatHelpText>

            </Stat>
            <Stat marginX="100px">
            <Heading> Sugar </Heading>
              <CircularProgress value={30} size='220px' color="green.200">
                <CircularProgressLabel>30%</CircularProgressLabel>
              </CircularProgress>

              <StatNumber>Positive Progress</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                5%
              </StatHelpText>

            </Stat>
          </StatGroup>

          <StatGroup>
          <Stat marginX="100px">
          <Heading> Activity </Heading>
              <CircularProgress value={55} size='220px' color="green.600">
                <CircularProgressLabel>55%</CircularProgressLabel>
              </CircularProgress>

              <StatNumber>Positive Progress</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                25%
              </StatHelpText>

            </Stat>
            <Stat marginX="100px">
            <Heading className="Font-Mono"> Alcohol </Heading>
              <CircularProgress value={10} size='220px' color="green">
                <CircularProgressLabel>10%</CircularProgressLabel>
              </CircularProgress>

              <StatLabel>Sent</StatLabel>
              <StatNumber>Positive Progress</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                30%
              </StatHelpText>

            </Stat>
            <Stat marginX="100px">
            <Heading> Cigaratte </Heading>
              <CircularProgress value={45} size='220px' color="orange.200">
                <CircularProgressLabel>45%</CircularProgressLabel>
              </CircularProgress>

              <StatNumber>Negative Progress</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                5%
              </StatHelpText>

            </Stat>
            
          </StatGroup>
          

        </Box>
      </VStack>

    </>
  );
};

