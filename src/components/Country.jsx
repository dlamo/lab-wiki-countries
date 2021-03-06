import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export class Country extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: null,
            borders: []
        }
    }
    async componentDidMount() {
        try {
            const {id: countryId} = this.props.match.params
            const {data: country} = await axios.get('https://restcountries.eu/rest/v2/alpha/' + countryId)
            const borders = country.borders.map(border => this.getCountryName(border))
            const countryNames = await Promise.all(borders)
            this.setState(state => ({
                ...state,
                country: country,
                borders: countryNames
            }))
        } catch (error) {
            console.log(error)
        }
    }
    async componentDidUpdate(prevProps) {
        try {
            if (prevProps.match.params.id !== this.props.match.params.id) {
                this.componentDidMount()
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getCountryName(countryCode) {
        try {
            const {data: country} = await axios.get('https://restcountries.eu/rest/v2/alpha/' + countryCode)
            return country.name
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        return (
            <div>
                {this.state.country ?
                    <div>
                        <h2>{this.state.country.name}</h2>
                        <table className='table'>
                            <tbody>
                                <tr>
                                    <td>Capital</td>
                                    <td>{this.state.country.capital}</td>
                                </tr>
                                <tr>
                                    <td>Area</td>
                                    <td>{this.state.country.area} km2</td>
                                </tr>
                                <tr>
                                    <td>Borders</td>
                                    <td>
                                        <ul>
                                            {this.state.country.borders.map((country, i) => 
                                                <li key={country}>
                                                    <Link to={'/' + country}>{this.state.borders[i]}</Link>
                                                </li>)}
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                    :
                    <h1>Country Details: </h1>
                }      
            </div>
        )
    }
}

export default Country
