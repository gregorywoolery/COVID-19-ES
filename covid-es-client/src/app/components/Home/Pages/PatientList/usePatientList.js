import { useEffect, useState } from "react";
import * as clientService from "../../../../../services/ClientService";


const usePatientList = () => {
    const [patientList, setPatientList] = useState([]);

    useEffect(() => {
        clientService.GetPatientList(setPatientList);

        return () => {
            setPatientList({})
        }
    }, [])

    return {
        patientList
    }
}


export default usePatientList;