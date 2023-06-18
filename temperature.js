document.addEventListener('DOMContentLoaded', function () {

    var SelectfromUnit = document.getElementById('fromUnit');
    var SelecttoUnit = document.getElementById('toUnit');
    var inputField = document.getElementById('Input');
    var resultDiv = document.getElementById('result');
    var resetBtn = document.getElementById('resetBtn');
    var calculateBtn = document.getElementById('calculateBtn');

    calculateBtn.addEventListener('click', function (event) {
        event.preventDefault();
        var fromUnitVal = parseFloat(SelectfromUnit.value);
        var toUnitVal = parseFloat(SelecttoUnit.value);
        var inputVal = parseFloat(inputField.value);

        var result;
        if (inputVal != NaN) {
            result = convertTemperature(inputVal, fromUnitVal, toUnitVal);
            resultDiv.textContent = result;
        } else {
            resultDiv.textContent = 'Invalid input';
        }
    });

    resetBtn.addEventListener('click', function (event) {
        event.preventDefault();
        inputField.value = '';
        resultDiv.textContent = '';
        SelectfromUnit.selectedIndex = 0;
        SelecttoUnit.selectedIndex = 0;
    });

    function convertTemperature(value, fromUnit, toUnit) {
        const conversionFactors = {
            1: {
                1: function (val) { return val; }, // Celsius to Celsius
                2: function (val) { return val + 273.15; }, // Celsius to Kelvin
                3: function (val) { return (val * 9 / 5) + 32; } // Celsius to Fahrenheit
            },
            2: {
                1: function (val) { return val - 273.15; }, // Kelvin to Celsius
                2: function (val) { return val; }, // Kelvin to Kelvin
                3: function (val) { return (val - 273.15) * 9 / 5 + 32; } // Kelvin to Fahrenheit
            },
            3: {
                1: function (val) { return (val - 32) * 5 / 9; }, // Fahrenheit to Celsius
                2: function (val) { return (val - 32) * 5 / 9 + 273.15; }, // Fahrenheit to Kelvin
                3: function (val) { return val; } // Fahrenheit to Fahrenheit
            }
        };

        if (conversionFactors.hasOwnProperty(fromUnit) && conversionFactors[fromUnit].hasOwnProperty(toUnit)) {
            if (typeof conversionFactors[fromUnit][toUnit] === 'function') {
                const result = conversionFactors[fromUnit][toUnit](value);
                return result.toFixed(2); 
            } else {
                const result = value * conversionFactors[fromUnit][toUnit];
                return result.toFixed(2);
            }
        } else {
            return 'Invalid units';
        }
    }
});