angular.module('app').directive('ngSimpleUpload', [function () {
    return {
        scope: {
            webApiUrl: '@',
            callbackFn: '='
        },
        link: function (scope, element, attrs) {
            element.on('change', function (evt) {
                var files = evt.__files_ || (evt.target && evt.target.files);

                var fd = new FormData();
                angular.forEach(files, function (v, k) {
                    fd.append('file', files[k]);
                });

                return $.ajax({
                    type: 'POST',
                    url: scope.webApiUrl,
                    data: fd,
                    async: true,
                    cache: false,
                    contentType: false,
                    processData: false
                }).done(function (d) {
                    scope.callbackFn(d);
                }).fail(function (x) {
                    console.log(x);
                });
            });
        }
    }
}]);
