import axinstance from "./AxiosService"


export const GetPatientDiagnosis = (patient) => {
    try{
        const patientDiagnosis = await axinstance
        .get('/PatientDiagnosis', {patient})
        .then(({data}) => {

        })
        
    }catch(err){

    }
}