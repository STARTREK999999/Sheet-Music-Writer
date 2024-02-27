document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const staffHeight = 10; // Height of the staff line
    const noteRadius = 6; // Radius of the note circle
    const noteTypes = {
        quarter: 1,
        half: 2,
        whole: 4
    };

    // Render staff lines
    function renderStaff() {
        const staffY = canvas.height / 2;
        const staffWidth = canvas.width;
        const staffCount = 5; // Number of staff lines
        const spacing = 10; // Spacing between staff lines

        for (let i = 0; i < staffCount; i++) {
            const y = staffY + (i - Math.floor(staffCount / 2)) * spacing;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(staffWidth, y);
            ctx.stroke();
        }
    }

    // Render brass clef
    function renderBrassClef() {
        const img = new Image();
        img.src = 'brass_clef.png'; // Path to the brass clef image
        img.onload = function () {
            ctx.drawImage(img, 10, canvas.height / 2 - 25, 30, 50); // Adjust position and size as needed
        };
    }

    // Render treble clef
    function renderTrebleClef() {
        const img = new Image();
        img.src = 'treble_clef.png'; // Path to the treble clef image
        img.onload = function () {
            ctx.drawImage(img, canvas.width - 40, canvas.height / 2 - 40, 30, 80); // Adjust position and size as needed
        };
    }

    // Render staff lines and clefs
    function renderSheetMusic() {
        renderStaff();
        renderBrassClef();
        renderTrebleClef();
    }

    // Add note on click
    canvas.addEventListener('click', function (event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        addNoteAtPosition(mouseX, mouseY);
    });

    // Add a note at the given position
    function addNoteAtPosition(x, y) {
        const noteType = prompt("Enter note type (quarter, half, whole):").toLowerCase();
        const noteDuration = noteTypes[noteType];

        if (!noteDuration) {
            alert("Invalid note type!");
            return;
        }

        // Render note symbol based on note duration
        switch (noteDuration) {
            case 1: // Quarter note
                renderQuarterNoteSymbol(x, y);
                break;
            case 2: // Half note
                renderHalfNoteSymbol(x, y);
                break;
            case 4: // Whole note
                renderWholeNoteSymbol(x, y);
                break;
        }
    }

    // Render quarter note symbol
    function renderQuarterNoteSymbol(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, noteRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Render half note symbol
    function renderHalfNoteSymbol(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, noteRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillRect(x, y - noteRadius, noteRadius * 2, noteRadius * 2);
    }

    // Render whole note symbol
    function renderWholeNoteSymbol(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, noteRadius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x + noteRadius * 3, y, noteRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    // Clear canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Initial render
    renderSheetMusic();
});
