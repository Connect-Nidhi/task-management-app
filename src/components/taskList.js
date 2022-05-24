import React, { useState, useEffect } from "react";
import TaskCard from "./taskCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addChildInput, editParentInput, deleteTask } from "../redux/action";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import { Droppable, Draggable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  listContainer: {
    width: 300,
    backgroundColor: "#EBECF0",
    borderRadius: 3,
    marginLeft: 15,
    padding: 15,
    marginRight: 15,
    marginTop: 15,
    display: "inline-block",
    minWidth: 300,
  },
  cardInput: {
    height: 40,
  },
  cardContainer: {
    display: "flex",
    textAlign: "left",
  },
  cardContainerText: {
    flexGrow: 1,
  },
}));

const TaskList = ({ id, title, childList, index }) => {
  const dispatch = useDispatch();
  const classes = useStyle();

  const [showEditParentIcon, setShowEditParentIcon] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [taskChildInput, setTaskChildInput] = useState("");
  const [taskEditParentInput, setTaskEditParentInput] = useState("");
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const handleAddChild = () => {
    if (taskChildInput.length !== 0) {
      dispatch(addChildInput(id, taskChildInput));
      setTaskChildInput("");
    } else {
      alert("Please enter task");
    }
  };

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleEditParent = (event) => {
    // if (event.key === "Enter") {
    if (taskEditParentInput === "") {
      setTaskEditParentInput(title);
      // setShowEditParentIcon(false);
    } else {
      dispatch(editParentInput(id, taskEditParentInput));
      setShowEditParentIcon(false);
    }

    // if (taskEditParentInput === "") {
    //   setTaskEditParentInput(title);
    //    setShowEditParentIcon(false);
    // } else {
    //   dispatch(editParentInput(id, taskEditParentInput));
    //   setShowEditParentIcon(false);
    // }
    // }
  };

  useEffect(() => {
    setTaskEditParentInput(title);
  }, []);

  const handleCancel = () => {
    setTaskEditParentInput(title);
  };

  const handleDelete = (id) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete === true) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            className={classes.listContainer}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            {showEditParentIcon ? (
              <>
                <div>
                  <TextField
                    id="outlined-basic"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CheckCircleIcon
                            onClick={handleEditParent}
                            style={{ cursor: "pointer" }}
                          />
                          <HighlightOffIcon
                            onClick={handleCancel}
                            style={{ cursor: "pointer" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    multiline
                    autoFocus
                    onFocus={(event) => handleFocus(event)}
                    variant="outlined"
                    className="parentText"
                    value={taskEditParentInput}
                    // onBlur={(event) => handleEditParent(event)}
                    // onKeyDown={(event) => handleEditParent(event)}
                    onChange={(event) =>
                      setTaskEditParentInput(event.target.value)
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className={classes.cardContainer}>
                  <div className={classes.cardContainerText}>
                    <span
                      className="card-title"
                      onMouseOver={() => setShowDeleteIcon(true)}
                      onClick={() => setShowEditParentIcon(true)}
                    >
                      {title}
                    </span>
                  </div>
                  {showDeleteIcon ? (
                    <IconButton
                      aria-label="settings"
                      onClick={() => handleDelete(id)}
                    >
                      <DeleteIcon style={{ fontSize: "20px" }} />
                    </IconButton>
                  ) : null}
                </div>
              </>
            )}
            <Droppable droppableId={id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {childList.map((card, index) => (
                    <TaskCard
                      key={card.id}
                      id={card.id}
                      title={card.title}
                      parentid={id}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {showCard ? (
              <>
                <div>
                  <Box mt={1}>
                    <Paper>
                      <TextField
                        id="outlined-basic"
                        multiline
                        autoFocus
                        placeholder="Enter list title..."
                        variant="outlined"
                        style={{ width: "100%", fontSize: "20px" }}
                        value={taskChildInput}
                        onChange={(event) =>
                          setTaskChildInput(event.target.value)
                        }
                      />
                    </Paper>
                  </Box>
                </div>
                <div className="div-add">
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddChild}
                  >
                    Add
                  </Button>

                  <CloseIcon
                    style={{ marginLeft: "10px" }}
                    size="large"
                    onClick={() => setShowCard(false)}
                  />
                </div>
              </>
            ) : (
              <div className="addacard">
                <Button
                  variant="text"
                  size="large"
                  onClick={() => setShowCard(true)}
                >
                  <AddIcon /> Add a card
                </Button>
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
};

export default TaskList;
