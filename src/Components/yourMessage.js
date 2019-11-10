import React, { Component } from 'react'
import { Text, StyleSheet, View,Image } from 'react-native'
import iconArray from './../Icons/index'
export default class YourMessage extends Component {
    
    renderMsg = () => {
        if(this.props.item.msg.indexOf('https://') != -1)
        {
           
            return <Image style={{ width: 100, height: 100, borderRadius : 25 }} source={{uri : this.props.item.msg}}></Image>
        }
        else {
            return <Text style={{color : '#FFF',fontSize : 14}}>{this.props.item.msg}</Text>;
        }
    }

  

    renderTime () {
        const time = this.props.item.dateSent;
        let date = new Date(time);
        let dateNew = `${date.getDay()}th${date.getMonth()+1},${date.getFullYear()} Lúc ${date.getHours()}:${date.getMinutes()}`;

        return dateNew;
    }
    render() {
        return (

                <View style={{alignItems :'flex-start', flexDirection : 'row', marginLeft : 20, marginBottom : 10, marginTop:10}}>
                    
                    <Image style={{ width: 50, height: 50, borderRadius : 25 }} source={iconArray[0].src}></Image>
                    <View>
                            <Text style={{fontSize : 16 , fontWeight : 'bold', marginLeft : 10}}>{this.props.item.users.name}</Text>
                            <View style={{...styles.messageStyle, backgroundColor : this.props.item.check ? '#FFF' : '#00a1e1' , }}>
                                {this.renderMsg()}
                            </View>
                            <Text style={{fontSize : 10, textAlign:'center', color: 'rgba(34,34,34,0.3)'}}>{this.renderTime()}</Text>
                    </View>
                </View>
            
        )
    }
}

const styles = StyleSheet.create({
    messageStyle : {
        
       
        alignItems : 'center', 
        justifyContent : 'center',
        marginTop :5 ,
        marginLeft : 7,
        padding : 20,
        borderBottomLeftRadius : 20,
        borderTopEndRadius : 20,
        borderBottomRightRadius : 20,
        maxWidth : 200
    }
})
