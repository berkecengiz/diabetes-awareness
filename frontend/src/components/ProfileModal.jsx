import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, Input, FormLabel, ModalFooter } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";

export const ProfileModal = ({ username, onClose, isOpen, patient }) => {
  const [patientData, setPatientData] = useState(patient);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    try {
      const token = localStorage.getItem("access_token");
      var { sub } = jwt_decode(token);
      //   const config = {
      //     headers: { Authorization: `Bearer ${token}` },
      //     body: patientData,
      //   };
      e.preventDefault();
      const result = await axios.put(`http://127.0.0.1:3000/patient/${sub}`, patientData);
      console.log("result", result);
    } catch (err) {
      console.log("Error", err.message);
    }
  };
  return (
    <>
      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile {username}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder='Name' name='name' value={patientData.name} onChange={handleOnChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Surname</FormLabel>
              <Input placeholder='Surname' name='surname' value={patientData.surname} onChange={handleOnChange} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input placeholder='City' name='city' value={patientData.city} onChange={handleOnChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Age</FormLabel>
              <Input placeholder='Age' name='age' value={patientData.age} onChange={handleOnChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Sex</FormLabel>
              <Input placeholder='Sex' name='sex' value={patientData.sex} onChange={handleOnChange} />
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel>Contact Number</FormLabel>
              <Input placeholder='Contact Number' name="contact_number" value={patientData.contact_number} onChange={handleOnChange}  />
            </FormControl> */}
            <FormControl mt={4}>
              <FormLabel>Weight</FormLabel>
              <Input placeholder='Weight' name='weight' value={patientData.weight} onChange={handleOnChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Smoking Habits</FormLabel>
              <Input placeholder='Smoking Habits' name='smoking_habits' value={patientData.smoking_habits} onChange={handleOnChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Alcohol Consumption</FormLabel>
              <Input placeholder='Alcohol Consumption' name='alcohol_consumption' value={patientData.alcohol_consumption} onChange={handleOnChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Activity Level</FormLabel>
              <Input placeholder='Activity Level' disabled name='activity_level' value={patientData.activity_level} onChange={handleOnChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Current Level</FormLabel>
              <Input placeholder='Current Level' disabled name='current_level' value={patientData.current_level} onChange={handleOnChange} />
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel>Emergency Contact Number</FormLabel>
              <Input placeholder='Emergency Contact Number' name="emergency_contact_number" value={patientData.emergency_contact_number} onChange={handleOnChange}  />
            </FormControl> */}
            {/* <FormControl mt={4}>
              <FormLabel>Doctor Name</FormLabel>
              <Input placeholder='Doctor Name' name="doctor_name" value={patientData.doctor_name} onChange={handleOnChange}  />
            </FormControl> */}
            {/* <FormControl mt={4}>
              <FormLabel>Doctor Email</FormLabel>
              <Input placeholder='Doctor Email' name="doctor_email" value={patientData.doctor_email} onChange={handleOnChange}  />
            </FormControl> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// {
//     "city": "string",
//     "contact_number": "string",
//     "weight": 0,
//     "smoking_habits": "string",
//     "alcohol_consumption": "string",
//     "activity_level": "string",
//     "emergency_contact_number": "string",
//     "doctor_name": "string",
//     "doctor_email": "string"
//   }
