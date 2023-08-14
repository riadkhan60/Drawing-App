const canvas = document.querySelector('#drawing');
const tools = document.querySelectorAll('.tool');
const brushSize = document.querySelector('#brush-range');

const ctx = canvas.getContext('2d');
let dwaingActive = false;
let activeTool = 'brush';

let brushSizeValue = 1;


tools.forEach((tool) => {
  tool.addEventListener('click', () => {
    document.querySelector('.active-tool').classList.remove('active-tool');
    tool.classList.add('active-tool');
    activeTool = tool.id;
  });
});

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

window.addEventListener('mousedown', () => {
  console.log(brushSizeValue);
  ctx.lineWidth = brushSizeValue;
  ctx.beginPath();
  dwaingActive = true;
});

window.addEventListener('mouseup', () => {
  dwaingActive = false;
});

window.addEventListener('resize', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

function drawing(e) {
  if (!dwaingActive) return;
  if (activeTool == 'brush') {
    ctx.lineTo(e.offsetX, e.offsetY);
    console.log(e.offsetX, e.offsetY);
    ctx.stroke();
  }
}
canvas.addEventListener('mousemove', drawing);

brushSize.addEventListener('change', (x) => {
  x.preventDefault();
  return brushSizeValue = Number(brushSize.value);
});

