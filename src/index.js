import './main.scss';
import {logHello} from "./test";

const component = () => {
  const element = document.createElement('h1');
  element.innerHTML = 'Hello World!';

  logHello();

  return element;
};

document.body.appendChild(component());
