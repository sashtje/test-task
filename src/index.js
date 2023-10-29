import './main.scss';
import {logHello} from "./test";
import woman from './images/cover-1.jpg';
import home from './images/home.svg';

const component = () => {
  const element = document.createElement('h1');
  element.innerHTML = 'Hello World!';

  logHello();

  return element;
};

document.body.appendChild(component());

const imageJPG = () => {
  const img = document.createElement('img');
  img.alt = 'smoking woman';
  img.src = woman;

  return img;
};
document.body.appendChild(imageJPG());

const imageSVG = () => {
  const img = document.createElement('img');
  img.alt = 'home';
  img.src = home;

  return img;
};
document.body.appendChild(imageSVG());
