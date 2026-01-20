import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

let currentSection = 0;
let isMoving = false;

const mobileMenu: HTMLDivElement = document.getElementById(
  "mobile-menu",
) as HTMLDivElement;
const mobileMenuLogo: HTMLOrSVGElement = document.getElementById(
  "mobile-menu-logo",
) as HTMLOrSVGElement;

const sections = gsap.utils.toArray(
  "section.slider",
) as Array<gsap.TweenTarget>;
gsap.set(sections, { yPercent: 100 });
gsap.set(sections[currentSection], {
  yPercent: 0,
  display: "flex",
  position: "relative",
});

/**
 * moveSection
 * @param newSection
 */
const moveSection = (newSection: number) => {
  const timeline = gsap.timeline({
    defaults: {
      duration: 0.75,
      ease: "power1.inOut",
    },
    onComplete: () => {
      isMoving = false;
    },
  });

  timeline.add("point");

  if (newSection > currentSection) {
    gsap.set(sections[newSection], {
      display: "flex",
      yPercent: 100,
      zIndex: 200,
    });
    timeline.to(sections[newSection], { yPercent: 0 }, "point");
  }

  if (newSection < currentSection) {
    timeline.to(sections[currentSection], { yPercent: 100 }, "point");
    timeline.set(sections[currentSection], { display: "none" });
  }

  if (mobileMenuLogo) {
    if (currentSection === 0 && newSection === 1) {
      timeline.to(
        mobileMenuLogo,
        {
          scale: 0.75,
          translateY: "-25px",
          onComplete: () => {
            if (mobileMenu) {
              mobileMenu.classList.add("bg-background-semitransparent");
            }
          },
        },
        "point",
      );
    }
    if (currentSection === 1 && newSection === 0) {
      if (mobileMenu) {
        mobileMenu.classList.remove("bg-background-semitransparent");
      }
      timeline.to(
        mobileMenuLogo,
        {
          scale: 1,
          translateY: "0",
        },
        "point",
      );
    }
  }

  currentSection = newSection;
};

/**
 * handleUp
 * @returns null
 */
const handleUp = () => {
  if (isMoving) return;
  if (currentSection === sections.length) return;

  isMoving = true;
  moveSection(currentSection + 1);
};

/**
 * handleDown
 * @returns null
 */
const handleDown = () => {
  if (isMoving) return;
  if (currentSection === 0) return;

  isMoving = true;
  moveSection(currentSection - 1);
};

Observer.create({
  type: "wheel, scroll, touch",
  wheelSpeed: -1,
  preventDefault: true,
  onUp: handleUp,
  onDown: handleDown,
});
