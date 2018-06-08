import React from 'react';
import { ActivityIndicator, StyleSheet, View ,Text,FlatList,ListItem } from 'react-native';

export default class TransactionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Transaction',
  };

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://ec2-52-17-126-108.eu-west-1.compute.amazonaws.com:3000/api/transactions')
      .then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson.data.docs)
        this.setState({
          isLoading: false,
          dataSource: responseJson.data.docs,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View>
        <FlatList
          data={this.state.dataSource}
          renderItem ={({item}) =>    <Text style={styles.item}>{item.product}</Text>
          }
          keyExtractor={(item, index) =>index}
        />
      </View>
    );
  }

 

}
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 20,
    fontSize: 18,
    height: 44
  },
});
