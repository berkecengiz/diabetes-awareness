import { Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const schema = z.object({
  username: z.string().min(5, "Username must contain at least 5 character(s)"),
  password: z.string().min(9, "Password must contain at least 9 character(s)"),
});

export default function Login() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const [errors, setErrors] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const processForm = async (user) => {
    let formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    try {
      const result = await axios.post("http://127.0.0.1:8000/api/v1/users/login", formData, { headers: { "content-type": "multipart/form-data" } });
      const {
        data: { access_token, refresh_token },
      } = result || {};
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      navigate("/home");
    } catch (err) {
      let errorStatus = err?.request?.response?.detail || "Incorrect email or password";
      setStatus(errorStatus);
      console.log("Error", err.request.response.detail);
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Health Awareness System
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(processForm)}>
            <Stack spacing={4}>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input type='username' name='username' {...register("username", { required: true })} value={user.username} onChange={handleChange} />
                {errors.username?.message && <span>{errors.username?.message}</span>}
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input type='password' name='password' {...register("password", { required: true, minLength: 9 })} value={user.password} onChange={handleChange} />
                {errors.password?.message && <span>{errors.password?.message}</span>}
              </FormControl>
              <Flex justifyContent={"end"} gap={2} alignItems='center'>
                <Link to='/register'>
                  <Button
                    bg={"green.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </Button>
                </Link>
                <Button
                  type='submit'
                  bg={"blue.400"}
                  color={"white"}
                  onClick={handleSubmit}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Flex>
            </Stack>
            {status && (
              <Alert mt={2} status='error'>
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
