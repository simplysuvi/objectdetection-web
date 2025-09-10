const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function detectObjects() {
    const model = await cocoSsd.load();
    video.play();

    setInterval(async () => {
        const predictions = await model.detect(video);
        drawBoundingBox(predictions);
    }, 100);
}

function drawBoundingBox(predictions) {
    canvas.width = 640;
    canvas.height = 480;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#0071e3';
    context.lineWidth = 4;
    context.font = '16px Arial';

    const croppedObjectsContainer = document.getElementById('cropped-objects-container');
    croppedObjectsContainer.innerHTML = '';

    predictions.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        context.strokeRect(x, y, width, height);
        context.fillStyle = '#0071e3';
        const text = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;
        context.fillText(text, x, y > 10 ? y - 5 : 10);

        const croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = width;
        croppedCanvas.height = height;
        const croppedContext = croppedCanvas.getContext('2d');
        croppedContext.drawImage(video, x, y, width, height, 0, 0, width, height);

        const croppedObjectDiv = document.createElement('div');
        croppedObjectDiv.classList.add('cropped-object');

        const objectCanvas = document.createElement('canvas');
        objectCanvas.width = width;
        objectCanvas.height = height;
        const objectContext = objectCanvas.getContext('2d');
        objectContext.drawImage(croppedCanvas, 0, 0);

        const objectLabel = document.createElement('p');
        objectLabel.innerText = text;

        croppedObjectDiv.appendChild(objectCanvas);
        croppedObjectDiv.appendChild(objectLabel);
        croppedObjectsContainer.appendChild(croppedObjectDiv);
    });
}

const startButton = document.getElementById('startButton');
const themeSwitch = document.getElementById('checkbox');

startButton.addEventListener('click', async () => {
    await setupCamera();
    detectObjects();
    startButton.style.display = 'none';
});

themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});
