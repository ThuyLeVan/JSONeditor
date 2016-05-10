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
   
    $scope.selectItems = [
        { id: 0, name: 'Simple Value' },
        { id: 1, name: 'Multipe Value' }
    ]

    $scope.counter = 0;
    $scope.arr = {};
    $scope.counterchild = 0;
    $scope.list = [];
    $scope.addRow = function () {
        
        var row = '<tr id="tr'+$scope.counter+'">';
        row += '<td class="col-sm-3">';
        row += '<input class="form-control" name="key[]" type="text" placeholder="Key ..." />';
        row += '</td>';
        row += '<td class="col-sm-8">';
        row += '<select class="form-control fitselect" ng-model="mySelect' + $scope.counter + '" ng-options="s.id as s.name for s in selectItems" ng-init="mySelect' + $scope.counter + '=selectItems[0].id" >';
        row += '</select>';
        row += '<button class="btn btn-success btn-add fitbutton" ng-click="addrowValue(' + $scope.counter + ',$event)" ng-show="mySelect' + $scope.counter + '==1" id="btn' + $scope.counter + '"> Add <span class="glyphicon glyphicon-plus"></span>  </button>';
        row += '<input class="form-control fitinput" name="value[]" type="text" ng-show="mySelect' + $scope.counter + '==0" placeholder="Value ..." id="value' + $scope.counter + '" />';
        row += '</td>';
        row += '<td class="col-sm-1 text-center">';
        row += '<button type="button" class="btn btn-sm btn-danger" ng-click="removeRow(' + $scope.counter + ')">';
        row += '<span class="glyphicon glyphicon-trash"></span>';
        row += '</button>';
        row += '</td>';
        row += ' </tr>';
        var temp = $compile(row)($scope);
        $('#myTable > tbody:last-child').append(temp);
        $scope.arr[$scope.counter] = [];
        $scope.list.push($scope.counter);
        $scope.counter ++;
       
    };
    $scope.addrowValue = function (entry,$event) {

       //kiem tra thang cha cua thang nay la thang nao
        var parent = $($event.target).parent();
 
        var idTable = 'myTable' + entry +  $scope.counterchild;
        var table = parent[0].querySelector('table');
        console.log(table);
       
        //neu khong tim thay table thi them table
        if (table == null) {
            var row = '<table class="table table-hover table-bordered fittable" id="' + idTable + '" ng-show="mySelect' + entry + '==1"><thead><tr class="info" ><th>Key</th> <th>Value</th><th></th></tr></thead><tbody >';
            row += '<tr>';
            row += '<td class="col-sm-2">';
            row += '<input class="form-control" name="key[]" type="text" placeholder="Key ..." />';
            row += '</td>';
            row += '<td class="col-sm-5">';
            row += '<select class="form-control fitselect" ng-model="mySelect' + entry +  $scope.counterchild + '" ng-options="s.id as s.name for s in selectItems" ng-init="mySelect' + entry + $scope.counterchild + '=selectItems[0].id" >';
            row += '</select>';
            row += '<button class="btn btn-success btn-add fitbutton" ng-click="" ng-show="mySelect' + entry +  $scope.counterchild + '==1" id=""> Add <span class="glyphicon glyphicon-plus"></span>  </button>';
            row += '<input class="form-control fitinput" name="value[]" type="text" ng-show="mySelect' + entry + $scope.counterchild + '==0" placeholder="Value ..." id="" />';
            row += '</td>';
            row += '<td class="col-sm-1 text-center">';
            row += '<button type="button" class="btn btn-sm btn-danger" ng-click="">';
            row += '<span class="glyphicon glyphicon-trash"></span>';
            row += '</button>';
            row += '</td>';
            row += ' </tr>';   
            row += '</tbody></table>';
            var temp = $compile(row)($scope);
            parent.append(temp);
            $scope.counterchild = 0;
            $scope.arr[entry].push($scope.counterchild);
            $scope.counterchild++;
        }
        else {
            var row = '<tr>';
            row += '<td class="col-sm-2">';
            row += '<input class="form-control" name="key[]" type="text" placeholder="Key ..." />';
            row += '</td>';
            row += '<td class="col-sm-5">';
            row += '<select class="form-control fitselect" ng-model="mySelect' + entry +  $scope.counterchild + '" ng-options="s.id as s.name for s in selectItems" ng-init="mySelect' + entry +  $scope.counterchild + '=selectItems[0].id" >';
            row += '</select>';
            row += '<button class="btn btn-success btn-add fitbutton" ng-click="" ng-show="mySelect' + entry +  $scope.counterchild + '==1" id=""> Add <span class="glyphicon glyphicon-plus"></span>  </button>';
            row += '<input class="form-control fitinput" name="value[]" type="text" ng-show="mySelect' + entry +  $scope.counterchild + '==0" placeholder="Value ..." id="" />';
            row += '</td>';
            row += '<td class="col-sm-1 text-center">';
            row += '<button type="button" class="btn btn-sm btn-danger" ng-click="">';
            row += '<span class="glyphicon glyphicon-trash"></span>';
            row += '</button>';
            row += '</td>';
            row += ' </tr>';
            
            var temp = $compile(row)($scope);
            
            //var element1 = 'myTable' + entry + ($scope.counterchild-1) + ' > tbody:last-child';
            var element1 = table.querySelector('tbody:last-child');
            $(element1).append(temp);
            
            $scope.arr[entry].push($scope.counterchild);
            $scope.counterchild++;
        }
    };
    $scope.checkRow = function () {
        var r = $("#myTable > tbody > tr").length;
        if (r <= 0) {
            return false;
        }
        else {
            return true;
        }
    }
    $scope.removeRow = function (e) {
        
        var $el = $('#tr' + e + '').remove();
        $compile($el)($scope);
        var index = $scope.list.indexOf(e);
        $scope.list.splice(index, 1);
    }
    
   
   
})
//row += '<option>Simple Value</option>';
//row += '<option>Multipe Value</option>';