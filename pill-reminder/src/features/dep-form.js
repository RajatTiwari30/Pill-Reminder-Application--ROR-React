import React, { useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

export default function Depform () {
    let filter = [];
    const {isLoading, response, error, doFetch} = useFetch("http://localhost:4000/dependents");
    const [relation, setRelation] = React.useState("Mother");
    const [depData, setdepData] = React.useState([]);
    const depInfo=useFetch("http://localhost:4000/dependents");
    React.useEffect(() => {
        depInfo.doFetch({
        method: "get"
        })
    },[])

    React.useEffect(() => {
        console.log(response);
    },[response])

    const handleChange = (e) => {
        setRelation(e.target.value)
        let filteredSet = depInfo.response.filter((d)=>{
          return d.relation === e.target.value;
      })
        setdepData(filteredSet);
        console.log(depData);
    }
    return (
    
        <div>
            <div>
                <select name="relation" onChange={handleChange} className="form-control">
                    <option label="Select Relation Here"></option>
                    <option value="Mother" key="Mother">Mother</option>
                    <option value="Father" key="Father">Father</option>
                    <option value="Spouse" key="Spouse">Spouse</option>
                    <option value="Children" key="Children">Children</option>
                    <option value="Mother In Law" key="Mother In Law">Mother In Law</option>
                    <option value="Father In Law" key="Father In Law">Father In Law</option>
                </select>
            </div>
            {depData.map(k=> {
                return(       
            <form key={k.id}>
            <div className="form-group">
              <input type="text"  
              value={k.name} className="form-control" readOnly/>
            </div>

            <div className="form-group">
              <input type="email" 
              value={k.email} className="form-control" readOnly/>
            </div>

            <div className="form-group">
              <input type="number"
              value={k.contact} className="form-control" readOnly/>
            </div>

            <div className="form-group">
              <input type="text"
              value={k.bldgrp} className="form-control" readOnly/>
            </div>

            <div className="form-group">
              <input type="date" name="dob" 
              onChange={handleChange} 
              value={k.dob} className="form-control" readOnly/>
            </div>

            <div className="form-group">
              <input type="text"
              value={k.weight} className="form-control" readOnly/>
            </div>

            <div className="form-group">
              <input type="text"
              value={k.height} className="form-control" readOnly/>
            </div>
        </form>

         )
     })}
        </div>
    )
}