$('p').addClass('animated rollIn');


var app = angular.module("app", []);
var information = { profile: "", background: "" };
var imgModal, editor;

app.controller("ctrl-img", function ($scope)
{
    imgModal = $scope;
});

app.controller("ctrl-editor", function ($scope) {
    editor = $scope;
    editor.src = "";
    editor.content = "";
    editor.obj = "";
    editor.property = "";

    editor.loaded = function ()
    {
        $('input[name="daterange"]').daterangepicker({
            locale: {
                format: 'MMMM D, YYYY'
            }
        });
       
        $("#birthday").datepicker({
            dateFormat: "dd/mm/yy"
        });

        $('[data-toggle="popover"]').popover();

        $(".browse").change(function ()
        {
            var img = URL.createObjectURL(event.target.files[0]);
            editor.content.avatar = img;
            editor.$apply();   // reload ng-src
        });

        $(".browse-multiple").change(function ()
        {
            var imgList = $(".browse-multiple")[0].files;
            for (var i = 0; i < imgList.length; ++i)
            {
                var img = URL.createObjectURL(imgList[i]);
                editor.content.image.push(img);
            }
            editor.$apply();   // reload ng-src
        });
    }

    editor.browseImage = function ()
    {
        $(".browse").click();
    }

    editor.removeSkill = function (type, index)
    {
        editor.content.skill[type].splice(index, 1);
    }

    editor.openItem = function (index)
    {
        var obj = editor.obj;
        editor.src = obj + ".html";
        editor.content = information.background[obj][index];
        $(".modal-dialog").width(800);
    }

    editor.removeImg = function (index)
    {
        editor.content.image.splice(index, 1);
    }

    editor.browseMultiple = function ()
    {
        $(".browse-multiple").click();
    }

    editor.removeItem = function (index)
    {
        information.background[editor.obj].splice(index, 1);
        editor.content = getList(editor.obj, editor.property);
    }

    editor.addItem = function ()
    {
        var item = { image: "" };
        var obj = editor.obj;
        var properties = getProperties(information.background[obj][0]);
        for (var i = 0; i < properties.length; ++i)
            item[properties[i]] = "";
        item.image = [];
        information.background[obj].push(item);

        editor.src = obj + ".html";
        editor.content = information.background[obj][information.background[obj].length - 1];
        $(".modal-dialog").width(800);
    }



});

app.controller("ctrl-profile", function ($scope)
{
    information.profile = $scope;
});

app.controller("ctrl-background", function ($scope)
{
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
    $http.get('https://api.myjson.com/bins/160uo').success(function (data)
    {
        binding(data, information, connect);
    })

    $scope.enlarge = function (src)
    {
        imgModal.imgSrc = src;
    }

    $scope.openEditor = function (include, id)
    {
        editor.src = include + ".html";
        switch (id)
        {
            case 1:
                editor.content = information.profile;
                break;
            case 2:
                editor.content = information.background;
                break;
        }
        $(".modal-dialog").width(600);
    }

    $scope.openList = function (obj, property)
    {
        editor.src = "list.html";
        editor.obj = obj;
        editor.property = property;
        editor.content = getList(obj, property);
        $(".modal-dialog").width(400);
    }
});


function getList(obj, property)
{
    var arr = [];
    var size = information.background[obj].length;
    for (var i=0;i<size; ++i)
    {
        arr.push(information.background[obj][i][property]);
    }
    return arr;
}

$('.img-wrap .browse').on('click', function () {
    var id = $(this).closest('.img-wrap').find('img').data('id');
    alert('remove picture: ' + id);
});