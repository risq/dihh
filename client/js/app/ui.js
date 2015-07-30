var $ = require('jquery'),
  store = require('store'),
  EventEmitter = require('events').EventEmitter;

var Comments = require('./comments'),
  Crates = require('./crates');

var $cratedigger,
  $rightColumn,
  $pageNumber,
  $about,
  $bottomBar,
  $buttonPrev,
  $buttonShow,
  $buttonNext,
  $buttonPrevPage,
  $buttonNextPage,
  $buttonListen,
  $trackArtist,
  $trackTitle,
  $trackYear,
  $trackLabel,
  $trackDescription,
  $trackLinks,
  $buttonPrevTrack,
  $buttonNextTrack,
  $buttonAutoplay,
  $buttonTrackPanelToggle,
  $infoPanelTitle,
  $infoPanelArtist,
  $infoPanelCover,

  curentTrackId,
  pagesCount,
  autoplay = store.get('autoplay') === undefined ? true : store.get('autoplay'),

  emitter = new EventEmitter();

function init() {
  $cratedigger = $('#cratedigger');
  $rightColumn = $('.right-column');
  $pageNumber = $('.page-number');

  $about = $('.about');

  $bottomBar = $('#bottom-bar');
  $buttonPrev = $bottomBar.find('.bottom-bar-prev-button');
  $buttonShow = $bottomBar.find('.bottom-bar-mid-button');
  $buttonNext = $bottomBar.find('.bottom-bar-next-button');

  $buttonPrevPage = $('.button-prev-page');
  $buttonNextPage = $('.button-next-page');

  $buttonListen = $('.info-listen-button');
  $infoPanelTitle = $('.info-artist');
  $infoPanelArtist = $('.info-title');
  $infoPanelCover = $('.info-cover');

  $trackArtist = $('.track .track-artist');
  $trackTitle = $('.track .track-title');
  $trackYear = $('.track .track-year');
  $trackLabel = $('.track .track-label');
  $trackDescription = $('.track .track-description');
  $trackLinks = $('.track .track-links');

  $buttonPrevTrack = $('.button-prev-track');
  $buttonNextTrack = $('.button-next-track');

  $buttonAutoplay = $('.button-autoplay');
  $buttonTrackPanelToggle = $('.track-panel-toggle-button');

  $cratedigger.on('click', onCratediggerClick);

  $buttonPrev.on('click', onButtonPrevClick);
  $buttonShow.on('click', onButtonShowClick);
  $buttonNext.on('click', onButtonNextClick);

  $buttonListen.on('click', onButtonListenClick);
  $buttonPrevPage.on('click', onButtonPrevPageClick);
  $buttonNextPage.on('click', onButtonNextPageClick);
  $buttonPrevTrack.on('click', onButtonPrevTrackClick);
  $buttonNextTrack.on('click', onButtonNextTrackClick);
  $buttonAutoplay.on('click', onButtonAutoplayClick);

  $buttonTrackPanelToggle.on('click', onButtonTrackPanelToggleClick);

  pagesCount = getPagesCount();

  updateAutoplay();
}

function updateTrackView(dig) {
  if (curentTrackId !== dig._id) {
    hideAbout();
    showTrackPanel();

    var trackArtists = dig.artists.join(', ');
    var trackFullTitle = trackArtists + ' - ' + dig.title;

    curentTrackId = dig._id;

    $trackArtist.text(trackArtists);
    $trackTitle.text(dig.title);
    $trackYear.text(dig.year);
    $trackLabel.text(dig.label || '');
    $trackDescription.text(dig.description || '');

    $trackLinks.empty();

    for (var link in dig.links) {
      if (dig.links.hasOwnProperty(link)) {
        $trackLinks.append('<a href="' + dig.links[link] + '" class="button button-black button-small" target="_blank">' + link + '</a>');
      }
    }

    Comments.loadCommentsForTrack(dig, trackFullTitle);
  }
}

function fillInfoPanel(record) {
  $infoPanelTitle.text(record.title || '');
  $infoPanelArtist.text(record.artist || '');
  $infoPanelCover.css({
    backgroundImage: record.cover ? 'url(' + record.cover + ')' : 'none'
  });
};

function hideBottomBar() {
  $bottomBar.addClass('closed');
}

function showBottomBar() {
  $bottomBar.removeClass('closed');
}

function onCratediggerClick() {
  hideTrackPanel();
}

function onButtonPrevPageClick() {
  hideTrackPanel();
  emitter.emit('page:prev');
  return false;
}

function onButtonNextPageClick() {
  hideTrackPanel();
  emitter.emit('page:next');
  return false;
}

function onButtonListenClick() {
  hideTrackPanel();
  emitter.emit('dig:listen');
  return false;
}

function onButtonPrevTrackClick() {
  emitter.emit('track:prev');
  return false;
}

function onButtonNextTrackClick() {
  emitter.emit('track:next');
  return false;
}

function onButtonAutoplayClick() {
  autoplay = !autoplay;
  store.set('autoplay', autoplay);
  updateAutoplay();
  return false;
}

function onButtonTrackPanelToggleClick() {
  $rightColumn.toggleClass('hidden');
}

function onButtonPrevClick() {
  hideTrackPanel();
  Crates.selectPrevRecord();
  return false;
}

function onButtonShowClick() {
  hideTrackPanel();
  Crates.showRecord();
  return false;
}

function onButtonNextClick() {
  hideTrackPanel();
  Crates.selectNextRecord();
  return false;
}


function hideTrackPanel() {
  $rightColumn.addClass('hidden');
}

function showTrackPanel() {
  $rightColumn.removeClass('hidden');
}

function updateAutoplay() {
  $buttonAutoplay.text('Autoplay ' + (autoplay ? 'On' : 'Off'));
}

function onPageChange(pageId) {
  $cratedigger.attr('data-cratedigger-page', pageId);
  $pageNumber.text(pageId);
  $buttonPrevPage.show();
  $buttonNextPage.show();

  if (pageId === 1) {
    $buttonPrevPage.hide();
  }

  if (pageId === pagesCount) {
    $buttonNextPage.hide();
  }
}

function updateTitle(dig, page) {
  var title = 'Digging Into Hip Hop';

  if (dig) {
    title = dig.artist + ' - ' + dig.title + ' | ' + title;
  }

  if (page && page > 1) {
    title = title + ' -¨Page ' + page;
  }

  document.title = title;
}

function hideAbout() {
  $about.addClass('hidden');
}

function showAbout() {
  $about.removeClass('hidden');
}

function getCurrentPageId() {
  return parseInt($cratedigger.attr('data-cratedigger-page'));
}

function getPagesCount() {
  return parseInt($cratedigger.attr('data-cratedigger-pages-count'));
}

function getCurrentDigId() {
  return $cratedigger.attr('data-cratedigger-record') || null;
}

function getAutoplay() {
  return autoplay;
}

module.exports = {
  init: init,
  updateTrackView: updateTrackView,
  fillInfoPanel: fillInfoPanel,
  hideBottomBar: hideBottomBar,
  showBottomBar: showBottomBar,
  onPageChange: onPageChange,
  updateTitle: updateTitle,
  hideAbout: hideAbout,
  showAbout: showAbout,
  hideTrackPanel: hideTrackPanel,
  showTrackPanel: showTrackPanel,
  getCurrentPageId: getCurrentPageId,
  getPagesCount: getPagesCount,
  getCurrentDigId: getCurrentDigId,
  getAutoplay: getAutoplay,
  on: emitter.on.bind(emitter)
};
