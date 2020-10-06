import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import Depform from './dep-form';

export default function DepsProfile () {

    const {isLoading, response, error, doFetch} = useFetch("http://localhost:4000/dependents");
    const [showDep, setShowDep] = React.useState(false);
    let id = localStorage.getItem("id");
    
    const [depData, setDepData] = React.useState({
      relation: "",
      name: "",
      email: "",
      contact: "",
      bldgrp: "",
      dob: "",
      weight: "",
      height: "",
      user_id: id
    });

  const handleChange = (e) => {
    setDepData({
      ...depData,
      [e.target.name]: e.target.value
    })
  }

  const handleDepSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(depData));
    console.log (depData);
    doFetch({
        method: "post",
        body: JSON.stringify({
          dependent: {
            relation: depData.relation,
            name: depData.name,
            email: depData.email,
            contact: depData.contact,
            bldgrp: depData.bldgrp,
            dob: depData.dob,
            weight: depData.weight,
            height: depData.height,
            user_id: depData.user_id
        }})
        })
  }
    const toggleView = () => {
        setShowDep(p =>!p)
    }

    return(
        <div className="d-flex justify-content-between">
            <div><button className="btn btn-secondary" onClick={toggleView}>Toggle View/Add Dependents</button></div>
            {!showDep && 
            <Depform />
            }
            { showDep &&
          <form onSubmit={handleDepSubmit}>
            <h6>Add Dependant</h6>

            <div className="form-group">
              <select value={depData.relation} onChange={handleChange} name="relation" className="form-control">
                <option value="Mother">Mother</option>
                <option value="Father">Father</option>
                <option value="Spouse">Spouse</option>
                <option value="Children">Children</option>
                <option value="Mother In Law">Mother In Law</option>
                <option value="Father In Law">Father In Law</option>
              </select>
            </div>

            <div className="form-group">
              <input type="text" name="name" 
              onChange={handleChange} placeholder="Name" 
              value={depData.name} className="form-control" />
            </div>

            <div className="form-group">
              <input type="email" name="email" 
              onChange={handleChange} placeholder="Email Address" 
              value={depData.email} className="form-control" />
            </div>

            <div className="form-group">
              <input type="number" name="contact" 
              onChange={handleChange} placeholder="Contact" 
              value={depData.contact} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="bldgrp" 
              onChange={handleChange} placeholder="Blood Group" 
              value={depData.bldgrp} className="form-control" />
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={depData.dob} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="weight" 
              onChange={handleChange} placeholder="Weight" 
              value={depData.weight} className="form-control" />
            </div>

            <div className="form-group">
              <input type="text" name="height" 
              onChange={handleChange} placeholder="Height" 
              value={depData.height} className="form-control" />
            </div>

            <div className="d-flex mt-4 justify-content-around">
              <button className="btn btn-outline-success">Submit</button>
            </div>
          </form>
        }
          </div>
    )
}