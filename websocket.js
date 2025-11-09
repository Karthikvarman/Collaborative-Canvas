const socket = io();

function sendDrawing(data) {
    socket.emit("draw", data);
}

socket.on("draw", (data) => {
    drawOnCanvas(data.x, data.y, data.color, data.size, false);
});

socket.on("clear", () => clearCanvas());

socket.on("load-history", (history) => {
    history.forEach(point => {
        drawOnCanvas(point.x, point.y, point.color, point.size, false);
    });
});
