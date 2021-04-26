import React from 'react';
import { Grid } from 'semantic-ui-react'
// import userService from '../../utils/userService';
import PageHeader from '../../components/Header/Header';

export default function ProfilePage({ user, handleLogout }){
    return (
        <>
        <Grid>
        <Grid.Row>
            <Grid.Column>
                <PageHeader user={user} handleLogout={handleLogout}/>
            </Grid.Column>
        </Grid.Row>
        </Grid>
      </>
      );
}