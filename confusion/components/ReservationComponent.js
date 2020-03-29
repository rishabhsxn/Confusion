import React from 'react'
import { ScrollView, Text, StyleSheet, Switch, Picker, View, Button, Modal, Alert } from 'react-native'
import * as Animatable from 'react-native-animatable'
import DatePicker from 'react-native-datepicker'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'    //NOTE: this has changed
import * as Calendar from 'expo-calendar'

class Reservation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    }
  }

  obtainNotificationPermission = async() => {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    if(permission.status !== 'granted'){
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
      if(permission.status !== 'granted'){
        Alert.alert('Permission not granted to show notifications')
      }
    }
    return permission
  }

  presentLocalNotification = async(date) => {
    await this.obtainNotificationPermission()
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: `Reservation for ${date} requested`,
      ios: {
        sound: true
      },
      android: {
        sound: true,
        vibrate: true,     //REVIEW: does not work
        color: '#512DA8'   //REVIEW: does not work
      },
      
    })
  }

  obtainCalendarPermission = async() => {
    let permission = await Permissions.getAsync(Permissions.CALENDAR)
    if(permission.status !== 'granted'){
      permission = await Permissions.askAsync(Permissions.CALENDAR)
      if(permission.status !== 'granted'){
        Alert.alert('Permission not granted to access Calendar')
      }
    }

    return permission
  }

  getCalendarId = async() => {
    
    await Calendar.getCalendarsAsync()
    .then( (calArray)=>{ id = calArray.find( (val)=>{return val.title==='My calendar'} ) } )
    .catch( (error)=>{console.log('could not get calendar object, : '+error.message)} )
    id = id.id
    console.log('Id :'+id)
    return id
  }

  addReservationToCalendar = async(date) => {
    await this.obtainCalendarPermission()
    id = await this.getCalendarId()
    
    details = {}
    details.title = 'Con Fusion Table Reservation'
    details.timeZone = 'Asia/Hong_Kong'
    details.location = '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
    details.startDate = new Date(Date.parse(date))
    details.endDate = new Date(Date.parse(date)+2*60*60*1000)
    console.log('details: '+JSON.stringify(details))

    Calendar.createEventAsync(id, details)
    .then( ()=>{console.log("Event created")} )
    .catch( (error)=>{console.log("Event not saved: "+error.message)} )
  }

  handleReservation = () => {
    console.log(JSON.stringify(this.state))
    this.showAlert()
    // this.toggleModal()

  }

  showAlert = () => {
    Alert.alert('Confirm Reservation?',`Number of Guests: ${this.state.guests}\nSmoking?: ${this.state.smoking}\nData and Time: ${this.state.date}`,
    [{text:'Ok', onPress: ()=>{this.presentLocalNotification(this.state.date); this.addReservationToCalendar(this.state.date) ;this.resetForm()}}, 
     {text: 'Cancel', onPress: ()=>this.resetForm(), style: 'cancel'}], {cancelable: true})
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  resetForm = () => {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      showModal: false
    })
  }

  render(){
    return(
      <ScrollView>
        <Animatable.View animation='zoomIn' duration={2000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>No. of Guests: </Text>
            <Picker 
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={ (itemValue, itemIndex) => {this.setState({guests: itemValue})} }
            >
              <Picker.Item label='1' value='1'/>
              <Picker.Item label='2' value='2'/>
              <Picker.Item label='3' value='3'/>
              <Picker.Item label='4' value='4'/>
              <Picker.Item label='5' value='5'/>
              <Picker.Item label='6' value='6'/>
              </Picker>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-smoking: </Text>
            <Switch 
              style={styles.formItem}
              value={this.state.smoking}
              trackColor='#512DA8'
              onValueChange={ (value)=>this.setState({smoking: value}) }
            />
          </View>

          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time: </Text>
            <DatePicker 
            //iso format = YYYY-MM-DDTHH:mm:ss.sssZ
              style={{flex: 2, marginRight: 20}}
              date={this.state.date}
              format='YYYY-MM-DDTHH:mmZ'
              mode='datetime'
              placeholder='select date and time'
              minDate='2019-10-22'
              maxDate='2019-10-30'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
              }}
              onDateChange={ (date)=>{this.setState({date: date})} }
            />
          </View>

          <View style={styles.formRow}>
            <Button 
              title='Reserve'
              color='#512DA8'
              accessibilityLabel='Learn more about this purple button'
              onPress={ ()=>{this.handleReservation()} }
            />
          </View>

        </Animatable.View>

        {/* <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.showModal}
          onDismiss={ ()=> {this.toggleModal(); this.resetForm()} }
          onRequestClose={ ()=> {this.toggleModal(); this.resetForm()} }
        >
          <View style = {styles.modal}>
            <Text style = {styles.modalTitle}>Your Reservation</Text>
            <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
            <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
            <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
            
            <Button 
              onPress = {() =>{this.toggleModal(); this.resetForm()}}
              color="#512DA8"
              title="Close" 
            />
          </View>
        </Modal> */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  formItem: {
    flex: 1
  },
  formLabel: {
    flex: 2,
    fontSize: 20
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
})

export default Reservation