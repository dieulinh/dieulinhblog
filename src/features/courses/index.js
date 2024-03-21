import { combineReducers } from "@reduxjs/toolkit";

import list from "./list";
import currentCourse from "./course";
import myCourses from "./mycourses";

export default combineReducers({
  list,
  currentCourse,
  myCourses
})