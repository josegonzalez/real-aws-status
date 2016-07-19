chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var trs = document.querySelectorAll('#current_events_block table.fullWidth tbody tr');
      [].forEach.call(trs, function(el) {
        var image = el.getElementsByTagName('img')[0];
        if (image.src.indexOf('status0.gif') > -1) {
          var text = el.innerText || el.textContent;
          if (text.toLowerCase().indexOf('service is operating normally') > -1) {
            el.style.display = 'none';
            return;
          }

          image.src = '/images/status1.gif';
          return;
        }

        if (image.src.indexOf('/images/status1.gif') > -1) {
          image.src = '/images/status2.gif';
        } else if (image.src.indexOf('/images/status2.gif') > -1) {
          image.src = '/images/status3.gif';
        }
      });

      var tds = document.querySelectorAll('body > div > div .pad8.bordered:not(.gradient):not(.whitebg) td');
      var iteration = 0;
      var messages = {
        0: 'Service is operating normally',
        1: 'Everything is fucked',
        2: 'We finally concede<br />everything is fucked',
        3: 'Nuclear armageddon<br />wiped out all life on Earth',
      };
      [].forEach.call(tds, function(el) {
        var image = el.getElementsByTagName('img');
        if (image.length > 0) {
          if (iteration == 1) {
            image[0].src ='/images/status1.gif';
          }
          if (iteration == 2) {
            image[0].src ='/images/status2.gif';
          }
          if (iteration == 3) {
            image[0].src ='/images/status3.gif';
          }
          return;
        }
        el.innerHTML = messages[iteration];
        iteration++;
      });
    }
  }, 10);
});
