// Shared top navigation. Every page under lessons/ sits one level below the site root.
// Labels follow the page language: VI or EN, switched by assets/lang.js.
(function () {
  var links = [
    { href: '../index.html', vi: 'Trang chủ', en: 'Home' },
    { href: 'ccao-f.html', vi: 'CCAO-F', en: 'CCAO-F' },
    { href: 'ccdv-f.html', vi: 'CCDV-F', en: 'CCDV-F' },
    { href: 'ccaf-architect.html', vi: 'CCA-F', en: 'CCA-F' },
    { href: 'ccarp.html', vi: 'CCAR-P', en: 'CCAR-P' },
    { href: 'exam.html', vi: 'Thi', en: 'Exam' },
    { href: 'resources.html', vi: 'Nguồn', en: 'Sources' }
  ];

  function lang() {
    return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'vi';
  }

  var current = location.pathname.split('/').pop();
  var nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.innerHTML = '<div class="inner"><a class="brand" href="../index.html">Claude Learning</a></div>';
  var inner = nav.querySelector('.inner');

  links.forEach(function (l) {
    var a = document.createElement('a');
    a.href = l.href;
    a.setAttribute('data-vi', l.vi);
    a.setAttribute('data-en', l.en);
    if (l.href === current) a.style.color = 'var(--accent)';
    inner.appendChild(a);
  });

  function render() {
    var k = lang();
    inner.querySelectorAll('a[data-vi]').forEach(function (a) {
      a.textContent = a.getAttribute('data-' + k);
    });
  }

  document.body.insertBefore(nav, document.body.firstChild);
  render();
  document.addEventListener('langchange', render);
})();
