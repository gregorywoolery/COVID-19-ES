import axinstance from "./AxiosService"

// Function used to get all sytems from the api using axios request
// When successfull, set symptoms to be used in the system and add event listensers
export const GetSymptoms = async (setKnownSymptoms, addCheckBoxEventListeners) =>{
    try {
        await axinstance
        .get('/api/facts/symptoms')
        .then(({data}) => {
            setKnownSymptoms(data);
            addCheckBoxEventListeners();
        })
    } catch (error) {
        
    }
}

// Function used to request patient diagnosis from api
// Request sends patient health data and recieved thier id if successfull
export const DiagnosePatient = async (patient, setConfirmLoading, setDialogSuccess, setDialogFailed, GoToPatient) => {
    try{
        await axinstance
        .post('/api/patient-diagnosis', {patient})
        .then(({data}) => {
            setConfirmLoading(false);
            setDialogSuccess(true);
            
            GoToPatient(data.patientID);
        })
        
    }catch(err){
        setConfirmLoading(false);
        setDialogFailed(true);
    }
}

// Function used to request adding of systoms to database
// Request sends sypmtoms fact data and returns successful if it has been added
// If failed then display to user request has failed
export const AddSymptomsFact = async (fact, variant, symptomType, setConfirmLoading, setDialogSuccess, setDialogFailed) =>{
    try {
        await axinstance
        .post(`/api/facts`, {"type": "symptom", "fact": fact, "variant": variant, "symtomType": symptomType})
        .then(()  => {
            setConfirmLoading(false);
            setDialogSuccess(true);
        })
    } catch (error) {
        setConfirmLoading(false);
        setDialogFailed(true);
    }
}

// Function used to request adding of precaution to database
// Request sends precaution fact data and returns successful if it has been added
// If failed then display to user request has failed
export const AddPrecautionFact = async (fact, precautionType, setConfirmLoading, setDialogSuccess, setDialogFailed) =>{
    try {
        await axinstance
        .post(`/api/facts`, {"type": "precaution", "fact": fact, "precautionType": precautionType})
        .then(()  => {
            setConfirmLoading(false);
            setDialogSuccess(true);
        })
    } catch (error) {
        setConfirmLoading(false);
        setDialogFailed(true);
    }
}

// Function request list of variants from api 
export const GetVariants = async (setVariantList) =>{
    try {
        await axinstance
        .get('/api/facts/variants')
        .then(({data}) => setVariantList(data) ) 
        
    } catch (error) {

    }
}

// Function gets patient information from the api
// Request send patient id to api from where, 
// On succes, a patient object is returned.
export const GetPatient = async (patientID, setPatient) => {
    try {
        const patient = await axinstance
        .get(`/api/patient?patientid=${patientID}`)
        .then(({data})=> {
            return data;
        });

        setPatient(patient)
    } catch (error) {
        
    }
}