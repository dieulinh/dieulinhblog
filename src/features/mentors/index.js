import { combineReducers } from "@reduxjs/toolkit";

import list from "./list";
import mentor from "./mentor";
import search from "./search-form";
import bookMentor from "./book-mentor";

export default combineReducers({
    search,
    list,
    mentor,
    bookMentor
})