function ToggleAccordion(subject) {
    var panel;
    if (subject == 'physics') {
        panel = document.getElementById('physics-panel');
    }
    else if (subject == 'math') {
        panel = document.getElementById('math-panel');
    }
    else if (subject == 'chemistry') {
        panel = document.getElementById('chemistry-panel');
    }

    console.log('Chosen panel : ', panel);

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    }
    else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }
}