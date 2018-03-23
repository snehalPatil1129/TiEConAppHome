import React from 'react';
import { View, ScrollView, TouchableOpacity, Image, Dimensions, Keyboard } from 'react-native';
import { RkButton, RkText, RkChoice, RkModalImg, RkCard, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTabView, RkTheme } from 'react-native-ui-kitten';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/gradientButton';
import { scale, scaleModerate, scaleVertical } from '../../utils/scale';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Footer, Header, Title, Button, Icon, Tabs, Tab, Text, Right, Left, Body, TabHeading } from "native-base";
//import { onSignOut } from "../../auth";
//import * as Screens from '../index';
//import { Contacts, Chat, ProgramsTab, ConnectTab } from  '../index';
import { TabNavigator, TabView } from 'react-navigation'
import firebase from '../../config/firebase'

var firestoreDB = firebase.firestore();
let ShareInput = [];
let  AnswerInput = [];
export class Questions extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Questions'.toUpperCase(),
  });

  constructor(props) {
    super(props);
    this.state = { 
      currentTab: 'Home' ,
      queForm : [] 
    };
    this.onFormSelectValue = this.onFormSelectValue.bind(this);
    //this.RenderAnswerField = RenderAnswerField.bind(this);
  //  this.MultiChoice = this.MultiChoice.bind(this);
   // this.CheckBox = this.CheckBox.bind(this);
  }
componentWillMount(){
    let comRef= this;
    firestoreDB.collection("Que").doc("Survey 1").get().then(function(doc) {
            let form = doc.data();
            comRef.setState({
                queForm : form.Questions
            })
            console.log("Document data:", comRef.state);
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}

onFormSelectValue(queForm) {
   ShareInput = this.state.queForm.map(Fitem => {
       return (
        <View>
               <Text>{Fitem.QuestionTitle}</Text>
               {this.RenderAnswerField(Fitem)}
               {/* <RkTextInput type="text" placeholder={Fitem.AnswerFeild} />
               <RkChoice  selected rkType='radio star'/> */}
               </View>
       )
    });
    return ShareInput;
}

RenderAnswerField(item) {
    if (item.AnswerFeild == "Input Text") {
        AnswerInput:
        return (
            
            <RkTextInput type="text" placeholder="Answer Title" name="Answer" id={item.QueId}  />
           
        )

    } else if (item.AnswerFeild == "Mulitple Choice") {

        AnswerInput: 
        return(
            <View>
            {this.onMultiChoice(item.value, item.QueId)}
            </View>
        )
       
        
    }
    else if (item.AnswerFeild == "Check Box") {
        AnswerInput: 
        return(
            <View>
          {this.onCheckBox(item.value, item.QueId)}
            </View>
        )       
    }
    return  AnswerInput;
  }
  onMultiChoice(value , id) {
    let MultiChoice = value.map(fItem => {
      return (
          <View>
            <RkChoice  id={id}  value={fItem.Value} rkType='radio star'/>
            <Text>{fItem.Value}</Text>
            </View>
      )
    })
    return MultiChoice;
  }


  onCheckBox(value ,id) {
    let CheckBox = value.map(fItem => {
      return (
        <View>
            <RkChoice rkType='clear' id={id} value={fItem.Value} />
            <Text>{fItem.Value}</Text>
            </View>
      )
    })
    return CheckBox;
  }

    render() {
    return (
        <Container>
            {this.onFormSelectValue(this.state.queForm)}
        </Container>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
}));