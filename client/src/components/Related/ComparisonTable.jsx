import React from 'react';

const ComparisonTable = (props) => {

  let shared = [];
  let sharedTracker = {};

  for (let feature of props.mainFeatures) {
    for (let compareFeature of props.comparisonFeatures) {
      if (feature.feature === compareFeature.feature) {
        shared.push({
          feature: feature.feature,
          mainValue: feature.value,
          compareValue: compareFeature.value
        });
        sharedTracker[feature.feature] = feature.feature;
      }
    }
  }



  return (<div>
    <table>
      <thead>
        <tr>
          <th>{props.mainProductName}</th>
          <th>Feature</th>
          <th>{props.comparisonProductName}</th>
        </tr>
      </thead>
      <tbody>
        {shared?.map (feature => (
          <tr key = {feature.feature}>
            <td>{feature.mainValue}</td>
            <td>{feature.feature}</td>
            <td>{feature.compareValue}</td>
          </tr>
        ))}
        {props.mainFeatures
          ?.filter(feature => sharedTracker[feature.feature] ? false : true)
          .map (feature =>
            (<tr key = {feature.feature}>
              <td>{feature.value}</td>
              <td>{feature.feature}</td>
              <td>N/A</td>
            </tr>)
          )}
        {props.comparisonFeatures
          ?.filter(feature => sharedTracker[feature.feature] ? false : true)
          .map (feature => (
            <tr key = {feature.feature}>
              <td>N/A</td>
              <td>{feature.feature}</td>
              <td>{feature.value}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>);
};

export default ComparisonTable;