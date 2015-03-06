'use strict';

angular.module('cronenAdmin.version', [
  'cronenAdmin.version.interpolate-filter',
  'cronenAdmin.version.version-directive'
])

.value('version', '0.1');
