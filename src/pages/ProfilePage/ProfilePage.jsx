import React, { useState, useEffect } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react'
import userService from '../../utils/userService';
import ProfileBio from '../../components/ProfileBio/ProfileBio';
import PostFeed from '../../components/PostFeed/PostFeed';
import PageHeader from '../../components/Header/Header';
import * as likesApi from '../../utils/likesService';
import * as postApi from '../../utils/post-api';
import { useLocation } from 'react-router-dom';
import UpdateProfilePhotoForm from '../../components/UpdateProfilePhotoForm/UpdateProfilePhotoForm';

export default function ProfilePage({ user, handleLogout, handleSignUpOrLogin }) {

    const [posts, setPosts] = useState([])
    const [profileUser, setProfileUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const location = useLocation()
    console.log(location)


    async function addLike(postId){
        try {
          const data = await likesApi.create(postId)
          console.log(data, ' response from addLike')
          getProfile()
        } catch(err){
          console.log(err)
        }
      }
  
      async function removeLike(likeId){
        try{  
          const data = await likesApi.removeLike(likeId);
          console.log(data, ' response from removeLike')
          getProfile()
        } catch(err){
          console.log(err)
        }
      }

      async function handleUpdateProfilePhoto (photo){
   
        const updatedUser = await userService.updateProfilePhoto(photo);
        handleSignUpOrLogin()
        console.log(updatedUser)
      }
      
        async function deletePost(postID){
            try{
                await postApi.deletePost(postID)
                const newPosts = posts.filter(post => post._id !== postID)
                setPosts(newPosts)
            }catch(err){
                console.log(err)
        }
    }

    async function getProfile() {

        try {

            const username = location.pathname.substring(1)
            // location.pathname returns /jimbo so we need to cut off the / using the js method substring
            // This gets the username from the url! 
            console.log(username)
            const data = await userService.getProfile(username);
            console.log(data)
            setLoading(() => false)
            setPosts(() => [...data.posts])
            setProfileUser(() => data.user)
        } catch (err) {
            console.log(err)
            setError(err)
        }
    }

    useEffect(() => {
        getProfile()
    }, [location.pathname.substring(1), user])


    return (

        <>
            { loading ?
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' >
                
                        <Grid.Column style={{ maxWidth: 450}}>
                            
                                <Loader size='large' active>Loading</Loader>
                         
                        </Grid.Column>
                 
                </Grid>
                :
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <PageHeader user={user} handleLogout={handleLogout}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        { profileUser._id === user._id ?
                        <Grid.Column>
                            <UpdateProfilePhotoForm 
                            handleUpdateProfilePhoto={handleUpdateProfilePhoto}
                             />
                        </Grid.Column>
                        : ''
                        }
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <ProfileBio user={profileUser} />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column style={{ maxWidth: 750 }}>
                            <PostFeed isProfile={true} posts={posts} numPhotosCol={3} user={user} addLike={addLike} removeLike={removeLike} deletePost={deletePost}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            }
        </>
    )
}
