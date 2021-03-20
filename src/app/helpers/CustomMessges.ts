/**
 * Collection of reusable RegExps
 */
export const customregExps: { [key: string]: RegExp } = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@!*&])[A-Za-z\d$@!*&]{8,15}$/,
 // email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/,
  email: /^(?!.*\.\.)(?!.*\_\_)(?!.*\-\-)(?!.*\.\-)(?!.*\-\.)(?!.*\_\-)(?!.*\-\_)(?!.*\.\_)(?!.*\_\.)[a-zA-Z0-9][a-zA-Z0-9._-]+@(?!.*\.\.)(?!.*\-\-)(?!.*\.\-)(?!.*\-\.)[a-zA-Z0-9]{1,}[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/,
  fullName: /^[a-zA-Z][a-zA-Z ]{3,200}$/,
  mobile: /^[6-9]\d{9}$/
};

/**
* Collection of reusable error messages
*/
export const errorMessages: { [key: string]: string } = {
  fullName: 'Please enter valid Full name',
  email: 'Please enter valid email address',
  password: 'Please enter valid password',
  mobile:'Please enter valid mobile number',
  fullNameRequired: 'Full name is required',
  emailRequired: 'Email address is  required',
  passwordRequired: 'Password is  required ',
  mobileRequired:'Mobile number is  required',
  dobRequired:'Date of Birth is  required',
  otpRequired:'OTP is required'
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
  password1: 'Mininum 3 characters',
  password2: 'Maximum 100 characters',
  password3: 'Allowed characters are a - z A - Z space',
  password4: 'Start with alphabet a - z A - Z'
};
export const hintEmailMessages: { [key: string]: string } = {
  password1: 'Mininum 8 characters',
  password2: 'Maximum 100 characters',
  password3: 'Start with alphabet a - z  A - Z',
  password4: 'Allowed special characters . - _ in email name',
  password5: 'Allowed special characters . - in domain name',

};

export const hintPhoneMessages: { [key: string]: string } = {
  password1: 'Mobile number (India) 10 digit',
  password2: 'Start with number 6 - 9',
 };

export const registrationFormMessage: { [key: string]: string } = {
  saveWarnMessage: 'Registration form data is saved only when Submit button is clicked'
 };
