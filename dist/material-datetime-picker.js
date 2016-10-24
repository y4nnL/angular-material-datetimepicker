;(function () {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Modules

    var moduleName = 'idappsMaterialDateTimePicker';
    var moduleDeps = [
        'ngAnimate',
        'ngAria',
        'ngMaterial',
        'ngMessages'
    ];

    angular.module(moduleName, moduleDeps)
        .config(configNgMaterialIcons)
        .service('$mdDateTimePicker', $mdDateTimePickerService);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Config : ngMaterialIcons

    configNgMaterialIcons.$inject = [
        '$mdIconProvider'
    ];
    function configNgMaterialIcons($mdIconProvider) {
        $mdIconProvider.fontSet('mdDateTimePicker', 'material-icons');
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Type : Options

    /**
     * @typedef {{
     *     clickOutsideToClose : boolean,
     *     fullscreen          : boolean,
     *     dateFilter          : function(Date):boolean,
     *     dateTitle           : string,
     *     maxDate             : Date,
     *     minDate             : Date,
     *     parent              : Element|string,
     *     targetEvent         : Event,
     *     template            : string,
     *     title               : string,
     *     timeStep            : number,
     *     timeTitle           : string,
     *     toolbar             : boolean
     * }}
     */
    var Options;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : date

    var templates = {};

    templates.date =
        '<div layout="row"' +
        '     layout-align="center none">' +
        '    <div>' +
        '        <md-calendar ng-model="dateTimePicker.date"' +
        '                     ng-change="dateTimePicker.dateChanged()"' +
        '                     md-date-filter="dateTimePicker.dateFilter"' +
        '                     md-max-date="dateTimePicker.maxDate"' +
        '                     md-min-date="dateTimePicker.minDate"></md-calendar>' +
        '    </div>' +
        '</div>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : time

    templates.time =
        '<div layout="row"' +
        '     layout-align="center none">' +
        '    <div layout>' +
        '        <div class="md-datetime-picker-time-box"' +
        '             flex>' +
        '            <md-button class="md-datetime-picker-time-up md-icon-button md-primary"' +
        '                    ng-click="dateTimePicker.hoursUp()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_up</md-icon>' +
        '            </md-button>' +
        '            <span class="md-datetime-picker-time"' +
        '                  ng-class="{ \'md-datetime-picker-time-two-digits\' : hour > 9 }"' +
        '                  ng-repeat="hour in dateTimePicker.arrays.hours track by $index"' +
        '                  ng-show="hour == dateTimePicker.hours">' +
        '                {{hour}}' +
        '            </span>' +
        '            <md-button class="md-datetime-picker-time-down md-icon-button md-primary"' +
        '                    ng-click="dateTimePicker.hoursDown()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_down</md-icon>' +
        '            </md-button>' +
        '        </div>' +
        '        <div class="md-datetime-picker-time-box md-datetime-picker-time-box-sep">' +
        '            <span class="md-datetime-picker-time">{{dateTimePicker.i18n.timeSeparator}}</span>' +
        '        </div>' +
        '        <div class="md-datetime-picker-time-box"' +
        '             flex>' +
        '            <md-button class="md-datetime-picker-time-up md-icon-button md-primary"' +
        '                    ng-click="dateTimePicker.minutesUp()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_up</md-icon>' +
        '            </md-button>' +
        '            <span class="md-datetime-picker-time"' +
        '                  ng-class="{ \'md-datetime-picker-time-two-digits\' : minute > 9 }"' +
        '                  ng-repeat="minute in dateTimePicker.arrays.minutes track by $index"' +
        '                  ng-show="minute == dateTimePicker.minutes">' +
        '                {{minute}}' +
        '            </span>' +
        '            <md-button class="md-datetime-picker-time-down md-icon-button md-primary"' +
        '                    ng-click="dateTimePicker.minutesDown()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_down</md-icon>' +
        '            </md-button>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : open

    templates.open =
        '<md-dialog aria-label="Date"' +
        '           class="md-datetime-picker {{dateTimePicker.class}}">' +
        '    <md-toolbar ng-show="dateTimePicker.toolbar && dateTimePicker.i18n.title">' +
        '        <div class="md-toolbar-tools">' +
        '            <h2>{{dateTimePicker.i18n.title}}</h2>' +
        '            <span flex></span>' +
        '            <md-button class="md-icon-button"' +
        '                       ng-click="dateTimePicker.cancel()">' +
        '                <md-icon md-font-set="mdDateTimePicker">close</md-icon>' +
        '            </md-button>' +
        '        </div>' +
        '    </md-toolbar>' +
        '    <md-dialog-content ng-switch="dateTimePicker.both">' +
        '        <md-tabs ng-switch-when="true"' +
        '                 md-selected="dateTimePicker.selectedTab"' +
        '                 md-dynamic-height' +
        '                 md-border-bottom>' +
        '            <md-tab label="date">' +
        '                <md-content class="md-padding">' +
        '                <h2 ng-show="!dateTimePicker.toolbar && dateTimePicker.i18n.dateTitle">' +
        '                    {{dateTimePicker.i18n.dateTitle}}' +
        '                </h2>' +
        '                ' + templates.date +
        '                </md-content>' +
        '            </md-tab>' +
        '            <md-tab label="time">' +
        '                <md-content class="md-padding">' +
        '                <h2 ng-show="!dateTimePicker.toolbar && dateTimePicker.i18n.timeTitle">' +
        '                    {{dateTimePicker.i18n.timeTitle}}' +
        '                </h2>' +
        '                ' + templates.time +
        '                </md-content>' +
        '            </md-tab>' +
        '        </md-tabs>' +
        '        <div class="md-dialog-content"' +
        '             ng-switch-when="false">' +
        '            <h2 ng-show="!dateTimePicker.toolbar && dateTimePicker.i18n.title">' +
        '                {{dateTimePicker.i18n.title}}' +
        '            </h2>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : close

    templates.close =
        '        </div>' +
        '    </md-dialog-content>' +
        '    <md-dialog-actions layout="row">' +
        '        <span flex></span>' +
        '        <md-button ng-click="dateTimePicker.cancel()">{{dateTimePicker.i18n.cancel}}</md-button>' +
        '        <md-button ng-click="dateTimePicker.hide()"' +
        '                   ng-disabled="!dateTimePicker.date">{{dateTimePicker.i18n.hide}}</md-button>' +
        '    </md-dialog-actions>' +
        '</md-dialog>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Service : $mdDateTimePicker

    $mdDateTimePickerService.$inject = [
        '$mdDialog'
    ];
    function $mdDateTimePickerService($mdDialog) {
        var $mdDateTimePickerService;

        ////////// API : methods;

        /**
         * Open the dialog depending on the template Options key : date (default), time or datetime
         * @param {Options} options
         * @returns {Promise}
         */
        $mdDateTimePickerService = function (options) {
            var template = [];

            template.push(templates.open);
            if (options.template !== 'datetime') {
                template.push(templates[options.template || 'date']);
            }
            template.push(templates.close);

            return $mdDialog.show({
                controller          : DateTimePickerController,
                controllerAs        : 'dateTimePicker',
                template            : template.join(''),
                targetEvent         : options.targetEvent,
                parent              : angular.element(options.parent || document.body),
                fullscreen          : !!options.fullscreen,
                clickOutsideToClose : options.clickOutsideToClose || true,
                resolve             : {
                    resolvedOptions : resolveOptions
                }
            });

            ////////// Resolve : title

            function resolveOptions() {
                return options;
            }
        };

        return $mdDateTimePickerService;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Controller : DateTimePicker

    DateTimePickerController.$inject = [
        '$scope',
        '$mdDialog',
        'resolvedOptions'
    ];
    function DateTimePickerController($scope, $mdDialog, resolvedOptions) {
        var dateTimePicker = $scope.dateTimePicker = this;

        ////////// API : properties

        /**
         * Internal use : generate a html element for each item in the array and toggle hours and minutes when one of
         * then change
         * @type {{hours: Array, minutes: Array}}
         */
        dateTimePicker.arrays = {
            hours   : _.map(new Array(24), function (number, i) {
                return i;
            }),
            minutes : _.map(new Array(60), function (number, i) {
                return i;
            })
        };

        /**
         * Whether show date and time selection
         * @type {boolean}
         */
        dateTimePicker.both = resolvedOptions.template === 'datetime';

        /**
         * CSS class to pass to the modal
         * @type {string}
         */
        dateTimePicker.class = resolvedOptions.class;

        /**
         * Initial date from the Options object
         * @type {Date}
         */
        dateTimePicker.date = resolvedOptions.date;

        /**
         * @see https://material.angularjs.org/latest/api/directive/mdCalendar
         * @type {function(Date):boolean}
         */
        dateTimePicker.dateFilter = resolvedOptions.dateFilter;

        /**
         * Current hours of the date object
         * @type {number}
         */
        dateTimePicker.hours = dateTimePicker.date ? dateTimePicker.date.getHours() : 0;

        /**
         * Internal i18n use
         * @see Options
         * @type {{
         *     cancel        : (string),
         *     dateTitle     : (string),
         *     hide          : (string),
         *     title         : (string),
         *     timeSeparator : (string),
         *     timeTitle     : (string)
         * }}
         */
        dateTimePicker.i18n = {
            cancel        : resolvedOptions.cancel || 'Cancel',
            dateTitle     : resolvedOptions.dateTitle || resolvedOptions.title,
            hide          : resolvedOptions.hide || 'Validate',
            title         : resolvedOptions.title,
            timeSeparator : resolvedOptions.timeSeparator || ':',
            timeTitle     : resolvedOptions.timeTitle || resolvedOptions.title
        };

        /**
         * @see https://material.angularjs.org/latest/api/directive/mdCalendar
         * @type {Date}
         */
        dateTimePicker.maxDate = resolvedOptions.maxDate;

        /**
         * @see https://material.angularjs.org/latest/api/directive/mdCalendar
         * @type {Date}
         */
        dateTimePicker.minDate = resolvedOptions.minDate;

        /**
         * Current minutes of the date object
         * @type {number}
         */
        dateTimePicker.minutes = dateTimePicker.date ? dateTimePicker.date.getMinutes() : 0;

        /**
         * Tab index when there is both date and time selection.
         * 0 is date
         * 1 is time
         * @type {number}
         */
        dateTimePicker.selectedTab = 0;

        /**
         * Minutes are [in,de]cremented through this step
         * @type {number}
         */
        dateTimePicker.timeStep = resolvedOptions.timeStep || 1;

        /**
         * Whether show the modal toolbar ui
         * @type {boolean}
         */
        dateTimePicker.toolbar = !!resolvedOptions.toolbar;

        ////////// API : methods

        /**
         * Cancel the dialog
         */
        dateTimePicker.cancel = function () {
            $mdDialog.cancel();
        };

        /**
         * Reset the time at each date change
         * When both date and time selection are shown, go to the time tab
         */
        dateTimePicker.dateChanged = function () {
            if (dateTimePicker.hours) {
                dateTimePicker.date.setHours(dateTimePicker.hours);
            }
            if (dateTimePicker.minutes) {
                dateTimePicker.date.setMinutes(dateTimePicker.minutes);
            }
            if (dateTimePicker.both) {
                dateTimePicker.selectedTab = 1;
            }
        };

        /**
         * Hide the dialog and pass the selected date (and time)
         */
        dateTimePicker.hide = function () {
            $mdDialog.hide(dateTimePicker.date);
        };

        /**
         * Increment the hours
         */
        dateTimePicker.hoursUp = function () {
            if (dateTimePicker.date === null) {
                dateTimePicker.date = new Date();
                dateTimePicker.date.setHours(0, 0, 0, 0);
            }
            var hours = dateTimePicker.date.getHours();
            hours     = hours === 23 ? 0 : hours + 1;
            dateTimePicker.date.setHours(dateTimePicker.hours = hours);
        };

        /**
         * Decrement the hours
         */
        dateTimePicker.hoursDown = function () {
            if (dateTimePicker.date === null) {
                dateTimePicker.date = new Date();
                dateTimePicker.date.setHours(0, 0, 0, 0);
            }
            var hours = dateTimePicker.date.getHours();
            hours     = hours === 0 ? 23 : hours - 1;
            dateTimePicker.date.setHours(dateTimePicker.hours = hours);
        };

        /**
         * Increment the minutes
         */
        dateTimePicker.minutesUp = function () {
            if (dateTimePicker.date === null) {
                dateTimePicker.date = new Date();
                dateTimePicker.date.setHours(0, 0, 0, 0);
            }
            var minutes = dateTimePicker.date.getMinutes() + dateTimePicker.timeStep;
            if (minutes >= 60) {
                dateTimePicker.hoursUp();
                dateTimePicker.date.setMinutes(dateTimePicker.minutes = minutes - 60);
            } else {
                dateTimePicker.date.setMinutes(dateTimePicker.minutes = minutes);
            }
        };

        /**
         * Decrement the minutes
         */
        dateTimePicker.minutesDown = function () {
            if (dateTimePicker.date === null) {
                dateTimePicker.date = new Date();
                dateTimePicker.date.setHours(0, 0, 0, 0);
            }
            var minutes = dateTimePicker.date.getMinutes() - dateTimePicker.timeStep;
            if (minutes < 0) {
                dateTimePicker.hoursDown();
                dateTimePicker.date.setMinutes(dateTimePicker.minutes = 60 + minutes);
            } else {
                dateTimePicker.date.setMinutes(dateTimePicker.minutes = minutes);
            }
        };
    }

})();