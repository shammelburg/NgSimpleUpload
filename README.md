# ng-simple-upload
A simple directive to for uploading files.

First add the directive to your project.

```js 
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
                    // callback function in the controller
                    scope.callbackFn(d);
                }).fail(function (x) {
                    console.log(x);
                });
            });
        }
    }
}]);
```

```js 
// The controller callback function
$scope.myCallback = function (valueFromDirective) {
    console.log(valueFromDirective);
};
```



The add the file[type=file] into your html page.
```html 
<input type="file" multiple ng-simple-upload web-api-url="/api/post" callback-fn="myCallback" />
```


**Example Web API**

```cs
public IHttpActionResult Post()
{
    var files = HttpContext.Current.Request.Files;

   for (int i = 0; i < files.Count; i++)
   {
       var file = files[i];
       // Your logic here
   }

    return Ok(String.Format("Successfully uploaded {0} files.", files.Count);
}
```
