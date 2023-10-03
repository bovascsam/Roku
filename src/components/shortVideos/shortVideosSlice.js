const initialState = []



export default function _shortVideosReducer(state = initialState, action) {
  switch (action.type) {
    // case '_short/_shortVideosChanged': {
    //   // Can return just the new todos array - no extra object around it
    //   return action.payload;
    // }
    case 'shortVideoCount/_shortVideoCountChanged':{
      return action.payload;
    }
   
    default:
      return state
  }
}
