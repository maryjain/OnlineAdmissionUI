/**
 * Collection of reusable RegExps
 */
export const customregExps: { [key: string]: RegExp } = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!*&])[A-Za-z\d$@!*&]{8,15}$/,
  email: /^(?!.*\.\.)(?!.*\_\_)(?!.*\-\-)(?!.*\.\-)(?!.*\-\.)(?!.*\_\-)(?!.*\-\_)(?!.*\.\_)(?!.*\_\.)[a-zA-Z0-9][a-zA-Z0-9._-]+@(?!.*\.\.)(?!.*\-\-)(?!.*\.\-)(?!.*\-\.)[a-zA-Z0-9]{1,}[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/,
  fullName: /^[a-zA-Z][a-zA-Z ]{1,200}$/,
  mobile: /^[6-9]\d{9}$/,
  addressline: /^((?=.*[a-z]{2})[a-zA-Z0-9][a-zA-Z0-9 .]{1,149})$/,
  pincode: /^[1-9]{1}[0-9]{2}\\s{0, 1}[0-9]{3}$/

};

/**
* Collection of reusable error messages
*/
export const errorMessages: { [key: string]: string } = {
  fullName: 'Please enter valid Full name',
  email: 'Please enter valid email address',
  password: 'Please enter valid password',
  mobile: 'Please enter valid mobile number',
  pincode:'Please enter valid pincode',
  annualincome: 'Please enter valid annual income',
  fullNameRequired: 'Full name is required',
  emailRequired: 'Email address is  required',
  passwordRequired: 'Password is  required ',
  mobileRequired: 'Mobile number is  required',
  dobRequired: 'Date of Birth is  required',
  otpRequired: 'OTP is required',
  genderRequired: 'Gender is required',
  religionRequired: 'Religion is required',
  communityRequired: 'Community is required',
  creamyLayerRequired: 'Creamy Layer is required',
  annualincomeRequired: 'Annual Income required',
  nationalityRequired: 'Nationality is required',
  stateRequired: 'State is required',
  addresslineRequired: 'Address Line is required',
  addresstypeRequired: 'Address Type is required',
  pincodeRequired: 'Pincode is required',
  districtRequired: 'District is required',
  addressline: 'Please enter valid Address Line',
  emailDuplicate: 'Email id already exists',
  mobileNoDuplicate: 'Mobile Number already exists',
  otpTimerExpires: 'Time out , Resend OTP again',
  success: 'Success',
  failure: 'Failure',
};

export const hintPasswordMessages: { [key: string]: string } = {
  password1: 'Mininum 8 characters',
  password2: 'Maximum 15 characters',
  password3: 'Atleast One special characters $ @ ! * &',
  password4: 'Atleast One number 0 -9 ',
  password5: 'Atleast One smallcase character a - z',
  password6: 'Atleast One uppercase character A - Z'
};
export const hintFullNameMessages: { [key: string]: string } = {
  fullname1: 'Mininum 3 characters',
  fullname2: 'Maximum 100 characters',
  fullname3: 'Allowed characters are a - z A - Z space',
  fullname4: 'Start with alphabet a - z A - Z'
};
export const hintEmailMessages: { [key: string]: string } = {
  email1: 'Mininum 8 characters',
  email2: 'Maximum 100 characters',
  email3: 'Start with alphabet a - z  A - Z',
  email4: 'Allowed special characters . - _ in email name',
  email5: 'Allowed special characters . - in domain name',

};

export const hintPhoneMessages: { [key: string]: string } = {
  phone1: 'Mobile number (India) 10 digit',
  phone2: 'Start with number 6 - 9',
 };

 export const hintAnnualIncomeMessages: { [key: string]: string } = {
  annualIncome1: 'Maximum 9 digit AnnualIncome ',
 };

 export const hintAddressMessages: { [key: string]: string } = {
  addressline1: 'Start with characters a - z A - Z 0 -9',
  addressline2: 'Minimum 4 characters',
  addressline3: 'Allowed special characters . space',
 };


export const registrationFormMessage: { [key: string]: string } = {
  saveWarnMessage: 'Data is saved only when Submit button is clicked'
 };
