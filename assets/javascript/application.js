$(function() {
  shuntNavigation();
  fixNavWidths();
  generateContentAnchors();

  $(window).scroll(function() {
    showHideTopBtn()
  });	  

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
  $navlist.children('li').css('width',`${colWidth}%`);
}

function generateContentAnchors() {
  var $cov19Main = $('#cov19Main');
  var $cov19Sidebar = $('#cov19Sidebar');
  
  var $anchorList = $($.parseHTML('<ul class="list-group list-group-flush">'));

  if(!$('#cov19Main h2').length) { // if no h2's then exit
    return;
  }

  var ctr = 1;
  $cov19Main.find('h2').each(function() {
    var h2Text = $(this).text();
    var h2id = h2Text.replace(/[\W_]+/g,"");

    $(this).attr('id', h2id);

    var $link = $($.parseHTML('<a>'));
    $link.attr('href', `#${h2id}`);
    $link.text(h2Text);

    var $listItem = $($.parseHTML('<li class="list-group-item">'));
    $listItem.append($link);

    $anchorList.append($listItem);
    ctr++;
  })

  var $anchorBox = $($.parseHTML('<div class="card mb-4"><div class="card-body"><h5 class="card-title">Page Links</h5></div></div>'));
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