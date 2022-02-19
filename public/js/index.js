const slideView = document.querySelector('#slide_view');
const header = document.querySelector('#header');
const topTxT = document.querySelector('#top_text');

window.addEventListener('scroll', () => {
  console.log(window.scrollY);
  if (window.scrollY > 200) {
    slideView.style.width = `${60 + (window.scrollY - 200) / 10}vw`;
  }

  if (window.scrollY > 280) {
    topTxT.classList.add('scroll');
  } else {
    topTxT.classList.remove('scroll');
  }

  if (window.scrollY > 500) {
    header.classList.add('scroll');
  } else {
    header.classList.remove('scroll');
  }

  if (window.scrollY > 580) {
    topTxT.classList.add('fix');
  } else {
    topTxT.classList.remove('fix');
  }

  if (window.scrollY > 1280) {
    header.classList.remove('scroll');
  }
});
