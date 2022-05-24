export const addParentInput = (parentid, title) => {
  return {
    type: "ADD_PARENT_INPUT",
    payload: {
      id: parentid,
      title: title,
    },
  };
};

export const addChildInput = (parentid, title) => {
  return {
    type: "ADD_CHILD_INPUT",
    payload: {
      parentid: parentid,
      title: title,
    },
  };
};

export const editParentInput = (id, title) => {
  return {
    type: "EDIT_PARENT_INPUT",
    payload: {
      id: id,
      title: title,
    },
  };
};

export const editChildInput = (id, title, parentid) => {
  return {
    type: "EDIT_CHILD_INPUT",
    payload: {
      id: id,
      title: title,
      parentid: parentid,
    },
  };
};

export const deleteChildInput = (id, parentid) => {
  return {
    type: "DELETE_CHILD_INPUT",
    payload: {
      id: id,
      parentid: parentid,
    },
  };
};

export const deleteTask = (id) => {
  return {
    type: "DELETE_TASK",
    payload: {
      id: id,
    },
  };
};
