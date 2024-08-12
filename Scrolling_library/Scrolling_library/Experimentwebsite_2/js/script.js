document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');
    const container = document.querySelector('.container');
    const numRows = 13;

    // Function to create a row of units with more dramatic width differences
    function createRow(rowClass) {
        const row = document.querySelector(`.${rowClass}`);

        for (let i = 0; i < 13; i++) { // Assuming you have 13 units per row
            const unit = document.createElement('div');
            unit.classList.add('unit');

            // Set specific widths for each of the 13 units with more variance
            let unitWidth;
            if (i === 0) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 1) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 2) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 3) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 4) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 5) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 6) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 7) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 8) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 9) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 10) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 11) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            } else if (i === 12) {
                unitWidth = Math.floor(Math.random() * 50) + 10; // Random width between 10 and 59
            }

            unit.style.width = `${unitWidth}px`;

            if (i === 0) unit.classList.add('first'); // Add 'first' class to the first unit

            row.appendChild(unit);
        }

        // Set the initial width of the row to match the first unit
        const initialUnitWidth = parseInt(row.firstChild.style.width, 10); // Get width of the first unit
        row.style.maxWidth = `${initialUnitWidth + 2}px`; // +2 for the margin-right
        row.dataset.unitWidth = initialUnitWidth;

        // Add click event listener to toggle the row expansion
        row.addEventListener('click', function () {
            if (row.classList.contains('expanded')) {
                row.style.maxWidth = `${initialUnitWidth + 2}px`; // Collapse to initial width
            } else {
                row.style.maxWidth = '1000px'; // Expand to show all units
            }
            row.classList.toggle('expanded');
        });
    }

    // Create rows with specific unit widths and more variance
    for (let i = 1; i <= numRows; i++) {
        const rowClass = `row${i}`;
        const row = document.createElement('div');
        row.classList.add('row', rowClass);
        container.appendChild(row);
        createRow(rowClass);
    }
});