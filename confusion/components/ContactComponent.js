import React from 'react'
import { Text } from 'react-native'
import { Card, Button, Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer'

class Contact extends React.Component{

  constructor(props){
    super(props)
    this.state={
      line1: '121, Clear Water Bay Road',
      line2: 'Clear Water Bay, Kowloon',
      line3: 'HONG KONG',
      line4: 'Tel: +852 1234 5678',
      line5: 'Fax: +852 8765 4321',
      line6: 'Email:confusion@food.net'
    }
  }

  sendMail = () => {
    MailComposer.composeAsync({
      recipients: ['voldpc98@gmail.com'],
      subject: 'Test Mail',
      body: 'Hello buddy! How is it going?'
    })
  }
  
  render(){
    return(
      <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
        <Card
          title='Contact Information'    
        >
          <Text>{this.state.line1}</Text>
          <Text>{this.state.line2}</Text>
          <Text>{this.state.line3}</Text>
          <Text>{this.state.line4}</Text>
          <Text>{this.state.line5}</Text>
          <Text>{this.state.line6}</Text>
          <Button 
            title='Send Email'
            buttonStyle={{backgroundColor: '#512DA8', marginTop: 15}}
            icon={<Icon name='envelope-o' type='font-awesome' color='#fff' iconStyle={{marginRight: 5}}/>}
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    )
  }

}

export default Contact