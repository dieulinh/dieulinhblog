import { combineReducers } from "@reduxjs/toolkit";

import list from "./list";
import course from "./course";

export default combineReducers({
  list,
  course
})