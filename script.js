const canvas = document.getElementById('paintCanvas');
const context = canvas.getContext('2d');
const brushSizeInput = document.getElementById('brushSize');
const brushTypeSelect = document.getElementById('brushType');
const colorPicker = document.getElementById('colorPicker');
const Transparency = document.getElementById('Transparency')

let isPainting = false;

canvas.addEventListener('mousedown', startPaint);
canvas.addEventListener('mouseup', stopPaint);
canvas.addEventListener('mousemove', paint);

function startPaint() {
  isPainting = true;
  paint();
}

function stopPaint() {
  isPainting = false;
  context.beginPath();
}

function paint(event) {
  if (!isPainting) return;

  context.lineWidth = brushSizeInput.value;
  context.lineCap = 'round';

  const color = colorPicker.value;
  const alpha = Transparency.value / 100;
  context.strokeStyle = `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${alpha})`;

  const brushType = brushTypeSelect.value;

  if (brushType === 'round') {
    context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    context.stroke();
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
  } else if (brushType === 'square') {
    const size = parseInt(brushSizeInput.value);
    context.fillRect(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, size, size);
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'painting.png';
  link.click();
}

function changeBrushType() {
  
}