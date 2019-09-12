import {
    wishlistDataCookie,
    wishlistIdCookie,
} from '../../public/constants/constants';
import LightHeader from '../components/HeaderComponent/headerL1/lightHeader';
import HeaderContainer from '../containers/HeaderContainer';
// import { utimes } from 'fs';

/**
 * Function to get current URL hostname and port
 * @param {*}
 */

/**
 * Function to get current URL hostname and port
 * @param {*} pin
 */
export function validatePIN(pin) {
    if (/^(\d{4}|\d{6})$/.test(pin)) {
        return true;
    }
    return false;
}

/**
 * Function will pick the browser width *
 */

export function isMobile() {
    return $(window).width() < 992;
}

/**
 * Function will pick the browser width *
 */

export function isTab() {
    return $(window).width() < 1025;
}

/**
 * Function will pick the browser width *
 */

export function getWindowWidth() {
    return $(window).width();
}

/**
 * Function to Fetch specific data from Cookie store
 * @param {*} cname
 */
export function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

/**
 * Function to get relevent state of the reducer
 * @param {*} state
 * @param {*} reducerName
 */
export function getReleventReduxState(state, reducerName) {
    let extractedState;
    state._root.entries.map(result => {
        if (result[0] === reducerName) {
            extractedState = result[1];
        }
    });
    return extractedState;
}

/**
 * Function to get relevent value of the Sorting
 * @param {*} value 
  0 - Recommended
  3 - Low to High
  4 - High to Low
  5 - New Arrival
 */
export function fetchReleventSortingValue(value) {
    console.log('ttttt', value);
    if (isMobile()) {
        if (value === 'Price - Low to High') {
            return 3;
        }
        if (value === 'Price - High to Low') {
            return 4;
        }
        if (value === 'New Arrival') {
            return 5;
        }
    }
    else {
        if (value === 'Price Low to High') {
            return 3;
        }
        if (value === 'Price High to Low') {
            return 4;
        }
        if (value === 'New Arrival') {
            return 5;
        }
    }
    
    // Recommended
    return 0;
}

export function fetchReleventSortingValueByIndex(index) {
    console.log('it index --- ', index);
    if (isMobile()) {
        if (parseInt(index) === 0) {
            return 'Price - Low to High';
        }
        if (parseInt(index) === 1) {
            return 'Price - High to Low';
        }
        if (parseInt(index) === 3) {
            return 'New Arrival';
        }
    }
    else {
        if (parseInt(index) === 0) {
            return 'Price Low to High';
        }
        if (parseInt(index) === 1) {
            return 'Price High to Low';
        }
        if (parseInt(index) === 3) {
            return 'New Arrival';
        }
    }
    
    return 'Interio Recommends';
}

export function mapSortIndex(index) {
    if (parseInt(index) === 3) {
        return 0;
    }
    if (parseInt(index) === 4) {
        return 1;
    }
    if (parseInt(index) === 5) {
        return 3;
    }
    return 2;
}

/**
 * Function to save the Filter map object
 * @param {*} updatedFilter
 * @param {*} facetName
 */
export function updateFilterMap(updatedFilter, facetName, currentFilter) {
    console.log('it it --- ', updatedFilter, facetName, currentFilter);
    const filterMap = currentFilter.updateFilter;
    if (updatedFilter.length === 0) {
        filterMap.delete(facetName);
        return filterMap;
    }
    filterMap.set(facetName, updatedFilter);
    console.log('Ne2 RWD Filter >>>> ',filterMap);
    return filterMap;
}

export function RWDUpdateFilterMap(updatedFilter, facetName, currentFilter) {
    const filterMap = currentFilter.rwdUpdatedFilter;
    if (updatedFilter.length === 0) {
        filterMap.delete(facetName);
        return filterMap;
    }
    filterMap.set(facetName, updatedFilter);
    return filterMap;
}

/**
 * Function to sort the Browsing Filters
 * @param {*} filterResponse
 * @param {*} facetName
 */
export function resolveBrowserFilters(filterResponse, browserFilters) {
    const finalBrowserFilter = [];
    for (let i = 0; i < browserFilters.length; i++) {
        if (browserFilters[i][0] === 'facet') {
            var reduxFilter = [];

            const facetValue = browserFilters[i][1];
            console.log('misss === ', facetValue);
            filterResponse.map((facetItem, index) => {
                console.log('browser Filter Item -- ', facetItem);
                const name = facetItem.facetName;

                facetItem.facetValues.map((innerItem, index) => {
                    console.log('browser Filter Item innerr -- ', innerItem);
                    if (innerItem.value === facetValue) {
                        console.log('its Matched --- ', facetValue);
                        reduxFilter.push(innerItem);
                    }
                }); // innerItem ended
            }); // facetItem ended
        }
    }

    // 0: {label: "Sofa Cum Beds", count: 5, value: "parentCatgroup_id_search:10051_13019"}
    // 1: {label: "Sofa Cum Beds", count: 5, value: "parentCatgroup_id_search:10051_13019"}
    // Returns abaove array
}

