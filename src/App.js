import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import Now from './Components/now';
import WeatherRow from './Components/weatherrow';
import ShitTag from './Components/shittag';
import WTF from './Components/wtf';
import ReactGA from 'react-ga';
import {onSuggestionsClearRequested, onSuggestionsFetchRequested, onChange, isCity, getSuggestions, getSuggestionValue, renderSuggestion, renderSectionTitle, getSectionSuggestions, getCountry } from './searchFunc.js';
import {onResponse, getWeather, getForecast} from './weatherFunc.js';
import {Api_Key, Analytics_ID} from './key.js';
export const Api_Key = Api_Key;
export let location = '';

ReactGA.initialize(Analytics_ID);

class App extends React.Component {

  state = {
    temperature: 'Loading', //the temperature doubles as a loading notification if the connection is slow
    city: 'London',
    country: 'GB',
    humidity: '',
    description: '',
    error: '',
    value: '',
    suggestions: [],
    message: '',
    subMessage: '',
  }

  constructor(props) {
    super(props);
    this.onResponse = onResponse.bind(this);
    this.getWeather = getWeather.bind(this);
    this.getForecast = getForecast.bind(this);
    this.onChange = onChange.bind(this);
    this.onSuggestionsFetchRequested = onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = onSuggestionsClearRequested.bind(this);

  }
  
  //as soon as the component mounts on page load, we trigger the API calls
  componentDidMount() {
    this.getWeather()
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: this.state.city ? this.state.city : "Where the fuck do you live?", //we display the city if geolocation found our user, if not we demand to know where they live
      value,
      onChange: this.onChange
    };
    return (
      <div className={'weather'+this.state.icon}>
         <div className="wrapper">
            <ShitTag />
            <WTF />
            <Autosuggest 
              multiSection={true}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              renderSectionTitle={renderSectionTitle}
              getSectionSuggestions={getSectionSuggestions}
              inputProps={inputProps} 
            />
            <Now 
              temperature={this.state.temperature} 
              description={this.state.description} 
              windDeg={this.state.windDeg}
              windSpeed={this.state.windSpeed}
              daylightLeft={this.state.daylightLeft}
              sunrise={this.state.sunrise}
              sunset={this.state.sunset}
              message={this.state.message}
              subMessage={this.state.subMessage}
              icon={this.state.icon}
            />
            <WeatherRow currentForecast={this.state.currentForecast}/>
        </div>
      </div>
    )
  }
}
export default App;