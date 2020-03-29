import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { Tile } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'

import { Loading } from './LoadingComponent'
import * as Animatable from 'react-native-animatable'

const mapStateToProps = (state) => {
  return {
    dishes : state.dishes
  }
}

class Menu extends Component { //was previously a functional component

  static navigationOptions = {
    title: 'Menu'
  }

  render() {
    const { navigate } = this.props.navigation

    const renderMenuItem = ({ item, index }) => {

      return (
        <Animatable.View animation='fadeInRightBig' duration={2000}>
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigate('Dishdetail', {dishId: item.id})}
            imageSrc={{ uri: baseUrl+item.image }}
          />
        </Animatable.View>
      )
    }

    if(this.props.dishes.isLoading){
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
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    }
  }
}



export default connect(mapStateToProps)(Menu)