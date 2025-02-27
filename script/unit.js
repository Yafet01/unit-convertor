document.addEventListener('DOMContentLoaded', function() {
    loadForm('length.html'); // Load the length form by default
});

function loadForm(file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            document.getElementById('form-container').innerHTML = html;

            document.querySelectorAll('.tab-button').forEach(button => {
                button.classList.remove('active');
            });

            document.querySelectorAll('.tab-button').forEach(button => {
                if (button.getAttribute('onclick') === `loadForm('${file}')`) {
                    button.classList.add('active');
                }
            });

            document.getElementById('result-container').style.display = 'none';

        })
        .catch(error => console.error('Error loading form:', error));

}

function convert(event, type) {
    event.preventDefault();

    let value, fromUnit, toUnit, convertedValue;

    if (type === 'length') {
        value = parseFloat(document.getElementById('length-value').value);
        fromUnit = document.getElementById('length-from').value;
        toUnit = document.getElementById('length-to').value;
        convertedValue = convertLength(value, fromUnit, toUnit);
    } else if (type === 'weight') {
        value = parseFloat(document.getElementById('weight-value').value);
        fromUnit = document.getElementById('weight-from').value;
        toUnit = document.getElementById('weight-to').value;
        convertedValue = convertWeight(value, fromUnit, toUnit);
    } else if (type === 'temperature') {
        value = parseFloat(document.getElementById('temperature-value').value);
        fromUnit = document.getElementById('temperature-from').value;
        toUnit = document.getElementById('temperature-to').value;
        convertedValue = convertTemperature(value, fromUnit, toUnit);
    }

    document.getElementById('result-text').textContent = `Converted Value: ${convertedValue}`;
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
}

function convertLength(value, fromUnit, toUnit) {
    const lengthUnit = {
        'mm': 0.001,
        'cm': 0.01,
        'm': 1,
        'km': 1000,
        'inch': 0.0254,
        'foot': 0.3048,
        'yard': 0.9144,
        'mile': 1609.34
    };
    
    let valueInMeters = value * lengthUnit[fromUnit]; 
    return valueInMeters / lengthUnit[toUnit];
}

function convertWeight(value, fromUnit, toUnit) {
    const weightUnit = {
        'mg': 0.001,
        'g': 1,
        'kg': 1000,
        'oz': 28.3495,
        'lbs': 453.592
    };

    let valueInGrams = value * weightUnit[fromUnit];
    return valueInGrams / weightUnit[toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === toUnit) return value;

    let celsiusValue;
    if (fromUnit === 'Celsius') {
        celsiusValue = value;
    } else if (fromUnit === 'Kelvin') {
        celsiusValue = value - 273.15;
    } else if (fromUnit === 'Fahrenheit') {
        celsiusValue = (value - 32) * 5 / 9;
    }

    if (toUnit === 'Celsius') return celsiusValue;
    if (toUnit === 'Fahrenheit') return celsiusValue * 9 / 5 + 32;
    if (toUnit === 'Kelvin') return celsiusValue + 273.15;
}

function reset() {
    document.getElementById('result-container').style.display = 'none';
    document.getElementById('form-container').style.display = 'block';
}