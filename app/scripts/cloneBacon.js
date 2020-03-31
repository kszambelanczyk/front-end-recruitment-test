const button = document.getElementById('more-bacon-button');
const sourceImg = document.getElementById('bacon-img');
const container = document.getElementById('bacon-container');

button.addEventListener('click', (event)=> {
  const newImg = sourceImg.cloneNode();
  newImg.style.marginTop = '1rem';
  container.appendChild(newImg);
});
