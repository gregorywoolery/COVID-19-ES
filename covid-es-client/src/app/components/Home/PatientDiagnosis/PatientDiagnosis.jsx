import React, { useState } from 'react'
import axinstance from '../../../../services/AxiosService';

export default function PatientDiagnosis() {
    const [stats, setStats] = useState('');

    const DiagnosePatient = () => {
        axinstance.get('/Statistics').then((data) => {
            console.log(data);
            setStats(data.data.CovidPatients)
        });
    }
    return (
        <div>
            <h4>Patient Diagnosis</h4>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Firstname</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Lastname</label>
                    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Symptoms</option>
                    <option value="1">Fever</option>
                    <option value="2">Headache</option>
                    <option value="3">No taste</option>
                </select>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Are you active?</label>
                </div>
                <button type="button" onClick={DiagnosePatient} class="btn btn-primary">Submit</button>
                <div>Covid Patients: {stats || '0'}</div>
            </form>
        </div>
    )
}
