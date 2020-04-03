import * as yup from 'yup';

export default function testForm(){
  // alert('form');


  const processForm = (e) => {
    if (e.preventDefault) e.preventDefault();

    return false;
  }

  const form = document.getElementById('testForm');
  form.addEventListener("submit",processForm);
}
