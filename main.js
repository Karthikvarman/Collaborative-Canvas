document.getElementById("clearBtn").addEventListener("click", () => {
    clearCanvas();
    socket.emit("clear");
});
