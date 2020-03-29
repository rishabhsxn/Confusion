// it is a REDUCER

import * as ActionTypes from './ActionTypes'

const leadersInitState = {
  isLoading: true, 
  errMsg: null, 
  leaders:[]
}

export const leaders = ( state = leadersInitState , action) => {
  
  switch (action.type) {
    case ActionTypes.ADD_LEADERS:
      return {...state, isLoading: false, errMsg: null, leaders: action.payload}
  
    case ActionTypes.LEADERS_LOADING:
      return {...state, isLoading: true, errMsg: null, leaders: []}

    case ActionTypes.LEADERS_FAILED:
      return {...state, isLoading: false, errMsg: action.payload, leaders: []}
  
    default:
      return state
  }
}