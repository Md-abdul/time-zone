import React, { useState } from "react";
import {
  Input,
  InputGroup,
  Box,
  Flex,
  HStack,
  Center,
  useColorMode,
  IconButton,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { AddIcon, CalendarIcon, LinkIcon } from "@chakra-ui/icons";
import { IoSwapVerticalSharp } from "react-icons/io5";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

const Navbar = ({ setSelectedDate, swapTimeZones }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.50", "black");
  const textColor = useColorModeValue("black", "white");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const timeZones = ["GMT", "EST", "PST", "CST", "MST", "JST", "CET"];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const toggleLinkInput = () => {
    setShowLinkInput((prev) => !prev);
  };

  return (
    <Center mt={20}>
      <Flex bg={bg} p={5} w={"80%"} color={textColor}>
        <Box ml={20}>
          <HStack>
            <InputGroup>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<AddIcon color={"#0098ca"} fontSize={"bold"} />}
                  w={"20rem"}
                >
                  Add Time Zone, City or Town
                </MenuButton>
                <MenuList>
                  {timeZones.map((zone, index) => (
                    <MenuItem key={index}>{zone}</MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </InputGroup>
          </HStack>
        </Box>
        <Box ml={"10rem"}>
          <InputGroup>
            <Input
              placeholder="Select Date"
              type="date"
              onChange={handleDateChange}
              min="1900-01-01"
              max="2100-12-31"
            />
          </InputGroup>
        </Box>
        <Box ml={"5rem"} px={5} w={"25%"}>
          <HStack spacing={"20%"}>
            <a
              href="https://meet.google.com/landing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CalendarIcon cursor={"pointer"} />
            </a>
            <IoSwapVerticalSharp cursor={"pointer"} onClick={swapTimeZones} />
            <LinkIcon cursor={"pointer"} onClick={toggleLinkInput} />
            <IconButton
              aria-label="Toggle dark mode"
              icon={
                colorMode === "light" ? <MdDarkMode /> : <MdOutlineLightMode />
              }
              onClick={toggleColorMode}
              variant="ghost"
              cursor={"pointer"}
            />
          </HStack>
          {showLinkInput && (
            <InputGroup mt={2}>
              <Input placeholder="Enter link" />
            </InputGroup>
          )}
        </Box>
      </Flex>
    </Center>
  );
};

export default Navbar;

