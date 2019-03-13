import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Select from '@material-ui/core/Select';
import MenuItem from 'material-ui/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

let restaurantsList = [];
class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      value: '',
      restaurants: []
    };
  }
  componentDidMount() {
    fetch('http://opentable.herokuapp.com/api/cities')
      .then(response => response.json())
      .then(cities => {
        console.log(cities);
        cities = cities.cities;
        console.log(cities[0]);
        this.setState({ 
          cities: cities,
          value: cities[0]
         })
      });
  }
  renderSelectOptions = () => {
    return this.state.cities.map((file, index) =>
    <MenuItem key={index} value={file} primaryText={file} />
  )
  }
  handleChange = (event, index, value) => {
     console.log('handleChange:: ' + value + ' index ::' + index + ' value::' + event.target.value);
    console.log('handleChange ' + event.target.value);
    this.setState({ 
      value: event.target.value
     })
     fetch(`http://opentable.herokuapp.com/api/restaurants?city=${event.target.value}`)
      .then(response => response.json())
      .then(restaurants => {
        console.log(restaurants);
        restaurantsList = restaurants;
        this.setState({
          restaurants: restaurants.restaurants
        })
        
      });
  }
  handleFilterChange = (event) => {
    console.log(event.target.value);
    const value =  event.target.value;
    const filter = {
      name: value,
    }
    const restaurants = restaurantsList.restaurants.filter(function(item) {
      for (let key in filter) {
        // eslint-disable-next-line
        console.log(item[key] + ' key ' + ' value ' + filter[key]);
        if (item[key] === undefined || item[key].indexOf(filter[key]) === -1)
          return false;
      }
      return true;
    });
    const filter2 = {
      address: value
    }
    const restaurants2 = restaurantsList.restaurants.filter(function(item) {
      for (let key in filter2) {
        // eslint-disable-next-line
        console.log(item[key] + ' key ' + ' value ' + filter2[key]);
        if (item[key] === undefined || item[key].indexOf(filter2[key]) === -1)
          return false;
      }
      return true;
    });
    const filter3 = {
      area: value
    }
    const restaurants3 = restaurantsList.restaurants.filter(function(item) {
      for (let key in filter3) {
        // eslint-disable-next-line
        console.log(item[key] + ' key ' + ' value ' + filter3[key]);
        if (item[key] === undefined || item[key].indexOf(filter3[key]) === -1)
          return false;
      }
      return true;
    });
    let finalRestList = [...restaurants, ...restaurants2, ...restaurants3];
    finalRestList = [...new Set(finalRestList.map(item => item))]
    console.log('restaurants');
    console.log(restaurants);
    console.log(restaurants2);
    console.log(restaurants3);

    console.log('finalRestList');
    console.log(finalRestList);
    this.setState({restaurants: finalRestList});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <MuiThemeProvider>
          <div>
            <div className="header-display">
          <div className="drop-down">
            <InputLabel htmlFor="open-select">Select City to get List of restaurants</InputLabel>
            <Select
              value={this.state.value}
              onChange={this.handleChange}
            >
            {this.renderSelectOptions()}
          
            </Select>
          </div>
          <div className="text-box">
            <TextField
            className="text-box"
              id="standard-name"
              label="Filter on basis of Name, area, address"
              value={this.state.filterName}
              onChange={this.handleFilterChange}
              margin="normal"
            />
          </div>
          </div>
          <br/>
          <div className="row">
          <div className="col-md-6 col-md-offset-5">
            <h1 className="title">All Events</h1>
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Address</th> 
                  <th>Price</th> 
                </tr>
                {this.state.restaurants.map((item, index) => (<tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
        </div>
        </MuiThemeProvider>
        </header>
      </div>
    );
  }
}

export default App;
