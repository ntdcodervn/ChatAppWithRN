import React, { Component } from 'react'
import { Text, StyleSheet, View , SafeAreaView,TouchableOpacity ,TextInput ,ActivityIndicator, FlatList,Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcons from 'react-native-vector-icons/FontAwesome';
import YourMessage from './Components/yourMessage';
import LinearGradient from 'react-native-linear-gradient';
import MeMessage from './Components/meMessage';
import SocketIOClient from 'socket.io-client';
import axios from 'axios';
import Storage from '@react-native-community/async-storage'
import RBSheet from "react-native-raw-bottom-sheet";
// import * as Progress from 'react-native-progress';
const socket = SocketIOClient('https://chatappntd.herokuapp.com/');
                                
export default class ChatScreen extends Component {
    static navigationOptions = {
        header: null
      };

     state = {
         data : [],
         msg : '',
         isLoading : true,
         icons : []
     }
      _sendIcon = async (src) => {
        let idUser = await Storage.getItem('idUser');
        let getData = await axios.post(`https://chatappntd.herokuapp.com/api/user/addMsg`,{
            "id" : idUser,
            "msg" : src
        });
      }
      _goBack = () => {
        
        Alert.alert(
            'Thông báo',
            'Bạn có chắc muốn out tài khoản',
            [
              {
                text: 'Không',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Có', onPress: () => {Storage.removeItem('idUser').then(this.props.navigation.navigate('Home'))}},
            ],
            {cancelable: false},
          );
      }
      
      async componentDidMount () {

        let idUser = await Storage.getItem('idUser');
        console.log(idUser);
        this.setState({
            idUser
        })
        if(!idUser || idUser == '')
        {
            
            this.props.navigation.navigate('Home');
        }
        else {
            let getData = await axios.get(`https://chatappntd.herokuapp.com/api/roomChat/getRoomChatById?id=5dc1c2cbf6e99a16f00ed885`);
            let getIcon = await axios.get(`https://chatappntd.herokuapp.com/api/icons/getAllIcons`);
            this.setState({data : getData.data.data.message.reverse(), icons : getIcon.data.data,isLoading : false});
            
            console.log(this.state.data);
        }

        socket.on('changeRoomChat',async (data) => {
            console.log(data)
            this.setState({data : data.message.reverse()})
        })
          
      }
    
      _onSendMsg = async () => {
          if(this.state.msg != '')
          {
            let idUser = await Storage.getItem('idUser');
            let getData = await axios.post(`https://chatappntd.herokuapp.com/api/user/addMsg`,{
                "id" : idUser,
	            "msg" : this.state.msg
            });
            this.setState({
                msg : ''
            })
          }
      }
    

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <LinearGradient colors={['#6dd5ed', '#6dd5ed']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.header}>
                
                    <TouchableOpacity onPress={() => {this._goBack()}} style={{marginLeft : 15}}>
                    <Icon
                        name="chevron-left"
                        color='#FFF'
                        size={25}
                        /
                    >
                    </TouchableOpacity>

                    <Text style={{fontSize : 20,color : '#FFF', fontWeight : 'bold'}}>
                        CHAT ROOM
                    </Text>

                    <TouchableOpacity style={{marginRight : 15}}>
                    <Icon
                        name="dots-three-horizontal"
                        color='#FFF'
                        size={25}
                        /
                    >
                    </TouchableOpacity>
                </LinearGradient>
                <View style={this.state.isLoading ? {backgroundColor:'#FFF', alignItems : 'center',justifyContent : 'center',marginBottom : 30 , width : '100%', height : '100%'} : {backgroundColor:'#FFF', width : '100%', height : '100%',paddingBottom : 150}}>
                        {this.state.isLoading ? <ActivityIndicator size='large' /> : 
                         (<FlatList
                            inverted
                            data={this.state.data}
                            renderItem={({ item }) => {
                                    let check = false;

                                    if(item.msg.indexOf('https://') != -1)
                                    {
                                        check = true;
                                    }
                                  
                                    
                                    if(this.state.idUser == item.users._id)
                                    {
                                        return <MeMessage item={{...item,check }}/>;
                                    }
                                    else return <YourMessage item={{...item,check }}/>;
                                
                                    
                            }}
                            keyExtractor={(item,index) => index.toString()}
                        />)}
                </View>

                <View style={styles.sendMessage}>
                    <TouchableOpacity onPress={() => {
                        this.RBSheet.open();
                    }} style={{marginLeft : 15}}>
                    <MCIcons
                        name="emoticon-excited-outline"
                        color='#999'
                        size={26}
                        /
                    >
                    </TouchableOpacity>

                    <TouchableOpacity >
                    <Icon
                        name="images"
                        color='#999'
                        size={25}
                        /
                    >
                    </TouchableOpacity>
                    <TextInput value={this.state.msg} onChangeText={(value) =>{this.setState({msg : value})}} placeholder='Nhập tin nhắn ...' style={{width: '60%'}}>

                    </TextInput>
                    <TouchableOpacity onPress={()=>{this._onSendMsg()}} style={{marginRight : 25}}>
                    <FIcons
                        name="send"
                        color='#029adb'
                        size={25}
                        /
                    >
                    </TouchableOpacity>
                </View>
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={150}
                    duration={250}
                    customStyles={{
                        container: {
                        justifyContent: "center",
                        alignItems: "center"
                        }
                    }}
                    >
                        <FlatList
                            horizontal
                            
                            data={this.state.icons}
                            renderItem={({ item }) => {
                                let src = `https://chatappntd.herokuapp.com${item.src}`;
                                return (<TouchableOpacity onPress={() => {this._sendIcon(src)}}><Image style={{ width: 100, height: 100 }} source={{uri : 'https://chatappntd.herokuapp.com' +item.src}}></Image></TouchableOpacity>)
                            }}
                            keyExtractor={item => item.name}
                        />
                    </RBSheet>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        justifyContent: 'flex-start',
        alignItems : 'center',
        flex : 1
    },
    header : {
        width : '100%',
        height : 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
    sendMessage : {
        width: '100%',
        height : 70,
        backgroundColor : '#FFF',
        position : "absolute",
        bottom : 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
   
})
