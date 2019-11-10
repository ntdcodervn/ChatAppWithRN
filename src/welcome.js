import React, { Component } from 'react';
import { Text, StyleSheet, View , SafeAreaView, TextInput,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Storage from '@react-native-community/async-storage'
export default class welcome extends Component {
    static navigationOptions = {
        header: null
    };

    state = {

    }

    _goChatScreen = async () => {
        if(this.state.name && this.state.name != '')
        {
            let signUp = await axios.post(`https://chatappntd.herokuapp.com/api/user/addUser`, {
                name : this.state.name
            })
            
            if(signUp.data.status == 200)
            {
                await Storage.setItem('idUser',signUp.data.data._id);
               console.log(signUp.data.data._id)
                this.props.navigation.navigate('Chat');
            }
            else {
                alert('Vào phòng thất bại, vui lòng thử lại');
            }
            
        }
        else {
            alert("Name not empty")
        }
    }

    async componentDidMount () {
        let idUser = await Storage.getItem('idUser');
        if(!idUser || idUser == '')
        {
            
        }
        else {
            this.props.navigation.navigate('Chat');
        }
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#0100EC', '#FB36F4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient}>
                    <Text style={{fontSize : 25,fontWeight:'700', marginBottom : 20, color : '#FFF'}}>Your Name</Text>
                    <TextInput onChangeText={(value) => {this.setState({name : value})}} style={{...styles.textInput,textAlign : 'center'}}></TextInput>
                    <TouchableOpacity onPress={() => this._goChatScreen()} style={{...styles.button,marginTop : 20}}>
                    <LinearGradient colors={['#FFE031', '#F04579']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linearGradient2} >
                    
                        <Text style={{fontSize : 20,fontWeight:'bold', color : '#FFF'}}>Start Chat !</Text>
                    
                    </LinearGradient>
                    </TouchableOpacity>
                </LinearGradient>

                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'center',
        alignItems : 'center',
        flex : 1
    },
    textInput : {
        width : '80%',
        height : 50,
       
        borderRadius : 25,
        paddingLeft :20,
        backgroundColor : '#FFF'
    },
    linearGradient : {
       width : '100%',
       height : '100%',
       justifyContent: 'center',
        alignItems : 'center',
        
    },
    linearGradient2 : {
        width : '100%',
        height : '100%',
        justifyContent: 'center',
         alignItems : 'center',
         borderRadius : 25,
     },
    button: {
        width : '80%',
        height : 50,
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius : 25,
        
        backgroundColor : '#FFF'
    }
})
