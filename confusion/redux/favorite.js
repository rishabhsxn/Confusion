import * as ActionTypes from './ActionTypes'

const favoriteInitState = {    //PURPOSE: added this so that our state should not be mutated when removing an item from flatlist
  fav_id: []
}

export const favorites = (state=favoriteInitState, action) => {
  switch(action.type){

    case ActionTypes.ADD_FAVORITE:
      if(state.fav_id.some( id => id === action.payload )){
        return state.fav_id
      }
      else{
        return {...state, fav_id: state.fav_id.concat(action.payload) }
      }

    case ActionTypes.DELETE_FAVORITE:
      var newFavs = state.fav_id.filter( (id) => {return id !== action.payload} )
      return {...state, fav_id: newFavs}

    default:
      return state
  }
}