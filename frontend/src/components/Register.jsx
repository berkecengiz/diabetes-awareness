import { Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as z from "zod";

const schema = z.object({
  username: z.string().min(5, "Username must contain at least 5 character(s)"),
  email: z.string().email("Must be a valid Email"),
  password: z.string().min(9, "Password must contain at least 9 character(s)"),
});

export default function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const formRegister = async (user) => {
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/v1/users/register", user);
      if (result.status === 201) {
        setStatus("You've successfully registered.");
      }
      reset();
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign up to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Welcome to Health Awareness System ✌️
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(formRegister)}>
            <Stack spacing={4}>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input type='username' name='username' id='username' {...register("username", { required: true, minLength: 5 })} value={user.username} onChange={handleChange} />
                {errors.username?.message && <span>{errors.username?.message}</span>}
              </FormControl>
              <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input type='email' name='email' id='email' {...register("email", { required: true })} value={user.email} onChange={handleChange} />
                {errors.email?.message && <span>{errors.email?.message}</span>}
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' id='password' {...register("password", { required: true, minLength: 9 })} value={user.password} onChange={handleChange} />
                {errors.password?.message && <span>{errors.password?.message}</span>}
              </FormControl>
              <Flex justifyContent={"end"} gap={2} alignItems='center'>
                <Link to='/login'>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Link>
                <Link to='/PatientDetails'>
                <Button
                  bg={"green.400"}
                  type='submit'
                  color={"white"}
                  _hover={{
                    bg: "green.500",
                  }}
                >
                  Sign up
                </Button>
                </Link>
              </Flex>
            </Stack>
            {status && (
              <Alert mt={2} status='success'>
                <AlertIcon />
                {status}
              </Alert>
            )}
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
