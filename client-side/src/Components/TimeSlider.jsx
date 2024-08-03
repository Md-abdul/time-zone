import React from "react";
import Slider from "react-slider";
import { Box, Text, VStack, Flex, Input, HStack } from "@chakra-ui/react";
import moment from "moment-timezone";

const TimeSlider = ({ timeZone, utcHour, setUtcHour, selectedDate }) => {
  const isUTC = timeZone === "UTC";
  const offset = isUTC ? 0 : 5.5;
  const timeZoneLabel = isUTC ? "UTC" : "IST";
  const timeZoneDesc = isUTC
    ? "Universal Time Coordinated"
    : "Indian Standard Time";
  const timeZoneGMT = isUTC ? "GMT +0" : "GMT +5:30";
  const hour = (utcHour + offset) % 24;

  const formatTime = (hour, format = "hh:mm A") => {
    const totalMinutes = hour * 60;
    const h = Math.floor(totalMinutes / 60);
    const m = Math.floor(totalMinutes % 60);
    return moment
      .utc({ hour: h, minute: m })
      .add(offset, "hours")
      .format(format);
  };

  const handleChange = (value) => {
    const utcValue = (value - offset + 24) % 24;
    setUtcHour(utcValue);
  };

  const formattedDate = moment(selectedDate).format("ddd, MMM D");

  return (
    <VStack
      spacing={5}
      width="80%"
      margin="auto"
      p={10}
      border={"1px solid black"}
      mt={4}
    >
      <Flex justifyContent="space-between" alignItems="center" width="full">
        <Box ml={5}>
          <Text fontSize="xl" fontWeight="bold" textAlign={"start"}>
            {timeZoneLabel}
          </Text>
          <Text fontSize="sm">{timeZoneDesc}</Text>
        </Box>
        <Box textAlign="right" mr={5}>
          <Input
            fontSize={"2xl"}
            fontWeight={"bold"}
            value={formatTime(hour)}
            isReadOnly
            cursor="pointer"
            textAlign="center"
            width="15rem"
            marginRight={2}
          />
          <Flex gap={"40%"}>
            <Text fontSize="sm">{timeZoneGMT}</Text>
            <Text fontSize="sm">{formattedDate}</Text>
          </Flex>
        </Box>
      </Flex>

      <Box width="full" padding={4} position="relative" mt={-5}>
        <Slider
          min={0}
          max={24}
          step={0.25}
          value={hour}
          onChange={handleChange}
          renderThumb={(props) => (
            <Box
              {...props}
              width="16px"
              height="24px"
              backgroundColor="blue.500"
              borderRadius="md"
              cursor="pointer"
            />
          )}
          renderTrack={(props, { index }) => (
            <Box
              {...props}
              height="15px"
              backgroundColor={index === 0 ? "blue.300" : "gray.200"}
              mt={1}
            />
          )}
        />
        <HStack
          justifyContent="space-between"
          width="full"
          position="absolute"
          top="100%"
          mt={2}
        >
          {[
            "12 AM",
            "3 AM",
            "6 AM",
            "9 AM",
            "12 PM",
            "3 PM",
            "6 PM",
            "9 PM",
          ].map((label, index) => (
            <Text key={index} fontSize="xs" mr={5}>
              {label}
            </Text>
          ))}
        </HStack>
      </Box>
    </VStack>
  );
};

export default TimeSlider;

