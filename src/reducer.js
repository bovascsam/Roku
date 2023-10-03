import { combineReducers } from 'redux'

import _basicReducer from './components/basic/basicSlice'
import _shortVideosReducer from './components/shortVideos/shortVideosSlice'

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  _basic: _basicReducer,
  _shortVideoCount:_shortVideosReducer,

})

export default rootReducer
