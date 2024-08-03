import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import TimeSlider from "./Components/TimeSlider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = () => {
  const [utcHour, setUtcHour] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sliders, setSliders] = useState([
    { id: "utc", label: "UTC" },
    { id: "ist", label: "IST" },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sliders);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSliders(items);
  };

  const swapTimeZones = () => {
    setSliders((prevSliders) => [...prevSliders].reverse());
  };

  return (
    <>
      <Navbar setSelectedDate={setSelectedDate} swapTimeZones={swapTimeZones} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sliders">
          {(provided) => (
            <Box
              ref={provided.innerRef}
              {...provided.droppableProps}
              width="full"
              margin="auto"
            >
              {sliders.map((slider, index) => (
                <Draggable
                  key={slider.id}
                  draggableId={slider.id}
                  index={index}
                >
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      mb={4}
                    >
                      <TimeSlider
                        timeZone={slider.label}
                        utcHour={utcHour}
                        setUtcHour={setUtcHour}
                        selectedDate={selectedDate}
                      />
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default App;
