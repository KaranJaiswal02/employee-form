import { atom } from 'jotai';
import { DefaultBankMandateFormData, DefaultCurrentUserData, DefaultEmpFormData, DefaultFormStatusus, DefaultGrauFormData, DefaultIdCardFormData, DefaultNominationForm1Data, DefaultNominationForm2Data, DefaultStaffFamilyFormData } from './defaultValue';
import IFetchedUser from '@/types/fetchedUser';

export const currentUserData = atom(DefaultCurrentUserData)

export const empFormData = atom(DefaultEmpFormData)
export const grauFormData = atom(DefaultGrauFormData)
export const nominationForm1Data = atom(DefaultNominationForm1Data)
export const nominationForm2Data = atom(DefaultNominationForm2Data);
export const bankMandateFormData = atom(DefaultBankMandateFormData)
export const idCardFormData = atom(DefaultIdCardFormData)
export const staffFamilyFormData = atom(DefaultStaffFamilyFormData)

export const formStatusus = atom(DefaultFormStatusus)
export const usersData = atom<IFetchedUser[]>([])
export const usersStatusData = atom<IFetchedUser[]>([])