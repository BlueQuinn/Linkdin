var thisButton,
  thisMenuItem,
  thisSubmenuItem,
  pieMenu = $('.radialnav'),
  menuItems = $('.menu > .item > a'),
  submenu = $('.submenu'),
  submenuItems = $('.submenu > .item > a'),
  submenuId = 0;

function toggleMenu(thisButton) {
    if (!thisButton.hasClass('active'))
        thisButton.addClass('active');
    else
        $('.radialnav, .submenu').removeClass('active');
}

/* On click of the ellipsis */
$('.ellipsis').click(function (event) {
    event.preventDefault();

    toggleMenu($('.radialnav'));
});

menuItems.each(function (index) {
    thisMenuItem = $(this);
    thisMenuItem.hover(function () {
        // console.log(index);

        submenuId = index;
        menuItems.eq(index).parent().find('.submenu').addClass('active');
    }, function () {
        $('.submenu').removeClass('active');
    });
});

submenuItems.each(function (index) {
    thisSubmenuItem = $(this);

    thisSubmenuItem.hover(function () {
        menuItems.eq(submenuId).parent().find('.submenu').addClass('active');
    }, function () {

    });
})