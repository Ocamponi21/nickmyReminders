import React, { useState, useEffect } from 'react';
import  {View, TouchableOpacity, Text, FlatList} from 'react-native';
import Contact from '../../components/Contact'; 
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
// import openDatabase hook
import { openDatabase} from "react-native-sqlite-storage"

//use the hook to create database
const myContactsDB = openDatabase({name: 'M.db'});
const listsTableName = 'lists';


const ContactsScreen = props => {

  const navigation = useNavigation();

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare an empty array that will store the results of the 
      // SELECT
      let results =[];
      //declare a transaction that will declare the SELECT
      myContactsDB.transaction(txn => {
        //execute SELECT
        txn.executeSql(
          `SELECT * FROM ${contactsTableName}`,
          [], 
          // callback function to handle the results from the SELECT 
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of contacts ' + len)
            // if more than one row was returned 
            if (len > 0){
              // loop through the rows 
              for (let i = 0; i < len; i++){
                // push a row of data at a tiem onto the 
                // result array 
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  fullname: item.fullname,
                  email: item.email,
                  number: item.number,
                });
              }
              // assign results array to lists state variable 
              setContacts(results);
            }else{
              //if no rows of data were returned,
              // set lists state variable to an empty array
              setContacts([]);
            }
          },
          error => {
            console.log('Error getting contacts' + error.message);
          },
        )
      });
    });
    return listener;
  }); 
  
  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={contacts}
          renderItem={({item}) => <Contact post={item} />}
          keyExtractor={item => item.id}
        />
      </View>
        <View style={styles.bottom}>
                <TouchableOpacity
                style ={styles.button}
                onPress={() => navigation.navigate('Add Contact')}
                >
                <Text style ={styles.buttonText}> Add Contact </Text>
                </TouchableOpacity>

        </View>
    </View>
  );

};

export default ContactsScreen;