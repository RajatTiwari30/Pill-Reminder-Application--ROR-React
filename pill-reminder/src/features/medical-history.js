import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
export default function MedicalHistory() {
  const [histories, setHistories] = React.useState([]);
  const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
  var dependent=[];
  const [delid, setDelid] = React.useState(0);
  const [depId,setdepId]=React.useState(null);
  let userID=localStorage.getItem("id");
  const userhistoryfetch = useFetch(`http://localhost:4000/medical_histories/${userID}/users_all`);
  const dephistoryfetch = useFetch(`http://localhost:4000/medical_histories/${userID}/deps_all`);
  const {isLoading: isloading2, response: response2 , error: error2, doFetch: doFetch2} = useFetch(`http://localhost:4000/medical_histories/${delid}.json`);
  React.useEffect(() => {
  userhistoryfetch.doFetch({
    method: "get",
  });
  dephistoryfetch.doFetch({
    method: "get",
  });
},[])
    {
      const {response, doFetch} = useFetch(`http://localhost:4000/dependents/${userID}/dependents`);
      React.useEffect(() => {
        doFetch({
          method: "get"
        })
    
      },[])
          {response && response.map(r=>{
          return(
            dependent.push(r)
          ) 
          })}
        }

        const handleChange= (e)=>{
          console.log(e.target.value)
          if(e.target.value==="Self"){
            if(userhistoryfetch.response){
              let self_histories = userhistoryfetch.response.filter((h) => {
                setdepId(e.target.value);
                return h.dependent_id === "0"
              })
              setHistories(self_histories);
            }
            }
          else{
            if(dephistoryfetch.response){
              let dep_histories = dephistoryfetch.response.filter((d) => {
                setdepId(e.target.value);
                return d.dependent_id == e.target.value
              })
              setHistories(dep_histories);
            }
          }
        }

        const handleDelete = (ID) => {
          setDelid(ID);
          doFetch2({
            method: "delete"
          });
          alert("Medical History Deleted");
          if(depId===0){
            if(userhistoryfetch.response){
              let self_histories = userhistoryfetch.response.filter((h) => {
                return h.dependent_id === 0
              })
              setHistories(self_histories);
            }
            }
          else{
            if(dephistoryfetch.response){
              let dep_histories = dephistoryfetch.response.filter((d) => {
                return d.dependent_id === depId
              })
              setHistories(dep_histories);
            }
          }
        }

    return (
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">         
                <select  name="relation"  className="form-control" placeholder="Select Relation" onChange={handleChange}>
                <option label="Select Relation Here"></option>
                {dependent && dependent.map(d => {
                return (
                <option value={d.relation=="Self"? 0 : d.id} key={d.id}>{d.relation}</option>
                )
                })}
                </select>      
                       
                
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/addMedicalHistory">
              <button type="button" className="btn btn-secondary">Click to add Medical History</button>
            </Link>
            </div>
        </div>
          <table className="table table-striped table-condensed table-hover" name="dataTable">
            <thead className="table-danger">
              <tr>
                <th scope="col">Illness</th>
                <th scope="col">Dr. Name</th>
                <th scope="col">Medicines</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Dosage Amount</th>
                <th scope="col">Dosage Frequency</th>
                <th scope="col">Dosage Time</th>
                <th scope="col">E-Notification</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {histories.map(h => {
                return (
                  <tr key={h.id}>
                    <td>{h.illness}</td>
                    <td>{h.doctor}</td>
                    <td>{h.medicine}</td>
                    <td>{h.startDate}</td>
                    <td>{h.endDate}</td>
                    <td>{h.dosageAmt}</td>
                    <td>{h.dosageFrequency}</td>
                    <td>{(h.dosageTime)}</td>
                <td id="tdcenter"><span id='clickableAwesomeFontToggle'>{h.eNotify? <FaToggleOn/> : <FaToggleOff/>}</span></td>
                    <td id="tdcenter"><span id='clickableAwesomeFontTrash' onClick={() => handleDelete(h.id)}><FaTrash/></span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>
    )
}