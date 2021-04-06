import axios from 'axios';
import { useState, useEffect } from 'react';
import './adduser.css';

function AddUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [designation, setDesignation] = useState('user');
    const [Alert, setAlert] = useState();

    const SetAlert = () => {
        setAlert();
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/add', {
            id: document.cookie.split('=')[1],
            name: { name },
            email: { email },
            password: { pass },
            designation : { designation }
        })
            .then(res => {
                    setAlert(<div class="alert alert-warning alert-dismissible fade show rounded-pill ab" role="alert">
                        <strong>Alert!</strong> {res.data.message}
          <button onClick={SetAlert} type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>);
                    document.getElementById('name').value = '';
                    document.getElementById('login').value = '';
                    document.getElementById('password').value = '';                
            });
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleDesignation = (e) => {
        setDesignation(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePass = (e) => {
        setPass(e.target.value)
    }

    return (
        <div class="bodyA">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <form onSubmit={handleSubmit}>
                        <input type="text" id="name" onChange={handleName} className="inputC" name="name" placeholder="Name" required />
                        <input type="email" id="login" onChange={handleEmail} className="inputC" name="login" placeholder="email" required />
                        <input type="password" id="password" onChange={handlePass} className="inputC" name="password" placeholder="password" required />
                        <br />
                        <input onChange={handleDesignation} type="radio" id="hr" name="post" value="hr" />
                        <label for="hr">HR</label><br />
                        <input onChange={handleDesignation} type="radio" id="manager" name="post" value="manager" />
                        <label for="manager">Manager</label><br />
                        <input onChange={handleDesignation} type="radio" id="user" name="post" value="user" checked />
                        <label for="user">Employee</label><br />
                        <input type="submit" className="" value="Add Member" />
                    </form>
                </div>
            </div>
            {Alert}
        </div>
    );
}

export default AddUser;