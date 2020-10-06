import React, { useEffect } from 'react';
import useFetch from '../hooks/use-fetch';

export default function Depform () {
    let filter = [];
    let userID=localStorage.getItem("id");
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:4000/dependents/${userID}/dependents`);
    const [relation, setRelation] = React.useState();
    const [depData, setdepData] = React.useState([]);
    const {isLoading: isloading2, response: response2 , error: error2, doFetch: depInfo}=useFetch(`http://localhost:4000/dependents/${userID}/dependents`);
    // React.useEffect(() => {
    //     depInfo.doFetch({
    //     method: "get"
    //     })
    // },[])

    React.useEffect(() => {
      doFetch({
      method: "get"
      })
  },[])

    React.useEffect(() => {
        
    },[response])

    const handleChange = (e) => {
        setRelation(e.target.value)
        
        depInfo({
          method: "get"
        });
    }

    React.useEffect(()=>{
      if(response2){
        let dep=response2.filter((item)=>{
          return item.relation==relation;
        })
        setdepData(dep);
      }},[response2] )


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