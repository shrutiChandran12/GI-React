/*
 *
 * PlpContainer actions
 *
 */

import { DEFAULT_ACTION } from './constants';
import * as actionTypes from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const increment = () => {
  return {
    type: actionTypes.INCREMENT
  }
}

export const filter = (newUpdatedFilter, newFacetName) => {
  return {
    type: actionTypes.FILTER,
    updatedFilter: newUpdatedFilter,
    facetName: newFacetName,
  }
}

export const adBannerAction = (value, sIndex) => {
  // console.log('adBannerAction', actionTypes);
  return {
    type: actionTypes.ADBANNERCOUNT,
    val: value,
    showIndex: sIndex
  }
}

export const adBannerDataAction = (value) => {
  return {
    type: actionTypes.ADBANNERDATA,
    data: value,
  }
}

export const sortingAction = (value) => {
  return {
    type: actionTypes.SORTING,
    val: value
  }
}

export const resetPLPReduxState = (value) => {
  return {
    type: actionTypes.RESETPLPREDUXSTATE,
  }
}

export const updateInitialValues = (coloumn) => {
  var bannerPos;
  if (coloumn === 3) {
    bannerPos = 12;
  } else {
    bannerPos = 8;
  }

  return {
    type: actionTypes.INITIALUPDATE,
    coloumnValue: coloumn,
    bannerPosValue: bannerPos,
  }
}
