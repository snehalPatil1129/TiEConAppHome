import React from 'react';
import {ScrollView} from 'react-native';
import { Text, View, Icon, Container, Label } from 'native-base';
import { StyleSheet, FlatList, TouchableOpacity, Keyboard, Alert, AsyncStorage,ActivityIndicator } from 'react-native';
import { RkComponent, RkTheme,RkStyleSheet, RkText, RkAvoidKeyboard, RkButton, RkCard, RkChoice, RkTextInput, RkChoiceGroup } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';
import ReactMoment from 'react-moment';
import firebase from '../../config/firebase'

var firestoreDB = firebase.firestore();

export class Questions extends React.Component {
    static navigationOptions = {
        title: 'Questions'.toUpperCase()
      };
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {
            questionsForm: [],
            userId: this.props.userId,
            responses : [],
            queArray : []
        }
        this.onFormSelectValue = this.onFormSelectValue.bind(this);
        this.onMultiChoiceChange = this.onMultiChoiceChange.bind(this);
    }
    componentWillMount() {
        this.getForm();
    }
    getForm = () => {
        let thisRef = this;
        firestoreDB.collection("QuestionsForm").doc("fzEbwY1XHROtpw7HF8du").get().then(function (doc) {
            let form = doc.data();
            thisRef.setState({
                questionsForm: form.Questions
            })
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    onSubmitResponse = () => {
        this.state.queArray.forEach(fItem => {
            if (fItem.Answer.size >= 1)
                fItem.Answer = Array.from(fItem.Answer);
        })
        this.setState({
            responses: this.state.queArray,
        })
        let thisRef = this;
        firestoreDB.collection('QuestionsHome').add({
            Responses: thisRef.state.queArray,
            ResponseBy: thisRef.state.userId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function (docRef) {
            Alert.alert("Thanks for your response");
            // thisRef.navigation.navigate('GridV2');
            thisRef.navigation.navigate('HomeMenu');
            
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }
    onFormSelectValue = (questionsForm) => {
        let renderQuestions = this.state.questionsForm.map(Fitem => {
            this.state.queArray.push({ Question: Fitem.QuestionTitle, Answer: new Set() });
            return (
                    <View style={{ marginLeft: 10 ,marginBottom :10}}>
                        <Label style={{ flexDirection: 'row', fontFamily: RkTheme.current.fonts.family.regular, alignItems: 'center', marginTop: 3, marginBottom: 2, fontSize: 20 }}>Que.{Fitem.QueId} :{Fitem.QuestionTitle}</Label>
                        {this.renderAnswerField(Fitem)}
                    </View>
            )
        });
        return  renderQuestions;
    }
    renderAnswerField = (item) => {
        let answerInput = [];
        if (item.AnswerFeild == "Input Text") {
           answerInput :
            return (
                <RkTextInput type="text" placeholder="Answer Title" name="Answer" onChangeText={(text) => this.onTextChange(text, item.QueId)} id={item.QueId} />
            )
        } else if (item.AnswerFeild == "Mulitple Choice") {
            answerInput:
            return (
                <RkChoiceGroup radio style={{ marginTop: 3, marginBottom: 3 }} onChange={(id) => { this.onMultiChoiceChange(item.value, item.QueId, id) }} >
                    {this.onRenderMultiChoice(item.value, item.QueId)}
                </RkChoiceGroup>
            )
        }
        else if (item.AnswerFeild == "Check Box") {
            answerInput:
            return (
                <RkChoiceGroup style={{ marginTop: 3, marginBottom: 3 }}>
                    {this.onRenderCheckBox(item.value, item.QueId)}
                </RkChoiceGroup >
            )
        }
       return  answerInput;
    }
    onRenderMultiChoice = (value, Qid) => {
        let MultiChoice = value.map(fItem => {
            return (
                <TouchableOpacity choiceTrigger >
                    <View style={{ flexDirection: 'row',marginBottom: 3,marginRight :15 ,alignItems: 'center' }}>
                        <RkChoice rkType='radio'
                            style={{ backgroundColor: '#adafb2' }}
                            id={Qid} value={fItem.Value}
                            />
                        <Text>{fItem.Value}</Text>
                    </View>
                </TouchableOpacity>
            )
        })
        return MultiChoice;
    }
    onRenderCheckBox = (value, Qid) => {
        let CheckBox1 = value.map(fItem => {
            return (
                <View style={{ flexDirection: 'row', marginBottom: 3,marginRight :15 ,marginTop: 1, alignItems: 'center' }}>
                    <RkChoice rkType='clear'
                        id={Qid} value={fItem.Value} 
                        onChange={(id) => {this.onCheckBoxChange(id ,fItem.Value,Qid)}} />
                    <Text>{fItem.Value}</Text>
                </View>
            )
        })
        return CheckBox1;
    }
    onCheckBoxChange = (eventValue , value, Qid) => {
        let label = value;
        if(this.state.queArray[Qid].Answer.has(label)){
            this.state.queArray[Qid].Answer.delete(label);
        }
        else{
            this.state.queArray[Qid].Answer.add(label);
        }
    }
    onMultiChoiceChange = (values, Qid, eventId) => {
        this.state.queArray[Qid].Answer = values[eventId].Value;
    }
    onTextChange(text, Qid) {
        this.state.queArray[Qid].Answer = text;
    }
    render() {
        if (this.state.questionsForm.length == 0 ){
            return (
                <ActivityIndicator size="small" color="#00ff00" />
                // <Text style={{fontSize : 20 ,alignSelf: 'center' ,marginTop : 200}} ><Icon name="ios-sync"/>  Loading... </Text>
            );
        }
        else{
            return (
                <Container>
                    <ScrollView>
                    {this.onFormSelectValue(this.state.questionsForm)}
                    <RkButton rkType='success'
                        style={{ alignSelf: 'center', width: 340 ,marginTop: 3, marginBottom : 3 }}
                        onPress={() => this.onSubmitResponse()}>SUBMIT</RkButton>
                    </ScrollView>
                </Container>
            );
        }      
    }
}

let styles = RkStyleSheet.create(theme => ({

}));