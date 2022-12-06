import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavLink = ({ link, children }) => (
  <Text
    px={2}
    py={1}
    rounded={"md"}
    cursor='pointer'
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Text>
);

export default function Navbar({ username, isOpen, onOpen, onClose, onModalOpen, getPatientMe }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const handleOpenProfile = async () => {
    await getPatientMe();
    onModalOpen();
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton size={"md"} icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} aria-label={"Open Menu"} display={{ md: "none" }} onClick={isOpen ? onClose : onOpen} />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <Avatar src='https://play-lh.googleusercontent.com/MBX5ofvPsYkAFh4osk_nA4r-pkcDqXy5SejPbcTO74I70s7204FU5JcJuOfudW5Dfw' />
            </Box>
            {/* link to home page */}
            <Link to='/home'>
                <NavLink>            
                  <p class="text-green-700 font-bold hover:text-green-900">Diabetes Awareness Platform </p>
                </NavLink>
              </Link>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              <Link to='/learning'>
                <NavLink>Learning</NavLink>
              </Link>
              <Link to='/suggestions'>
                <NavLink>Suggestions</NavLink>
              </Link>
              <Link to='/dashboard'>
                <NavLink>Dashboard</NavLink>
              </Link>
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap={5}>
            <Menu>
            <p class="text-green-700 font-bold">0 points collected</p>
            <p class="text-green-900 font-bold">earn 500 more to level up! </p>
            <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon /> : <SunIcon />}</Button>

              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Flex  gap={3}>
                  {/* <Avatar size={"sm"} /> */}
                  <span>My profile</span>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>Signed as {username}</MenuItem>
                <MenuItem onClick={handleOpenProfile}>Profile Details</MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={handleLogout}
                  _hover={{
                    bg: useColorModeValue("red.200", "red.700"),
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
            <Link to='/home'>
                <NavLink>Home</NavLink>
              </Link>
              <Link to='/learning'>
                <NavLink>Learning</NavLink>
              </Link>
              <Link to='/suggestions'>
                <NavLink>Suggestions</NavLink>
              </Link>
              <Link to='/dashboard'>
                <NavLink>Dashboard</NavLink>
              </Link>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
