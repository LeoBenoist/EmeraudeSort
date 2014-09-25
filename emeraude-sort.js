/**
 * @author Léo Benoist
 * https://github.com/LeoBenoist/EmeraudeSort
 */

(function ($) {
    var Sorter = {};

    Sorter.construct = function () {
        Sorter.findSortBar();
    };

    Sorter.findSortBar = function () {
        $("button[data-em-sort='true']").each(function () {
            Sorter.sortToLife($(this));
        });
    };

    Sorter.sortToLife = function (inputSort) {
        if (
            !inputSort.data('em-sort-parent-sortable-selector') || !inputSort.data('em-sort-sortable-selector') || !$(inputSort.data('em-sort-parent-sortable-selector')).length || !$(inputSort.data('em-sort-sortable-selector')).length
            ) {
            console.log('Error one of the mandatory sort selector is not provided!');
            return;
        }

        inputSort.click(function () {
            Sorter.sort(inputSort, $(this))
        });
    };

    Sorter.sort = function (inputSort) {

        var children = $(inputSort.data('em-sort-parent-sortable-selector'));
        var parent = $(children.first().parent());

        children.sort(function (a, b) {
            return Sorter.sorter($(a), $(b), inputSort);
        }).appendTo(parent);
    };

    Sorter.sorter = function (a, b, inputSort) {

        var aa = a.find(inputSort.data('em-sort-sortable-selector'));
        var bb = b.find(inputSort.data('em-sort-sortable-selector'));

        if (aa.length && bb.length) {
            var sort = (aa.text() > bb.text());

            if (inputSort.data('em-sort-sortable-order') && inputSort.data('em-sort-sortable-order') == 'DESC') {
                return !sort;
            }

            return  sort;
        }

        return 0;
    };

    Sorter.construct();
})($);