import {
  ADD_PARENT_INPUT,
  ADD_CHILD_INPUT,
  EDIT_PARENT_INPUT,
  EDIT_CHILD_INPUT,
  DELETE_CHILD_INPUT,
  DELETE_TASK,
} from "./actionTypes";
import { v4 as uuid } from "uuid";

const initialState = [
  {
    title: "ToDo",
    id: "1",
    childList: [],
  },
];

let unique_id = uuid();
let child_id = unique_id.slice(0, 6);

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PARENT_INPUT: {
      const { id, title } = action.payload;

      const addParent = {
        id: id,
        title: title,
        childList: [],
      };
      return [...state, addParent];
    }
    case ADD_CHILD_INPUT: {
      const addChild = {
        title: action.payload.title,
        id: child_id,
      };
      unique_id = uuid();
      child_id = unique_id.slice(0, 6);
      const listState = state.map((parentList) => {
        if (parentList.id === action.payload.parentid) {
          return {
            ...parentList,
            childList: [...parentList.childList, addChild],
          };
        } else {
          return parentList;
        }
      });
      return listState;
    }
    case EDIT_PARENT_INPUT: {
      const { id, title } = action.payload;
      const listState = state.map((parentList) =>
        parentList.id === id
          ? {
              id: id,
              title: title,
              childList: [...parentList.childList],
            }
          : parentList
      );
      return listState;
    }
    case EDIT_CHILD_INPUT: {
      const listState = state.map((parentList) => {
        if (parentList.id === action.payload.parentid) {
          return {
            ...parentList,
            childList: [
              ...parentList.childList.map((task) =>
                task.id === action.payload.id ? action.payload : task
              ),
            ],
          };
        } else {
          return parentList;
        }
      });
      return listState;
    }
    case DELETE_CHILD_INPUT: {
      const listState = state.map((parentList) => {
        if (parentList.id === action.payload.parentid) {
          const newlist = parentList.childList.filter(
            (task) => task.id !== action.payload.id
          );
          return {
            ...parentList,
            childList: [...newlist],
          };
        } else {
          return parentList;
        }
      });
      return listState;
    }

    case DELETE_TASK: {
      const newlist = state.filter((task) => task.id !== action.payload.id);
      return [...newlist];
    }

    default:
      return state;
  }
};
