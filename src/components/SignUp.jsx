import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: {
				message: ''
			}
		};
	}

	signUp() {
		this.setState({ error: { message: '' } });
		const { email, password } = this.state;
		firebaseApp.auth().createUserWithEmailAndPassword(email, password)
			.catch(error => {
				this.setState({ error });
			});
	}
	
	render() {
		return (
			<div className="signup__form">
				<style>{`
					body > div,
					body > div > div,
					body > div > div > div.login-form {
						height: 100%;
					}
				`}</style>
				<Grid
					style={{height: '100%'}}
					verticalAlign='middle'
					textAlign='center'
				>
					<Grid.Column style={{maxWidth: '450px'}} >
						<Header as='h2' >
							Sign Up to Your account
						</Header>
						<Form>
							<Segment stacked>
								<Form.Input
									fluid
									icon='user'
									type='text'
									iconPosition='left'
									placeholder='Enter email'
									onChange={ event => this.setState({ email: event.target.value }) }
								/>
								<Form.Input
									fluid
									icon='lock'
									type='password'
									iconPosition='left'
									placeholder='Enter password'
									onChange={ event => this.setState({ password: event.target.value }) }
								/>

								<Button 
									fluid 
									color='green' 
									size='large'
									onClick={ () => this.signUp() }
								>
									Sign Up
								</Button>
							</Segment>
						</Form>
						{
							(this.state.error.message !== '') ?
								<Message negative>
									{this.state.error.message}
								</Message> :
								''
						}
						<Message>
							Already a user? <Link to={'/signin'}>Sign In</Link>
						</Message>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default SignUp;
