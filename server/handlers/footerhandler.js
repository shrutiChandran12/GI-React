const async = require('async');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const espotFilter = require('../filters/espotfilter');
const footerEspot = espots.footer;

/**
 * Get Footer data from WCS Espots
 * @param storeId,access_token
 * @return 200,OK Footer JSON Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getFooterData = function footerData(headers, callback) {
  async.map(
    footerEspot,
    (espotName, cb) => {
      espotsHandler.getEspotsData(headers, espotName, cb);
    },
    (err, results) => {
      if (err) {
        callback(err);
        return;
      }

      logger.debug('Got all the origin resposes');
      const resJson = {
        Footer_Links: espotFilter.espotContent(results[0]) || '',
        Footer_Social_Data: espotFilter.espotContent(results[1]) || '',
        Footer_Newsletter_Data: espotFilter.espotContent(results[2]) || '',
        Footer_StoreLinks: espotFilter.espotContent(results[3]) || '',
        Footer_Categories: espotFilter.espotContent(results[4]) || '',
      };
      callback(null, resJson);
    },
  );
};
