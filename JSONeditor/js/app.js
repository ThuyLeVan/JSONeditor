var app = angular.module('myApp', ['angularFileUpload']);  //Must inject the angularFileUpload here

app.controller('HomeController', function ($scope) {
    $scope.appTitle = "JSON Editor";
});



app.controller('MainController', function ($scope, $compile) {

    $scope.$watch('uploadedFile', function () {
        if ($scope.uploadedFile != null) {
            var file = $scope.uploadedFile[0];
            var reader = new FileReader();

            reader.onload = function (event) {
                var uploadedFile = this.result;

                var myData, dataArray, key;
                myData = JSON.parse(uploadedFile);
                dataArray = [];
                for (key in myData) {
                    if (myData.hasOwnProperty(key)) {
                        dataArray.push(key);         // Push the key on the array
                        dataArray.push(myData[key]); // Push the key's value on the array
                    }
                }
                console.log(myData);
                if ($scope.isValidJson(uploadedFile) == true) {
                    $('#element').empty();
                    $('#mess').css('display', 'none');
                    $('#element').jsonView(JSON.stringify(
                         JSON.parse(uploadedFile)
                   ));
                }
                else {
                    $('#mess').css('display', 'block');
                    $('#element').empty();
                }
            };
            reader.readAsText(file);
        }
    });

    $scope.isValidJson = function (json) {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            return false;
        }
    };
    $scope.addRow = function () {
        var row = '<tr>';
        row += '<td class="col-sm-3">';
        row += '<input class="form-control" name="glucosa[]" type="text" placeholder="Glucosa" />';
        row += '</td>';
        row += '<td class="col-sm-8">';
        row += '<input class="form-control" name="col_data[]" type="text" placeholder="Data" />';
        row += '</td>';
        row += '<td class="col-sm-1 text-center">';
        row += '<button type="button" class="btn btn-sm btn-danger" ng-click="removeRow($event)">';
        row += '<span class="glyphicon glyphicon-trash"></span>';
        row += '</button>';
        row += '</td>';
        row += ' </tr>';

        var $el=$('#myTable > tbody:last-child').append(row);
        $compile($el)($scope);
    }
    $scope.removeRow = function ($event) {
        $($event.target).parents('tr:first').remove();
        return false;
    }

})















































/*app.config(function($routeProvider){
	$routeProvider
		.when("/",{
			templateUrl: "views/groceryList.html",
			controller: "GroceryListItemsController"
		})
		.when("/addItem",{
			templateUrl: "views/inputItem.html",
			controller: "GroceryListItemsController"
		})
        .when("/addItem/:id",{
            templateUrl: "views/inputItem.html",
            controller: "GroceryListItemsController"
        })
        .otherwise({
            redirectTo:"/"
        })
});

app.service("GroceryService", function(){
    var groceryService=[];
    groceryService.groceryItems= [
        {itemName: 'milk',  date: '2014-10-01'},
        {itemName: 'cookies', date: '2014-10-01'},
        {itemName: 'ice cream', date: '2014-10-02'},
        {itemName: 'potatoes', date: '2014-10-02'},
        {itemName: 'cereal', date: '2014-10-03'},
        {itemName: 'bread', date: '2014-10-03'},
        {itemName: 'eggs', date: '2014-10-04'},
        {itemName: 'tortillas', date: '2014-10-04'}
    ];
    return groceryService;
})

app.controller("HomeController", ["$scope","GroceryService", function($scope,$GroceryService) {
    $scope.appTitle =$GroceryService.groceryItems[0].itemName;

}]);

app.controller("GroceryListItemsController", ["$scope","$routeParams","GroceryService", function($scope,$routeParams,$GroceryService){
    $scope.groceryItems =$GroceryService.groceryItems;

}])*/