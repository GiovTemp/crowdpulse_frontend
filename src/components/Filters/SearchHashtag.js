import React from 'react'
import ReactTags from 'react-tag-autocomplete'
import './css/searchbar.css';
import axios from 'axios';


//https://www.npmjs.com/package/react-tag-autocomplete
class SearchHashtag extends React.Component {
  constructor (props) {
    super(props)
    this.sendData = this.sendData.bind(this)
    this.state = {
      hashtags: [     
      ],
      suggestions: [
       
      ]
    }
  


    axios.get('/tweet/getHashtags',{
      params: {
        db: this.props.db
      }
    })
        .then((response) => {
          var i = 0;
          var j = 0;
          var k =0;
          const data = response.data;
          var strings = [];
         
          var tempSuggestion = []
          //console.log("hashtags"+data[0])
          while(i<data.length){
            
            j=0
            if(data[i]._id.hashtags!==undefined){
              while(j<data[i]._id.hashtags.length){ 
                if(strings.indexOf(data[i]._id.hashtags[j])==-1){
                  tempSuggestion.push(
                    {
                      id:0,
                      name: data[i]._id.hashtags[j]
                    }
                  )
                  strings.push(data[i]._id.hashtags[j]);
                }    

                //console.log(tempSuggestion)
                j++
              }
            }


              i++
          }

          //this.state.suggestions = tempSuggestion
          this.setState({suggestions: tempSuggestion})
         
           
      })
      .catch((error) => {
          console.log('error: ', error)
      });
    
      

    this.reactTags = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.db!==this.props.db){
      axios.get('/tweet/getHashtags',{
        params: {
          db: this.props.db
        }
      })
          .then((response) => {
            var i = 0
            var j = 0
            var k =0
            const data = response.data
           
            var tempSuggestion = []
            var strings = []
          
            while(i<data.length){
              
              j=0
              if(data[i]._id.hashtags!==undefined){
                while(j<data[i]._id.hashtags.length){  
                  if(strings.indexOf(data[i]._id.hashtags[j])==-1){
                    tempSuggestion.push(
                      {
                        id:0,
                        name: data[i]._id.hashtags[j]
                      }
                    )
                    strings.push(data[i]._id.hashtags[j]);
                  }    
                  //console.log(tempSuggestion)
                  j++
                }
              }
  
  
                i++
            }
  
            //this.state.suggestions = tempSuggestion
            this.setState({suggestions: tempSuggestion})
           
             
        })
        .catch((error) => {
            console.log('error: ', error)
        });
      
        
  
      this.reactTags = React.createRef()
    }
    
  }
  

  sendData = (hashtags) =>{
    this.props.parentCallback(hashtags);
  }

  onDelete (i) {
    const hashtags = this.state.hashtags.slice(0)
    hashtags.splice(i, 1)
    this.setState({ hashtags })
    this.sendData(hashtags)
  }

  onAddition (hashtag) {
    const hashtags = [].concat(this.state.hashtags, hashtag)
    this.setState({ hashtags })
    this.sendData(hashtags)
  }

  render () {
    return (
     
      <ReactTags
        placeholderText="Add new Hashtag"
        ref={this.reactTags}
        tags={this.state.hashtags}
        suggestions={this.state.suggestions}
        onDelete={this.onDelete.bind(this)}
        onAddition={this.onAddition.bind(this)} 
        classNames="search"
        />
     

    )
  }
}


export default SearchHashtag