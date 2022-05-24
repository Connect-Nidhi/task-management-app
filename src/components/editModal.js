import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useDispatch } from "react-redux";
import { editChildInput } from "../redux/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal(props) {
  const { open, setOpen, handleClose, setEditChild, editChild, id, parentid } =
    props;
  const dispatch = useDispatch();

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleUpdateChild = (id) => {
    dispatch(editChildInput(id, editChild, parentid));
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            sx={{ width: "100%", marginBottom: "15px" }}
            id="outlined-basic"
            multiline
            variant="outlined"
            name="edittask"
            size="small"
            onFocus={(event) => handleFocus(event)}
            value={editChild}
            onChange={(event) => setEditChild(event.target.value)}
            // required
          />
          <Button
            variant="contained"
            size="large"
            onClick={() => handleUpdateChild(id)}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
