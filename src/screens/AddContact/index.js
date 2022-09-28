import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/Handlers/database.js');
const AddContact = props => {

        const navigation = useNavigation();
        
        const [fullname, setFullName] = useState('');
        const [email, setEmail] = useState('');
        const [number, setNumber] = useState('');

        const onContactAdd = ()  => { //Validation
                if(!fullname) {
                        alert( 'Please enter a contact fullname.');
                        return;
                }
                if(!email) {
                        alert('Please enter contact email.');
                        return;
                }
                if(!number ) {
                        alert('Please enter a contact phone in format NPA-NXX-XXXX');
                        return;
                } 

                try {
                        database.addContact(fullname, email, number)
                } catch (error) {
                        console.log('Error adding contact  ' + error);
                }
        
                
                alert(fullname + ' Added ');
                
        }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
                <TextInput
                        value={fullname}
                        onChangeText={value => setFullName(value)}
                        style={styles.name}
                        clearButtonMode={'while-editing'}
                        placeholder={'Enter Contact Name'}
                        placeholderTextColor={'grey'}
                />
                <TextInput  
                        value={email}
                        onChangeText={value => setEmail(value)}
                        style={styles.store}
                        clearButtonMode={'while-editing'}
                        placeholder={'Enter Email'}
                        placeholderTextColor={'grey'}
                />
                <TextInput  
                        value={number}
                        onChangeText={value => setNumber(value)}
                        style={styles.date}
                        clearButtonMode={'while-editing'}
                        placeholder={'Enter Phone in format NPA-NXX-XXXX'}
                        placeholderTextColor={'grey'}
                />

        </View>
        <View style={styles.bottomContainer}>
                <Pressable style={styles.button} onPress={onContactAdd}>
                        <Text style={styles.buttonText}> Add</Text>
                </Pressable>

        </View>
    </View>
  );
  };

export default AddContact;