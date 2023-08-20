var app = angular.module('app', ['angular.filter']);

app.service('sharedService', function () {
    var accountID;
    return {
        setAccountID: function (id) {
            accountID = id;
            console.log('The inserted account id: ', accountID);
            
            //return accountID;
        },
        getAccountID: function () {
            console.log('Test');
            return accountID;
        }
    }
});