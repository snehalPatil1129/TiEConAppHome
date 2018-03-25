import React from 'react';
import { Text, View,ScrollView ,Label} from 'native-base';
import { StyleSheet, FlatList, TouchableOpacity,Keyboard, Alert,AsyncStorage } from 'react-native';
import { RkComponent, RkTheme, RkText, RkAvoidKeyboard,RkButton, RkCard, RkChoice,RkTextInput,RkChoiceGroup } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';

import { Service } from '../../../services';
import ReactMoment from 'react-moment';
import Moment from 'moment';
import { Avatar } from '../../../components';
import firebase from '../../../config/firebase'

var firestoreDB = firebase.firestore();
let ShareInput = [];
let AnswerInput = [];
let QueArray = [];
let form  = [];
export default class PollSession extends RkComponent {

    constructor(props) {
        super(props);
        this.state = {
            queForm : [],
            askedBy : ""
        }
        this.onFormSelectValue = this.onFormSelectValue.bind(this);
    }
    componentWillMount(){
        this.getForm();
    
        let thisRef =this;
        AsyncStorage.getItem("USER_DETAILS").then((userDetails)=>{
          let user = JSON.parse(userDetails)
          let Name = user.firstName + " " + user.lastName;
            thisRef.setState({
                askedBy : Name
            })
           // thisRef.fetchForm();
         })
         .catch(err => {
           console.warn('Errors');
         });

         
         
      }

    getForm = () => {
        let thisRef =this;
        firestoreDB.collection("QuestionsForm").doc("fzEbwY1XHROtpw7HF8du").get().then(function (doc) {
             form = doc.data();
             thisRef.setState({
                queForm : form.Questions
            })
             console.log("form",form);
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    onSubmit = () => {
        console.log('event',this.state);
        let compRef = this; 
        firestoreDB.collection('SessionPolls').add({
            Responses : compRef.state.Question,
            pollBy : compRef.state.askedBy
        })
        .then(function(docRef) {
           compRef.setState({
               Question : ""
           })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }
    onFormSelectValue = (queForm) => {
        console.log("FORMNEW" ,this.state.queForm);
        ShareInput = this.state.queForm.map(Fitem => {

            QueArray.push({Question : Fitem.QuestionTitle , Answer: ""});
            return (
                <View >
                    <Label style={{ flexDirection: 'row', alignItems: 'center' }}>Que.{Fitem.QueId} :{Fitem.QuestionTitle}</Label>
                    {this.RenderAnswerField(Fitem)}
                </View>
            )
        });
        return ShareInput;
    }

    RenderAnswerField = (item) => {
        if (item.AnswerFeild == "Input Text") {
            AnswerInput:
            return (
                <RkTextInput type="text" placeholder="Answer Title" name="Answer"  onChangeText={(text) => this.onChange(text, item.QueId)}  id={item.QueId} />
            )
        } else if (item.AnswerFeild == "Mulitple Choice") {
            AnswerInput:
            return (
                <RkChoiceGroup radio  onChange={(id,value) => console.log('id: ', id,value)} >
                    {this.onMultiChoice(item.value, item.QueId)}
                </RkChoiceGroup>
            )
        }
        else if (item.AnswerFeild == "Check Box") {
            AnswerInput:
            return (
                <RkChoiceGroup   >
                    {this.onCheckBox(item.value, item.QueId)}
                </RkChoiceGroup >
            )
        }
        return AnswerInput;
    }
    onMultiChoice = (value, id) => {
        let MultiChoice = value.map(fItem => {
            return (
                <TouchableOpacity  choiceTrigger >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <RkChoice rkType='radio'
                        style={{backgroundColor : '#adafb2'}}
                        id={id} value={fItem.Value}
                        onPress={(id,value) => console.log('id: ', id,value)}  />
                        <Text>{fItem.Value}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return MultiChoice;
    }


    onCheckBox = (value, id)  => {
        let CheckBox1 = value.map(fItem => {
            return (
                // <TouchableOpacity choiceTrigger style={{marginTop : 1}}>
                    <View style={{ flexDirection: 'row', marginTop : 1,alignItems: 'center' }}>
                    <RkChoice rkType='clear'
                        id={id} value={fItem.Value} />
                        <Text>{fItem.Value}</Text>
                    </View>
                // </TouchableOpacity>
            )
        })
        return CheckBox1;
    }

    onChange = (text, id) => {
        QueArray[id].Answer = text;
        console.log('value', QueArray);
    }
    
    render() {
        return (
            
            <RkAvoidKeyboard
                onStartShouldSetResponder={(e) => true}
                onResponderRelease={(e) => Keyboard.dismiss()}>
            
                    {this.onFormSelectValue(this.state.queForm)}
                    <RkButton rkType='dark' 
                     style={{  alignSelf : 'center' ,width : 340  }}
                    onPress= {() => this.onSubmit()}>SUBMIT</RkButton>
            
            </RkAvoidKeyboard>
             
);
    }
}

/** * Component Styling Details */
// const styles = StyleSheet.create ({
//    header : {
//        flex : 1,
//        flexDirection : 'column'
//    },
//    mainHeader:{
//        flex : 1,
//        flexDirection : 'row',
//        justifyContent: 'space-between',
//    },
//    roomName:{
//        fontSize: 15,
//        color : '#C9C9C9'
//    },
//    headerText : {
//        fontWeight: 'bold',
//        fontSize: 25
//    },
//    actionBtn : {
//        width: 85,
//        height: 20,
//        alignSelf: 'flex-end'
//    },
//    avatar : {
//        backgroundColor : '#C0C0C0',
//        width: 40,
//        height: 40,
//        borderRadius: 20,
//        textAlign: 'center',
//        fontSize: 20,
//        textAlignVertical: 'center' ,
//        marginRight:5
//    },
//    speakerName: {
//        textAlignVertical: 'center',
//        fontStyle:'italic',
//        fontSize: 15
//    }
// });