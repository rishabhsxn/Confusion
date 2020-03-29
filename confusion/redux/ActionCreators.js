import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true))

  return fetch(baseUrl+'dishes')

  .then( response=>{
    if(response.ok){
      return response
    }
    else{
      var error = new Error('Error: '+response.status+' : '+response.statusText)
      error.response = response
      throw error
    }
  }, error=>{
    var errmess = new Error(error.message)
    throw errmess
  } )
  
  .then(response=>response.json())
  .then(dishes => dispatch(addDishes(dishes)))
  .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
})
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
})
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
})


export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl+'comments')

  .then( response=>{
    if(response.ok){
      return response
    }
    else{
      var error = new Error('Error: '+response.status+' : '+response.statusText)
      error.response = response
      throw error
    }
  }, error=>{
    var errmess = new Error(error.message)
    throw errmess
  } )
  
  .then(response=>response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)))
}

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
})
export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
})


export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true))

  return fetch(baseUrl+'promotions')

  .then( response=>{
    if(response.ok){
      return response
    }
    else{
      var error = new Error('Error: '+response.status+' : '+response.statusText)
      error.response = response
      throw error
    }
  }, error=>{
    var errmess = new Error(error.message)
    throw errmess
  } )
  
  .then(response=>response.json())
  .then(promos => dispatch(addPromos(promos)))
  .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
})
export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
})
export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
})


export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true))

  return fetch(baseUrl+'leaders')

  .then(response=>{
    if(response.ok){
      return response
    }
    else{
      var error = new Error('Error: '+response.status+':'+response.statusText)
      error.response = response
      throw error
    }
  }, error=>{
    var errmess = new Error(error.message)
    throw errmess
  })

  .then(response=>response.json())
  .then(leaders=> dispatch(addLeaders(leaders)))
  .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
})
export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
})
export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
})

export const postFavorite = (dishId) => (dispatch) => {
  setTimeout( ()=>dispatch(addFavorite(dishId)), 2000)  //simulate posting on server, then after acknowledgement add to redux store
}

export const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
})


//simulate comment 1st being added to server, acknowledgement received then only, comment is added to redux store and is displayed below the dish
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

  var newComment = comment
  newComment.dishId = dishId
  newComment.rating = rating
  newComment.author = author

  setTimeout(()=>{dispatch(addComment(newComment))}, 2000)
}

export const addComment = (newComment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newComment
})

export const deleteFavorite = (dishId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId
})