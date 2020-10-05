import React from 'react';
import {Link} from 'react-router-dom';
import useFetch from '../hooks/use-fetch';
import {CurrentUserContext} from '../context/user-context';
export default function AddMedicalHistory() {
    const [currentUserState, setCurrentUserState] = React.useContext(CurrentUserContext);
    const {isLoading, response, error, doFetch} = useFetch("http://localhost:4000/medical_histories");
    let userID=localStorage.getItem("id");
    var dependent=[];
    const [formData, setFormData] = React.useState({
      illness: "",
      doctor: "",
      medicine: "",
      startDate: "",
      endDate: "",
      dosageAmt: "",
      dosageFrequency: "",
      dosageTime: "",
      eNotify: false,
      user_id: userID,
      dependent_id:""

    });
  

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

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(JSON.stringify(formData));
      doFetch({
        method: "post",
        body: JSON.stringify({
          medical_history: {
            illness: formData.illness,
            doctor: formData.doctor,
            medicine: formData.medicine,
            startDate: formData.startDate,
            endDate: formData.endDate,
            dosageAmt: formData.dosageAmt,
            dosageFrequency: formData.dosageFrequency,
            dosageTime: formData.dosageTime,
            eNotify: formData.eNotify,
            user_id: formData.user_id,
            dependent_id: formData.dependent_id
        }})
      })
    }

    return(
        <div className="d-flex justify-content-around">
            <form onSubmit={handleSubmit}>
                <h6>Add Medical History here..</h6>
                <div className="form-group">
                <select  name="dependent_id" value={formData.dependent_id}  className="form-control" placeholder="Select Relation" onChange={handleChange}>
                <option label="Select Relation Here"></option>
                {dependent && dependent.map(d => {
                return (
                <option value={d.relation=="Self"? 0 : d.id} key={d.id}>{d.relation}</option>
                )
                })}
                </select>
                </div>

                <div className="form-group">
                    <input type="text"  name="illness"  onChange={handleChange} 
                placeholder="Illness" value={formData.illness} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="doctor" onChange={handleChange} 
                placeholder="Dr. Name" value={formData.doctor} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="medicine" onChange={handleChange} 
                placeholder="Medicine" value={formData.medicine} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="date" name="startDate" onChange={handleChange} 
                    value={formData.startDate} className="form-control"/>
                </div>
              

                <div className="form-group">
                    <input type="date" name="endDate" onChange={handleChange} 
                    value={formData.endDate} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="dosageAmt" onChange={handleChange} 
                 placeholder="Dosage Amount" value={formData.dosageAmt} className="form-control"/>
                </div>


                <div className="form-group">
                    <input type="text" name="dosageFrequency" onChange={handleChange} 
                    placeholder="Dosage Frequency" value={formData.dosageFrequency} className="form-control"/>
                </div>

                <div className="form-group">
                    <input type="time" name="dosageTime" onChange={handleChange}
                    value={formData.dosageTime} className="form-control"/>
                </div>

                <div className="form-group">
                    <select value={formData.eNotify} name="eNotify" onChange={handleChange} className="form-control">
                        <option value='true'>Enable E-Notification</option>
                        <option value='false'>Disable E-Notification</option>
                    </select>
                </div>
                {/* <div className="form-group">
                    <input type="boolean" name="email_notify" onChange={handleChange} 
                    value={formData.eNotify}/>
                </div> */}

                <div className = "d-flex justify-content-around">
                    <button className="btn btn-success">Save</button>
                    <Link to="/medical-history"><button className="btn btn-outline-danger">Go Back</button></Link>
                </div>
            </form>
        </div>
    )
}