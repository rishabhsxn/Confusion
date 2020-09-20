## Con-fusion Restaurant App
---

### About  
Con-Fusion is a mobile application for a Restaurant made with React Native, so it can run on both Android and iOS.  

##### Features:  
* `Create account` and `login`.
* Browse the `Menu`.
* See the Dishes in detail, add `Comment`, `Rate` and `Add to Favorite` a dish.
* Reserve a Table - `Notification confirmation` and `Event Creation in Calendar`.
* `Animations`.
* `Swipe Gestures`.
* Contact through e-mail or contact number.
* Detect device's `network state`.
---

### Working
* **react-redux** is used to maintain states
* json-server is used to simulate a REST API.   
* The app fetches and store data (as JSON) to the json-server.  

    ###### more: 
    `permission handling` `drawer navigation` `multiple screens` `remember me` `use camera or select from gallery` `loading` `json parsing` `redux store` `redux actions`

##### Requirements:  
* [Node.js](https://nodejs.org/en/)
* [Expo CLI](https://docs.expo.io/versions/latest/workflow/expo-cli/)  
* Any Text editor, I have used [VS Code](https://code.visualstudio.com/)  
* [json-server](https://www.npmjs.com/package/json-server)
* [Expo App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_IN) on mobile
 
---

### Installation  
1. Clone the repository and navigate into the confusion folder.
   ```bash
   $ git clone https://github.com/rishabhsxn/Confusion.git   
   ```         
2. Install the dependencies using npm.     
    ```bash
   $ npm install   
    ```  
3. To run the application on expo, execute the command   
    ```bash
   $ npm start   
    ```   
4. Copy the ip address shown by expo in terminal. (in place of yellow highlight)
   <img src="https://i.ibb.co/KsRJ9mG/Annotation-2020-03-31-004126.jpg" height="150" width="600"/>  

5. Open another terminal and navigate into json-server folder and execute (replace ip_address with ip address from step 4) 
   ```bash
   $ json-server --watch db.json -p 3001 -d 2000 -H ip_address
   ```  

6. Scan the QR code on your mobile phone with the Expo app.
---

### Demo  
  
HomeScreen&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comment-Like-Swipe&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login/SignUp
![homescreen](https://media.giphy.com/media/f8OoEYPAaJ2OFpWguO/giphy.gif)&nbsp;&nbsp;&nbsp;![dishCommentLikeSwipe](https://media.giphy.com/media/eHjMxTXVSrItUwCM9I/giphy.gif)&nbsp;&nbsp;&nbsp;![login](https://media.giphy.com/media/RK4lzhqpzcelpSFf8G/giphy.gif)    
</br>
</br>
Menu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ReserveTable&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MyFavorites    
![menu](https://media.giphy.com/media/hvMmNPyGtrgQUdEdUk/giphy.gif)&nbsp;&nbsp;&nbsp;![reserveTable](https://media.giphy.com/media/dUCKhxUiqvwvhnbJoK/giphy.gif)&nbsp;&nbsp;&nbsp;![myFavorites](https://media.giphy.com/media/cmeyFx7nIBsyaZiy2R/giphy.gif)  
</br>
</br>
ContactUs/About&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NetworkState  
![about](https://media.giphy.com/media/Q59pYVsPYSgFXssA3L/giphy.gif)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;![networkState](https://media.giphy.com/media/KZTJicSMgh2eDA96Y5/giphy.gif)
