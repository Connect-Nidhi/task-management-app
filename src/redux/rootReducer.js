import { taskReducer } from "./taskReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  taskReducer: taskReducer,
});

export default rootReducer;
