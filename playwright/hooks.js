const { performance, PerformanceObserver } = require('perf_hooks');
const fs = require('fs');

let totalTimePerType = {};
let timePerMeasurement = {};
let totalTime = 0;
let numberOfMeasurements = {};

const perfObserver = new PerformanceObserver((items) => {
  const duration = items.getEntries()[0].duration;
  const name = items.getEntries()[0].name;
  if (totalTimePerType[name] === undefined) {
    totalTimePerType[name] = 0;
  }
  totalTimePerType[name] += duration;
  totalTime += duration;

  if (numberOfMeasurements[name] === undefined) {
    numberOfMeasurements[name] = 0;
  }
  numberOfMeasurements[name]++;

  if (timePerMeasurement[name] === undefined) {
    timePerMeasurement[name] = [];
  }
  timePerMeasurement[name].push(duration);
});

perfObserver.observe({ entryTypes: ['measure'], buffered: true });

exports.hooks = {
  beforeEach() {
    performance.mark('test-start');
  },
  afterEach() {
    performance.mark('test-end');
    performance.measure('Test run time [ms]', 'test-start', 'test-end');
  },
  afterAll() {
    const numberOfTests = numberOfMeasurements['Test run time [ms]'];
    const totalTimeRounded = Math.round(totalTime) / 1000;
    const meanTestTime = totalTimeRounded / numberOfTests;

    fs.writeFileSync(
      'results.json',
      JSON.stringify(
        {
          timePerMeasurement,
          numberOfMeasurements,
          totalTime,
          totalTimeRounded,
          numberOfTests,
          meanTestTime,
        },
        null,
        '\t'
      ),
      'utf-8'
    );
    console.log(`Total test run time: ${totalTime} [ms]`);
    console.log(`Total test run time: ${totalTimeRounded} [s]`);
    console.log(`Number of measurements: ${numberOfTests}`);
    console.log(`Mean test time: ${meanTestTime} [s]`);
  },
};
