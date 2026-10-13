const projectMedia = {
  spiral: [
    {
      type: "image",
      src: "images/SpiralVRCover.png",
      alt: "Spiral VR gameplay",
    },
    {
      type: "video",
      src: "https://pub-a4c06dfc0e1d4c64a81890bdb72a6803.r2.dev/SpiralVRDemo.mp4",
    },
  ],

  "whack-a-mole": [
    {
      type: "image",
      src: "images/WhackAMoleCover.png",
      alt: "Whack A Mole VR gameplay",
    },
    {
      type: "video",
      src: "https://pub-a4c06dfc0e1d4c64a81890bdb72a6803.r2.dev/WhackAMoleDemo.mp4",
    },
  ],

  blockly: [
    {
      type: "image",
      src: "images/BlocklyCover.png",
      alt: "Blockly VR coding environment",
    },
    {
      type: "video",
      src: "https://pub-a4c06dfc0e1d4c64a81890bdb72a6803.r2.dev/Blockly.mp4",
    },
  ],

  learnaptic: [
    {
      type: "image",
      src: "images/LearnapticCover.png",
      alt: "Learnaptic study application",
    },
    {
      type: "image",
      src: "images/LearnapticLogin.png",
      alt: "Learnaptic login",
    },
    {
      type: "image",
      src: "images/LearnapticNotebook.png",
      alt: "Learnaptic notebooks",
    },
  ],
};

document.querySelectorAll(".carousel").forEach((carousel) => {
  const project = carousel.dataset.project;
  const media = projectMedia[project];

  if (!media || media.length === 0) return;

  const mediaContainer = carousel.querySelector(".carousel-media");
  const prevButton = carousel.querySelector(".carousel-prev");
  const nextButton = carousel.querySelector(".carousel-next");
  const indicators = carousel.querySelector(".carousel-indicators");

  let currentIndex = 0;

  media.forEach((item, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.classList.add("carousel-dot");
    dot.setAttribute("aria-label", `Go to media ${index + 1}`);

    dot.addEventListener("click", () => {
      currentIndex = index;
      showMedia();
    });

    indicators.appendChild(dot);
  });

  function showMedia() {
    const item = media[currentIndex];
    let element;

    if (item.type === "image") {
      element = document.createElement("img");
      element.src = item.src;
      element.alt = item.alt || "Project screenshot";
      element.loading = "lazy";
    } else if (item.type === "video") {
      element = document.createElement("video");
      element.src = item.src;
      element.controls = true;
      element.preload = "auto";
      element.playsInline = true;
    }

    if (!element) return;

    mediaContainer.replaceChildren(element);

    indicators.querySelectorAll("button").forEach((dot, index) => {
      const isActive = index === currentIndex;

      dot.classList.toggle("active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % media.length;
    showMedia();
  });

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + media.length) % media.length;
    showMedia();
  });

  if (media.length === 1) {
    prevButton.hidden = true;
    nextButton.hidden = true;
    indicators.hidden = true;
  }

  showMedia();
});
