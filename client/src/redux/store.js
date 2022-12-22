import { combineReducers, configureStore} from  '@reduxjs/toolkit';

/**Llamada a reducers */
import questionReducer from './question_reducer';
import resultReducer  from './result_reducer';

const rootReducer = combineReducers({
    questions : questionReducer,
    result : resultReducer
})

/**Crear store reducer */
export default configureStore({ reducer: rootReducer});