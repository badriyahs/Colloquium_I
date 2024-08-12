// scrollama.js
document.addEventListener('DOMContentLoaded', function () {
    // Initialize scrollama
    const scroller = scrollama();
    const sidebarTitle = document.querySelector('.sidebar h1');

    scroller
        .setup({
            step: '.step',
            offset: 0.5,
            progress: true
        })
        .onStepEnter(response => {
            const { element } = response;
            const title = element.getAttribute('data-title');
            console.log('Step entered:', title);

            // Replace the sidebar title
            sidebarTitle.textContent = title;
        })
        .onStepExit(response => {
            const { element } = response;
            console.log('Step exited:', element.getAttribute('data-title'));
        });

    // Resize event
    window.addEventListener('resize', scroller.resize);

    // Flipthrough images functionality
    let currentImageIndex = 0;
    const images = [
        "Devices/DevicesAll1.png",
        "Devices/DevicesAll2.png",
        "Devices/DevicesAll3.png",
        "Devices/DevicesAll4.png",
        "Devices/DevicesAll5.png",
        "Devices/DevicesAll6.png",
        "Devices/DevicesAll7.png",
        "Devices/DevicesAll8.png",
        "Devices/DevicesAll9.png",
        "Devices/DevicesAllTogether.png"
    ];
    const customImages = [
        "Devices/DevicesThroughTime/20.png",
        "Devices/DevicesThroughTime/21.png",  // Forces
        "Devices/DevicesThroughTime/22.png",  // Control
        "Devices/DevicesThroughTime/23.png",  // Sync
        "Devices/DevicesThroughTime/24.png",  // Constant
        "Devices/DevicesThroughTime/25.png"   // Inaccessible
    ];

    function updateImage() {
        const imageElement = document.getElementById('myImage');
        if (imageElement) {
            imageElement.src = images[currentImageIndex];
        }
    }

    function beforeImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    }

    function afterImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    }

    // Attach event listeners to buttons
    document.getElementById('beforeButton').addEventListener('click', beforeImage);
    document.getElementById('afterButton').addEventListener('click', afterImage);

    // Attach event listeners to custom buttons
    document.getElementById('customButton1').addEventListener('click', function () {
        document.getElementById('myImage').src = customImages[0];
    });

    document.getElementById('customButton2').addEventListener('click', function () {
        document.getElementById('myImage').src = customImages[1];
    });

    document.getElementById('customButton3').addEventListener('click', function () {
        document.getElementById('myImage').src = customImages[2];
    });

    document.getElementById('customButton4').addEventListener('click', function () {
        document.getElementById('myImage').src = customImages[3];
    });

    document.getElementById('customButton5').addEventListener('click', function () {
        document.getElementById('myImage').src = customImages[4];
    });

    document.getElementById('customButton6').addEventListener('click', function () {
        document.getElementById('myImage').src = customImages[5];
    });

    // Initialize the first image
    updateImage();
});