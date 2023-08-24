/*var app = angular.module('app', ['angular.filter']);*/

app.service('svc', function ($http) {

    this.svc_OnLoadGetProfile = function (token) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Account/GetAccountDetailByToken/token/' + encodeURIComponent(token),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_InsertOrUpdateProfile = function (accountDetail, token) {
        var param = {
            'accountDetail': accountDetail,
            'token': token
        };

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Account/InsertOrUpdateProfile/token/' + encodeURIComponent(token),
            data: param.accountDetail,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        console.log('Param: ', param);

        return response;
    }

    this.svc_GetAllProvinsi = function () {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/GetAllProvince',
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_FilterProvinsi = function (provinsi) {
        var param = {
            'provinsi': provinsi
        }

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/FilterProvinsi',
            data: param,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_FilterKabupaten = function (provinsi, kabupaten) {
        var requestBody = {
            'provinsi': provinsi,
            'kabupaten': kabupaten
        };

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/FilterKabupaten',
            data: requestBody,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_FilterKecamatan = function (provinsi, kabupaten, kecamatan) {
        var requestBody = {
            'provinsi': provinsi,
            'kabupaten': kabupaten,
            'kecamatan': kecamatan
        };

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/FilterKecamatan',
            data: requestBody,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_FilterDesa = function (provinsi, kabupaten, kecamatan, desa) {
        var requestBody = {
            'provinsi': provinsi,
            'kabupaten': kabupaten,
            'kecamatan': kecamatan,
            'desa': desa
        };

        console.log('Request body: ', requestBody);

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/FilterDesa',
            data: requestBody,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetKabupatenByProvinsiName = function (provinsiName) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/ListKabupatenByProvinsiName/provinsiName/' + encodeURIComponent(provinsiName),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetKecamatanByKabupatenName = function (provinsiName, kabupatenName) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/GetAllKecamatan/provinsi/' + encodeURIComponent(provinsiName) + '/kabupaten/' + encodeURIComponent(kabupatenName),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetDesa = function (provinsiName, kabupatenName, kecamatanName) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.3:7290/E-LearningAPI/Address/GetAllDesa/provinsi/' + encodeURIComponent(provinsiName) + '/kabupaten/' + encodeURIComponent(kabupatenName) + '/kecamatan/' + encodeURIComponent(kecamatanName),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }
});

app.controller('ctrl', function ($scope, svc, sharedService) {
    //These are the variable declaration
    $scope.province = [];
    $scope.namaPengguna = "";
    $scope.noTelpPengguna = "";
    $scope.emailPengguna = "";
    $scope.selectedProvinsi = "";
    $scope.selectedKabupaten = "";
    $scope.selectedKecamatan = "";
    $scope.selectedDesa = "";
    $scope.test = "";
    //End region





    //These functions are for the purpose of filtering the field in each pop-up
    $scope.FilterProvinsi = function () {
        console.log("Test: ", $scope.test);
        var promise = svc.svc_FilterProvinsi($scope.test);
        promise.then(function (response) {
            var resp_data = response.data;
            console.log('Response data: ', resp_data);
            $scope.listProvinsi = [];
            for (i of resp_data.Provinsi) {
                $scope.listProvinsi.push(i.namaProvinsi);
            }
        });
    }
    $scope.FilterKabupaten = function () {
        var promise = svc.svc_FilterKabupaten($scope.selectedProvinsi, $scope.test);
        promise.then(function (response) {
            var resp_data = response.data;
            console.log('Response data: ', resp_data);
            $scope.listKabupaten = [];
            for (i of resp_data.Kabupaten) {
                $scope.listKabupaten.push(i.namaKabupaten);
            }
        });
    }
    $scope.FilterKecamatan = function () {
        var promise = svc.svc_FilterKecamatan($scope.selectedProvinsi, $scope.selectedKabupaten, $scope.test);
        promise.then(function (response) {
            var resp_data = response.data;
            console.log('Response data: ', resp_data);
            $scope.listKecamatan = [];
            for (i of resp_data.Kecamatan) {
                $scope.listKecamatan.push(i.namaKecamatan);
            }
        });
    }
    $scope.FilterDesa = function () {
        var promise = svc.svc_FilterDesa($scope.selectedProvinsi, $scope.selectedKabupaten, $scope.selectedKecamatan, $scope.test);
        promise.then(function (response) {
            var resp_data = response.data;
            console.log('Response Data: ', resp_data);
            $scope.listDesa = [];
            for (i of resp_data.Desa) {
                $scope.listDesa.push(i.namaDesa);
            }
        });
    }

    //End region





    //These functions are for showing each pop-up
    $scope.DisplayPopUpProvinsi = function () {
        var promise = svc.svc_FilterProvinsi('');
        promise.then(function (response) {
            var resp_data = response.data;
            $scope.listProvinsi = [];
            for (i of resp_data.Provinsi) {
                $scope.listProvinsi.push(i.namaProvinsi);
            }

            $("#popUp_Provinsi").css("display", "block");

            $scope.selectedKabupaten = "";
            $scope.selectedKecamatan = "";
            $scope.selectedDesa = "";
        });
    }
    $scope.DisplayPopUpKabupaten = function () {
        var promise = svc.svc_FilterKabupaten($scope.selectedProvinsi, '');
        promise.then(function (response) {
            var resp_data = response.data;
            $scope.listKabupaten = [];
            for (i of resp_data.Kabupaten) {
                $scope.listKabupaten.push(i.namaKabupaten);
            }
            $("#popUp_Kabupaten").css("display", "block");
            $scope.selectedKecamatan = "";
            $scope.selectedDesa = "";
        });

    }
    $scope.DisplayPopUpKecamatan = function () {
        var promise = svc.svc_FilterKecamatan($scope.selectedProvinsi, $scope.selectedKabupaten, '');
        promise.then(function (response) {
            var resp_data = response.data;
            if (resp_data.Success) {
                $scope.listKecamatan = [];
                for (i of resp_data.Kecamatan) {
                    $scope.listKecamatan.push(i.namaKecamatan);
                }
                $("#popUp_Kecamatan").css("display", "block");
                $scope.selectedDesa = "";
            }

            else {
                alert('Pilih kabupaten terlebih dahulu!');
            }

        });
    }
    $scope.DisplayPopUpDesa = function () {
        var promise = svc.svc_FilterDesa($scope.selectedProvinsi, $scope.selectedKabupaten, $scope.selectedKecamatan, '');
        promise.then(function (response) {
            var resp_data = response.data;
            if (resp_data.Success) {
                $scope.listDesa = [];
                for (i of resp_data.Desa) {
                    $scope.listDesa.push(i.namaDesa);
                }
                $("#popUp_Desa").css("display", "block");
            }
            else {
                alert('Pilih kecamatan terlebih dahulu!');
            }
        });

    }

    //End region





    //These functions are for closing each pop-up
    $scope.ClosePopUp_Provinsi = function () {
        $("#popUp_Provinsi").css("display", "none");
        $scope.test = "";
    }
    $scope.ClosePopUp_Kabupaten = function () {
        $("#popUp_Kabupaten").css("display", "none");
        $scope.test = "";
    }
    $scope.ClosePopUP_Kecamatan = function () {
        $("#popUp_Kecamatan").css("display", "none");
        $scope.test = "";
    }
    $scope.ClosePopUp_Desa = function () {
        $("#popUp_Desa").css("display", "none");
        $scope.test = "";
    }

    //End region





    //These functions are for inserting the selected value to the fields
    $scope.OnSelectedProvinsi = function (selectedProvinsi) {
        if (selectedProvinsi) {
            $scope.selectedProvinsi = selectedProvinsi;
            $('#popUp_Provinsi').css('display', 'none');
            $scope.test = "";
        }
    }
    $scope.OnSelectedKabupaten = function (selectedKabupaten) {
        if (selectedKabupaten) {
            $('#popUp_Kabupaten').css('display', 'none');
            $scope.selectedKabupaten = selectedKabupaten;
            $scope.test = "";
        }
    }
    $scope.OnSelectedKecamatan = function (selectedKecamatan) {
        if (selectedKecamatan) {
            $scope.selectedKecamatan = selectedKecamatan;
            $('#popUp_Kecamatan').css('display', 'none');
            $scope.test = "";

        }
    }
    $scope.OnSelectedDesa = function (selectedDesa) {
        if (selectedDesa) {
            $scope.selectedDesa = selectedDesa;
            $('#popUp_Desa').css('display', 'none');
            $scope.test = "";
        }
    }

    //End region





    //These are just some helping function
    $scope.AlertSelectedProvinsi = function (selectedProvinsi) {
        if (selectedProvinsi) {
            alert('Kamu memilih ' + selectedProvinsi);
            $scope.selectedProvinsi = selectedProvinsi;
            document.getElementById('popUp_Provinsi').style.display = 'none';
        }
    }
    $scope.GetAllProvinsiOnLoad = function () {
        var promise = svc.svc_GetAllProvinsi();
        console.log('Account ID: ', sharedService.getAccountID());
        promise.then(function (response) {
            var resp_data = response.data
            //console.log('Response data: ', resp_data);
            $scope.province = resp_data.Provinsi;
            console.log('List Provinsi: ', $scope.province);
            $scope.listProvinsi = [];

            for (i of $scope.province) {
                //console.log('Provinsi ke', i.id + ' adalah: ', i.namaProvinsi);
                $scope.listProvinsi.push(i.namaProvinsi);
            }

            //console.log('List nama provinsi: ', $scope.listProvinsi);
        });
    }

    //End region





    //This function is for updating profile
    $scope.SaveProfile = function () {
        var param = {
            'userData': {
                'nama': $scope.namaPengguna,
                'no_telp': $scope.noTelpPengguna,
                'provinsi': $scope.selectedProvinsi,
                'kabupaten': $scope.selectedKabupaten,
                'kecamatan': $scope.selectedKecamatan,
                'desa': $scope.selectedDesa,
                'email': $scope.emailPengguna
            },

            'token': sessionStorage.getItem('LoginToken')

        }

        //console.log('Param: ', param);
        var promise = svc.svc_InsertOrUpdateProfile(param.userData, param.token);
        promise.then(function (response) {
            var resp_data = response.data;
            if (resp_data.Success) {
                alert(resp_data.Message);
                location.href= '/Home';
            }

            else {
                alert(response.Message);
            }
        });
    }
    //End region




    //This function is to loading the profile data from database
    $scope.GetProfileOnLoad = function () {
        var token = sessionStorage.getItem('LoginToken');
        var promise = svc.svc_OnLoadGetProfile(token);
        promise.then(function (response) {
            var resp_data = response.data;
            if (resp_data.Success) {
                console.log('Response Data: ', resp_data);
                var accountDetail = resp_data.accountDetail;

                $scope.namaPengguna = accountDetail.nama;
                $scope.noTelpPengguna = accountDetail.no_telp;
                $scope.selectedProvinsi = accountDetail.provinsi;
                $scope.selectedKabupaten = accountDetail.kabupaten;
                $scope.selectedKecamatan = accountDetail.kecamatan;
                $scope.selectedDesa = accountDetail.desa;
                $scope.emailPengguna = accountDetail.email;
            }
        });
    }
    //End region





    //This calls the function to retrieve the provile data while the page is loading
    $scope.GetProfileOnLoad();
    //End region
   
});

