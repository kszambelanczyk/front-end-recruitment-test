import * as yup from 'yup';

const schema = yup.object().shape({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup.string().trim().required('Email is required').email('Invalid eamil address'),
  country: yup.string().trim().required('Country is required'),
  postalCode: yup.string().matches(/[0-9]/,'Invalid format of poctal code').required('Postal code is required'),
  phoneNumber: yup.string().trim().required('Phone number is required'),
  cardNumber: yup.string().matches(/\d{4}-?\d{4}-?\d{4}-?\d{4}/,'Invalid format of credit card number').required('Credit card number is required'),
  securityCode: yup.string().matches('[0-9]','Security code must contain only numbers').min(3).max(3),
  expirationDate: yup.string().matches(/^[0-9]{2}[/]{1}?[0-9]{2}$/,'Expiration date must be in format MM/YY').transform((r)=>{
    const v = r.split('/');
    if(Date.parse(`20${v[1]}-${v[0]}-01`)){
      return r;
    } else {
      return '';
    }
  }).required('Invalid expiration date')
});

export default function testForm(){
  const displayErrors = (err) => {
    err.inner.forEach((el)=>{
      console.log(el.path);
      const errorField = document.getElementById(`${el.path}Error`);
      errorField.innerHTML = el.message; 
      errorField.parentNode.classList.add("is-invalid");
    })
  }

  const processForm = (e) => {
    if (e.preventDefault) e.preventDefault();

    const inputs = document.getElementsByTagName('input');
    const values = {};
    for(const key in schema.fields){
      values[key] = inputs[key].value;
    }
    console.log(values);

    schema.validate(values,{abortEarly: false})
      .then(()=>{
        alert('sending data...');
      })
      .catch((err)=>{
        displayErrors(err);
      })

    return false;
  }

  const form = document.getElementById('testForm');
  form.addEventListener('submit',processForm);



  const processCardInput = (e) => {
    if (new RegExp(/[a-zA-Z]/).test(e.key)){
      e.preventDefault();
      return false;
    }
    if (!new RegExp(/[0-9]/).test(e.key)){
      return;
    }
    const field = e.target;
    
    const rawNumbers = field.value.replace(/-/g,'');
    const cardLength = rawNumbers.length;
    if(cardLength==16){
      e.preventDefault();
      return false;
    }
    if(cardLength !==0 && cardLength <=12 && cardLength % 4 == 0){
      field.value = field.value + '-';
    }
  }

  const cardInput = document.getElementById('cardNumber');
  cardInput.addEventListener('keydown',processCardInput);

}
