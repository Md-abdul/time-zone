import React, { useState } from "react";
import Navbar from "./Navbar";
import TimeSlider from "./TimeSlider";
import axios from "axios";

const ParentComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeZones, setTimeZones] = useState([{ timeZone: "UTC", hour: 0 }]);

  const swapTimeZones = () => {
    setTimeZones((prev) => prev.reverse());
  };

  const addTimeZone = async (zone) => {
    try {
      const response = await axios.get(
        `https://timeapi.io/api/Time/current/zone?timeZone=${zone}`
      );
      const currentTime = response.data.dateTime;
      const hour = new Date(currentTime).getUTCHours();
      setTimeZones((prev) => [...prev, { timeZone: zone, hour }]);
    } catch (error) {
      console.error("Error fetching time zone data:", error);
    }
  };

  return (
    <div>
      <Navbar
        setSelectedDate={setSelectedDate}
        swapTimeZones={swapTimeZones}
        addTimeZone={addTimeZone}
      />
      {timeZones.map((tz, index) => (
        <TimeSlider
          key={index}
          timeZone={tz.timeZone}
          utcHour={tz.hour}
          setUtcHour={(newHour) =>
            setTimeZones((prev) =>
              prev.map((tz, i) =>
                i === index ? { ...tz, hour: newHour } : tz
              )
            )
          }
          selectedDate={selectedDate}
        />
      ))}
    </div>
  );
};

export default ParentComponent;
