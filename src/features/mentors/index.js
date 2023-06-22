import { combineReducers } from "@reduxjs/toolkit";

import list from "./list";
import mentor from "./mentor";

export default combineReducers({
    list,
    mentor,
})