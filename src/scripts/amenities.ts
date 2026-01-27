import { gsap } from "gsap";

const overlayDiv: HTMLDivElement = document.querySelector(
  "#section-amenities .overlay",
) as HTMLDivElement;
const sectionAmenities: HTMLElement = document.getElementById(
  "section-amenities",
) as HTMLElement;
const amenities: NodeListOf<HTMLDivElement> = document.querySelectorAll(
  "#section-amenities .amenities",
) as NodeListOf<HTMLDivElement>;

gsap.set(overlayDiv, { opacity: 0 });
gsap.set(amenities, { xPercent: 20, opacity: 0 });

/**
 * triggerSectionAmenities
 */
const triggerSectionAmenities = () => {
  // gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline({
    defaults: {
      duration: 0.75,
    },
  });

  if (overlayDiv) {
    timeline.to(overlayDiv, {
      delay: 0.75,
      opacity: 1,
    });
  }

  timeline.add("keypoint");

  if (amenities.length > 0) {
    amenities.forEach((amenity, key) => {
      timeline.to(amenity, { xPercent: 0, opacity: 1, delay: key * 0.25 }, "keypoint");
    });
  }
};

/**
 * untriggerSectionAmenities
 */
const untriggerSectionAmenities = () => {
  gsap.set(amenities, { xPercent: 20, opacity: 0 });

  const timeline = gsap.timeline({
    defaults: {
      duration: 0.75,
    },
  });

  if (overlayDiv) {
    timeline.to(overlayDiv, {
      opacity: 0,
    });
  }
};

export { triggerSectionAmenities, untriggerSectionAmenities };
