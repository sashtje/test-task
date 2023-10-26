const component = () => {
  const element = document.createElement('h1');
  element.innerHTML = 'Hello World!';

  return element;
};

document.body.appendChild(component());
