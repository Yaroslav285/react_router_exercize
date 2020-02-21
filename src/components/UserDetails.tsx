import React, {Component} from 'react';
import {any} from "prop-types";
import {Link} from "react-router-dom";

class UserDetails extends Component<{card: any}>  {

    state = {
        cards: {
            name: any,
            birth_year: any,
            mass: any,
            height: any,
            skin_color: any,
            hair_color: any,
            eye_color: any,
            gender: any
        },
        loading: true,
        error: false
    };

    componentWillMount() {
        fetch('https://swapi.co/api/people/' + this.props.card)
            .then(response => response.json())
            .then(response => this.setState({
                cards: response,
                loading: false,
                error: false
            }))
            .catch(error => this.setState({
                loading: false,
                error: true
            }));
    }


    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        const {name, birth_year, mass, height, skin_color, hair_color, eye_color, gender } = this.state.cards;
        const {loading, error} = this.state;
        return (
            <div>
                <p><Link to="/">Home</Link></p>
                <p><Link to="/users">Return to users list</Link></p>
                <div className="front">
                            <div className="container">
                                {loading && <div>Loading...</div>}
                                <h3>Name: {name}</h3>
                                <h3>Birth Year: {birth_year}</h3>
                                <h3>Weight: {mass}</h3>
                                <h3>Height: {height}</h3>
                                <h3>Skin color: {skin_color}</h3>
                                <h3>Hair color: {hair_color}</h3>
                                <h3>Eye color: {eye_color}</h3>
                                <h3>Gender: {gender}</h3>
                                {error && <div>Error message</div>}
                        </div>
                    <p></p>
                </div>
            </div>
        )
    }
}

export default UserDetails;