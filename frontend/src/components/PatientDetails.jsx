import React, { useState } from 'react';
import {Progress,Box, ButtonGroup,Button,Heading,Flex,FormControl,GridItem,FormLabel,Input, Select,SimpleGrid,InputLeftAddon,InputGroup,Textarea,FormHelperText,InputRightElement,} from '@chakra-ui/react';
import { Link } from "react-router-dom";
import { useToast } from '@chakra-ui/react';

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <Flex>
        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="First name" />
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="age" fontWeight={'normal'}>
            Age
          </FormLabel>
          <Input id="age" placeholder="Age" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="sex" fontWeight={'normal'}>
            Sex
          </FormLabel>
          <Input id="sex" placeholder="Sex" />
        </FormControl>
      </Flex>


      <Flex>
        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="height" fontWeight={'normal'}>
            Height
          </FormLabel>
          <Input id="height" placeholder="Height" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="weight" fontWeight={'normal'}>
            Weight
          </FormLabel>
          <Input id="weight" placeholder="Weight" />
        </FormControl>
      </Flex>

      <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="contact-number" fontWeight={'normal'}>
            Contact Number
          </FormLabel>
          <Input id="contact-number" placeholder="Contact Number" />
        </FormControl>

        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="city" fontWeight={'normal'}>
            City
          </FormLabel>
          <Input id="city" placeholder="City" />
        </FormControl>

        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="type-of-diabeties" fontWeight={'normal'}>
          Type of Diabeties
          </FormLabel>
          <Select mt="5px">
          <option value='option1'>Type 1</option>
          <option value='option2'>Type 2</option>
          <option value='option3'>Gestational Diabetes</option>
        </Select>
        </FormControl>

        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="blood-type" fontWeight={'normal'}>
          Blood Type
          </FormLabel>
          <Select mt="5px">
          <option value='option1'>A+</option>
          <option value='option2'>A-</option>
          <option value='option3'>B+</option>
          <option value='option4'>B-</option>
          <option value='option5'>AB-</option>
          <option value='option6'>AB+</option>
          <option value='option7'>0+</option>
          <option value='option8'>0-</option>
        </Select>
        </FormControl>

        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="emergency-contact-number" fontWeight={'normal'}>
          Emergency Contact Number
          </FormLabel>
          <Input id="emergency-contact-number" placeholder="Emergency Contact Number (Optional)" />
        </FormControl>

        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="doctor-name" fontWeight={'normal'}>
          Doctor Name
          </FormLabel>
          <Input id="doctor-name" placeholder="Doctor Name (Optional)" />
        </FormControl>

        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="doctor-email" fontWeight={'normal'}>
            Doctor E-Mail
          </FormLabel>
          <Input id="doctor-email" placeholder="Doctor E-Mail (Optional)" />
        </FormControl>

    


    </>
  );
};


export default function PatientDetails() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
    
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
               
          <Flex w="100%" justifyContent="end">
            <Link to='/login'>
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                }}>
                Submit
              </Button>
            </Link>
          </Flex>
      </Box>
    </>
  );
}