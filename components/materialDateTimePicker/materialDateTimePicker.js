////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Modules

var moduleName = 'materialDateTimePicker';
var moduleDeps = [
    // Vendors
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ngMessages',
    // Components
    'idappsMaterialDateTimePicker'
];

angular.module(moduleName, moduleDeps)
    .controller('MaterialDateTimePicker', MaterialDateTimePicker);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Controller : MaterialDateTimePicker

MaterialDateTimePicker.$inject = [
    '$scope',
    '$mdDateTimePicker'
];
function MaterialDateTimePicker($scope, $mdDateTimePicker) {

    $scope.date = null;

    ////////// API : methods

    $scope.pickDateModel = null;
    $scope.pickDateOptions = {
        date        : $scope.date,
        maxDate     : moment().add('5', 'days').toDate(),
        minDate     : moment().subtract('5', 'days').toDate(),
        targetEvent : null,
        title       : 'Yoooooo!',
        class       : 'full-width',
        //toolbar     : true
    };

    $scope.pickDate = function ($event) {
        $scope.pickDateOptions.targetEvent = $event;
        $mdDateTimePicker($scope.pickDateOptions)
            .then(function (date) {
                $scope.date = date;
            });
    };

    $scope.pickDateTimeFilterModel = null;
    $scope.pickDateTimeFilterOptions = {
        date        : $scope.date,
        maxDate     : moment().add('5', 'days').toDate(),
        minDate     : moment().subtract('5', 'days').toDate(),
        targetEvent : null,
        timeFilter  : function (date) {
            return date.getHours() === 0 && date.getMinutes() === 10;
        },
        title       : 'Yoooooo!',
        class       : 'full-width',
        //toolbar     : true
    };

    $scope.pickDateTimeFilter = function ($event) {
        $scope.pickDateTimeFilterOptions.targetEvent = $event;
        $mdDateTimePicker($scope.pickDateTimeFilterOptions)
            .then(function (date) {
                $scope.date = date;
            });
    };

    $scope.isPickTimeModelValid = null;
    $scope.pickTimeModel = null;
    $scope.pickTimeOptions = {
        buttonAlign   : 'center',
        buttonClass   : 'yoooo',
        date          : $scope.date,
        targetEvent   : null,
        template      : 'time',
        timeStep      : 15,
        timeSeparator : 'h',
        title         : 'Yoooooo!',
        class         : 'full-width',
        //toolbar     : true
    };

    $scope.pickTime = function ($event) {
        $scope.pickTimeOptions.targetEvent = $event;
        $mdDateTimePicker($scope.pickTimeOptions.targetEvent)
            .then(function (date) {
                $scope.date = date;
            });
    };

    $scope.isPickDateTimeModelValid = null;
    $scope.pickDateTimeModel = null;
    $scope.pickDateTimeOptions = {
        cancel        : 'kènesôl',
        date          : $scope.date,
        hide          : 'Validèïte',
        maxDate       : moment().add('5', 'days').toDate(),
        minDate       : moment().subtract('5', 'days').toDate(),
        next          : 'Naixte',
        nowStartOfDay : true,
        previous      : 'Préviousse',
        tabs          : false,
        targetEvent   : null,
        template      : 'datetime',
        timeStep      : 15,
        timeSeparator : 'h',
        title         : 'Yoooooo!',
        class         : 'full-width',
        toolbar       : true
    };

    $scope.pickDateTime = function ($event) {
        $scope.pickDateTimeOptions.targetEvent = $event;
        $mdDateTimePicker($scope.pickDateTimeOptions.targetEvent)
            .then(function (date) {
                $scope.date = date;
            });
    };
}