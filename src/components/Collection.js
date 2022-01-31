import React from 'react';

class Collection extends React.Component {
    constructor(props){
        super(props)
        console.log(props.data)
    }
    handleDbChange = (db) => {
        this.setState({db_selected:db})
    
        
      }


    render() {
        console.log('props')
        return(
            <>
            {this.props.data.map(function(object, i){
                return <li>
                <a href="#" onClick={() => {this.handleDbChange("aTweets")}}>{object}</a>
            </li>;
            })}
            </>                      
      
        )
    }


}

export default Collection;