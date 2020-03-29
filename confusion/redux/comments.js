// it is a REDUCER

import * as ActionTypes from './ActionTypes'

const commentsInitState = {
  errMsg: null,
  comments: []
}

export const comments = ( state = commentsInitState, action) => {
  
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMsg: null, comments: action.payload}
      
    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMsg: action.payload, comments: []}

    case ActionTypes.ADD_COMMENT:
      var id = state.comments.length
      action.payload.id = id
      return {...state, errMsg: null, comments: state.comments.concat(action.payload)}
  
    default:
      return state
  }
}