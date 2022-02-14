import React from 'react';
import axios from 'axios';

class Home extends React.Component {

    constructor (props) {
        super(props)
        

        this.state = {
          totalTweets: 0,
          dataTags : [],
          dataText : [],
          dataHashtags : [],
          dataTweet : [],

      }
     
      this.getAllData(this.props.db)
    }
   


    getAllData = (db) => {

    }

    render() {
        return(

                        
        <div className="main-wrapper">

        {/* ! Main */}
        <main className="main users chart-page" id="skip-target">
          <div className="container">
            <h1 className="homeTitle">CrowdPulse Dashboard</h1>
            <br/><br/><br/><br/><br/><br/><br/>
            <h3>Hai selezionato  il db : {this.props.mongodb} </h3><br/><br/><br/>
            <div className="row">

               LOADING DATA
            </div>
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

export default Home;