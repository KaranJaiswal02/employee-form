import { atom } from 'jotai';
import { DefaultBankMandateFormData, DefaultEmpFormData, DefaultFormStatusus, DefaultGrauFormData, DefaultIdCardFormData, DefaultNominationForm1Data, DefaultNominationForm2Data, DefaultStaffFamilyFormData } from './defaultValue';

export const empFormData = atom(DefaultEmpFormData)
export const grauFormData = atom(DefaultGrauFormData)
export const nominationForm1Data = atom(DefaultNominationForm1Data)
export const nominationForm2Data = atom(DefaultNominationForm2Data);
export const bankMandateFormData = atom(DefaultBankMandateFormData)
export const idCardFormData = atom(DefaultIdCardFormData)
export const staffFamilyFormData = atom(DefaultStaffFamilyFormData)
export const formStatusus = atom(DefaultFormStatusus)
export const usersData = atom<IFetchedUser[]>([])