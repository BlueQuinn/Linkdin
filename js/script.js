var app = angular.module("app", []);
var information = { profile: "", background: "" };

app.controller("ctrl-profile", function ($scope)
{
    information.profile = $scope;
});

app.controller("ctrl-background", function ($scope) {
    information.background = $scope;
});

function getProperties(obj)     // get list of property names
{
    var properties = [];
    for (var key in obj)
        properties.push(key);
    return properties;
}

function connect(src, dst, property)
{
    binding(src, dst[property], set);
}

function set(src, dst, property)
{
    dst[property] = src;
}

function binding(src, dst, action)
{
    var properties = getProperties(src);
    for (var i = 0; i < properties.length; ++i)
    {
        var property = properties[i];   // get each property name
        action(src[property], dst, property);
    }
}

app.controller("ctrl-root", function($scope, $http)
{
    $http.get('https://api.myjson.com/bins/16lg2').success(function (data)
    {
        binding(data, information, connect);
        //information = data;
    })
});

//app.controller("ctrl-skill", function ($scope) {
//    $scope["top-skill"] = information.skill["top-skill"];
//});