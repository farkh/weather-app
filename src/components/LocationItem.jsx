import React, { Component } from 'react';
import $ from 'jquery';
import { Card, Icon, Image } from 'semantic-ui-react';
import { read_cookie } from 'sfcookies';
import { database } from '../firebase';

class LocationItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tempC: '',
			wind: '',
			weather: '',
			imageUrl: ''
		};
	}

	componentDidMount() {
		this.getWeather();
		this.getImage();
	}
	
	getWeather() {
		let apiBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=',
				apiKey		 = 'a2193a93fc2f104a80e0e535dfcbbf49',
				units			 = 'metric',
				queryUrl = '';
		let city = this.props.location.locationName;
		queryUrl = apiBaseUrl + city + '&units=' + units + '&APPID=' + apiKey;

		$.getJSON(queryUrl)
			.done(json => {
				let tempC   = json.main.temp.toFixed(),
						wind	  = json.wind.speed,
						weather = json.weather[0].main;

				this.setState({ tempC, wind, weather });
			}).fail(err => {
				console.log(err);
			});
	}

	getImage() {
		let clientID 	 = '863ef19ba22c8d386868ce5501786b9982a09e29bce41d3de2b2df4b946b8f01',
				apiBaseUrl = 'https://api.unsplash.com/search/photos',
				queryUrl 	 = '';
				
		queryUrl = apiBaseUrl + '?query=' + this.props.location.locationName + '&client_id=' + clientID;

		$.getJSON(queryUrl).done(json => {
			let imageUrl = json.results[0].urls.regular;

			this.setState({ imageUrl });
		}).fail(err => {
			console.log(err);
		})
	}

	removeLocation() {
		const { serverKey } = this.props.location;
		const email = read_cookie('email');
		database.ref('users/' + email.split('@')[0] + '/locations').child(serverKey).remove();
	}
	
	render() {
		return (
			<Card className='locations__card'>
				<Image src={this.state.imageUrl} />
				<Card.Content>
					<Card.Header>{this.props.location.locationName + '     ' + this.state.tempC + '°C'}</Card.Header>
					<Card.Meta><b>Wind speed: </b>{this.state.wind}m/s</Card.Meta>
					<Card.Description><b>Weather: </b>{this.state.weather}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<span 
						style={{cursor: 'pointer'}}
						onClick={ () => this.removeLocation() }
					>
						<Icon name='trash' />Remove
					</span>
				</Card.Content>
			</Card>
		);
	}
}

export default LocationItem;
