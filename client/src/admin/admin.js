import '../dashboard/dashboard.css';
import AddUser from './adduser/addUser';
import ListEmployee from './listEmployee/listEmployee';
import Leave from './leave';
import Welcome from '../welcome/welcome';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Admin = () => {

    const [user, setUser] = useState('User');
    const [com, setCom] = useState(<Welcome />);

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
                        setUser(name);
                    }
                    else {
                        window.location.href = '/';
                    }
                });
        }

        else {
            window.location.href = '/';
        }
    });

    const changeCom = (e) => {
        if(e.target.dataset.change == 'Add') {
            setCom(<AddUser />)
        }
        
        else if (e.target.dataset.change == 'list') {
            setCom(<ListEmployee />);
        }

        else if (e.target.dataset.change == 'leave') {
            setCom(<Leave />);
        }

    }
    const changeLog = () => {
        document.cookie = 'id=';
        window.location.href = '/';
    }

    return (
        <div>
            <div class="sidebar">
                <header>{user}<span></span>&nbsp;<sub>HR</sub></header>
                <ul>
                <li><a onClick={changeCom} data-change="list"><i class="fas fa-qrcode"></i>Employee List</a></li>
                    <li><a onClick={changeCom} data-change="Add"><i class="fas fa-qrcode"></i>Add User</a></li>
                    <li><a onClick={changeCom} data-change="leave"><i class="fas fa-qrcode"></i>Leave Applications</a></li>
                    <li><a onClick={changeLog} data-change="logout"><i class="fas fa-qrcode"></i>Log Out </a></li>                    
                </ul>
            </div>
            <section class="pad">
            {com}
            </section>
        </div>
    );
}

export default Admin;