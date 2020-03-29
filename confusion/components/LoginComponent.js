import React from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Input, CheckBox, Button, Icon } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { createBottomTabNavigator } from 'react-navigation'
import { baseUrl } from '../shared/baseUrl'

class LoginTab extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      remember: false
    }
  }
  
  componentDidMount(){
    this.props.navigation.addListener('didFocus', ()=>this.getUserInfo())
  }

  getUserInfo = () => {
    SecureStore.getItemAsync('userInfo')
    .then( (userdata)=>{ 
      let userinfo = JSON.parse(userdata)
      if(userinfo){
        this.setState({username: userinfo.username, password: userinfo.password, remember: false})
      }
    })
    .catch( (error)=>{console.log("Error: "+error)} )
  }

  static navigationOptions = {
    title: 'Login',
    tabBarIcon: ({tintColor}) => (
      <Icon 
        name='sign-in'
        type='font-awesome'
        size={24}
        iconStyle={{color: tintColor}}
      />
    )
  }

  handleLogin = () => {
    console.log(JSON.stringify(this.state))

    if(this.state.remember){
      SecureStore.setItemAsync('userInfo', JSON.stringify({username: this.state.username, password: this.state.password}))
      .catch( (error)=>{ console.log("Cannot save userdata on storage: "+error) } )
    }
    else{
      SecureStore.deleteItemAsync('userInfo')
      .catch( (error)=>{ console.log("Cannot delete userdata on storage: "+error) })
    }

    this.resetState()

  }

  resetState = () =>{
    this.setState({
      username: '',
      password: '',
      remember: false
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Input 
          placeholder='Username'
          leftIcon={{ type: 'font-awesome', name: 'user-o', iconStyle: {marginRight: 5}}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input 
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'key', iconStyle: {marginRight: 5}}}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox 
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({remember: !this.state.remember})}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={
              <Icon 
                name='sign-in'
                type='font-awesome'
                size={24}
                color='#fff'
                iconStyle={{marginRight: 5}}
              />
            }
            buttonStyle={{
              backgroundColor: '#512DA8'
            }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate('Register')}
            title="Register"
            clear
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'            
                size={24}
                color= 'blue'
                iconStyle={{marginRight: 5}}
              />
            }
            titleStyle={{
              color: "blue"
            }}
          />
        </View>
      </View>
    )
  }

}

class RegisterTab extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png'
    }
  }

  static navigationOptions = {
    title: 'Register',
    tabBarIcon: ({tintColor, focused}) => (
      <Icon 
        name='user-plus'
        type='font-awesome'
        size={24}
        iconStyle={{color: tintColor}}
      />
    )
  }

  getImageFromCamera = async() => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
    const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)  //fo iOS

    if( cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 4]
      })
      if(!capturedImage.cancelled){
        console.log(capturedImage)
        this.processImage(capturedImage.uri)
      }
    }
  }

  getImageFromGallery = async() => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 4],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if( !pickedImage.cancelled ){
      console.log(pickedImage)
      this.processImage(pickedImage.uri)
    }
  }

  processImage = async(imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(imageUri, [ { resize: {width: 300} } ], { format: 'png' })
    console.log(processedImage)
    this.setState({imageUrl: processedImage.uri})
  }

  handleRegister = () => {
    console.log(JSON.stringify(this.state))
    if(this.state.remember){
      SecureStore.setItemAsync('userInfo', JSON.stringify({username: this.state.username, password: this.state.password}))
      .catch( (error)=>{ console.log("Cannot save userdata on storage: "+error) } )
    }

    this.resetState()
  }

  resetState = () => {
    this.setState({
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png'
    })
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image 
              source={{uri: this.state.imageUrl}} 
              loadingIndicatorSource={require('./images/logo.png')}
              style={styles.image} 
            />
            <Button
              title="Camera"
              onPress={this.getImageFromCamera}
            />
            <Button
              title='Gallery'
              onPress={this.getImageFromGallery}
            />
          </View>
          <Input
            placeholder="Username"
            leftIcon={{ type: 'font-awesome', name: 'user-o', iconStyle: {marginRight: 5} }}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: 'font-awesome', name: 'key', iconStyle: {marginRight: 5} }}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="First Name"
            leftIcon={{ type: 'font-awesome', name: 'user-o', iconStyle: {marginRight: 5} }}
            onChangeText={(firstname) => this.setState({firstname})}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: 'font-awesome', name: 'user-o', iconStyle: {marginRight: 5} }}
            onChangeText={(lastname) => this.setState({lastname})}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope-o', iconStyle: {marginRight: 5} }}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            containerStyle={styles.formInput}
          />
          <CheckBox title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({remember: !this.state.remember})}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
              <Button
                onPress={() => this.handleRegister()}
                title="Register"
                icon={
                  <Icon
                    name='user-plus'
                    type='font-awesome'            
                    size={24}
                    color= 'white'
                    iconStyle={{marginRight: 5}}
                  />
                }
                buttonStyle={{
                  backgroundColor: "#512DA8"
                }}
              />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const Login = createBottomTabNavigator({
  Login: LoginTab,
  Register: RegisterTab
},{
  tabBarOptions: {
    activeBackgroundColor: '#512DA8',
    inactiveBackgroundColor: '#D1C4E9',
    activeTintColor: '#fff',
    inactiveTintColor: 'gray'
  }
})

export default Login

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20,
  },
  formInput: {
    marginVertical: 9
  },
  formCheckbox: {
    marginVertical: 8,
    backgroundColor: null
  },
  formButton: {
    marginVertical: 10
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between'
  },
  image: {
    margin: 10,
    width: 60,
    height: 80
  }

})