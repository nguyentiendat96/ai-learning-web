// Shared top navigation. Every page under lessons/ sits one level below the site root.
(function () {
  var links = [
    ['../index.html', 'Trang chủ'],
    ['../index.html#lo-trinh', 'Lộ trình'],
    ['ccao-f.html', 'CCAO-F'],
    ['ccdv-f.html', 'CCDV-F'],
    ['ccaf-architect.html', 'CCAR-F'],
    ['resources.html', 'Nguồn'],
  ];
  var current = location.pathname.split('/').pop();
  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  var html = '<div class="inner"><a class="brand" href="../index.html">Claude Learning</a>';
  links.forEach(function (l) {
    var isCurrent = l[0] === current;
    html += '<a href="' + l[0] + '"' + (isCurrent ? ' style="color:var(--accent)"' : '') + '>' + l[1] + '</a>';
  });
  html += '</div>';
  nav.innerHTML = html;
  document.body.insertBefore(nav, document.body.firstChild);
})();
