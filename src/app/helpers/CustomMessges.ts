/**
 * Collection of reusable RegExps
 */
export const customregExps: { [key: string]: RegExp } = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$/,
  fullName:/^[a-zA-Z ]{2,60}$/,
  mobile:/^[6-9]\d{9}$/
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

export const hintMessages: { [key: string]: string } = {
  password: 'Length between 8-15 characters, contains atleast one capitial letter, one digit and one special character like $ @ ! % * ? & # Note: do not use < or > in your password'
}
