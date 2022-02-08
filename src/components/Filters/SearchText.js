import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import './css/searchbar.css';
import axios from 'axios';


//https://www.npmjs.com/package/react-tag-autocomplete
class SearchText extends React.Component {
  constructor (props) {
    super(props)
    this.sendData = this.sendData.bind(this)
    this.state = {
      text: [     
      ],
      suggestions: [
       
      ]
    }
  


    axios.get('/tweet/getText',{
      params: {
        db: this.props.db
      }
    })
        .then((response) => {
          var i = 1;
          var j = 0;
          var temp;
          var strings = [];
          const data = response.data
          //var temp =data[0]._id.processed_text[0].split(" ")
          
          var tempSuggestion = []
       
          while(i<data.length){
            j=0;
            
            if(data[i]._id!==undefined&&data[i]._id!==null){
             
            while(j<data[i]._id.processed_text.length){
              
              temp=data[i]._id.processed_text[j].split(" ")

              if(strings.indexOf(temp[0])==-1){
                tempSuggestion.push({
                  id:0,
                  name: temp[0]      
                });
                strings.push(temp[0]);
              }


              j++;
            }
          }

              i++;
          }
          
         

          this.setState({suggestions: tempSuggestion})
         
           
      })
      .catch((error) => {
          console.log('error: ', error)
      });
    
      

    this.reactTags = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.db!==this.props.db){
      axios.get('/tweet/getText',{
        params: {
          db: this.props.db
        }
      })
          .then((response) => {
            var i = 0;
            var j = 0;
            var temp;
            const data = response.data;
            //var temp =data[0]._id.processed_text[0].split(" ")
            var tempSuggestion = [];
            var strings = [];
            while(i<data.length){
              j=0
              if(data[i]._id!==undefined&&data[i]._id!==null){
              while(j<data[i]._id.processed_text.length){
                temp=data[i]._id.processed_text[j].split(" ")
                
                if(strings.indexOf(temp[0])==-1){
                  tempSuggestion.push({
                    id:0,
                    name: temp[0]      
                  });
                  strings.push(temp[0]);
                }
                j++
              }
            }
  
                i++
            }
            
           
  
            this.setState({suggestions: tempSuggestion})
           
             
        })
        .catch((error) => {
            console.log('error: ', error)
        });
      
        
  
      this.reactTags = React.createRef()
    }
  }

  sendData = (text) =>{
    this.props.parentCallback(text);
  }

  onDelete (i) {
    const text = this.state.text.slice(0)
    text.splice(i, 1)
    this.setState({ text })
    this.sendData(text)
  }

  onAddition (tag) {
    const text = [].concat(this.state.text, tag)
    this.setState({ text })
    this.sendData(text)
  }

  render () {
    return (
     
      <ReactTags
        placeholderText="Add new Text"
        ref={this.reactTags}
        tags={this.state.text}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)} 
        classNames="search"
        />
     

    )
  }
}


export default SearchText