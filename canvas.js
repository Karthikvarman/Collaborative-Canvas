const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 140;

let drawing = false;
let color = "black";
let size = 3;

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const x = e.clientX;
    const y = e.clientY;

    drawOnCanvas(x, y, color, size, true);
});

function drawOnCanvas(x, y, color, size, emit) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    if (emit) {
        sendDrawing({ x, y, color, size });
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
