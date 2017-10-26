var numAreas = 2;

setButtonMargins();
setElementWidths("textarea", numAreas);
setElementHeights("textarea");
setElementWidths("iframe", numAreas);
setElementHeights("iframe");

$("#HTML").val('<h1>Hello, <span id="name"></span>.</h1>\n<div class="square"></div>');

$("#CSS").val('h1 {\n  color:red;\n}\n\n.square {\n  background-color: yellow;\n  height: 100px;\n  width: 100px;\n}');

$("#JavaScript").val('document.getElementById("name").innerHTML = "world";');

$(window).resize(function() {
    setButtonMargins();
    setElementWidths("textarea", numAreas);
    setElementHeights("textarea");
    setElementWidths("iframe", numAreas);
    setElementHeights("iframe");
});

$(".Toggle").hover(function() {
    $(this).addClass("Focus");
}, function() {
    $(this).removeClass("Focus");
});

$(".Toggle").click(function() {
    $(this).toggleClass("Active");
    $(this).removeClass("Focus");
    var id = $(this).attr("id");
    if (id == "HTMLButton") {
        $("#HTML").toggleClass("Hidden");
    } else if (id == "CSSButton") {
        $("#CSS").toggleClass("Hidden");
    } else if (id == "JavaScriptButton") {
        $("#JavaScript").toggleClass("Hidden");
    } else if (id == "OutputButton") {
        $("#Output").toggleClass("Hidden");
    }
    numAreas = 4 - $(".Hidden").length;
    setElementWidths("textarea", numAreas);
    setElementWidths("iframe", numAreas);
});

outputHTML();
document.getElementById("Output").contentWindow.eval($("#JavaScript").val());
$("#HTML").on("change keyup paste", function() {
    outputHTML();
    document.getElementById("Output").contentWindow.eval($("#JavaScript").val());
});
$("#CSS").on("change keyup paste", function() {
    outputHTML();
    document.getElementById("Output").contentWindow.eval($("#JavaScript").val());
});
$("#JavaScript").on("change keyup paste", function() {
    document.getElementById("Output").contentWindow.eval($("#JavaScript").val());
});

function setButtonMargins() {
    $("#Buttons").css("margin-left", $(window).width() / 2 - 148);
}

function setElementWidths(target, numAreas) {
    $(target).width(
        $(window).width() / numAreas - 20
    );
}

function setElementHeights(target) {
    $(target).height(
        $(window).height() - $("header").height() - $("footer").height() - 41
    );
}

function outputHTML() {
    $("#Output").contents().find("html").html("<html><head><style type='text/css'>"+"*{color: green}"+$("#CSS").val()+"</style></head><body>"+$("#HTML").val()+"</body></html>");
}