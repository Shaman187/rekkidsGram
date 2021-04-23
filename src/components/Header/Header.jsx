import React from 'react';
import {Link} from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
    return (
        <Segment clearing>
            <Header floated='right'>
                <Link to="/"><Image src="/favicon.ico"></Image></Link>
            </Header>
            <Header as='h1' floated='right'>
                <Link style={{color: "green"}} to='' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h2' floated='left'>
                <Link style={{color: "purple"}}to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image>{user.username}</Link>          
            </Header>
        </Segment>
    )
}
