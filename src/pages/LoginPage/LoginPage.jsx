import React, { useState } from 'react';
import './LoginPage.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import userService from '../../utils/userService';
import { useHistory, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'

export default function LoginPage(props){
    const [invalidForm] = useState(false);
    const [error, setError ]          = useState('')
    const [state, setState]       = useState({
        email: '',
        password: '',
    })

    const history = useHistory();
    
    function handleChange(e){
      setState({
        ...state,
        [e.target.name]: e.target.value
      })
    }
   
    

    async function handleSubmit(e){
      e.preventDefault()
              
      try {
          await userService.login(state);
          // Route to wherever you want!
          props.handleSignUpOrLogin()
          history.push('/')
          
        } catch (err) {
          // Invalid user data (probably duplicate email)
          setError(err.message)
        }
    }

    return (
        <>
          <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h1' color='green' textAlign='center'>
            <Image src='/favicon.ico' /> Log-in to your account
            </Header>
            <Form  autoComplete="off"  onSubmit={handleSubmit}>
               <Segment stacked inverted>
                  <Form.Input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={ state.email}
                    onChange={handleChange}
                    required
                  />
                  <Form.Input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={ state.password}
                    onChange={handleChange}
                    required
                  />
                <Button
                  inverted
                  color='purple'
                  fluid size='large'
                  type="submit"
                  className="btn"
                  disabled={invalidForm}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Segment inverted>
              New to us? <Link to='/signup' style={{color: "green"}}>Sign Up</Link>
            </Segment>
            {error ? <ErrorMessage error={error} /> : null}
            </Grid.Column>
          </Grid>
        </>
      );
}

