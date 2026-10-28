// Application state
let appData = {
    step: 1,
    numStudents: 0,
    numSections: 0,
    sections: {}
};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Step 1 form submission
    document.getElementById('form-step1').addEventListener('submit', function(e) {
        e.preventDefault();
        
        appData.numStudents = parseInt(document.getElementById('num_students').value);
        appData.numSections = parseInt(document.getElementById('num_sections').value);
        appData.step = 2;
        
        showStep2();
    });
    
    // Step 2 form submission
    document.getElementById('form-step2').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect program counts and auto-generate program names
        appData.sections = {};
        for (let i = 0; i < appData.numSections; i++) {
            const sectionName = String.fromCharCode(65 + i); // A, B, C, etc.
            const numPrograms = parseInt(document.getElementById('programs_' + i).value);
            
            // Auto-generate program names
            const programs = [];
            for (let j = 1; j <= numPrograms; j++) {
                programs.push('Program-' + j);
            }
            
            appData.sections[sectionName] = {
                numPrograms: numPrograms,
                programs: programs
            };
        }
        
        appData.step = 4;
        showStep4();
    });
});

// Show Step 2
function showStep2() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
    
    // Update summary
    document.getElementById('step2-summary').textContent = 
        `Students: ${appData.numStudents} | Sections: ${appData.numSections}`;
    
    // Generate section inputs
    const container = document.getElementById('sections-container');
    container.innerHTML = '';
    
    for (let i = 0; i < appData.numSections; i++) {
        const sectionName = String.fromCharCode(65 + i);
        
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.htmlFor = 'programs_' + i;
        label.textContent = `Number of Programs in Section ${sectionName}:`;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.id = 'programs_' + i;
        input.name = 'programs_' + i;
        input.min = '1';
        input.required = true;
        
        formGroup.appendChild(label);
        formGroup.appendChild(input);
        container.appendChild(formGroup);
    }
}

// Show Step 4
function showStep4() {
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step4').style.display = 'block';
    
    // Update summary
    document.getElementById('summary-students').textContent = appData.numStudents;
    document.getElementById('summary-sections').textContent = appData.numSections;
    
    // // Display programs by section
    // const programsSummary = document.getElementById('programs-summary');
    // programsSummary.innerHTML = '';
    
    // for (const [sectionName, sectionData] of Object.entries(appData.sections)) {
    //     const li = document.createElement('li');
        
    //     const strong = document.createElement('strong');
    //     strong.textContent = `Section ${sectionName}:`;
    //     li.appendChild(strong);
        
    //     const ul = document.createElement('ul');
    //     sectionData.programs.forEach(program => {
    //         const programLi = document.createElement('li');
    //         programLi.textContent = program;
    //         ul.appendChild(programLi);
    //     });
        
    //     li.appendChild(ul);
    //     programsSummary.appendChild(li);
    // }
    
    // Hide result box initially
    document.getElementById('result-box').style.display = 'none';
}

// Randomize programs
function randomizePrograms() {
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';
    
    for (const [sectionName, sectionData] of Object.entries(appData.sections)) {
        if (sectionData.programs.length > 0) {
            // Get random program
            const randomIndex = Math.floor(Math.random() * sectionData.programs.length);
            const randomProgram = sectionData.programs[randomIndex];
            
            // Create list item
            const li = document.createElement('li');
            
            const strong = document.createElement('strong');
            strong.textContent = `Section ${sectionName}: `;
            
            const span = document.createElement('span');
            span.className = 'highlight';
            span.textContent = randomProgram;
            
            li.appendChild(strong);
            li.appendChild(span);
            resultList.appendChild(li);
        }
    }
    
    // Show result box with animation
    document.getElementById('result-box').style.display = 'block';
}

// Reset the application
function resetApp() {
    appData = {
        step: 1,
        numStudents: 0,
        numSections: 0,
        sections: {}
    };
    
    // Reset all forms
    document.getElementById('form-step1').reset();
    document.getElementById('form-step2').reset();
    
    // Show only step 1
    document.getElementById('step1').style.display = 'block';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step4').style.display = 'none';
}
