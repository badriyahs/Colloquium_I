d3.csv('nyc_space_time.csv', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    // Convert time to a numerical z value
    function getZValue(time) {
        const [hour, minute] = time.split(':').map(Number);
        return hour + minute / 60; // Convert time to hours since 6 AM
    }

    var x = unpack(rows, 'x'); // Latitude (x-axis)
    var y = unpack(rows, 'y'); // Longitude (y-axis)
    var z = rows.map(row => getZValue(row['time'])); // Time mapped to the z-axis
    var locations = unpack(rows, 'location'); // Labels for the locations
    var c = unpack(rows, 'color'); // Colors for the lines

    Plotly.newPlot('myDiv', [{
        type: 'scatter3d',
        mode: 'lines+markers+text',  // Add markers and text labels to the lines
        x: x,
        y: y,
        z: z,
        text: locations,  // Label each point with the location name
        textposition: 'top center', // Position the labels
        opacity: 1,
        line: {
            width: 6,
            color: c,
            reversescale: false
        },
        marker: {
            size: 6,  // Smaller marker size to avoid clutter
            color: c,
        },
        textfont: {
            size: 8, // Small font size for less clutter
            color: 'black'
        }
    }], {
        height: 640,
        scene: {
            xaxis: {
                title: 'Latitude',
                tickvals: Array.from(new Set(x)), // Unique latitudes for ticks
                ticktext: Array.from(new Set(x)), // Labels for latitudes
                gridcolor: 'rgba(150, 150, 150, 0.5)', // Enhanced grid color for x-axis
                zeroline: true, // Show the zero line
                zerolinecolor: 'gray' // Color of the zero line
            },
            yaxis: {
                title: 'Longitude',
                tickvals: Array.from(new Set(y)), // Unique longitudes for ticks
                ticktext: Array.from(new Set(y)), // Labels for longitudes
                gridcolor: 'rgba(150, 150, 150, 0.5)', // Enhanced grid color for y-axis
                zeroline: true, // Show the zero line
                zerolinecolor: 'gray' // Color of the zero line
            },
            zaxis: {
                title: 'Time (Hours)',
                tickvals: [6, 9, 12, 15, 18, 21],  // Ticks for 6 AM, 9 AM, 12 PM, 3 PM, 6 PM, 9 PM
                ticktext: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                range: [6, 24], // From 6 AM to 12 AM (24 hours)
                gridcolor: 'rgba(150, 150, 150, 0.5)', // Enhanced grid color for z-axis
                zeroline: true, // Show the zero line
                zerolinecolor: 'gray' // Color of the zero line
            },
            aspectmode: 'cube', // Keep the aspect ratio to make it look like a cube
            aspectratio: { x: 1, y: 1, z: 1 }, // Explicitly set the aspect ratio to make it cubic
            camera: {
                eye: { x: 1.2, y: 1.2, z: 1.2 } // Set the camera perspective to better view the cube
            }
        }
    });
});