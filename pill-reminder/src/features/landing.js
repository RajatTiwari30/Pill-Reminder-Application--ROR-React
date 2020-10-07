import React from 'react';
import useFetch from '../hooks/use-fetch';
import {Link} from 'react-router-dom';
import {CurrentUserContext} from '../context/user-context';
export default function Landing() {
    let userID=localStorage.getItem("id");
    console.log(userID);
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    const {isLoading, response, error, doFetch} = useFetch(`http://localhost:4000/medical_histories/${userID}/recent`);
    React.useEffect(() => {
      doFetch({
        method: "get"
      })
    },[])
    
    React.useEffect(() => {
      console.log(response);
    }, [response])
    
    return (
      <div>
        <h4>Welcome to Pill Reminder !</h4>
        <Link to="/addMedicalHistory">
              <button type="button" className="btn btn-secondary">Add Medical History</button>
        </Link>
        <table className="table table-bordered table-sm">
          <caption id="captionID">Medication Alert !!</caption>
          <thead className="table-warning">
            <tr>
              <th align="center">Doctor</th>
              <th align="center">Illness</th>
              <th align="center">Medicine</th>
              <th align="center">Dosage Frequency</th>
            </tr>
          </thead>
          <tbody>
        { response && response.map(r => {
            return (
              <tr key={r.id}>
                <td align="center">{r.doctor}</td>
                <td align="center">{r.illness}</td>
                <td align="center">{r.medicine}</td>
                <td align="center">{r.dosageFrequency}</td>
              </tr>
            )
        })}
        </tbody>
        </table>
      </div>
    )
}