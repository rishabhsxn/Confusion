export const DISHES_LOADING = 'DISHES_LOADING';
export const ADD_DISHES = 'ADD_DISHES';
export const DISHES_FAILED = 'DISHES_FAILED';

export const ADD_COMMENTS = 'ADD_COMMENTS';     //fetch comments from server to app
export const COMMENTS_FAILED = 'COMMENTS_FAILED';

export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';

export const LEADERS_LOADING = 'LEADERS_LOADING';
export const ADD_LEADERS = 'ADD_LEADERS';
export const LEADERS_FAILED = 'LEADERS_FAILED';

export const POST_FAVORITE = 'POST_FAVORITE';   //PURPOSE: this simulates, the fav. first being added to server and then adding fav. to the redux store
export const ADD_FAVORITE = 'ADD_FAVORITE';

export const POST_COMMENT = 'POST_COMMENT'; //PURPOSE: simulate comment being added to server and returning an acknowlegdement
export const ADD_COMMENT = 'ADD_COMMENT'; //PURPOSE: add user added comment to the redux store

export const DELETE_FAVORITE = 'DELETE_FAVORITE'  //PURPOSE: this will remove a favorite dish from favorites