import axios from 'axios';
import { useState, useEffect } from 'react';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './listEmployee.css';
import '../adduser/adduser.css';

function AddUser() {

    let [data, setData] = useState([]);

    useEffect(() => {
        const id = document.cookie.split('=')[1];
        if (id) {
            axios.post("http://localhost:5000/id", {
                id: id
            })
                .then(res => {
                    const name = res.data.name;
                    console.log(name);
                    if (name != 'UserNotAvailable') {
                        axios.get("http://localhost:5000/list")
                            .then(rese => {
                                console.log(rese.data);
                                setData(rese.data);
                               
                            });
                    }
                    else {
                        window.location.href = '/';
                    }
                });
        }

        else {
            window.location.href = '/';
        }
    },[]);
    
    return (
        <div>
            <table id="table1">
                <tr>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>DESIGNATION</th>
                </tr>
                <tbody>
                {data !== undefined && data !== null &&
                    data.map(item =>{
                        return(
                    <tr key = {item._id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.password}</td>
                        <td>{item.designation}</td>
                    </tr>);
                })}
                    
                </tbody>
            </table>
        </div>
    );
}

export default AddUser;