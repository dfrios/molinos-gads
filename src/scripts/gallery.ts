import { gsap } from "gsap";

const timeline = gsap.timeline({
  defaults: {
    duration: 2,
    ease: 'power4.out'
  }
})

timeline.add('keypoint');

const divGallery : HTMLDivElement = document.getElementById('gallery') as HTMLDivElement;
const quantityPhotos = Number(divGallery.dataset.photos) ?? 0;

for (let i = 0; i < quantityPhotos; i++) {
  const divPhoto : HTMLDivElement = document.getElementById(`gallery-${i}`) as HTMLDivElement;

  const toLeft = Number(divPhoto.dataset.finalleft) ?? 0;
  const toLeftRem = Math.floor(toLeft / 4) + 'rem';
  timeline.to(divPhoto, { opacity: 1, ease: 'none', duration: 0.5 }, 'keypoint');
  timeline.to(divPhoto, { left: toLeftRem }, 'keypoint');
}

const triggerGallery = () => {
  timeline.restart();
}

export { triggerGallery };