import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';

const GroupsScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => console.log('Group Added!')}
                >
                <Text style={styles.buttonText}>Add Group</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default GroupsScreen;