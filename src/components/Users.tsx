import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Users extends Component {

    state = {
     cards: [],
     data: [],
     loading: true,
     error: false
    };

    componentWillMount() {
        fetch('https://swapi.dev/api/people')
            .then(response => response.json())
            .then(response => this.setState({
                data: response.results,
                loading: false,
                error: false
            }))
            .catch(error => this.setState({
                loading: false,
                error: true
            }));
    }

    Capitalize(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    splitUrl(url:string) {
        var parts = url.split('/');
        var lastSegment = parts.pop() || parts.pop();
        return lastSegment;
    }

    render() {
        const { data, loading, error  } = this.state;
        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Users list</h1>
                {loading && <div>Loading...</div>}
                <table>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        {/*<td>Last Name</td>*/}
                        {/*<td>Avatar</td>*/}
                        <td>Height</td>
                        <td>Weight</td>
                        <td>Birth Year</td>
                        <td>Details</td>
                    </tr>
                    </thead>
                    <tbody>
                        {!loading && !error &&
                            data.map((item:any) => (
                                <tr>
                                    <td key={'user-id-' + this.splitUrl(item.url)}>{this.splitUrl(item.url)}</td>
                                    {/*<td>{item.id.name} {item.id.value}</td>*/}
                                    <td key={'user-name-' + this.splitUrl(item.url)}>{this.Capitalize(item.name)}</td>
                                    {/*<td>{this.Capitalize(item.name.last)}</td>*/}
                                    {/*<td><img src={item.picture.thumbnail} alt={item.name.first + ' ' + item.name.last}/></td>*/}
                                    <td key={'user-height-' + this.splitUrl(item.url)}>{item.height}</td>
                                    <td key={'user-mass-' + this.splitUrl(item.url)}>{item.mass}</td>
                                    <td key={'user-bdate-' + this.splitUrl(item.url)}>{item.birth_year}</td>
                                    <td key={'user-id-' + this.splitUrl(item.url) + '-link'}>
                                        <Link to={"/user/" + this.splitUrl(item.url)}>More info</Link>
                                    </td>
                                </tr>
                            ))
                        }
                        {error && <div>Error message</div>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Users;
