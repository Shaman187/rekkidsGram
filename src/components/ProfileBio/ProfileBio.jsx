import React from 'react';
import {  Image, Grid, Segment } from 'semantic-ui-react';



function ProfileBio({ user }) { 
  return (
  <Grid textAlign='center' columns={2}>
    <Grid.Row>
      <Grid.Column>
        <Image src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />
      </Grid.Column>
      <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
        <Segment vertical>
           <h3 style={{color: "green"}}>{user.username}</h3>
        </Segment>
        <Segment style={{backgroundColor: "black"}}>
           <span style={{ color: "green"}}> Bio: {user.bio}</span>
        </Segment>
          
      </Grid.Column>
    </Grid.Row>
  </Grid>

  );
}



export default ProfileBio;