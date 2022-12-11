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
} from "@chakra-ui/react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSuggestions();
  }, []);

  const getSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("http://localhost:3000/habbits"); //api/v1/get_patient_habits
      setHabbits(data);
      setIsLoading(false);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={8}
        justifyContent="space-between"
      >

        <Box direction='row' as='h2'  size='lg' >
          <Heading lineHeight='tall' textAlign='center'>

            <Highlight query={['here', 'personal insights', 'diabetese']}
              styles={{ px: '1', py: '1', bg: 'green.100' }}>
              here you can find some personal insights about your diabetese.
            </Highlight>
          </Heading>
        </Box>
        <Box alignItems="center">
          <StatGroup  marginLeft='40px'>
            <Stat>
              <CircularProgress value={70} size='250px' color="red" >
                <CircularProgressLabel>70%</CircularProgressLabel>
              </CircularProgress>

              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                23.36%
              </StatHelpText>

            </Stat>
            <CircularProgress value={45} size='250px' color="green.400" />

            <Stat>
              <StatLabel>Clicked</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                9.05%
              </StatHelpText>
            </Stat>
          </StatGroup>

          <StatGroup marginLeft='40px'>
            <Stat>
              <CircularProgress value={30} size='250px' color="green.200">
                <CircularProgressLabel>40%</CircularProgressLabel>
              </CircularProgress>

              <StatLabel>Sent</StatLabel>
              <StatNumber>345,670</StatNumber>
              <StatHelpText>
                <StatArrow type='increase' />
                23.36%
              </StatHelpText>

            </Stat>
            <CircularProgress value={60} size='250px' color="green.600" />

            <Stat>
              <StatLabel>Clicked</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>
                <StatArrow type='decrease' />
                9.05%
              </StatHelpText>
            </Stat>
          </StatGroup>

        </Box>
      </VStack>

    </>
  );
};

