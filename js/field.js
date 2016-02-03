MatchesApp.consts.elementSelector = '.match';
MatchesApp.field = {
    create : function (data, fieldWidth) {
        var field = FieldTypes[data.type];
        if (!field) return { success : false, error : "bad field type" };

        return { success : true, element : field.create(data.field, fieldWidth) };
    }
};

var Formula = {
    create : function (field, width) {
        var _this = this;
        var digits = this.parse(field);
        var $result = $('<div></div>').addClass('task');

        digits.forEach(function (digit) {
            $result.append(_this[digit.type](digit.value));
        });

        return $result;
    },

    parse : function (field) {
        return field.split('')
            .filter(function (digit) {
                return digit == '+' || digit == '-' || digit == '/' || digit == '*' || digit == '=' ||
                    digit >= 0 && digit <= 9
            }).map(function (digit) {
                return {
                    type : (digit >= 0 && digit <= 9 ) ? 'digit' : 'operation',
                    value : digit
                }
            })
    },

    digit : function (value) {
        var $result = $('<div></div>').addClass('formula_part digit');
        for (var i = 0; i < 7; i++) {
            var $part = $('<div></div>').addClass('element digit-' + (i + 1));
            if (DIGITS[value][i]) $part.addClass('active');
            $result.append($part);
        }

        return $result;
    },

    operation : function (value) {
        var $result = $('<div></div>').addClass('formula_part operation operation_' + SYMBOLS[value].type);
        SYMBOLS[value].value.forEach(function (symbol) {
            var $part = $('<div></div>').addClass('element');

            if (symbol == 2) $part.addClass('const');
            if (symbol == 1) $part.addClass('active');

            $result.append($part);
        });

        return $result;
    }
};

var FieldTypes = {
    formula : Formula
};

var DIGITS = {
    0 : [ 1, 1, 1, 1, 1, 1, 0],
    1 : [ 0, 1, 1, 0, 0, 0, 0],
    2 : [ 1, 1, 0, 1, 1, 0, 1],
    3 : [ 1, 1, 1, 1, 0, 0, 1],
    4 : [ 0, 1, 1, 0, 0, 1, 1],
    5 : [ 1, 0, 1, 1, 0, 1, 1],
    6 : [ 1, 0, 1, 1, 1, 1, 1],
    7 : [ 1, 1, 1, 0, 0, 0, 0],
    8 : [ 1, 1, 1, 1, 1, 1, 1],
    9 : [ 1, 1, 1, 1, 0, 1, 1]
};

var SYMBOLS = {
    '=' : { type : 'equal', value : [ 2, 2 ] },
    '+' : { type : 'plus', value : [ 2, 1 ] },
    '-' : { type : 'plus', value : [ 2, 0 ] },
    '*' : { type : 'multi', value : [ 2, 1 ] },
    '/' : { type : 'multi', value : [ 2, 0 ] }
}