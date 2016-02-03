(function (data, selector) {
    var $container = $(selector);
    var field = MatchesApp.field.create(data);

    if (field.success) {
        $container.append(field.element);
    } else {
        $container.append('<div>' + field.error + '</div>')
    }

    MatchesApp.moves.listen($container);
})({
    "type"          : "formula",
    "field"         : "5+3/7=2*4-0",
    "movesType"     : "add",
    "movesCount"    : 2
}, '.container');