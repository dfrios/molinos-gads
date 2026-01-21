import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

import { triggerSectionAmenities, untriggerSectionAmenities } from './amenities';

gsap.registerPlugin(Observer);

let currentSection = 0;
let isMoving = false;

const mobileMenu: HTMLDivElement = document.getElementById(
  "mobile-menu-div",
) as HTMLDivElement;
const mobileMenuLogo: HTMLOrSVGElement = document.getElementById(
  "mobile-menu-logo",
) as HTMLOrSVGElement;

const sections = gsap.utils.toArray(
  "section.slider",
) as Array<gsap.TweenTarget>;
gsap.set(sections, { top: '100vh' });
gsap.set(sections[currentSection], {
  top: 0,
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

  timeline.add("keypoint");

  if (newSection > currentSection) {
    gsap.set(sections[newSection], {
      display: "flex",
      top: '100vh',
      zIndex: 200,
    });
    timeline.to(sections[newSection], { top: 0 }, "keypoint");
  }

  if (newSection < currentSection) {
    timeline.to(sections[currentSection], { top: '100vh' }, "keypoint");
    timeline.set(sections[currentSection], { display: "none" });
  }

  if (mobileMenuLogo) {
    if (currentSection === 0 && newSection === 1) {
      timeline.to(
        mobileMenuLogo,
        { scale: 0.75, translateY: "-25px" },
        "keypoint",
      );
      if (mobileMenu) {
        timeline.to(mobileMenu, { height: "5rem" }, "keypoint");
      }
    }
    if (currentSection === 1 && newSection === 0) {
      timeline.to(
        mobileMenuLogo,
        {
          scale: 1,
          translateY: "0",
        },
        "keypoint",
      );
      if (mobileMenu) {
        timeline.to(mobileMenu, { height: 0 }, "keypoint");
      }
    }
  }

  currentSection = newSection;

  if ((currentSection + 1) === 2) {
    triggerSectionAmenities();
  }
  else {
    untriggerSectionAmenities();
  }
};

/**
 * handleUp
 * @returns null
 */
const handleUp = () => {
  if (isMoving) return;
  if (currentSection === (sections.length - 1)) return;

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
