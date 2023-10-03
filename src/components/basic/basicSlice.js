const initialState = []



export default function _basicReducer(state = initialState, action) {
  switch (action.type) {
    case '_basic/_basicChanged': {
      // Can return just the new todos array - no extra object around it
      console.log("value --- ",action.payload);
      return action.payload;
    }
    // case 'todos/todoToggled': {
    //   return state.map((todo) => {
    //     if (todo.id !== action.payload) {
    //       return todo
    //     }

    //     return {
    //       ...todo,
    //       completed: !todo.completed,
    //     }
    //   })
    // }
    // case 'todos/colorSelected': {
    //   const { color, todoId } = action.payload
    //   return state.map((todo) => {
    //     if (todo.id !== todoId) {
    //       return todo
    //     }

    //     return {
    //       ...todo,
    //       color,
    //     }
    //   })
    // }
    // case 'todos/todoDeleted': {
    //   return state.filter((todo) => todo.id !== action.payload)
    // }
    // case 'todos/allCompleted': {
    //   return state.map((todo) => {
    //     return { ...todo, completed: true }
    //   })
    // }
    // case 'todos/completedCleared': {
    //   return state.filter((todo) => !todo.completed)
    // }
    default:
      return state
  }
}
