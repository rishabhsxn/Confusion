import React from 'react'
import { Text, FlatList, View, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'

import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'

import { deleteFavorite } from '../redux/ActionCreators'
import Swipeout from 'react-native-swipeout'

import * as Animatable from 'react-native-animatable'


const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    favorites: state.favorites.fav_id
  }
}

const mapDispatchToProps = dispatch => {
  return{
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
  }
}

class Favorites extends React.Component{

  static navigationOptions = {
    title: 'My Favorites'
  }

  render(){
    const renderFavoriteItem = ({item, index}) => {

      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => { Alert.alert('Delete Favorite?', 'Are you sure you want to delete the favorite dish '+item.name+' ?',
          [ {text: 'Ok', onPress: ()=>this.props.deleteFavorite(item.id)}, {text: 'Cancel', onPress: ()=>console.log("Deletion cancelled"), style: 'cancel'}],
          {cancelable: false}) }
        }
      ]

      return(
        <Swipeout right={rightButton} autoClose={true}>
          <Animatable.View animation='fadeInRightBig' duration={2000}>          
            <ListItem
              key={index} 
              title={item.name}
              subtitle={item.description}
              hideChevron={true}
              onPress={ ()=>{this.props.navigation.navigate('Dishdetail', {dishId: item.id})} }
              leftAvatar={{source: {uri: baseUrl+item.image}}}
            />
          </Animatable.View>
        </Swipeout>
      )
    }

    if(this.props.favorites.length === 0){
      return(
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text>No favorites.</Text>
        </View>
      )
    }

    else if(this.props.dishes.isLoading){
      return(
        <Loading />
      )
    }
    else if(this.props.dishes.errMess){
      return(
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      )
    }
    else{

      return(
        <FlatList 
          data={this.props.dishes.dishes.filter( dish => this.props.favorites.some( el => el === dish.id))}
          renderItem={renderFavoriteItem}
          keyExtractor={ item=> item.id.toString() }
        />
      )
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)