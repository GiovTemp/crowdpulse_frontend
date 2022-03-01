import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import Filters from './Filters/WordChartFilters'
import PreLoader from "./preloader";

class WordCloud extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          data:[],
          words:[{
            text:null,
            value:null
          }],
          flag:0,
          flagWord:0

      }

    }
    componentDidUpdate(prevProps) {
      if(prevProps.db!==this.props.db){
        this.setState({flag:0})
      }
      
    }
    
  handleQuery = (temp) =>{
   
    this.setState({data:temp.data})
    this.state.data = temp.data
    this.state.flagWord = temp.typeWord;
    console.log(temp)
    if(this.state.flagWord===0||this.state.flagWord==='0'){
      this.queryText();
    }else if(this.state.flagWord===1||this.state.flagWord==='1'){
      this.queryTag();
    }else{
      this.queryHashtag();
    }
    this.state.flag=1;
    this.setState({flag:1});
    console.log(this.state.flag)


  }

  queryTag = () =>{

    var i = 0
    var j = 0
    var k = 0
   
    var words=[{
        text:null,
        value:0
    }]

    var temp = null

    var arrayWords = []

    var flag = false

    
    
    while(i<this.state.data.length){
      j=0;
      if(this.state.data[i].tags.tag_me!==undefined){
        
        while(j<this.state.data[i].tags.tag_me.length){
          
          temp=this.state.data[i].tags.tag_me[j].split(' : ')[0]
          k=0;
          flag=false;
          while(k<arrayWords.length){
            if(arrayWords[k]===temp){
              flag=true
              break
            }
            k++
          }
    
          if(flag===true){
            words[k].value++
          }else{
            arrayWords.push(temp)
            words.push({
              text:temp,
              value:1
            })            
      

            
          }    
          j++;
      
        }
      }

    i++
    }
    
    
    this.state.words=words.slice(0,200)
    this.setState({words:words.slice(0,200)})
    
    this.setState({flag:1})
    

  }

  queryHashtag = () =>{

    var i = 0
    var j = 0
    var k = 0
   
    var words=[{
        text:null,
        value:0
    }]

    var temp = null;

    var arrayWords = [];

    var flag = false;

    

    
     
    while(i<this.state.data.length){
      j=0;

      if(this.state.data[i].twitter_entities.hashtags!==undefined){
        
        while(j<this.state.data[i].twitter_entities.hashtags.length){
          
          temp=this.state.data[i].twitter_entities.hashtags[j]
          k=0;
          flag=false;
          while(k<arrayWords.length){
            if(arrayWords[k]===temp){
              flag=true
              break
            }
            k++
          }
    
          if(flag===true){
            words[k].value++
          }else{
            arrayWords.push(temp)
            words.push({
              text:temp,
              value:1
            })            

            
          }    
          j++;
      
        }
      }
     
     i++
     
    }
    
    this.state.words=words
    this.setState({words:words})
    
    this.setState({flag:1})

  }


 
      queryText = () =>{

        var i = 0
        var j = 0
        var k = 0
       
        var words=[{
            text:null,
            value:0
        }]

        var temp = null

        var arrayWords = []

        var flag = false

        

       
        while(i<this.state.data.length){
          j=0;
         
          if(this.state.data[i].spacy!==undefined){
            while(j<this.state.data[i].spacy.processed_text.length){
              temp=this.state.data[i].spacy.processed_text[j].split(" ")[0]
            
             if(this.checkWord(temp)===false&&this.state.data[i].spacy.processed_text[j].split(" ")[3]!=='CCONJ'
              ){
                k=0
              flag = false
              while(k<arrayWords.length){
                if(arrayWords[k]===temp){
                  flag=true
                  break
                }
                k++
              }
              if(flag===true){
                words[k].value++
              }else{
                arrayWords.push(temp)
  
                words.push({
                  text:temp,
                  value:1
                })
                  
              }
              }
              
   
                
              j++
            }
          }

         i++
         
        }
        this.state.words=words.slice(0,200)
        this.setState({words:words.slice(0,200)})
        
        this.setState({flag:1})

      }
   
      checkWord = (temp) => {

        //check if string is a tag 
        if(temp[0]==='@'){
          return true
        }
    
        //check if string is a number
        if(!isNaN(+temp)){
          return true
        }
        
        //check if string is a url

        //controllo url rimosso per migliorare le
        /*
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  
        if(pattern.test(temp)){
          return true
        }
        */

        return false
        
      }
    
      render () {
        const renderContent = () => {
          
           return <Filters parentCallback = {this.handleQuery.bind(this)} db = {this.props.db}  tweetsData={this.props.allTweetsData}/>;
         
          }
        
        var body;      
        var temp = renderContent();
        var filters;
        console.log(temp)
        if(temp!==null){
          filters=temp;
        }else{
          filters=<PreLoader/>
        }
        if(this.state.flag>0){
          body =<div className="row">
          <div className="col-lg-12">
            <div className="CloudChart" id="wordChart">
            <ReactWordcloud words={this.state.words}       options={{
        fontFamily: 'monospace',
        rotations: 1,
        rotationAngles: [0],
        fontSizes: [20, 60],
      }} />
            </div>
          </div>

        </div>
        }else{
          body=
          <div className="row">
            <div className="col-lg-12">
            <div className="chart"> <PreLoader/></div>
          </div>
          </div>
        }
          return(
        <div className="main-wrapper">
        {/* ! Main */}
        <main className="main users chart-page" id="skip-target">
          <div className="container">
            <h1>CrowdPulse</h1>
            <br/>
            <h3>Word Cloud - {this.props.mongodb} </h3>
            <br/>
            {filters}
            
            <br/>

            {body}
          </div>
        </main>
        {/* ! Footer */}
        <footer className="footer" style={{ background: 'blue' }}>
          <div className="container footer--flex">
            <div className="footer-start">
              <p>2021 © Giovanni Tempesta </p>
            </div>
          </div>
        </footer>
      </div>
      )
      }

}
export default WordCloud