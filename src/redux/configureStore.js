import { createStore, combineReducers, compose } from "redux";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Promotions } from "./promotions";
import { Leaders } from "./leaders";
const initState = {};
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(
      {
        dishes: Dishes,
        comments: Comments,
        promotions: Promotions,
        leaders: Leaders,
      },
      initState,
      compose(
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )
  );

  return store;
};
