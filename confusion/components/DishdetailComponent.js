import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView, Modal, Button, TextInput, StyleSheet, PanResponder, Alert, Share } from 'react-native'
import { Card, Icon, Rating } from 'react-native-elements'

import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable'


const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites.fav_id               //NOTE: because of change writing the state in favorite.js reducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
  }
}

function RenderComments(props){
  const comments = props.comments

  const renderCommentItem = ({item,index}) => {
    return(
      <View key={index} style={{margin: 10}}>
        <Text style={{fontSize: 14}}>{item.comment}</Text>
        <Rating 
          readonly={true}
          startingValue={item.rating}
          imageSize={10}
          style={{alignSelf: 'flex-start', marginVertical: 5}}
        />
        <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
      </View>
    )
  }

  if(comments!= null){
    return(
      <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
        <Card title='Comments'>
          <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={ item => item.id.toString() }
          />
        </Card>
      </Animatable.View>
    )
  }
  else {
    return(<View></View>);
  }
  
}


function RenderDish(props){

  const dish = props.dish

  handleViewRef = ref => this.view = ref

  const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
    if ( dx < -200 )
      return true;
    else
      return false;
  }

  const recognizeComment = ({moveX, moveY, dx, dy}) => {
    if ( dx > 200 )
      return true
    else
      return false
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
    onPanResponderEnd: (e, gestureState) => {
      console.log("pan responder end", gestureState)
      if (recognizeDrag(gestureState))
        Alert.alert(
          'Add Favorite',
          'Are you sure you wish to add ' + dish.name + ' to favorite?',
          [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
          ],
          { cancelable: false }
        );
      else if(recognizeComment(gestureState)){
        props.onSelect()
      }

      return true;
      }
  })

  const share = (title, message, url) => {
    Share.share({
      title: title,
      message: title+' : '+message+' '+url,
      url: url
    }, {
      dialogTitle: 'Share '+title
    })
  }
  
  if (dish != null) {
    return(
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card
          featuredTitle={dish.name}
          image={{uri: baseUrl+dish.image}}
        >
          <Text style={{margin: 10}}>
            {dish.description}
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Icon
              raised
              reverse
              reverseColor='red'
              color='#fff'
              name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome'
              onPress={ () => props.favorite ? console.log('already favorite') : props.onPress() }
            />

            <Icon 
              raised
              reverse
              color='#512DA8'
              name='pencil'
              type='font-awesome'
              onPress={ ()=>props.onSelect() }
            />

            <Icon 
              raised
              reverse
              color='#51D2A8'
              name='share'
              type='font-awesome'
              onPress={ ()=> share( dish.name, dish.description, baseUrl+dish.image) }
            />
            
          </View>
        </Card>
      </Animatable.View>
    )
  }
  else {
    return(<View></View>);
  }
}


class Dishdetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      comment: '',
      author: '',
      rating: 5
    }
  }

  toggleModal = () => {
    console.log(JSON.stringify(this.state))
    this.setState({showModal: !this.state.showModal})
  }

  resetCommentForm = () => {
    this.setState({
      showModal: false,
      comment: '',
      author: '',
      rating: 5
    })
  }


  postNewComment = (dishId, rating, author, comment) => {
    this.props.postComment(dishId, rating, author, comment)
  }

  handleComment = () => {
    var date = new Date();
    date = date.toISOString()

    var comment = {}
    comment.comment = this.state.comment
    comment.date = date
    const dishId = this.props.navigation.getParam('dishId', '')
    this.postNewComment(dishId, this.state.rating, this.state.author, comment)
    this.toggleModal()
  }

  static navigationOptions = {
    title: 'Dish Details'
  }

  addFavourite = (dishId) => {
    this.props.postFavorite(dishId)
  }

  render(){
    const dishId = this.props.navigation.getParam('dishId', '')

    return(
      <ScrollView>
        <RenderDish 
          dish={this.props.dishes.dishes[+dishId]} 
          favorite={this.props.favorites.some( (element) => element === dishId )}
          onPress={ () => this.addFavourite(dishId) }
          onSelect={ () => this.toggleModal() } 
        />

        <RenderComments comments={this.props.comments.comments.filter( (comment) => comment.dishId === dishId )} />

        <Modal
          animationType='fade'
          transparent={false}
          visible={this.state.showModal}
          onDismiss={ ()=>{this.toggleModal(); this.resetCommentForm()} }
          onRequestClose={ ()=>{this.toggleModal(); this.resetCommentForm()} }
        >
          <Rating 
            imageSize={20}
            ratingCount={5}
            startingValue={this.state.rating}
            showRating={true}
            style={{marginTop: 15}}
            onFinishRating={ (ratingVal)=>{this.setState({rating: ratingVal})} }
          />

          <View style={[styles.labelContainer, {marginTop: 15}]}>
            <Icon 
              name='user-o'
              type='font-awesome'
              containerStyle={{margin: 5}}
            />
            <TextInput 
              placeholder='Author'
              style={{flex:1, marginLeft: 2}}
              onChangeText={ (value)=>{this.setState({author: value})} }
            />
          </View>

          <View style={styles.labelContainer}>
            <Icon 
              name='comment-o'
              type='font-awesome'
              containerStyle={{margin: 5}}
            />
            <TextInput 
              placeholder='Comment'
              style={{flex:1}}
              onChangeText={ (value)=>{this.setState({comment: value})} }
            />
          </View>

          <View
            style={{margin: 20, justifyContent: 'space-evenly', height: 110}}
          >

            <Button 
              title='SUBMIT'
              color='#512DA8'
              onPress={ ()=>{this.handleComment(); this.resetCommentForm()} }
              
            />
            <Button 
              title='CANCEL'
              color='#808080'
              onPress={ ()=>{this.toggleModal(); this.resetCommentForm()} }
            />

          </View>

        </Modal>
      </ScrollView>
    )
  }
  
}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail)

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#696969',
    marginHorizontal: 10,
    marginVertical: 6
  },
  labelItems: {

  }
})