import React from "react";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import {
    useParams
} from "react-router-dom";
import axios from "axios";

const PatientPage = () => {
    console.log('inside patient page');
    const [{ patients }, dispatch] = useStateValue();
    const id = useParams<{ id: string }>().id;
    React.useEffect(() => {
        

        const fetchPatientList = async () => {
            try {
                const { data: patientDataFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({ type: "SET_PATIENT_DATA", payload: patientDataFromApi });
            } catch (e) {
                console.error(e);
            }
        };
        void fetchPatientList();

    }, [dispatch]);

    console.log(patients);

    const patient = patients[id];
    if(patient){
        return(
            <div>
                <h2>{patient.name}</h2>
                <div>{patient.ssn}</div>
                <div>{patient.occupation}</div>
            </div>
        );
    }else{
        return(
            <div>This patient is not defined in the database</div>
        );
    }


};

export default PatientPage;