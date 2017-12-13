var fakeData = [
    {
        imgSrc: "image/1.jpg",
        h2Text: "早上好",
        h3Text: "Morning"
    },
    {
        imgSrc: "image/2.jpg",
        h2Text: "中午好",
        h3Text: "Noon"
    },
    {
        imgSrc: "image/3.jpg",
        h2Text: "早上好",
        h3Text: "Morning"
    },
    {
        imgSrc: "image/4.jpg",
        h2Text: "早上好",
        h3Text: "morning"
    },
    {
        imgSrc: "image/5.jpg",
        h2Text: "早上好",
        h3Text: "morning"
    },
    {
        imgSrc: "image/6.jpg",
        h2Text: "早上好",
        h3Text: "morning"
    },
    {
        imgSrc: "image/7.jpg",
        h2Text: "早上好",
        h3Text: "morning"
    }
];
// ID/Class 选择器
var _$ = function (selector) {
    if (selector.substr(0, 1) === '.') {
        return document.getElementsByClassName(selector.slice(1));
    } else if (selector.substr(0, 1) === '#') {
        return document.getElementById(selector.slice(1));
    }
};


window.onload = function () {
    initSliders();
    switchSlider(0);

    // 撑满DIV容器
    var pictureDelegate = _$(".picture")[0];
    pictureDelegate.onload = function () {
        var h = pictureDelegate.clientHeight + "px";
        _$("#template_main").style.height = h;

        var main_i_list = _$(".main-i");
        for (var i = 0; i < main_i_list.length; i++) {
            main_i_list[i].style.height = h;
        }
    };
};


function initSliders() {
    var tpl_main = '\
    <div class="main-i {{from_left_or_right}}" id="main_{{index}}">\
        <img src="{{imgSrc}}" class="picture">\
        <div class="caption">\
            <h2>{{h2Text}}</h2>\
            <h3>{{h3Text}}</h3>\
        </div>\
    </div>\
    '.trim();

    var tpl_ctrl = '\
    <a class="ctrl-i" href="javascript:switchSlider({{index}});" id="ctrl_{{index}}"><img src="{{imgSrc}}"></a>\
    '.trim();

    var i, _tpl_main, _tpl_ctrl;
    var out_main = [], out_ctrl = [];
    for (i in fakeData) {
        _tpl_main = tpl_main
            .replace(/{{index}}/g, i)
            .replace(/{{imgSrc}}/g, fakeData[i]['imgSrc'])
            .replace(/{{h2Text}}/g, fakeData[i]['h2Text'])
            .replace(/{{h3Text}}/g, fakeData[i]['h3Text'])
            .replace(/{{from_left_or_right}}/g, ['from_right', 'from_left'][i % 2]);
        out_main.push(_tpl_main);

        _tpl_ctrl = tpl_ctrl
            .replace(/{{index}}/g, i)
            .replace(/{{imgSrc}}/g, fakeData[i]['imgSrc']);
        out_ctrl.push(_tpl_ctrl);
    }
   // #main_bg
    _$("#template_main").innerHTML += tpl_main
        .replace(/{{index}}/g, 'bg')
        .replace(/{{imgSrc}}/g, fakeData[0]['imgSrc'])
        .replace(/{{h2Text}}/g, '')
        .replace(/{{h3Text}}/g, '')
        .replace(/{{from_left_or_right}}/g, '');


    _$("#template_main").innerHTML += out_main.join('');
    _$("#template_ctrl").innerHTML += out_ctrl.join('');
}


function switchSlider(index) {
    index = parseInt(index);
    if (!index) {
        index = 0;
    }
    var main = _$("#main_" + index);
    var ctrl = _$("#ctrl_" + index);

    // 激活标识, 先全清再添加
    var main_to_clear = _$(".main-i");
    var ctrl_to_clear = _$(".ctrl-i");
    var i;
    for (i = 0; i < main_to_clear.length; i++) {
        main_to_clear[i].className = main_to_clear[i].className.replace(" main-i_active", "");
    }

    for (i = 0; i < ctrl_to_clear.length; i++) {
        ctrl_to_clear[i].className = ctrl_to_clear[i].className.replace(" ctrl-i_active", "");
    }

    main.className += " main-i_active";
    ctrl.className += " ctrl-i_active";

    // 背景滞留效果
    setTimeout(function () {
        _$("#main_bg").innerHTML = main.innerHTML;
    }, 1000);
}