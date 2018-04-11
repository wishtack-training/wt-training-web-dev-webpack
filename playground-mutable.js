/**
 *
 * (c) 2013-2018 Wishtack
 *
 * $Id: $
 */

'use strict';

const getTemperature = () => {
    return 42;
};

const getRainProbability = () =>  {
    throw new Error('Impossible!');
    // return 10;
};

const updateWeather = (weather) => {

    return {
        ...weather,
        temperature: getTemperature(),
        rainProbability: getRainProbability()
    }

};

let weather = {
    city: 'Monaco',
    temperature: 10,
    rainProbability: 0
};

try {
    weather = updateWeather(weather);
}
catch (e) {
    console.warn('pas grave');
}

console.log(weather);
