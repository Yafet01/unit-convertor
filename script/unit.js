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

function convertTemp(value, fromUnit, toUnit) {
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
