import React from 'react';
import {Link} from 'react-router-dom';
export default function MedicalHistory() {

  const [history, setHistory] = React.useState([]);

  const [formData, setFormData] = React.useState({
    relation: "",
    illness: "",
    doctor: "",
    medicine: "",
    startDate: "",
    endDate: "",
    dosageAmt: "",
    dosageFrequency: "",
    dosageTime: "",
    eNotify: false
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));

    setHistory([...history, formData]);
  }

    return (
      <div>
          <div className="d-flex justify-content-end">
            <Link to="/addMedicalHistory">
            <button type="button" class="btn btn-secondary btn-sm">Click to add Medical History</button>
            </Link>
            </div>
          <table className="table table-striped table-condensed table-hover">
            <thead className="table-danger">
              <tr>
                <th scope="col">Relation</th>
                <th scope="col">Illness</th>
                <th scope="col">Dr. Name</th>
                <th scope="col">Medicines</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Dosage Amount</th>
                <th scope="col">Dosage Frequency</th>
                <th scope="col">Dosage Time</th>
                <th scope="col">Email Notification</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => {
                return (
                  <tr>
                    <td>{h.relation}</td>
                    <td>{h.illness}</td>
                    <td>{h.doctor}</td>
                    <td>{h.medicine}</td>
                    <td>{h.startDate}</td>
                    <td>{h.endDate}</td>
                    <td>{h.dosageAmt}</td>
                    <td>{h.dosageFrequency}</td>
                    <td>{h.dosageTime}</td>
                    <td>{h.eNotify}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </div>
    )
}