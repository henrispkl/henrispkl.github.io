let browserWidth = window.innerWidth || document.body.clientWidth;
let mainText = document.getElementById("main-text");
let lettersArray = mainText.innerText;
mainText.innerHTML = "";
let mainDesc = document.getElementById("main-desc");
let mainButton = document.getElementById("main-button");
let blob = document.getElementById("blob");
let moreAboutText = document.getElementById("moreAboutText");
let about = document.getElementById("about");
let avatar = document.getElementById("avatar");
let fadeInScroll = document.getElementsByClassName("fadeInScroll");
let fadeInScroll2 = document.getElementsByClassName("fadeInScroll2");
let projectTags = document.getElementsByClassName("project-tags");
let project = document.getElementsByClassName("project");
let cert = document.getElementsByClassName("cert");
let contactForm = document.getElementById("contactForm");
let contactTextarea = document.getElementById("contactTextarea");
let contactSubmit = document.getElementById("contactSubmit");
let contactSubmitButton = document.getElementById("contactSubmitButton");

blob.style.height = blob.clientWidth + "px";
window.addEventListener("resize", () => {
  blob.style.height = blob.clientWidth + "px";
});

function doScrolling(elementY, duration) {
  var startingY = window.pageYOffset;
  var diff = elementY - startingY;
  var start;

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

function scrollShow(element, distance = 0, markShown = true) {
  function execute() {
    let rect = element.getBoundingClientRect();
    let viewHeight =
      Math.max(document.documentElement.clientHeight, window.innerHeight) -
      distance;

    if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
      return true;
    } else {
      return false;
    }
  }

  if (markShown == true) {
    if (!element.classList.contains("_scrollShown")) {
      element.classList.add("_scrollShown");
      return execute();
    }
  }

  return execute();
}

// Split text from div in various elements for each letter
for (let i = 0; i < lettersArray.length; i++) {
  const element = lettersArray[i];
  let newDiv = document.createElement("div");
  newDiv.innerText = element;
  if (newDiv.innerHTML == "<br>" || newDiv.innerHTML == " ") {
    newDiv.style.display = "inline";
  }
  mainText.appendChild(newDiv);
}

// Get each new letter div
lettersArray = mainText.childNodes;

// initial temp delay
let temp = 100;

// Animations
// Apply the animation for each div
setTimeout(() => {
  for (let i = 0; i < lettersArray.length; i++) {
    const element = lettersArray[i];
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = `translateY(-20%)`;
      setTimeout(() => {
        element.style.transform = "none";
      }, 550);
    }, i * 50);
  }
}, temp);

setTimeout(() => {
  mainDesc.style.opacity = "1";
}, 2000 + temp);

setTimeout(() => {
  mainButton.style.opacity = "1";
  mainButton.style.transform = "translateY(5%)";
  setTimeout(() => {
    mainButton.style.transform = "none";
    setTimeout(() => {
      mainButton.style.transition = "all 0.5s ease";
    }, 550);
  }, 550);
}, 2700 + temp);

setTimeout(() => {
  moreAboutText.style.opacity = "1";
  moreAboutText.style.transform = "none";
}, 3400 + temp);

// Scroll fade elements
function elementsToShow() {
  for (let i = 0; i < fadeInScroll.length; i++) {
    const element = fadeInScroll[i];
    if (scrollShow(element, undefined, false)) {
      element.style.opacity = "1";
      element.style.transform = "none";
    }
  }
  for (let i = 0; i < fadeInScroll2.length; i++) {
    const element = fadeInScroll2[i];
    if (scrollShow(element, undefined, false)) {
      element.style.opacity = "1";
      element.style.transform = "none";
    }
  }
}

elementsToShow();

document.addEventListener("scroll", () => {
  elementsToShow();
});

// Learn more about me click function

moreAboutText.addEventListener("click", () => {
  let bodyRect = document.body.getBoundingClientRect();
  let elemRect = about.getBoundingClientRect();
  let offset = elemRect.top - bodyRect.top;
  doScrolling(offset, 800);
});

