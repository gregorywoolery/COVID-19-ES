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
                    <label for="InputName" class="form-label">Full Name</label>
                    <input type="text" class="form-control" id="InputName" aria-describedby="emailHelp" width/>
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Age</label>
                    <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text"></div>
                </div>
                <label for="Exposed" class="form-label">Have you been expoed to anyone with Covid</label>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Select</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                </select>

                <div class="mb-3">
                    <label for="InputName" class="form-label">Enter your temperature in degrees celcius</label>
                    <input type="text" class="form-control" id="InputName" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text"></div>
                </div>

                <label for="Exposed" class="form-label">Are you experiencing any of these symptoms? Choose as many as you need</label>
                    
                <div class="mb-3 form-check">
                   <input type="checkbox" class="form-check-input" id="dizziness"/>
                    <label class="form-check-label" for="exampleCheck1">Dizziness</label>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="fever"/>
                    <label class="form-check-label" for="exampleCheck1">Fever</label>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="extreme"/>
                    <label class="form-check-label" for="exampleCheck1">Extreme Tiredness</label>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="sore"/>
                    <label class="form-check-label" for="exampleCheck1">Sore throat</label>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="chest"/>
                    <label class="form-check-label" for="exampleCheck1">Chest Pain</label>
                </div>

                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="diarrhoea"/>
                    <label class="form-check-label" for="exampleCheck1">Diarrhoea</label>
                </div>

                <div class="mb-3">
                    <label for="InputName" class="form-label">Systolic Value</label>
                    <input type="text" class="form-control" id="InputName" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text"></div>
                </div>

                <div class="mb-3">
                    <label for="InputName" class="form-label">Diastolic Value</label>
                    <input type="text" class="form-control" id="InputName" aria-describedby="emailHelp"/>
                    <div id="emailHelp" class="form-text"></div>
                </div>

                <button type="button" onClick={DiagnosePatient} class="btn btn-primary">Submit</button>
                <div>Covid Patients: {stats || '0'}</div>
                
            </form>
        </div>
    )
}
