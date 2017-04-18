/**
 * Configuration object for generator library dependencies.
 *
 * @type {Object}
 */
module.exports = {
  angular: {
    uiFrameworks: ['bootstrap', 'materialDesign'],
    cssFrameworks: ['sass', 'less'],
    otherFrameworks: [],
    otherModules: []
  },
  default: {
    uiFrameworks: ['bootstrap', 'materialDesign'],
    cssFrameworks: ['sass', 'less'],
    otherFrameworks: [],
    otherModules: []
  },
  react: {
    uiFrameworks: ['bootstrap'],
    cssFrameworks: ['sass', 'less'],
    otherFrameworks: ['redux'],
    otherModules: ['capco']
  }
}
