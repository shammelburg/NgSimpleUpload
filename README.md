# ng-simple-upload
A tiny, simple directive to for uploading files.

First add the directive to your project.
```html
<script src="ng-simple-upload.js"></script>
```
Add the dependency to you angular module.
```js
angular.module('app', ['ngSimpleUpload']);
```



The add the input[type=file] into your html page.

This will trigger the file upload when you have selected your file(s).
```html 
<input type="file" multiple ng-simple-upload web-api-url="/api/post" callback-fn="myCallback" />
```


Alternatively, you can choose to upload manually by clicking a button.

Add ```button-id=""``` with the ID of the button.
```html
<input type="file" ng-simple-upload web-api-url="/api/post" callback-fn="myCallback" button-id="upload" />
<button id="upload">Upload</button>
```


This callback function is the HTTP 200 returned from your Web API.
```js 
// The controller callback function
$scope.myCallback = function (valueFromDirective) {
    console.log(valueFromDirective);
};
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

    return Ok(String.Format("Successfully uploaded {0} files.", files.Count));
}
```
