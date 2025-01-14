'use strict';

/**
 *  This module generates 'search_providers.json' used by the Search and
 *  Settings Applications
 *
 */

/* global require, exports */
const utils = require('utils');

const IN_FILE = 'search_providers_input.json';
const OUT_FILE = 'search_providers.json';

function generateSearchProviderJson(opts) {

  var searchProviderJson =
    utils.getJSON(utils.getFile(opts.GAIA_DIR, 'shared', 'js', IN_FILE));

  if (opts.VARIANT_PATH) {
    var variantJson = utils.getJSON(utils.getFile(opts.VARIANT_PATH));
    if ('search_partner_code' in variantJson) {
      searchProviderJson.partner_code = variantJson.search_partner_code;
    }
  }

  var content = JSON.stringify(searchProviderJson);
  var resultFile = utils.getFile(opts.GAIA_DIR, 'shared', 'js', OUT_FILE);

  if (resultFile.exists()) {
    let prev = utils.getFileContent(resultFile);
    if (prev === content) {
      return;
    }
  }
  utils.writeContent(resultFile, content);
}

exports.execute = function(config) {
  generateSearchProviderJson(config);
};
