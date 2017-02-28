var css = "#current_events_block table.fullWidth tbody tr { display:none }",
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

head.appendChild(style);

chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === 'complete') {
      clearInterval(readyStateCheckInterval);

      var tables = document.querySelectorAll('#current_events_block table.fullWidth tbody');
      for (let table of tables) {
        var allClear = true;
        var trs = table.querySelectorAll('tr');

        for (let tr of trs) {
          var image = tr.getElementsByTagName('img')[0];
          if (image.src.indexOf('status0.gif') > -1) {
            var textEl = tr.querySelectorAll('td:nth-of-type(3)')[0],
                text = textEl.innerText || textEl.textContent;
            if (text.toLowerCase().indexOf('service is operating normally') == 0) {
              tr.parentNode.removeChild(tr);
              continue;
            }
          }

          tr.style.display = 'table-row';
          if (image.src.indexOf('/images/status0.gif') > -1) {
            tr.parentNode.removeChild(tr);
          } else if (image.src.indexOf('/images/status1.gif') > -1) {
            image.src = '/images/status2.gif';
          } else if (image.src.indexOf('/images/status2.gif') > -1) {
            image.src = '/images/status3.gif';
          } else {
            image.src = '/images/status1.gif';
          }
          allClear = false;
        }

        if (allClear) {
          var extra = [
            '<tr style="display: table-row">',
              '<td class="bb top pad04 center" style="width: 32px"><img src="/images/status0.gif"></td>',
              '<td class="bb top pad8">Amazon AWS</td>',
              '<td class="bb pad8">Service is (probably) operating normally</td>',
              '<td class="bb center top"><a href="/rss/apigateway-us-east-1.rss"><img style="margin-top: 8px" src="/images/feed-icon-14x14.png"></a></td>',
            '</tr>',
          ].join(' ');

          table.innerHTML = table.innerHTML + extra;
        }
      }
      var tds = document.querySelectorAll('body > div > div .pad8.bordered:not(.gradient):not(.whitebg) td')
      var iteration = 0;
      var messages = {
        1: 'Service is operating normally',
        2: 'Everything is fucked',
        3: 'We finally concede<br />everything is fucked',
        4: 'Nuclear armageddon<br />wiped out all life on Earth',
      };
      var i = 0;
      for (let tr of tds) {
        var image = tr.getElementsByTagName('img');
        i++
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
          iteration++;
          continue;
        }
        if (i % 2 == 0) {
          tr.innerHTML = messages[iteration];
        }
      }
    }
  }, 10);
});
