import { bankMandateFormData, empFormData, grauFormData, idCardFormData, nominationForm1Data, nominationForm2Data, staffFamilyFormData } from "@/hooks/Atoms";
import { useAtom } from "jotai";

const [, setbankMandateFormData] = useAtom(bankMandateFormData);
const [, setGrauFormData] = useAtom(grauFormData);
const [, setIdCardFormData] = useAtom(idCardFormData);
const [, setNominstionForm1Data] = useAtom(nominationForm1Data);
const [, setNominstionForm2Data] = useAtom(nominationForm2Data);
const [, setStaffFamilyFormData] = useAtom(staffFamilyFormData);
const [, setEmpFormData] = useAtom(empFormData);

const setFormsData = (data: any) => {
    if (data.bankMandateFormData) {
        setbankMandateFormData(data.bankMandateFormData);
    }
    if (data.grauFormData) {
        setGrauFormData(data.grauFormData);
    }
    if (data.idCardFormData) {
        setIdCardFormData(data.idCardFormData);
    }
    if (data.nominationForm1Data) {
        setNominstionForm1Data(data.nominationForm1Data);
    }
    if (data.nominationForm2Data) {
        setNominstionForm2Data(data.nominationForm2Data);
    }
    if (data.staffFamilyFormData) {
        setStaffFamilyFormData(data.staffFamilyFormData);
    }
    if (data.empFormData) {
        setEmpFormData(data.empFormData);
    }
}

export default setFormsData;