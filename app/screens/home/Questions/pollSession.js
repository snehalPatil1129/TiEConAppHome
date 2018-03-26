import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity,Keyboard, Alert,AsyncStorage } from 'react-native';
import { RkComponent, RkTheme, RkText, RkAvoidKeyboard,RkButton, RkCard, RkTextInput } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';

import AskQuestions from './Questions/askQuestions';
import Survey from './Questions/Survey';
import { PieChart } from 'react-native-svg-charts'
import firebase from '../../../config/firebase'
var firestoreDB = firebase.firestore();
export  class PollSession extends React.Component {
  static navigationOptions = {
    title: 'PollSession'.toUpperCase()
  };
  constructor(props) {
    super(props);
    console.log("SessionID", this.props.navigation.state.params.sessionId);
    this.state ={
      sessionId : this.props.navigation.state.params.sessionId,
      Question : "Are you coming to Pune ?",
      Value : ["Yes", "No"],
      Response : "",
      PositiveResponse : "",
      NegativeResponse : "",
      ShowGraph : false,
      FeedBackGiver : ""
    }
  }
  componentWillMount (){
    let thisRef =this;
    AsyncStorage.getItem("USER_DETAILS").then((userDetails)=>{
      let user = JSON.parse(userDetails)
      let Name = user.firstName + " " + user.lastName;
        thisRef.setState({
            FeedBackGiver : Name
        })
     })
     .catch(err => {
       console.warn('Errors');
     });
  }

  onChange =(id) => {
      var Response = this.state.Value[id];
      this.setState({
          Response :Response
      })
  }

  onSubmit = () =>{
      let compRef = this;
      if(this.state.Response !== ""){
        firestoreDB.collection("Feedback_Responses")
        .add({
            Question : compRef.state.Question,
            Response : compRef.state.Response,
            Date : new Date(),
            FeedBackGiver : compRef.state.FeedBackGiver,
            sessionId: compRef.state.sessionId
        })
        .then(function (docRef){
            compRef.setState({
                Response : "",
                ShowGraph :true
            })
            compRef.GetPollData();
        })
        .catch(function(error){
        });
      }
      else{
        Alert.alert("Please give feedback");
      }
  }
  GetPollData = () => {
      this.state.Value.map(fItem =>{
          if(fItem == "Yes"){
            firestoreDB.collection("Feedback_Responses")
            .where("Response" , "==", "Yes")
            .get()
            .then(function (docRef){
                compRef.setState({
                    PositiveResponse : docRef.docs.length
                })
            })
            .catch(function(error){
            });
          }
          else{
            firestoreDB.collection("Feedback_Responses")
            .where("Response" , "==", "No")
            .get()
            .then(function (docRef){
                compRef.setState({
                    NegativeResponse : docRef.docs.length
                })
            })
            .catch(function(error){
            });
          }
      })
  }

  render() {
    const data = [
        {
            key: 1,
            amount: parseInt(this.state.PositiveResponse),
            svg: { fill: 'green' },
        },
        {
            key: 2,
            amount: parseInt(this.state.NegativeResponse),
            svg: { fill: 'red' }
        }
    ]
      if(this.state.ShowGraph == false){
        return (
            
                    <View>
                        <Text>{this.state.Question}</Text>
                        <RkChoiceGroup radio style= {{marginTop :3 ,marginBottom: 3}}  onChange={(id) => {this.onChange(id)}} >
                        <TouchableOpacity choiceTrigger >
                                <View style={{ flexDirection: 'row',marginBottom: 3,marginRight :15 ,alignItems: 'center' }}>
                                    <RkChoice rkType='radio'
                                        style={{ backgroundColor: '#adafb2' }}
                                        id="Yes" value="Yes"
                                        />
                                    <Text>Yes</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity choiceTrigger >
                                <View style={{ flexDirection: 'row',marginBottom: 3,marginRight :15 ,alignItems: 'center' }}>
                                    <RkChoice rkType='radio'
                                        style={{ backgroundColor: '#adafb2' }}
                                       
                                        id="No" value="No"
                                        />
                                    <Text>No</Text>
                                </View>
                            </TouchableOpacity>
                            </RkChoiceGroup>
                            <RkButton rkType='success' style={{ alignSelf: 'center', width: 340  }} onPress={() => this.onSubmit()}> Submit </RkButton>
            
                        </View>
               
                );
      }
      else{
        return (
            <PieChart
                style={{ height: 200 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'95%'}
                renderDecorator={({ item, pieCentroid, index }) => (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {item.amount}
                    </Text>
                )}

            />
            
        )
      }
   
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.screen.base
  },
}));
 //   <Tabs style={{ elevation: 3 }}>
    //     <Tab
    //       heading={
    //         <TabHeading><Icon name="question"/><Text>FeedBack</Text></TabHeading>
    //       }
    //     >
    //     <Text>Hello feedback</Text>
    //     </Tab>
    //   </Tabs>