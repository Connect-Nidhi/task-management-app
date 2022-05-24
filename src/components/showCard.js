import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddAnotherList from "./addAnotherList";

const ShowCard = ({ taskParentInput, setTaskParentInput, handleAddParent }) => {
  const [showAnotherList, setShowAnotherList] = useState(false);
  return (
    <>
      {showAnotherList ? (
        <AddAnotherList setShowAnotherList={setShowAnotherList} />
      ) : (
        <div className="listCard">
          <div>
            <Card className="input-title">
              <TextField
                id="outlined-basic"
                multiline
                autoFocus
                placeholder="Enter list title..."
                // onBlur={() => setShowCard(false)}
                variant="outlined"
                style={{ width: "100%", fontSize: "20px" }}
                value={taskParentInput}
                onChange={(event) => setTaskParentInput(event.target.value)}
              />
            </Card>
          </div>
          <div className="div-add">
            <Button variant="contained" size="large" onClick={handleAddParent}>
              Add
            </Button>

            <CloseIcon
              style={{ marginLeft: "10px" }}
              size="large"
              onClick={() => setShowAnotherList(true)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShowCard;
