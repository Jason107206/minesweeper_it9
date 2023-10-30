export { hideElement, showElement, fadeElement };

const hideElement = async (e, d, t = 800, w = 0) => {
  document.querySelector(e).animate(d === 0 ? {
    opacity: [1, 0],
    transform: ['translateX(0%)', 'translateX(-100%)'],
    easing: ['ease-in', 'ease-out']
  }
  : {
    opacity: [1, 0],
    transform: ['translateX(0%)', 'translateX(100%)'],
    easing: ['ease-in', 'ease-out']
  }, 
  {
    duration: t,
    iterations: 1,
  });
  await new Promise(r => setTimeout(r, t));
  document.querySelector(e).style.opacity = 0;
  await new Promise(r => setTimeout(r, w));
  document.querySelector(e).hidden = 1;
  document.querySelector(e).style.opacity = 1;
};

const showElement = async (e, d, t = 800) => {
  document.querySelector(e).hidden = 0;
  document.querySelector(e).animate(d === 0 ? {
    opacity: [0, 1],
    transform: ['translateX(100%)', 'translateX(0%)'],
    easing: ['ease-out', 'ease-in']
  }
  : {
    opacity: [0, 1],
    transform: ['translateX(-100%)', 'translateX(0%)'],
    easing: ['ease-out', 'ease-in']
  }, 
  {
    duration: t,
    iterations: 1,
  });
  await new Promise(r => setTimeout(r, t));
};

const fadeElement = async (e, f, t = 800, w = 0) => {
  if (f === 0) {
    document.querySelector(e).hidden = 0;
  }
  document.querySelector(e).animate(f === 0 ? {
    opacity: [0, 1],
    easing: ['ease-out', 'ease-in']
  }
  : {
    opacity: [1, 0],
    easing: ['ease-out', 'ease-in']
  }, 
  {
    duration: t,
    iterations: 1,
  });
  await new Promise(r => setTimeout(r, t));
  if (f === 1) {
    document.querySelector(e).style.opacity = 0;
    await new Promise(r => setTimeout(r, w));
    document.querySelector(e).hidden = 1;
    document.querySelector(e).style.opacity = 1;
  }
};