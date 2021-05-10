import React from 'react';
import { Link } from 'react-router-dom';
import {Header} from 'semantic-ui-react'

class PageNotFound extends React.Component{
    render(){
        return <div>
            
            <p style={{textAlign:"center"}}>
              <Header size='huge'>404</Header>
              <Header size='huge'>Page Not Found</Header>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
    }
}
export default PageNotFound;