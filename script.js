'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollto = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const nav = document.querySelector('.nav');
const tab = document.querySelectorAll('.operations__tab');
const tabcontainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

/*
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);
// const header = document.querySelector('.header');
// const sectionAll = document.querySelectorAll('section');
// console.log(sectionAll);
// const btnAll = document.getElementsByTagName('button');
// console.log(btnAll);
// console.log(document.getElementsByClassName('btn'));
// const msg = document.createElement('div');
// msg.classList.add('cookie-message');
// msg.textContent = 'We use cookie for better improvement and analytics';
// msg.innerHTML = `We use cookie for better improvement and analytics.
//              <button class = 'btn btn--close-cookie'> Got it</button>`;
// header.prepend(msg); //prepend() adds the item at the begining
// header.append(msg);
// /*When we use prepend() and append() together it just transfers 
//                       the text rather than adding at the mentioned places.*/
// //header.append(msg.cloneNode(true)); //clonenode() makes the duplicate of the item
// // header.before(msg);
// // header.after(msg);

// //Delete element
// /*
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => msg.remove());*/ //remove() is a feature of ES6i.e. introduced in 2020
// //Above code can be done like this also..⏬
// //Same code as above with ES5 feature
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => msg.parentElement.removeChild(msg));

// //Styles
// msg.style.backgroundColor = 'red';
// msg.style.width = '120%';
// console.log(msg.style.backgroundColor);
// console.log(msg.style.width);
// console.log(getComputedStyle(msg)); //getComputerStyle() gives the complete css of an element .
// console.log(getComputedStyle(msg).color); //particular property of an element through getComputedStyle
// msg.style.height =
//   Number.parseFloat(getComputedStyle(msg).height, 10) + 30 + 'px';
// console.log(msg.style.height);
// //Setting property of a document
// document.documentElement.style.setProperty('--color-primary', 'hotpink');

// const logo = document.querySelector('.nav__logo');

// console.log(logo.alt);
// console.log(logo.className);

// //Non-standard
// console.log(logo.designer); //o/p is undefined because designer is not the property/attribute of image
// console.log(logo.getAttribute('designer'));

// console.log(logo.src); //Gives the absolute url i.e. server address followed by image address
// console.log(logo.getAttribute('src')); //will give the relative url i.e. address of the image in folder
//*/

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Button Scrolling
btnScrollto.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect()); //e.target will point the btnScrollto button.
  console.log(
    'Current X/Y coordinates',
    window.pageXOffset,
    window.pageYOffset
  );
  console.log(
    'ViewPort height/width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //Scrolling
  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  );*/

  //Scrolling but in better way that is passing objet instead of aruguments
  /*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behaviour: 'smooth',
  });*/

  //Same scrooling as above in the latest JS way
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*  //Adding and removing event
const h1 = document.querySelector('h1');
const cl1 = function () {
  alert('Great: This  is clicked');
};
h1.addEventListener('mouseenter', cl1);

setTimeout(() => h1.removeEventListener('mouseenter', cl1), 5000);
*/

//event propagation......capturing phase(from root to target element) and
//bubbling phase(target element to root through all its parent elements)...below one
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Container', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav', e.target, e.currentTarget);
});
*/

//Page navigation
//1st way i.e. without event delegation
/*
document.querySelector('.nav__link').forEach(el =>
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    id.scrollIntoView({ behavior: 'smooth' });
  })
);
*/
//Modern way... with event delegation..It follows two steps
//1. Add event listener to common parent element
//2. Determine what element has clicked
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Going downwards...inside the DOM tree
/*
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.childElementCount);
console.log(h1.children);
h1.firstElementChild.style.color = 'red';
h1.lastElementChild.style.color = 'greenpink';

//Going upwards .....parents
console.log(h1.parentElement);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';
*/
//Tabbed component

tabcontainer.addEventListener('click', e => {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tab.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');
  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const fadeMenu = function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('.nav__logo');

    siblings.forEach(cur => {
      if (cur !== link) cur.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};
//Menu fade animation
nav.addEventListener('mouseover', fadeMenu.bind(0.5));

nav.addEventListener('mouseout', fadeMenu.bind(1));
// Scrolling-sticky navigation

const stickyNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
};

const navheight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navheight}px`,
});

headerObserver.observe(header);

//loading lazy image
const imgAll = document.querySelectorAll('img[data-src]');
const lazyImg = function (entries, obj) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  obj.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imgAll.forEach(img => imgObserver.observe(img));

//Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0;
const maxSlide = slides.length;

const moveSlide = slide => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
moveSlide(0);

// const createDots = () => {
//   slides.forEach((_, i) => {
//     dotContainer.insertAdcentHTML(
//       'beforeend',
//       `<button class = 'dots__dot data-slide = "${i}"></button>`
//     );
//   });
// };
// createDots();

const nextSlide = () => {
  if (curSlide === maxSlide - 1) curSlide = 0;
  else {
    curSlide++;
  }
  moveSlide(curSlide);
};
const prevSlide = () => {
  if (curSlide === 0) curSlide = maxSlide - 1;
  else {
    curSlide--;
  }
  moveSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
//Sliding based on keypress
document.addEventListener('keydown', e => {
  console.log(e);
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