/**
 * Function to resolve the Filter
 * @param {*} updatedFilter
 */
export function resolveTheFilter(updatedFilter) {
    let filterURL = '';
    for (const [key, value] of updatedFilter) {
        filterURL += 'facet=';
        value.map((option, i) => {
            filterURL += option.value;
            if (value.length !== i + 1) {
                filterURL += '+';
            }
        });
        filterURL += '&';
    }
    return filterURL;
}

/** -----------------------------------------------------------------------
 * Function to resolve the Filter
 * @param {*} wishlist_Data
 */
export function resolveTheWishlistData(wishlist_Data) {
    const wishlistId = wishlist_Data.wishlistItemArray[0].wishlistID;
    const wishlistArr = wishlist_Data.wishlistItemArray[0].wishlistItemList;

    const json_str = JSON.stringify(wishlistArr);
    document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
    document.cookie = `${wishlistIdCookie}=${wishlistId};path=/;expires=''`;
}

export function getOnlyWishlistUniqueIds() {
    const wishliArrStr = getCookie(wishlistDataCookie);
    console.log('dd -- ', wishliArrStr);
    // if (wishliArrStr === null) {
    //   return;
    // }
    const wishlistArr = JSON.parse(wishliArrStr);

    const wishlistUniqueIdArr = wishlistArr.map(item => item.uniqueID);
    return wishlistUniqueIdArr;
}

export function getCorrespondingGiftlistId(uniqueID) {
    const wishliArrStr = getCookie(wishlistDataCookie);
    const wishlistArr = JSON.parse(wishliArrStr);
    let giftlistId = '';
    wishlistArr.map(item => {
        if (item.uniqueID === uniqueID) {
            giftlistId = item.giftListItemID;
        }
    });
    return giftlistId;
}

/* ----------------------------------------------------------------------- */

export function trimTheSentence(title, charLimit) {
    const trimStr = `${title.substring(0, charLimit)}...`;
    return trimStr;
}

export function checkCompareWidget(compWidget, id) {
    const data = compWidget.find(prd => prd.id == id);
    if (data) {
        return compWidget.filter(prd => prd.id != id);
    }
    const skuData = compWidget.find(prd => prd.skuId == id);
    if (skuData) {
        return compWidget.filter(prd => prd.skuId != id);
    }

    return compWidget;
}

export function is(val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
}

export function updateWidgetData(data, obj) {
    console.log(obj, 'obj in utility');
    var widgetdata = [];
    data.forEach((elem, index) => {
        var comp = elem;
        if (elem.id == obj.name) {
            comp.skuId = obj.id
        };
        widgetdata.push(comp);
    });
    return widgetdata;

}

export function formatPrice(priceValue) {
    return parseInt(priceValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** -----------------------------------------------------------------------
 * Function to map Payment Method Id
 * @param {*} searchKeyword
 */
export function formateSearchKeyword(searchKeyword, isKeywordEntered) {
    
    if (searchKeyword !== null && searchKeyword !== undefined && searchKeyword !== '') {
        if (isKeywordEntered) {
            return searchKeyword.replace(/&/g, 'z9f')
        }
        else {
            return searchKeyword.replace(/z9f/g, '&')
        }
    }
    
    
}

/** -----------------------------------------------------------------------
 * Function to map Payment Method Id
 * @param {*} PaymentMode
 */
export function mapPaymentMethodMode(paymentMode) {
    if (paymentMode === 'CREDIT_CARD') {
        return 'Credit Card';
    }
    else if (paymentMode === 'DEBIT_CARD') {
        return 'Debit Card';
    }
    else if (paymentMode === 'NET_BANKING') {
        return 'Netbanking';
    }
    else if (paymentMode === 'UPI') {
        return 'UPI';
    }
    else if (paymentMode === 'CC_EMI') {
        return 'EMI';
    }
    else if (paymentMode === 'MOBIKWIK') {
        return 'Mobikwik';
    }
    else if (paymentMode === 'PHONEPE') {
        return 'PhonePe';
    }
    else if (paymentMode === 'PAYTM') {
        return 'PayTM';
    }
    else {
        return '';
    }

}