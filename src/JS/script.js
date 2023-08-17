const canvas = document.querySelector('#drawing');
const tools = document.querySelectorAll('.tool');
const brushSize = document.querySelector('#brush-range');
const fillInput = document.querySelector('#fill-color');
const colorwheel = document.querySelector('#choice-color');

let currentColer;


const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach((x, y, arr) => {
  x.addEventListener('click', () => {
    arr.forEach((x) => x.classList.remove('color-active'));
    x.classList.add('color-active');
    ctx.fillStyle = x.id;
    ctx.strokeStyle = x.id;
    currentColer = x.id;
    colorwheel.value = x.id;
  });
});

let fillStyle;

fillInput.addEventListener('change', (e) => {
  fillStyle = e.target.checked;
  e.target.closest('.shape-tool').classList.toggle('active-fill-tool');
});

function checkStyle() {
  if (fillStyle) {
    return ctx.fill();
  } else {
    return ctx.stroke();
  }
}

const ctx = canvas.getContext('2d');
let dwaingActive = false;
let activeTool = 'brush';
let brushSizeValue = 1;
let currentX, currentY, snapshot;

tools.forEach((tool) => {
  tool.addEventListener('click', () => {
    document.querySelector('.active-tool').classList.remove('active-tool');
    tool.classList.add('active-tool');
    activeTool = tool.id;
    console.log(activeTool);
  });
});

window.addEventListener('load', () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

window.addEventListener('mousedown', (e) => {
  if (activeTool == 'erase') {
    ctx.fillStyle = currentColer;
    ctx.strokeStyle = currentColer;
  }

  
  ctx.lineWidth = brushSizeValue;
  ctx.beginPath();
  dwaingActive = true;
  currentX = e.offsetX;
  currentY = e.offsetY;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
  ctx.putImageData(snapshot, 0, 0);

  if (activeTool == 'brush') {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  if (activeTool == 'rectangle') {
    drawRectangle(e);
  }

  if (activeTool == 'triangle') {
    drawTriangle(e);
  }

  if (activeTool == 'circle') {
    drawCircle(e);
  }

  if (activeTool == 'erase') {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.strokeStyle = '#000';
  }
}
canvas.addEventListener('mousemove', drawing);

brushSize.addEventListener('change', (x) => {
  return (brushSizeValue = Number(brushSize.value));
});

function drawCircle(e) {
  ctx.beginPath();
  const radius = Math.sqrt(
    Math.pow(e.offsetX - currentX, 2) + Math.pow(e.offsetY - currentY, 2),
  );
  ctx.arc(
    currentX,
    currentY,
    radius,
    (Math.PI / 180) * 0,
    (Math.PI / 180) * 360,
    true,
  );
  checkStyle();
}

function drawTriangle(e) {
  ctx.beginPath();
  ctx.lineTo(currentX, currentY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(2 * currentX - e.offsetX, e.offsetY);
  ctx.closePath();
  checkStyle();
}

function drawRectangle(e) {
  if (fillStyle) {
    ctx.fillRect(
      currentX,
      currentY,
      e.offsetX - currentX,
      e.offsetY - currentY,
    );
  } else
    ctx.strokeRect(
      currentX,
      currentY,
      e.offsetX - currentX,
      e.offsetY - currentY,
    );
}
