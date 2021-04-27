import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'

export default function AddPostForm(props){
  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    title: '',
    year: '',
    artist: '',
    label: '',
    photo: ''
  })

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log('is handlesUbmit being called?')

    // Why do we need to create FormData
    // what type of request are we making?
    const formData = new FormData()
    formData.append('photo', selectedFile)
    formData.append('label', state.label)
    formData.append('artist', state.artist)
    formData.append('year', state.year)
    formData.append('title', state.title)
    
    
    // Have to submit the form now! We need a function!
    props.handleAddPost(formData);
  }


  return (
    
    <Grid textAlign='center' verticalAlign='middle'>
    <Grid.Row>

      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment clearing style={{backgroundColor: "black"}}>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input                 
                  className="form-control"
                  name="artist"
                  value={state.artist}
                  placeholder="artist"
                  onChange={handleChange}
                  required
              />
              <Form.Input                 
                  className="form-control"
                  name="label"
                  value={state.label}
                  placeholder="label"
                  onChange={handleChange}
                  required
              />
              <Form.Input                 
                  className="form-control"
                  name="year"
                  value={state.year}
                  placeholder="year"
                  onChange={handleChange}
                  required
              />   
              <Form.Input                 
                  className="form-control"
                  name="title"
                  value={state.title}
                  placeholder="title"
                  onChange={handleChange}
                  required
              />
              <Form.Input
                  type='file'
                  name='photo'
                  placeholder='Upload Photo'
                  onChange={handleFileInput}
              /> 
              <Button
                color="green"
                inverted
                type="submit"
                className="btn"
                >
                Add Rekkid!
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid.Row>
    </Grid>
   
  ); 
}