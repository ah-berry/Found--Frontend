
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { fetchAllCandidatesPerStages } from '@/app/api/utilities'

const tasks = [
  { id: "1", content: "First task" },
  { id: "2", content: "Second task" },
  { id: "3", content: "Third task" },
  { id: "4", content: "Fourth task" },
  { id: "5", content: "Fifth task" }
];

const interviewStages = {
  applicationReview: {
    name: "Application Review",
    items: [],
  },
  preliminaryPhoneScreen: {
    name: "Preliminary Phone Screen",
    items: []
  },
  phoneInterview: {
    name: "Phone Interview",
    items: []
  },
  takeHomeTest: {
    name: "Take Home Test",
    items: []
  },
  interviewsPassed: {
    name: "Interviews Passed",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function App() {
  const [columns, setColumns] = useState(interviewStages);
  const [enabled, setEnabled] = useState(false);
  const [interviews, setInterviews] = useState([]);

  const fetchInterviews = async () => {
    const interviewStages = ["application_review", "preliminary_phone_screen", 
      "phone_interview", "take_home_test", "interviews_passed"];
    const interviewsData = await fetchAllCandidatesPerStages();
    setInterviews(interviewsData);
    // Print out the data structure of interviewsData to help with iteration.
    console.log('Interviews: ', interviewsData["interviews_passed"]);
    console.log('Interviews (Dot access): ', interviewsData.interviews_passed);
    for (let interviewStage in interviewStages) {
      let candidates = interviewsData[interviewStage];
      if (typeof candidates !== undefined ) {
        for (let candidate of candidates[0]) {
          console.log(candidate);
        }
      }
    }
  }

  useEffect(() => {
    fetchInterviews()
  }, [])

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%", marginTop: "100px" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
















// First Approach of Pipeline Drag and Drop
// import React, { useState } from 'react';
// import Column from './Column';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd';
// import { styled } from '@/app/stiches.config'

// const StyledColumns = styled('div', {
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr 1fr',
//   margin: '10vh auto',
//   width: '80%',
//   height: '80vh',
//   gap: '8px'
// })

// function App () {
//   const initialColumns = {
//     todo: {
//       id: 'todo',
//       list: ['item 1', 'item 2', 'item 3']
//     },
//     doing: {
//       id: 'doing',
//       list: []
//     },
//     done: {
//       id: 'done',
//       list: []
//     }
//   }
//   const [columns, setColumns] = useState(initialColumns)

//   const onDragEnd = ({ source, destination }: DropResult) => {
//     // Make sure we have a valid destination
//     if (destination === undefined || destination === null) return null

//     // Make sure we're actually moving the item
//     if (
//       source.droppableId === destination.droppableId &&
//       destination.index === source.index
//     )
//       return null

//     // Set start and end variables
//     const start = columns[source.droppableId]
//     const end = columns[destination.droppableId]

//     console.log(start)

//     // If start is the same as end, we're in the same column
//     if (start === end) {
//       // Move the item within the list
//       // Start by making a new list without the dragged item
//       const newList = start.list.filter(
//         (_: any, idx: number) => idx !== source.index
//       )

//       // Then insert the item at the right location
//       newList.splice(destination.index, 0, start.list[source.index])

//       // Then create a new copy of the column object
//       const newCol = {
//         id: start.id,
//         list: newList
//       }

//       // Update the state
//       setColumns(state => ({ ...state, [newCol.id]: newCol }))
//       return null
//     } else {
//       // If start is different from end, we need to update multiple columns
//       // Filter the start list like before
//       const newStartList = start.list.filter(
//         (_: any, idx: number) => idx !== source.index
//       )

//       // Create a new start column
//       const newStartCol = {
//         id: start.id,
//         list: newStartList
//       }

//       // Make a new end list array
//       const newEndList = end.list

//       // Insert the item into the end list
//       newEndList.splice(destination.index, 0, start.list[source.index])

//       // Create a new end column
//       const newEndCol = {
//         id: end.id,
//         list: newEndList
//       }

//       // Update the state
//       setColumns(state => ({
//         ...state,
//         [newStartCol.id]: newStartCol,
//         [newEndCol.id]: newEndCol
//       }))
//       return null
//     }
//   }

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <StyledColumns>
//         {Object.values(columns).map(col => (
//           <Column col={col} key={col.id} />
//         ))}
//       </StyledColumns>
//     </DragDropContext>
//   )
// }

// export default App
