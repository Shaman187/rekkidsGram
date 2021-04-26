import React, { useState } from 'react';
import { Card } from 'semantic-ui-react'
import Post from '../PostCard/PostCard';
import PostCard from '../PostCard/PostCard';

export default function ProfilePostDisplay({ posts }){

    return (
        <Card.Group itemsPerRow={3} stackable>
                {posts.map((post) => {
                    console.log(posts);
                return ( 
                        <PostCard post={post} key={post._id} />
                    )
                })}
        </Card.Group>
    )
}