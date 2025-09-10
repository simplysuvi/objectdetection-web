## Object Detection on the Web

This is a simple web application that performs real-time object detection using your device's camera. It's built with TensorFlow.js and the COCO-SSD model, allowing it to detect and classify 80 different types of objects directly in the browser.

### Features

- **Real-Time Detection:** Detects objects from a live camera feed.
- **Bounding Boxes:** Draws bounding boxes around detected objects.
- **Class and Score:** Displays the object's class name and confidence score.
- **Cropped Objects:** Shows a separate view of each detected object.
- **Dark Mode:** Includes a theme switcher for a dark mode interface.
- **Client-Side:** All processing is done in the browser, ensuring user privacy.

### Technologies Used

- **Frontend:**
    - HTML5
    - CSS3
    - JavaScript
- **Machine Learning:**
    - [TensorFlow.js](https://www.tensorflow.org/js)
    - [COCO-SSD Model](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)
- **Backend:**
    - [Node.js](https://nodejs.org/)
    - [Express.js](https://expressjs.com/)

### How to Use

1.  Click the "Start Camera" button to enable webcam.
2.  Allow the browser to access your camera.
3.  The application will start detecting objects in the video feed.