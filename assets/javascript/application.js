$(function() {
  shuntNavigation();
  fixNavWidths();
  generateContentAnchors();

  $(window).scroll(function() {
    showHideTopBtn()
  });	  

  shiftModalsUnderFooter();
  
  $('.modal-video').on('hidden.bs.modal', function() {
    stopAllVideos();
  });	
});

function shuntNavigation() {
  var $navlist = $('#cov19Nav ul').clone();
  $navlist.removeClass('d-table');
  $navlist.children('li').addClass('d-lg-none').removeClass('d-table-cell').removeClass('w-15');
  $('#globalNavbarNav ul').prepend($navlist);
}

function fixNavWidths() {
  var $navlist = $('#cov19Nav ul');
  var colWidth = 100.0 / $navlist.children('li').length;
  $navlist.children('li').css('width',colWidth+'%');
}

function generateContentAnchors() {
  var $cov19Main = $('#cov19Main');
  var $cov19Sidebar = $('#cov19Sidebar');
  
  var $anchorList = $($.parseHTML('<ul class="list-group list-group-flush">'));

  if(!$('#cov19Main h2').length) { // if no h2's then exit
    return;
  }

  // check if there's a comment anywhere in the body of the page that says "<!-- [DISABLE PAGE LINKS] -->"
  var mainContentBlock = jQuery('body').html();
  if (mainContentBlock.match(/<!-- \[[Dd][Ii][Ss][Aa][Bb][Ll][Ee] [Pp][Aa][Gg][Ee] [Ll][Ii][Nn][Kk][Ss]\] -->/g)) {
    return;
  }

  $cov19Main.find('h2').each(function() {
    var h2Text = $(this).text();
    var h2id = h2Text.replace(/[\W_]+/g,"");

    $(this).attr('id', h2id);

    var $link = $($.parseHTML('<a>'));
    $link.attr('href', '#' + h2id);
    $link.text(h2Text);

    var $listItem = $($.parseHTML('<li class="list-group-item">'));
    $listItem.append($link);

    $anchorList.append($listItem);
  })

  var $anchorBox = $($.parseHTML('<div class="card mb-4" id="cov19PageLinks"><div class="card-body"><h5 class="card-title">Page Links</h5></div></div>'));
  $anchorBox.append($anchorList);  
  
  var $anchorBoxSide = $anchorBox.clone();
  
  $anchorBox.addClass('d-lg-none');
  $cov19Main.prepend($anchorBox);

  $anchorBoxSide.addClass('d-none d-lg-block');
  $cov19Sidebar.prepend($anchorBoxSide);
}

function showHideTopBtn() {
  $topBtn = $('#topBtn');
  $topBtn.toggle($(window).scrollTop() > 100);
}

function stopAllVideos() {
  for (x = 0; x < Object.keys(videojs.players).length; x++) {
      var setPlayer = Object.keys(videojs.players)[x];
      videojs.getPlayer(setPlayer).pause();
    }
}

function shiftModalsUnderFooter() {
  $('.modal').each(function() {
    $(this).insertAfter($('footer'));
  });
}