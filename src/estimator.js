const covid19ImpactEstimator = (data) => {
  let factor, days;
  let impactCurrentlyinfected = data.reportedCases * 10;
  let severeImpactCurrentlyinfected = data.reportedCases * 50;

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
  let impactInfestionsByRequestTime = impactCurrentlyinfected * factor;
  let severeImpactInfestionsByRequestTime =
    severeImpactCurrentlyinfected * factor;

  let impactSevereCasesByRequestedTime =
    (15 / 100) * impactInfestionsByRequestTime;
  let severeImpactSevereCasesByRequestedTime =
    (15 / 100) * severeImpactInfestionsByRequestTime;

  let availableBed = data.totalHospitalBeds * (35 / 100);
  let impactHospitalBedsByRequestedTime =
    availableBed - impactSevereCasesByRequestedTime;
  let severeImpactHospitalBedsByRequestedTime =
    availableBed - severeImpactSevereCasesByRequestedTime;

  let impactCasesForICUByRequestedTime =
    (5 / 100) * impactInfestionsByRequestTime;
  let severeImpactCasesForICUByRequestedTime =
    (5 / 100) * severeImpactInfestionsByRequestTime;

  let impactCasesForVentilatorsByRequestedTime =
    (2 / 100) * impactInfestionsByRequestTime;
  let severeImpactCasesForVentilatorsByRequestedTime =
    (2 / 100) * severeImpactInfestionsByRequestTime;

  let avgDailyIncomeInUSD = data.region.avgDailyIncomeInUSD;
  let avgDailyIncomePopulation = data.region.avgDailyIncomePopulation;

  let impactDollarsInFlight =
    impactInfestionsByRequestTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    days;

  let severeImpactDollarsInFlight =
    severeImpactInfestionsByRequestTime *
    avgDailyIncomeInUSD *
    avgDailyIncomePopulation *
    days;

  return {
    data: data,
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