// Formatting tags
for (let i = 0; i < projectTags.length; i++) {
  const element = projectTags[i];
  let tags = element.innerText.split(",");
  element.innerText = "";
  tags.forEach(e => {
    let tag = document.createElement("div");
    tag.className = "project-tag";
    tag.innerHTML = '<i class="fas fa-tag"></i>' + e;
    element.appendChild(tag);
  });
}

// projects grid
// Setting real height of elements
let originalHeights = [];

for (let i = 0; i < project.length; i++) {
  const element = project[i];
  let originalHeight = element.offsetHeight;
  originalHeights.push(originalHeight);
  let children = element.children;
  let finalHeight = 0;

  for (let i = 0; i < children.length; i++) {
    const e = children[i];
    finalHeight += e.offsetHeight;
  }

  element.style.height = finalHeight + "px";
}

if (browserWidth >= 992) {
  // acessible necessary margin variable
  let necessaryMargin = 0;
  let columns = 2;

  for (let i = 0; i < project.length; i++) {
    const element = project[i];
    let initalHeight = element.offsetHeight;
    let gridMarginElement = project[i + columns];

    let margin = originalHeights[i] - initalHeight - 10;

    // setting the row div
    if (margin > 0) {
      if (necessaryMargin == 0) {
        necessaryMargin = margin;
      }
      gridMarginElement.style.marginTop = "-" + necessaryMargin + "px";
      gridMarginElement.classList.add("gridMargin");
    }
  }

  // fixes for two column grids
  for (let i = 0; i < project.length; i++) {
    const element = project[i];
    let elementMargin = parseInt(element.style.marginTop.replace("px", ""));
    let gridMarginElement = project[i + columns];

    if (gridMarginElement && elementMargin != NaN) {
      gridMarginElement.style.marginTop = elementMargin + "px";
    }

    if (
      gridMarginElement &&
      gridMarginElement.classList.contains("gridMargin")
    ) {
      gridMarginElement.style.marginTop = elementMargin * 2 - 10 + "px";
    }
  }
}

// Certifications
let certModal = document.createElement("div");
certModal.id = "certModal";

let modalStyle = {
  zIndex: "100",
  position: "fixed",
  top: "0",
  left: "0",
  backgroundColor: "#000000b3",
  width: "100%",
  height: "100%",
  display: "none",
  justifyContent: "center",
  opacity: "0",
  transition: "all 0.5s ease",
  alignItems: "center"
};

let certStyle = {
  margin: "20px 0",
  maxWidth: "60%",
  minHeight: "80%",
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 5px 5px",
  borderRadius: "5px"
};

Object.assign(certModal.style, modalStyle);
document.body.appendChild(certModal);

for (let i = 0; i < cert.length; i++) {
  const element = cert[i];
  let img = "img/" + element.id + ".jpg";
  element.addEventListener("click", () => {
    let certImg = document.createElement("img");
    certImg.classList = "certBig";
    certImg.src = img;
    certImg.alt = "";

    document.addEventListener("click", function(event) {
      let clickTarget = event.target;

      if (clickTarget == certModal) {
        certModal.style.opacity = "0";
        setTimeout(() => {
          certModal.style.display = "none";
        }, 500);
      }
    });

    certModal.innerHTML = "";
    certModal.appendChild(certImg);
    certModal.style.display = "flex";
    setTimeout(() => {
      certModal.style.opacity = "1";
    }, 100);
  });
}

// Contact area
// prevent default submit action
contactSubmit.addEventListener("click", e => {
  e.preventDefault();
});

// check if message is equal or more than 10 characters
function checkContactMessage() {
  if (contactTextarea.value.length >= 10) {
    contactSubmitButton.classList.remove("disabled");
  } else {
    contactSubmitButton.classList.add("disabled");
  }
}

// trigger the function above
setInterval(() => {
  if (contactTextarea === document.activeElement) {
    checkContactMessage();
  }
}, 100);

// submit the form
contactSubmitButton.addEventListener("click", () => {
  if (!contactSubmitButton.classList.contains("disabled")) {
    contactForm.submit();
  }
});
