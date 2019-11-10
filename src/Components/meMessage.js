import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

export default class MeMessage extends Component {
    state = {
        imageCheck : false
    }
    renderMsg = () => {
        if(this.props.item.msg.indexOf('https://') != -1)
        {
            
            return <Image style={{ width: 100, height: 100, borderRadius : 25 }} source={{uri : this.props.item.msg}}></Image>
        }
        else {
            return <Text style={{color : 'black',fontSize : 14}}>{this.props.item.msg}</Text>;
        }
    }
    componentDidMount() {
        
        if(this.props.item.msg.indexOf('https://') != -1)
        {
            
            this.setState({
                imageCheck : true
            })
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
            <View style={{justifyContent:'flex-end', flexDirection : 'row', marginRight : 20, marginBottom : 10, marginTop:10}}>
                    
            
            <View>
                   
                    <View style={{...styles.messageStyle, backgroundColor : this.props.item.check  ? '#FFF' : '#f1eff2' , }}>
                        {this.renderMsg()}
                    </View>
                    <Text style={{fontSize : 10, textAlign:'right', color: 'rgba(34,34,34,0.3)'}}>{this.renderTime()}</Text>
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
        borderTopStartRadius : 20,
        maxWidth : 300

    }

})
