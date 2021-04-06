import axios from 'axios';
import { useState, useEffect } from 'react';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Leave = () => {

    let [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/listAllLeave")
            .then(rese => {
                console.log(rese.data);
                setData(rese.data);

            });
    },
        []);

    function approve(e) {
        const dat = e.target.dataset.get;
        setData(data.filter((er) => er._id !== e.target.dataset.get));
        axios.post('http://localhost:5000/app', {
                id: dat
            });
    }

    function decline(e) {
        const tar = e.target.dataset.get;
        setData(data.filter((er) => er._id !== e.target.dataset.get));
        axios.post('http://localhost:5000/dec', {
                id: tar
            });
    }

    return (
        <div>
            <table id="table1">
                <tr>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                </tr>
                <tbody>
                    {data !== undefined && data !== null &&
                        data.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.desig}</td>
                                    <td>{item.leaveType}</td>
                                    <td>{item.from}</td>
                                    <td>{item.to}</td>
                                    <td>{item.status}</td>
                                    <td><button onClick={approve} data-get={item._id}>Approve</button></td>
                                    <td><button onClick={decline} data-get={item._id} >Decline</button></td>
                                </tr>);
                        })}

                </tbody>
            </table>
        </div>
    );
}

export default Leave;