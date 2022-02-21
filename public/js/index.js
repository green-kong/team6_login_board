const slideView = document.querySelector('#slide_view');
const header = document.querySelector('#header');
const topTxT = document.querySelector('#top_text');
const slideImg = document.querySelector('.slide_img');
const firstImg = document.querySelector('#first_img');
const imgFrame = document.querySelector('#slide_img_list');
const blockInfo = document.querySelectorAll('.block_info');

const imgWidth = slideImg.getBoundingClientRect().width;

let isSlide = false;
let slideCount = 0;

const firstImgClone = firstImg.cloneNode(true);

imgFrame.appendChild(firstImgClone);

const slide = () => {
  slideCount += 1;
  imgFrame.style.transform = `translateX(-${imgWidth * slideCount}px)`;

  if (slideCount === 4) {
    console.log(slideCount);
    imgFrame.style.transform = `translateX(-${imgWidth * slideCount}px)`;
    setTimeout(() => {
      imgFrame.style.transition = 'none';
      imgFrame.style.transform = 'translateX(0px)';
    }, 350);
    slideCount = 0;
  }
  imgFrame.style.transition = 'all 350ms ease-in';
};

let slideInterval = null;

const imgSlide = () => {
  if (!isSlide) {
    console.log('check');
    isSlide = !isSlide;
    slideInterval = setInterval(slide, 2500);
  }
};

window.addEventListener('scroll', () => {
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
    imgSlide();
  } else {
    topTxT.classList.remove('fix');
    clearInterval(slideInterval);
    isSlide = false;
  }

  if (window.scrollY > 1060) {
    blockInfo[0].classList.add('scroll');
    setTimeout(() => {
      blockInfo[1].classList.add('scroll');
    }, 200);
    setTimeout(() => {
      blockInfo[2].classList.add('scroll');
    }, 400);
  } else {
    blockInfo.forEach((v) => v.classList.remove('scroll'));
  }

  if (window.scrollY > 1280) {
    header.classList.remove('scroll');
    clearInterval(slideInterval);
    isSlide = false;
  }
});
