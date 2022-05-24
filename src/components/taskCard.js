import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import EditModal from "./editModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { deleteChildInput } from "../redux/action";
import { Draggable } from "react-beautiful-dnd";

const useStyle = makeStyles((theme) => ({
  taskcard: {
    height: 40,
    verticalAlign: "middle",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "#f8f9fa",
    },
  },
  cardContainer: {
    display: "flex",
    textAlign: "left",
  },
  cardContainerText: {
    flexGrow: 1,
  },
}));

const TaskCard = ({ id, title, parentid, index }) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [open, setOpen] = useState(false);
  const [editChild, setEditChild] = useState("");
  const dispatch = useDispatch();

  const classes = useStyle();

  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setShowEditIcon(true);
    setOpen(true);
  };

  const handleDelete = (id, parentid) => {
    let confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete === true) {
      dispatch(deleteChildInput(id, parentid));
    }
  };

  useEffect(() => {
    setEditChild(title);
  }, []);

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            {...provided.draggableProps}
          >
            <Box mt={1}>
              <Paper elevation={1} className={classes.taskcard}>
                <div className={classes.cardContainer}>
                  <div className={classes.cardContainerText}>
                    <Box mt={1} ml={1} sx={{ fontSize: 20 }}>
                      <Typography
                        className={classes.title}
                        color="text.secondary"
                        gutterBottom
                        onMouseOver={() => setShowEditIcon(true)}
                      >
                        {title}
                      </Typography>
                    </Box>
                  </div>
                  <EditModal
                    open={open}
                    setOpen={setOpen}
                    handleClose={handleClose}
                    setEditChild={setEditChild}
                    editChild={editChild}
                    id={id}
                    parentid={parentid}
                  />

                  {showEditIcon ? (
                    <div style={{ align: "right" }}>
                      <IconButton aria-label="settings" onClick={handleOpen}>
                        <EditIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton
                        aria-label="settings"
                        onClick={() => handleDelete(id, parentid)}
                      >
                        <DeleteIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                    </div>
                  ) : null}
                </div>
              </Paper>
            </Box>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default TaskCard;
