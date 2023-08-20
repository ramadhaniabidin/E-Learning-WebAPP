﻿/*var app = angular.module('app', ['angular.filter']);*/

app.service('svc', function ($http) {
    this.svc_InsertOrUpdateProfile = function (accountDetail, token) {
        var param = {
            'accountDetail': accountDetail,
            'token': token
        };

        var response = $http({
            method: 'POST',
            url: 'https://192.168.1.2:7290/E-LearningAPI/Account/InsertOrUpdateProfile/token/' + encodeURIComponent(token),
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
            url: 'https://192.168.1.2:7290/E-LearningAPI/Address/GetAllProvince',
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetKabupatenByProvinsiName = function (provinsiName) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.2:7290/E-LearningAPI/Address/ListKabupatenByProvinsiName/provinsiName/' + encodeURIComponent(provinsiName),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetKecamatanByKabupatenName = function (provinsiName, kabupatenName) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.2:7290/E-LearningAPI/Address/GetAllKecamatan/provinsi/' + encodeURIComponent(provinsiName) + '/kabupaten/' + encodeURIComponent(kabupatenName),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }

    this.svc_GetDesa = function (provinsiName, kabupatenName, kecamatanName) {
        var response = $http({
            method: 'GET',
            url: 'https://192.168.1.2:7290/E-LearningAPI/Address/GetAllDesa/provinsi/' + encodeURIComponent(provinsiName) + '/kabupaten/' + encodeURIComponent(kabupatenName) + '/kecamatan/' + encodeURIComponent(kecamatanName),
            data: {},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json'
        });

        return response;
    }
});

app.controller('ctrl', function ($scope, svc, sharedService) {
    $scope.province = [];
    $scope.namaPengguna;
    $scope.noTelpPengguna;
    $scope.emailPengguna;
    $scope.selectedProvinsi;
    $scope.selectedKabupaten;
    $scope.selectedKecamatan;
    $scope.selectedDesa;



    $scope.GetAllProvinsiOnLoad = function () {
        var promise = svc.svc_GetAllProvinsi();
        console.log('Account ID: ', sharedService.getAccountID());
        promise.then(function (response) {
            var resp_data = response.data
            console.log('Response data: ', resp_data);
            $scope.province = resp_data.Provinsi;
            console.log('List Provinsi: ', $scope.province);
            $scope.listProvinsi = [];

            for (i of $scope.province) {
                console.log('Provinsi ke', i.id + ' adalah: ', i.namaProvinsi);
                $scope.listProvinsi.push(i.namaProvinsi);
            }

            console.log('List nama provinsi: ', $scope.listProvinsi);
        });
    }

    $scope.AlertSelectedProvinsi = function (selectedProvinsi) {
        if (selectedProvinsi) {
            alert('Kamu memilih ' + selectedProvinsi);
        }
    }

    $scope.OnSelectedProvinsi = function (selectedProvinsi) {
        if (selectedProvinsi) {
            var promise = svc.svc_GetKabupatenByProvinsiName(selectedProvinsi);
            promise.then(function (response) {
                var resp_data = response.data;
                $scope.listKabupaten = [];
                for (i of resp_data.kabupaten) {
                    $scope.listKabupaten.push(i.namaKabupaten);
                }

                console.log('List Kabupaten: ', $scope.listKabupaten);
            })
        }
    }

    $scope.OnSelectedKabupaten = function (selectedProvinsi, selectedKabupaten) {
        if (selectedProvinsi && selectedKabupaten) {
            var promise = svc.svc_GetKecamatanByKabupatenName(selectedProvinsi, selectedKabupaten);
            promise.then(function (response) {
                var resp_data = response.data;
                $scope.listKecamatan = [];
                for (i of resp_data.kecamatan) {
                    $scope.listKecamatan.push(i.namaKecamatan);
                }

                console.log('List Kecamatan: ', $scope.listKecamatan);
            });
        }
    }

    $scope.OnSelectedKecamatan = function (selectedProvinsi, selectedKabupaten, selectedKecamatan) {
        if (selectedProvinsi && selectedKabupaten && selectedKecamatan) {
            var promise = svc.svc_GetDesa(selectedProvinsi, selectedKabupaten, selectedKecamatan);
            promise.then(function (response) {
                var resp_data = response.data;
                $scope.listDesa = [];
                for (i of resp_data.desa) {
                    $scope.listDesa.push(i.namaDesa);
                }

                console.log('List Desa: ', $scope.listDesa);
            });
        }
    }

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
            }

            else {
                alert(response.Message);
            }
        });
    }

    $scope.GetAllProvinsiOnLoad();
    
});
