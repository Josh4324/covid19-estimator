const covid19ImpactEstimator = (data) => {
  let factor;
  let
    days;
  const impactCurrentlyinfected = data.reportedCases * 10;
  const severeImpactCurrentlyinfected = data.reportedCases * 50;

  if (data.periodType === 'days') {
    days = data.timeToElapse;
    factor = 2 ** Math.trunc(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    days = data.timeToElapse * 7;
    factor = 2 ** Math.trunc(days / 3);
  } else {
    days = data.timeToElapse * 30;
    factor = 2 ** Math.trunc(days / 3);
  }
  const impactInfestionsByRequestTime = impactCurrentlyinfected * factor;
  const severeImpactInfestionsByRequestTime = severeImpactCurrentlyinfected * factor;

  const impactSevereCasesByRequestedTime = Math.trunc((15 / 100) * impactInfestionsByRequestTime);
  // eslint-disable-next-line max-len
  const severeImpactSevereCasesByRequestedTime = Math.trunc((15 / 100) * severeImpactInfestionsByRequestTime);

  const availableBed = (data.totalHospitalBeds * (35 / 100));
  // eslint-disable-next-line max-len
  const impactHospitalBedsByRequestedTime = Math.trunc(availableBed - impactSevereCasesByRequestedTime);
  // eslint-disable-next-line max-len
  const severeImpactHospitalBedsByRequestedTime = Math.trunc(availableBed - severeImpactSevereCasesByRequestedTime);

  const impactCasesForICUByRequestedTime = Math.trunc((5 / 100) * impactInfestionsByRequestTime);
  // eslint-disable-next-line max-len
  const severeImpactCasesForICUByRequestedTime = Math.trunc((5 / 100) * severeImpactInfestionsByRequestTime);
  // eslint-disable-next-line max-len
  const impactCasesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * impactInfestionsByRequestTime);
  // eslint-disable-next-line max-len
  const severeImpactCasesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * severeImpactInfestionsByRequestTime);

  const {
    avgDailyIncomeInUSD
  } = data.region;
  const {
    avgDailyIncomePopulation
  } = data.region;

  // eslint-disable-next-line max-len
  const impactDollarsInFlight = Math.trunc((impactInfestionsByRequestTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / days);
  // eslint-disable-next-line max-len
  const severeImpactDollarsInFlight = Math.trunc((severeImpactInfestionsByRequestTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / days);

  return {
    data,
    impact: {
      currentlyInfected: impactCurrentlyinfected,
      infectionsByRequestedTime: impactInfestionsByRequestTime,
      severeCasesByRequestedTime: impactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: severeImpactCurrentlyinfected,
      infectionsByRequestedTime: severeImpactInfestionsByRequestTime,
      severeCasesByRequestedTime: severeImpactSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: severeImpactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeImpactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: severeImpactDollarsInFlight
    }
  };
};

/* const sample = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 4,
    avgDailyIncomePopulation: 0.73
  },
  periodType: 'days',
  timeToElapse: 38,
  reportedCases: 2747,
  population: 92931687,
  totalHospitalBeds: 678874
};

console.log(covid19ImpactEstimator(sample));
 */
// eslint-disable-next-line eol-last
export default covid19ImpactEstimator;