import "./App.css";
import "./style.css";
import React, { useState, useEffect } from "react";
import TaskList from "./components/taskList";
import { useSelector } from "react-redux";
import ShowCard from "./components/showCard";
import { addParentInput, updateDragDropState } from "./redux/action";
import { useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const parentList = useSelector((state) => state.taskReducer);
  const [taskParentInput, setTaskParentInput] = useState("");
  const [parentId, setParentId] = useState("");
  const [listData, setListData] = useState([]);
  const [showBoardName, setShowBoardName] = useState(false);
  const [boardName, setBoardName] = useState("");

  // var parentid = new Date().getTime();
  let unique_id = uuid();
  let parentid = unique_id.slice(0, 6);

  // var parentid = 2;
  // console.log(taskList);

  const handleAddParent = () => {
    if (taskParentInput.length !== 0) {
      dispatch(addParentInput(parentId, taskParentInput));
      unique_id = uuid();
      parentid = unique_id.slice(0, 6);
      setParentId(parentid);
      // setParentId(parentId + 1);

      setTaskParentInput("");
    } else {
      alert("Please enter task");
    }
  };
  useEffect(() => {
    setParentId(parentid);
  }, []);

  const handleDragEnd = (results) => {
    // console.log(results);
    if (!results.destination) {
      return;
    }

    if (results.type === "mainList") {
      let [selectedRow] = parentList.splice(results.source.index, 1);
      // console.log(selectedRow);
      parentList.splice(results.destination.index, 0, selectedRow);
    } else {
      let sourceData = parentList.filter(
        (data) => data.id === results.source.droppableId
      );
      // console.log(sourceData);
      let destinationData = parentList.filter(
        (data) => data.id === results.destination.droppableId
      );
      // console.log(destinationData);
      let selectedRow;
      if (results.source.droppableId === results.destination.droppableId) {
        sourceData.map((data) => {
          [selectedRow] = data.childList.splice(results.source.index, 1);
          data.childList.splice(results.destination.index, 0, selectedRow);
        });
      } else {
        sourceData.map((data) => {
          [selectedRow] = data.childList.splice(results.source.index, 1);
          // data.childList.splice(results.destination.index, 0, selectedRow);
        });
        destinationData.map((data) => {
          data.childList.splice(results.destination.index, 0, selectedRow);
        });
      }
    }
  };

  // const handleCreateBoard = () => {
  //   setShowBoardName(true);
  // };

  return (
    <div className="App">
      {/* {showBoardName ? (
        <>
          <div
            style={{ textAlign: "left", marginLeft: "20px", marginTop: "20px" }}
          >
            <Typography style={{ fontSize: "25px", fontWeight: "bold" }}>
              {boardName}
            </Typography>
          </div>
          <div> */}
      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <Droppable
          droppableId="parentList"
          type="mainList"
          direction="horizontal"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ display: "flex", flexDirection: "row" }}
            >
              {parentList
                ? parentList.map((parentcard, index) => (
                    <TaskList
                      key={parentcard.id}
                      id={parentcard.id}
                      title={parentcard.title}
                      childList={parentcard.childList}
                      index={index}
                    />
                  ))
                : null}
              {provided.placeholder}
              <ShowCard
                taskParentInput={taskParentInput}
                setTaskParentInput={setTaskParentInput}
                handleAddParent={handleAddParent}
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* </div>
        </>
      ) : (
        <>
          <div
            style={{
              width: "300px",
              display: "flex",
              marginTop: "10px",
              marginLeft: "20px",
            }}
          >
            <TextField
              id="outlined-basic"
              autoFocus
              variant="outlined"
              className="parentText"
              placeholder="Enter board name..."
              value={boardName}
              // onBlur={(event) => handleEditParent(event)}
              // onKeyDown={(event) => handleEditParent(event)}
              onChange={(event) => setBoardName(event.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleCreateBoard}
            >
              Create
            </Button>
          </div>
        </>
      )} */}
    </div>
  );
}

export default App;
