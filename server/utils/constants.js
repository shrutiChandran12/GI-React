const apiconfig = require('./apiconfig.js');
const endPointURLConfig = apiconfig.getEndPoint();
const HostName = endPointURLConfig.hostname;
const searchHostName = endPointURLConfig.searchHostname;

// production Resource URL
const prodSearchResourceUrl = `https://${searchHostName}/search/resources/store`;
const prodWcsResourceUrl = `https://${HostName}/wcs/resources/store`;

// export the CONSTANT URL
module.exports = Object.freeze({
  TopCategoryHierarchy: `${prodSearchResourceUrl}/{{storeId}}/categoryview/{{urlParam}}`,
  espotOriginURL: `${prodWcsResourceUrl}/{{storeId}}/espot`,
  categoryview: `${prodSearchResourceUrl}/{{storeId}}/categoryview/{{urlParam}}`,
  categoryViewByParentId: `${prodSearchResourceUrl}/{{storeId}}/categoryview/byParentCategory/{{categoryId}}`,
  productViewByCategoryId: `${prodSearchResourceUrl}/{{storeId}}/productview/byCategory/{{categoryId}}?searchSource=E`,
  productViewById: `${prodWcsResourceUrl}/{{storeId}}/productview/byId/{{productid}}`,
  login: `${prodWcsResourceUrl}/{{storeId}}`,
  userRegistration: `${prodWcsResourceUrl}/{{storeId}}/person?responseFormat=json&mode=self`,
  userDetails: `${prodWcsResourceUrl}/{{storeId}}/person/@self`,
  search: `${prodSearchResourceUrl}/{{storeId}}/productview/bySearchTerm/{{urlParam}}`,
  autoSuggest: `${prodSearchResourceUrl}/{{storeId}}/sitecontent/keywordSuggestionsByTerm/{{urlParam}}`,
  cartData: `${prodWcsResourceUrl}/{{storeId}}/cart`,
  mylistFetch: `${prodWcsResourceUrl}/{{storeId}}/wishlist/@self`,
  createWishlist: `${prodWcsResourceUrl}/{{storeId}}/wishlist`,
  editWishlist: `${prodWcsResourceUrl}/{{storeId}}/wishlist/{{wishlistid}}`,
  changePassword: `${prodWcsResourceUrl}/{{storeId}}/person/@self?action=updateUserRegistration&responseFormat=json`,
  userContact: `${prodWcsResourceUrl}/{{storeId}}/person/@self/contact`,
  sociallogin: `${prodWcsResourceUrl}/{{storeId}}/loginidentity/oauth_validate?responseFormat=json`,
  otp: `${prodWcsResourceUrl}/{{storeId}}/GIOtp`,
  forgotPassword: `${prodWcsResourceUrl}/{{storeId}}/person/@self?responseFormat=json`,
  newsletterSubscription: `${prodWcsResourceUrl}/{{storeId}}/newsletter/savenewsletterdetails`,
});
