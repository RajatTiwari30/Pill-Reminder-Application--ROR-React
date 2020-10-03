import React from 'react';
import {Link} from 'react-router-dom';
export default function AddMedicalHistory() {
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
    return(
        <div className="d-flex justify-content-around">
            <form onSubmit={handleSubmit}>
                <h6>Add Medical History here..</h6>
                <div className="form-group">
                    <select value={formData.relation} onChange={handleChange} className="form-control">
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Children">Children</option>
                        <option value="Mother In Law">Mother In Law</option>
                        <option value="Father In Law">Father In Law</option>
                    </select>
                </div>

                <div className="form-group">
                    <input type="text"  name="illness"  onChange={handleChange} 
                placeholder="Illness" value={formData.illness} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="drname" onChange={handleChange} 
                placeholder="Dr. Name" value={formData.doctor} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="medicine" onChange={handleChange} 
                placeholder="Medicine" value={formData.medicine} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="date" name="startdate" onChange={handleChange} 
                    value={formData.startDate} className="form-control"/>
                </div>
              

                <div className="form-group">
                    <input type="date" name="enddate" onChange={handleChange} 
                    value={formData.endDate} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="dosage_amount" onChange={handleChange} 
                 placeholder="Dosage Amount" value={formData.dosageAmt} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="dosage_frequency" onChange={handleChange} 
                    placeholder="Dosage Frequency" value={formData.dosageFrequency} className="form-control"/>
                </div>

                <div className="form-group">
                    <input type="time" name="dosage_time" onChange={handleChange}
                    value={formData.dosageTime} className="form-control"/>
                </div>

                <div className="form-group">
                    <select value={formData.eNotify} onChange={handleChange} className="form-control">
                        <option value="True">Enable E-Notification</option>
                        <option value="False">Disable E-Notification</option>
                    </select>
                </div>
                {/* <div className="form-group">
                    <input type="boolean" name="email_notify" onChange={handleChange} 
                    value={formData.eNotify}/>
                </div> */}

                <div className = "d-flex justify-content-around">
                    <button>Save</button>
                    <Link to="/medical-history">Cancel</Link>
                </div>
            </form>
        </div>
    )
}