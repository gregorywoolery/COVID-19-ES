import axinstance from "./AxiosService"


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

export const DiagnosePatient = async (patient, setConfirmLoading, setDialogSuccess, setDialogFailed, GoToPatient) => {
    try{
        await axinstance
        .post('/api/patient-diagnosis', {patient})
        .then(({data}) => {
            setConfirmLoading(false);
            setDialogSuccess(true);
            
            // GoToPatient(data.patientID);
        })
        
    }catch(err){
        setConfirmLoading(false);
        setDialogFailed(true);
    }
}


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


export const GetVariants = async (setVariantList) =>{
    try {
        await axinstance
        .get('/api/facts/variants')
        .then(({data}) => setVariantList(data) ) 
        
    } catch (error) {

    }
}

export const GetPatient = async (patientID, setPatient) => {
    try {
        const patient = await axinstance
        .get(`/api/patient?patientid=${patientID}`)
        .then(({data})=> {
            console.log(data)
            return data;
        });

        setPatient(patient)
    } catch (error) {
        
    }
}