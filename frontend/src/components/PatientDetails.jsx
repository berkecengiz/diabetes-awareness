import { Box, Button, ButtonGroup,Link, Flex, FormControl, FormLabel, Heading, Input, Select, useToast } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(5, "Username must contain at least 7 character(s)"),
});



export default function PatientDetails(){
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [patient, setPatient] = useState({
    name: "",
    surname: "",
    age: "",
    sex: "",
    city: "",
    contact_number: "",
    height: "",
    weight: "",
    emergency_contact_number: "",
    doctor_name: "",
    doctor_email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  };
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const formRegister = async (patient) => {
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/v1/patient/create-profile", patient);
      console.log("Patient", patient)
      console.log("Result", result)
      if (result.status === 201) {
        setStatus("You've successfully registered.");
      }
      reset();
    } catch (err) {
      console.log("Error", err);
    }
  };

  

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="light" mb="2%" color="green.500" fontSize="75">
        User Registration
      </Heading>
      <Box borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
      <form onSubmit={handleSubmit(formRegister)}>
      <Flex>
        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="first-name" fontWeight={'normal'}>
            Name
          </FormLabel>
          <Input id="first-name" placeholder="First name" {...register("name", { required: true})} value={patient.name} onChange={handleChange} /> 
        </FormControl>
    
        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={'normal'}>
            Surname
          </FormLabel>
          <Input id="last-name" placeholder="Last name" {...register("surname", { required: true})} value={patient.surname} onChange={handleChange} /> 
        </FormControl>
      </Flex>
      <Flex>
        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="age" fontWeight={'normal'}>
            Age
          </FormLabel>
          <Input id="age" placeholder="Age" {...register("age", { required: true})} value={patient.age} onChange={handleChange} /> 
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="sex" fontWeight={'normal'}>
            Gender
          </FormLabel>
          <Input id="sex" placeholder="Sex" {...register("sex", { required: true})} value={patient.sex} onChange={handleChange} /> 
        </FormControl>
      </Flex>


      <Flex>
        <FormControl mr="5%" mt="5px">
          <FormLabel htmlFor="height" fontWeight={'normal'}>
            Height
          </FormLabel>
          <Input id="height" placeholder="Height" {...register("height", { required: true})} value={patient.height} onChange={handleChange} /> 
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="weight" fontWeight={'normal'}>
            Weight
          </FormLabel>
          <Input id="weight" placeholder="Weight" {...register("weight", { required: true})} value={patient.weight} onChange={handleChange} /> 
        </FormControl>
      </Flex>

      <FormControl mr="5%" mt="5px">
        <FormLabel htmlFor="contact-number" fontWeight={'normal'}>
          Contact Number
        </FormLabel>
        <Input id="contact-number" placeholder="Contact Number" {...register("contact_number", { required: true})} value={patient.contact_number} onChange={handleChange} /> 
      </FormControl>

      <FormControl mr="5%" mt="5px">
        <FormLabel htmlFor="city" fontWeight={'normal'}>
          City
        </FormLabel>
        <Input id="city" placeholder="City" {...register("city", { required: true})} value={patient.city} onChange={handleChange} /> 
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
        <Input id="emergency-contact-number" placeholder="Emergency Contact Number (Optional)" {...register("emergency_contact_number", { required: true})} value={patient.emergency_contact_number} onChange={handleChange} /> 
      </FormControl>

      <FormControl mr="5%" mt="5px">
        <FormLabel htmlFor="doctor-name" fontWeight={'normal'}>
          Doctor Name
        </FormLabel>
        <Input id="doctor-name" placeholder="Doctor Name (Optional)" {...register("doctor_name", { required: true})} value={patient.doctor_name} onChange={handleChange} /> 
      </FormControl>

      <FormControl mr="5%" mt="5px">
        <FormLabel htmlFor="doctor-email" fontWeight={'normal'}>
          Doctor E-Mail
        </FormLabel>
        <Input id="doctor-email" placeholder="Doctor E-Mail (Optional)" {...register("doctor_email", { required: true})} value={patient.doctor_email} onChange={handleChange} /> 
      </FormControl>
      <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="end">    
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                type="submit">
                Submit
              </Button>
          </Flex>
        </ButtonGroup>
      </form>
      </Box>

    </>
  );
};
