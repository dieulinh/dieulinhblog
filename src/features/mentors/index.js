import { combineReducers } from "@reduxjs/toolkit";

import list from "./list";
import mentor from "./mentor";
import search from "./search-form";

export default combineReducers({
    search,
    list,
    mentor,
})