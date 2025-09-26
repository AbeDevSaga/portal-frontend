import * as Yup from 'yup';

// Ex Husband Schema - Independent validation
export const exHusbandSchema = Yup.object().shape({
  exHusbandResidentNumber: Yup.string().required('Resident Number is required'),
  divorceDate: Yup.date().required('Divorce Date is required'),
  registrationDate: Yup.date().required('Registration Date is required'),
  exHusbandFullName: Yup.string().required('Full Name is required'),
  exHusbandNationality: Yup.string().required('Nationality is required'),
  exHusbandDOB: Yup.date().required('Date of Birth is required'),
  exHusbandAddress: Yup.string().required('Address is required'),
  previousMarriageCertificateNo: Yup.string().required('Previous Marriage Certificate No. is required'),
});

// Ex Wife Schema - Independent validation
export const exWifeSchema = Yup.object().shape({
  exWifeResidentNumber: Yup.string().required('Resident Number is required'),
  exWifeFullName: Yup.string().required('Full Name is required'),
  exWifeNationality: Yup.string().required('Nationality is required'),
  exWifeDOB: Yup.date().required('Date of Birth is required'),
  exWifeAddress: Yup.string().required('Address is required'),
  previousMarriageCertificateNoWife: Yup.string().required('Previous Marriage Certificate No. is required'),
});

export const attachementsSchema = Yup.object().shape({
  courtOrder: Yup.mixed().required('Court Order file is required'),
  otherAttachement: Yup.mixed().required('Attachment are required'),
});