import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
import { Header, Segment, Image } from 'semantic-ui-react';


export default function PageHeader({user, handleLogout}){
    return (
        <Segment clearing style={{backgroundColor: "transparent"}}>
            <Header floated='right'>
                <Link to="/"><Image src="/favicon.ico"></Image></Link>
            </Header>
            <Header floated='right'>
                <Link style={{color: "green"}} to='' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h2' floated='left'>
                <Link style={{color: "green"}}to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image>{user.username}</Link>          
            </Header>
            <Header style={{color: "green"}} as='h1' textAlign='center'>
                Rekkids
            </Header>
        </Segment>
    )
}
