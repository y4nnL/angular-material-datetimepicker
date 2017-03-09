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
     *     buttonAlign         : string
     *     buttonClass         : string
     *     cancel              : string
     *     clickOutsideToClose : boolean
     *     class               : string
     *     closeTo             : Element|string
     *     date                : Date
     *     dateFilter          : function(Date):boolean
     *     dateTitle           : string
     *     fullscreen          : boolean
     *     hasBackdrop         : boolean
     *     hide                : string
     *     maxDate             : Date
     *     minDate             : Date
     *     next                : string
     *     now                 : string
     *     nowButton           : boolean
     *     openFrom            : Element|string
     *     parent              : Element|string
     *     previous            : string
     *     skipHide            : boolean
     *     targetEvent         : Event
     *     template            : string
     *     title               : string
     *     timeSeparator       : string
     *     timeStep            : number
     *     timeTitle           : string
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
        '    <div layout="column"' +
        '         layout-align="start none">' +
        '        <div layout="row"' +
        '             layout-align="start center"' +
        '             class="md-datetime-picker-date-header">' +
        '            <md-button class="md-datetime-picker-date-header-previous md-icon-button md-large"' +
        '                       ng-click="dateTimePicker.previousDay()">' +
        '                <md-icon md-font-set="md">keyboard_arrow_left</md-icon>' +
        '            </md-button>' +
        '            <div layout="column"' +
        '                 layout-align="start center"' +
        '                 flex>' +
        '                <span class="md-datetime-picker-date-header-year">' +
        '                    {{dateTimePicker.date|date:\'yyyy\'}}' +
        '                </span>' +
        '                <span class="md-datetime-picker-date-header-day">' +
        '                    {{dateTimePicker.date|date:\'EEEE d MMMM\'}}' +
        '                </span>' +
        '            </div>' +
        '            <md-button class="md-datetime-picker-date-header-next md-icon-button md-large"' +
        '                  ng-click="dateTimePicker.nextDay()">' +
        '                <md-icon md-font-set="md">keyboard_arrow_right</md-icon>' +
        '            </md-button>' +
        '        </div>' +
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
        '    <div class="md-datetime-picker-time-container" layout>' +
        '        <div class="md-datetime-picker-time-box">' +
        '            <md-button class="md-datetime-picker-time-up md-icon-button md-primary"' +
        '                       ng-click="dateTimePicker.hoursUp()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_up</md-icon>' +
        '            </md-button>' +
        '            <span class="md-datetime-picker-time"' +
        '                  ng-repeat="hour in dateTimePicker.arrays.hours track by $index"' +
        '                  ng-show="hour == dateTimePicker.hours">' +
        '                <span ng-show="hour < 10">0</span>{{hour}}' +
        '            </span>' +
        '            <md-button class="md-datetime-picker-time-down md-icon-button md-primary"' +
        '                       ng-click="dateTimePicker.hoursDown()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_down</md-icon>' +
        '            </md-button>' +
        '        </div>' +
        '        <div class="md-datetime-picker-time-box md-datetime-picker-time-box-sep">' +
        '            <span class="md-datetime-picker-time">{{dateTimePicker.i18n.timeSeparator}}</span>' +
        '        </div>' +
        '        <div class="md-datetime-picker-time-box">' +
        '            <md-button class="md-datetime-picker-time-up md-icon-button md-primary"' +
        '                       ng-click="dateTimePicker.minutesUp()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_up</md-icon>' +
        '            </md-button>' +
        '            <span class="md-datetime-picker-time"' +
        '                  ng-class="{ \'md-datetime-picker-time-two-digits\' : minute > 9 }"' +
        '                  ng-repeat="minute in dateTimePicker.arrays.minutes track by $index"' +
        '                  ng-show="minute == dateTimePicker.minutes">' +
        '                <span ng-show="minute < 10">0</span>{{minute}}' +
        '            </span>' +
        '            <md-button class="md-datetime-picker-time-down md-icon-button md-primary"' +
        '                       ng-click="dateTimePicker.minutesDown()">' +
        '                <md-icon md-font-set="mdDateTimePicker">keyboard_arrow_down</md-icon>' +
        '            </md-button>' +
        '        </div>' +
        '    </div>' +
        '</div>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : separator

    templates.separator =
        '<div class="md-datetime-picker-separator"' +
        '     flex="none">' +
        '</div>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : separator lite

    templates.separatorLite =
        '<div class="md-datetime-picker-separator-lite"' +
        '     flex="none">' +
        '</div>';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : now

    templates.now =
        '<md-button class="{{dateTimePicker.buttonClass || \'md-primary\'}} md-datetime-picker-now"' +
        '           ng-click="dateTimePicker.now()">{{dateTimePicker.i18n.now}}</md-button>';

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
        '    <md-dialog-content>' +
        '        <div class="md-dialog-content">' +
        '            <h2 ng-show="!dateTimePicker.toolbar && dateTimePicker.i18n.title">' +
        '                {{dateTimePicker.i18n.title}}' +
        '            </h2>' +
        '            <div layout="row"' +
        '                 layout-align="center center">';

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Templates : close

    templates.close =
        '            </div>' +
        '        </div>' +
        '    </md-dialog-content>' +
        '    <md-dialog-actions layout="row"' +
        '                       ng-if="dateTimePicker.buttonAlign != \'center\'">' +
        '        <span flex></span>' +
        '        <md-button class="{{dateTimePicker.buttonClass || \'md-primary\'}}"' +
        '                   ng-click="dateTimePicker.cancel()">{{dateTimePicker.i18n.cancel}}</md-button>' +
        '        <md-button class="{{dateTimePicker.buttonClass || \'md-primary\'}}"' +
        '                   ng-click="dateTimePicker.hide()"' +
        '                   ng-disabled="!dateTimePicker.date">{{dateTimePicker.i18n.hide}}</md-button>' +
        '    </md-dialog-actions>' +
        '    <md-dialog-actions layout="row"' +
        '                       layout-align="center"' +
        '                       ng-if="dateTimePicker.buttonAlign == \'center\'">' +
        '        <md-button class="{{dateTimePicker.buttonClass || \'md-primary\'}}"' +
        '                   ng-click="dateTimePicker.cancel()">{{dateTimePicker.i18n.cancel}}</md-button>' +
        '        <span class="md-datetime-picker-button-sep"' +
        '              flex="none"></span>' +
        '        <md-button class="{{dateTimePicker.buttonClass || \'md-primary\'}}"' +
        '                   ng-click="dateTimePicker.hide()"' +
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
            if (options.template === 'datetime' || !options.template) {
                template.push(templates.date);
                if (options.nowButton === true || !('nowButton' in options)) {
                    template.push(templates.separatorLite);
                    template.push(templates.now);
                    template.push(templates.separatorLite);
                } else {
                    template.push(templates.separator);
                }
                template.push(templates.time);
            } else {
                template.push(templates[options.template || 'date']);
            }
            template.push(templates.close);

            return $mdDialog.show({
                openFrom            : options.openFrom,
                closeTo             : options.closeTo,
                controller          : DateTimePickerController,
                controllerAs        : 'dateTimePicker',
                skipHide            : options.skipHide || false,
                template            : template.join(''),
                targetEvent         : options.targetEvent,
                parent              : angular.element(options.parent || document.body),
                fullscreen          : !!options.fullscreen,
                clickOutsideToClose : 'clickOutsideToClose' in options ? options.clickOutsideToClose : true,
                hasBackdrop         : 'hasBackdrop' in options ? options.hasBackdrop : true,
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
    /**
     * @param $scope
     * @param $mdDialog
     * @param {Options} resolvedOptions
     * @constructor
     */
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
         * Model's button alignment : "center" or undefined
         * @type {string}
         */
        dateTimePicker.buttonAlign = resolvedOptions.buttonAlign;

        /**
         * CSS class to pass to the modal's action buttons
         * @type {string}
         */
        dateTimePicker.buttonClass = resolvedOptions.buttonClass;

        /**
         * CSS class to pass to the modal
         * @type {string}
         */
        dateTimePicker.class = resolvedOptions.class;

        /**
         * Initial date from the Options object
         * @type {Date}
         */
        dateTimePicker.date = resolvedOptions.date ? new Date(resolvedOptions.date.getTime()) : null;

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
         *     cancel        : string
         *     dateTitle     : string
         *     hide          : string
         *     next          : string
         *     previous      : string
         *     title         : string
         *     timeSeparator : string
         *     timeTitle     : string
         * }}
         */
        dateTimePicker.i18n = {
            cancel        : resolvedOptions.cancel || 'Cancel',
            dateTitle     : resolvedOptions.dateTitle || resolvedOptions.title,
            hide          : resolvedOptions.hide || 'Validate',
            next          : resolvedOptions.next || 'Next',
            now           : resolvedOptions.now || 'Now',
            previous      : resolvedOptions.previous || 'Previous',
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

        /**
         * Increment a day
         */
        dateTimePicker.nextDay = function () {
            dateTimePicker.date = moment(dateTimePicker.date).add(1, 'day').toDate();
        };

        /**
         * Set the date to now
         */
        dateTimePicker.now = function () {
            dateTimePicker.date    = new Date();
            dateTimePicker.hours   = dateTimePicker.date.getHours();
            dateTimePicker.minutes = dateTimePicker.date.getMinutes();
        };

        /**
         * Decrement a day
         */
        dateTimePicker.previousDay = function () {
            dateTimePicker.date = moment(dateTimePicker.date).subtract(1, 'day').toDate();
        };

        ////////// Runtime

        if (dateTimePicker.date === null) {
            if (resolvedOptions.template === 'datetime') {
                dateTimePicker.date = new Date();
                dateTimePicker.date.setHours(
                    dateTimePicker.hours = dateTimePicker.date.getHours(),
                    dateTimePicker.minutes = dateTimePicker.date.getMinutes(),
                    0,
                    0
                );
            } else if (resolvedOptions.template == 'time') {
                dateTimePicker.date = new Date();
                dateTimePicker.date.setHours(
                    dateTimePicker.hours = 0,
                    dateTimePicker.minutes = resolvedOptions.timeStep,
                    0,
                    0
                );
            } else if (resolvedOptions.template == 'date') {
                dateTimePicker.date = new Date();
            }
        }
    }

})();