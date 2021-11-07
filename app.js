lMore = document.querySelector(".lmore");
bSectionHl = document.querySelector(".hr1");

//adding click event to learn more link

lMore.addEventListener("click", function (e) {
  //console.log(bSection.getBoundingClientRect());
  //   window.scrollTo({
  //     left: bSection.getBoundingClientRect().left + scrollX,
  //     top: bSection.getBoundingClientRect().top + scrollY,
  //     behavior: "smooth",
  //   });

  //scrolling to business section
  bSectionHl.scrollIntoView({ behavior: "smooth" });
});

//adding events to nav links
document.querySelector(".navbar").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("link")) {
    let section = e.target.getAttribute("href");
    document.querySelector(section).scrollIntoView({ behavior: "smooth" });
  }
});

//tabbed component(guide section)
let tabsParent = document.querySelector(".guide-buttons");
let guidesParent = document.querySelectorAll(".guide-content");
let tabs = document.querySelectorAll(".guide-buttons .btn");
let guides = document.querySelectorAll(".gcontent");
//event delegation
tabsParent.addEventListener("click", function (e) {
  if (!e.target.classList.contains("btn")) return;
  tabs.forEach((ele) => ele.classList.remove("btn-guide-active"));
  e.target.classList.add("btn-guide-active");

  //displaying relative content based on btn click
  guides.forEach((ele) => ele.classList.remove("guide-active")); //remove active class
  document
    .querySelector(`.guide${e.target.dataset.tab}`)
    .classList.add("guide-active");
});

//fading animation for nav links
const navLinks = document.querySelector(".links");
let links = [...navLinks.children];

opacityHandler = (opacity, e) => {
  if (!e.target.classList.contains("link")) return;

  links.forEach((ele) => {
    if (ele !== e.target.parentElement) {
      ele.style.opacity = opacity;
    }
  });
  //alternate approach
  // if (!e.target.classList.contains("link")) return;
  // links.forEach((ele) => (ele.style.opacity = "0.5"));
  // e.target.parentElement.style.opacity = "1";
  // console.log(e.target);
};

navLinks.addEventListener("mouseover", opacityHandler.bind(null, 0.5));

navLinks.addEventListener("mouseout", opacityHandler.bind(null, 1));

/* sticky navigation */
// bSection = document.querySelector(".business-section");
// window.addEventListener("scroll", function () {
//   if (scrollY > bSection.getBoundingClientRect().top) {
//     document.querySelector(".navbar").classList.add("sticky");
//   } else {
//     if (document.querySelector(".navbar").classList.contains("sticky"))
//       document.querySelector(".navbar").classList.remove("sticky");
//   }
// });

/* intersection observer Api */
mainSection = document.querySelector(".main-heading");

// let obsCallback = function (entries, observer) {
//   let [entry] = entries;

//   if (!entry.isIntersecting)
//     document.querySelector(".navbar").classList.add("sticky");
//   else {
//     if (document.querySelector(".navbar").classList.contains("sticky"))
//       document.querySelector(".navbar").classList.remove("sticky");
//   }
// };
// let obsOptions = {
//   root: null,
//   threshold: [0],
// };
// let observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(mainSection);

/* section scrolling animation */
let sections = document.querySelectorAll(".section");

let secCallback = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section-hidden");
  });
};

let secObserver = new IntersectionObserver(secCallback, {
  root: null,
  threshold: 0.2,
});
sections.forEach((section) => {
  section.classList.add("section-hidden");
  secObserver.observe(section);
});

//slider

let slides = document.querySelectorAll(".slide");
let lButton = document.querySelector(".slider-btn--left");
let rButton = document.querySelector(".slider-btn--right");
slides.forEach((slide, index) => {
  slide.style.transform = `translateX(${index * 80}%)`;
  slide.style.transition = "transform 1s";
});
//moving slides from right to left
let rclickCount = 0;

rslider = function () {
  if (rclickCount === slides.length - 1) {
    rclickCount = 0;
    fillDot();
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 80}%)`;
    });
  } else {
    rclickCount++;
    fillDot();
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${80 * index - 80 * rclickCount}%)`;
      return slide;
    });
  }
};
rButton.addEventListener("click", rslider);
lslider = function () {
  if (rclickCount == 0) {
    rclickCount = slides.length - 1;
    fillDot();
  } else {
    rclickCount--;
    fillDot();
  }
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${80 * index - 80 * rclickCount}%)`;
    return slide;
  });
};
lButton.addEventListener("click", lslider);

//adding events to arrow keys
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && lslider();
  e.key === "ArrowRight" && rslider();
});

//adding dots
dotsHolder = document.querySelector(".dots");
slides.forEach(function (_, i) {
  dotsHolder.insertAdjacentHTML(
    "beforeend",
    `<button class='dot' data-button=${i}>`
  );
});

//adding functionality to dots using event delegation
dots = document.querySelectorAll(".dot");
fillDot();
dotsHolder.addEventListener("click", function (e) {
  rclickCount = Number(e.target.dataset.button);
  fillDot();
  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${80 * index - 80 * rclickCount}%)`;
    return slide;
  });
});

function fillDot() {
  dots.forEach((button, i) => {
    button.style.backgroundColor = "transparent";
    if (rclickCount == i) button.style.backgroundColor = "#808080";
  });
}
