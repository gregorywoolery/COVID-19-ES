import axinstance from "./AxiosService"


export const GetPatientDiagnosis = async (patient) => {
    try{
        const patientDiagnosis = await axinstance
        .get('/PatientDiagnosis', {patient})
        .then(({data}) => {

        })
        
    }catch(err){

    }
}


export const AddFact = async (factType, factOperand, setConfirmLoading, setDialogSuccess, setDialogFailed) =>{
    try {
        await axinstance
        .post('/api/facts', {factType, factOperand})
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
        const variantsResponse = await axinstance
        .get('/api/facts/variants')
        .then(({data}) => {    
            return data;
        }) 

        setVariantList(variantsResponse); 
    } catch (error) {

    }
}

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