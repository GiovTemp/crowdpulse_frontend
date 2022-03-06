import Filters from './Filters/Filters'
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import PreLoader from "./preloader";
import HeatmapLayer from '../HeatmapLayer';



 


class Maps extends React.Component {
  constructor(props){
    super(props)
    

    this.state = {
      data:[],
      markers : [],
      flag:0,
      heatPoints:[],
      content:0,

    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.db!==this.props.db){
      this.setState({flag:0})
    }
    
  }

  handleQuery = (data) => {
    
    this.setState({data:data})
    this.state.data = data
    this.query()
    this.setState({flag:1})
  
  }

      query = () => {
        var i = 0
       
        var markers = [];
        var heatPoints = [];
        
        
        while(i<this.state.data.length){
          if(this.state.data[i].geo!==undefined){
            
            

            if(this.state.data[i].geo.coordinates!==undefined){

              markers.push({
                lat:this.state.data[i].geo.coordinates.latitude,
                lng:this.state.data[i].geo.coordinates.longitude,
                text:this.state.data[i].raw_text,
                author:this.state.data[i].author_username
              })

              heatPoints.push([this.state.data[i].geo.coordinates.latitude,this.state.data[i].geo.coordinates.longitude,100]);
             
            }else{
              //trasformare luoghi in coordinate

            }
            
            i++
          }else{
            i++
          }
        }
        
        this.setState({markers:markers})
        this.state.markers=markers
        this.setState({heatPoints:heatPoints});
        this.state.heatPoints=heatPoints;

      
        
        
        
      }

    displayMap = () =>{
      this.state.content=0;
      this.setState({content:0});
    }

    displayHeatMap = () =>{
      this.state.content=1;
      this.setState({content:1});
    }
    
      render () {
        var body;

        if(this.state.flag>0){

          if(this.state.content===0){
            body=
            <>
 
 
            
            <div className="row">
            <div className="col-lg-12">
              <div className="chart" id="mapCanvas">
              <Map center={[41.29246 ,13.5736108]} zoom={5} scrollWheelZoom={false}>
              {this.state.markers.map((city, idx) => (
              <Marker
                position={[city.lat, city.lng]}
                
                key={idx}
              >
                <Popup>
                  <b>
                    {city.author}, {city.text}
                  </b>
                </Popup>
              </Marker>))}
                  <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
 
              </Map>
              </div>
            </div>
 
          </div>

          </>
          }else{
            body=
            <>
 
         <div className="row">
            <div className="col-lg-12">
              <div className="chart" id="mapCanvas">
              <Map center={[41.29246 ,13.5736108]} zoom={5}>
           <HeatmapLayer
             points={this.state.heatPoints}
             longitudeExtractor={m => m[1]}
             latitudeExtractor={m => m[0]}
             intensityExtractor={m => parseFloat(m[2])} />
           <TileLayer
             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           />
         </Map>
              </div>
            </div>
 
          </div>
          </>
          }


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
            <h3>Maps - {this.props.mongodb} </h3>
            <br/>
            <Filters parentCallback = {this.handleQuery.bind(this)} db = {this.props.db}  tweetsData={this.props.allTweetsData}/>
            <br/>
            <button className='button activeButton' onClick={() => {this.displayMap()}} > Map</button>
            <button className='button activeButton' onClick={() => {this.displayHeatMap()}} > Heat Map</button>
            <br/><br/><br/>
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
export default Maps