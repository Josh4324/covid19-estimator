const covid19ImpactEstimator = (data) => {
  let factor;
  let
    days;
  const impactCurrentlyinfected = data.reportedCases * 10;
  const severeImpactCurrentlyinfected = data.reportedCases * 50;

  if (data.periodType === 'days') {
    days = data.timeToElapse;
    factor = 2 ** Math.round(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    days = data.timeToElapse * 7;
    factor = 2 ** Math.round(days / 3);
  } else {
    days = data.timeToElapse * 30;
    factor = 2 ** Math.round(days / 3);
  }
  const impactInfestionsByRequestTime = impactCurrentlyinfected * factor;
  const severeImpactInfestionsByRequestTime = severeImpactCurrentlyinfected * factor;

  const impactSevereCasesByRequestedTime = (15 / 100) * impactInfestionsByRequestTime;
  const severeImpactSevereCasesByRequestedTime = (15 / 100) * severeImpactInfestionsByRequestTime;

  const availableBed = data.totalHospitalBeds * (35 / 100);
  const impactHospitalBedsByRequestedTime = availableBed - impactSevereCasesByRequestedTime;
  // eslint-disable-next-line max-len
  const severeImpactHospitalBedsByRequestedTime = availableBed - severeImpactSevereCasesByRequestedTime;

  const impactCasesForICUByRequestedTime = (5 / 100) * impactInfestionsByRequestTime;
  const severeImpactCasesForICUByRequestedTime = (5 / 100) * severeImpactInfestionsByRequestTime;

  const impactCasesForVentilatorsByRequestedTime = (2 / 100) * impactInfestionsByRequestTime;
  // eslint-disable-next-line max-len
  const severeImpactCasesForVentilatorsByRequestedTime = (2 / 100) * severeImpactInfestionsByRequestTime;

  const {
    avgDailyIncomeInUSD
  } = data.region;
  const {
    avgDailyIncomePopulation
  } = data.region;

  const impactDollarsInFlight = impactInfestionsByRequestTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    days;

  const severeImpactDollarsInFlight = severeImpactInfestionsByRequestTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    days;

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
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

console.log(covid19ImpactEstimator(sample)); */

export default covid19ImpactEstimator;