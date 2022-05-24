import React from "react";
import Button from "@mui/material/Button";

const AddAnotherList = ({ setShowAnotherList }) => {
  return (
    <div>
      <div
        style={{
          width: "300px",
          background: "rgba(255,255,255,.2)",
          //   backgroundColor: "#EBECF0",
          borderRadius: "3px",
          padding: "15px",
          marginRight: "15px",
          marginTop: "15px",
        }}
      >
        <Button
          variant="text"
          size="large"
          style={{ color: "white", fontSize: "16px" }}
          onClick={() => setShowAnotherList(false)}
        >
          + Add another list...
        </Button>
      </div>
    </div>
  );
};

export default AddAnotherList;
