angular.module('app').directive('ngSimpleUpload', [function () {
    return {
        scope: {
            webApiUrl: '@',
            callbackFn: '=',
            buttonId: '@'
        },
        link: function (scope, element, attrs) {
            // if button id value exists
            if (scope.buttonId) {
                $('#' + scope.buttonId).on('click', function () {
                    // retrieves files from file input
                    var files = element[0].files;
                    // will not fire until file(s) are selected
                    if (files.length == 0) {
                        console.log('No files detected.');
                        return false;
                    }

                    Upload(files);
                });
            }
            else {
                // original code, trigger upload on change
                element.on('change', function (evt) {
                    var files = evt.__files_ || (evt.target && evt.target.files);

                    Upload(files);
                });
            }

            function Upload(files) {
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
                    // callback function in the controller
                    scope.callbackFn(d);
                }).fail(function (x) {
                    console.log(x);
                });
            }
        }
    }
}]);
