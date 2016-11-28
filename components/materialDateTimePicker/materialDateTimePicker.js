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

    $scope.pickDate = function ($event) {
        $mdDateTimePicker({
            date        : $scope.date,
            maxDate     : moment().add('5', 'days').toDate(),
            minDate     : moment().subtract('5', 'days').toDate(),
            targetEvent : $event,
            title       : 'Yoooooo!',
            class       : 'full-width',
            //toolbar     : true
        }).then(function (date) {
            $scope.date = date;
        });
    };

    $scope.pickTime = function ($event) {
        $mdDateTimePicker({
            date          : $scope.date,
            targetEvent   : $event,
            template      : 'time',
            timeStep      : 15,
            timeSeparator : 'h',
            title         : 'Yoooooo!',
            class         : 'full-width',
            //toolbar     : true
        }).then(function (date) {
            $scope.date = date;
        });
    };

    $scope.pickDateTime = function ($event) {
        $mdDateTimePicker({
            cancel        : 'kènesôl',
            date          : $scope.date,
            hide          : 'Validèïte',
            maxDate       : moment().add('5', 'days').toDate(),
            minDate       : moment().subtract('5', 'days').toDate(),
            next          : 'Naixte',
            previous      : 'Préviousse',
            tabs          : false,
            targetEvent   : $event,
            template      : 'datetime',
            timeStep      : 15,
            timeSeparator : 'h',
            title         : 'Yoooooo!',
            class         : 'full-width',
            toolbar       : true
        }).then(function (date) {
            $scope.date = date;
        });
    };
}