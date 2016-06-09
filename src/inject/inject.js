chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var trs = document.querySelectorAll('#current_events_block table.fullWidth tbody tr');
      [].forEach.call(trs, function(el) {
        var image = el.getElementsByTagName('img')[0];
        if (image.src.indexOf('status0.gif') > -1) {
          el.parentNode.removeChild(el);
          return;
        }

        if (image.src.indexOf('/images/status1.gif') > -1) {
          image.src = '/images/status2.gif';
        } else if (image.src.indexOf('/images/status2.gif') > -1) {
          image.src = '/images/status3.gif';
        }
      });
    }
  }, 10);
});
