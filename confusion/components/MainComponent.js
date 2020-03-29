import React from 'react'
import Menu from './MenuComponent'
import Dishdetail from './DishdetailComponent'
import { View, StyleSheet, ScrollView, Image, Text, ToastAndroid } from 'react-native'
import { createStackNavigator, createAppContainer, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'
import { Icon } from 'react-native-elements'

import { connect } from 'react-redux'
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from '../redux/ActionCreators'

import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'
import Login from './LoginComponent'
import NetInfo from '@react-native-community/netinfo'

const mapStateToProps = state => {
  return {
 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
  }
}

const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: ({ navigation }) => ({   // CHANGE: #1            applied to all screens in this navigator 
        headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />
      })
    },
    Dishdetail: {screen: Dishdetail}
  },
  {
    initialRouteName: 'Menu',                          //NOTE: have to set that because it have two screens.
    defaultNavigationOptions: {   // CHANGE: #1            applied to all screens in this navigator 
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
)

const HomeNavigator = createStackNavigator(
  {
    Home: {screen: Home}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />,  
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
)

const ContactNavigator = createStackNavigator(
  {
    Contact: {screen: Contact}
  }, 
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />,
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
)

const AboutNavigator = createStackNavigator(
  {
    About: {screen: About}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />,
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
)

const ReservationNavigator = createStackNavigator(
  {
    Reservation: {screen: Reservation}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />,
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
)

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: {screen: Favorites}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />,
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
)

const LoginNavigator = createStackNavigator(
  {
    Login: {screen: Login}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      headerLeft: 
        <Icon 
          name='menu' 
          size={26}
          color='white'
          onPress={ ()=>navigation.toggleDrawer() }
          iconStyle={{marginLeft: 10}}
        />,
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
)

const customDrawerContentComponent = (props) => {
  return(
    <ScrollView>
      <SafeAreaView
        forceInset={{ top: 'always', horizontal: 'never'}}
      >
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
            <Image 
              source={require('./images/logo.png')}
              style={styles.drawerImage} 
            />
          </View>
          <View style={{flex:2}}>
            <Text style={styles.drawerHeaderText}>
              Ristorante Con Fusion
            </Text>
          </View>
        </View>
        <DrawerItems {...props} activeBackgroundColor='#fff'/>

      </SafeAreaView>
    </ScrollView>
  )
}

const MainNavigator = createDrawerNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        title: 'Login',
        drawerLabel: 'Login',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='sign-in'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='home'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        drawerLabel: 'About Us',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='info-circle'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='list'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        drawerLabel: 'Contact us',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='address-card'
            type='font-awesome'
            size={22}
            color={tintColor}
          />
        )
      }
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        drawerLabel: 'My Favorites',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='heart'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        drawerLabel: 'Reserve Table',
        drawerIcon: ({tintColor}) => (
          <Icon 
            name='cutlery'
            type='font-awesome'
            size={24}
            color={tintColor}
          />
        )
      }
    }
  }, 
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: customDrawerContentComponent
  }
  
)

const MainN = createAppContainer(MainNavigator)

class Main extends React.Component{
  componentDidMount(){
    this.props.fetchDishes(),
    this.props.fetchComments(),
    this.props.fetchPromos(),
    this.props.fetchLeaders()

    NetInfo.getConnectionInfo()
      .then( (connectionInfo)=>{
        ToastAndroid.show('Initial Network Connectivity Type: '+ connectionInfo.type + ', effectiveType: '+connectionInfo.effectiveType, ToastAndroid.LONG)
      } )

    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange)
  }

  componentWillUnmount(){
    NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange)
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type){
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
        break;
      default:
        break;
    }
  }

  render(){
    return(
      <MainN />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 80
  }
})