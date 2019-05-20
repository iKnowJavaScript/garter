var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen({
  smartCSR: true
});

screen.title = 'my window title';

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'magenta',
    border: {
      fg: '#f0f0f0'
    },
    hover: {
      bg: 'green'
    }
  }
});

// Append our box to the screen.
screen.append(box);

// Add a png icon to the box
var icon = blessed.image({
  parent: box,
  top: 0,
  left: 0,
  type: 'overlay',
  width: 'shrink',
  height: 'shrink',
  file: __dirname + './img/img.jpg',
  search: false
});
screen.append(icon);

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
  screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', function(ch, key) {
  box.setContent(
    '{right}Even different {black-fg}content{/black-fg}.{/right}\n'
  );
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();

(function(r, s) {
  'use strict';
  function c(e, t, n, i) {
    ga('send', 'event', e, t, n, i);
  }
  r.onerror = function(e, t, n) {
    if (e) {
      c('Error', e, t && n ? '[' + t + ':' + n + ']' : '', true);
    }
    return false;
  };
  r.requestAnimationFrame =
    r.requestAnimationFrame ||
    r.webkitRequestAnimationFrame ||
    r.mozRequestAnimationFrame ||
    r.msRequestAnimationFrame ||
    function(e) {
      return setTimeout(e, 1e3 / 60);
    };
  r.cancelAnimationFrame =
    r.cancelAnimationFrame ||
    r.webkitCancelAnimationFrame ||
    r.mozCancelAnimationFrame ||
    r.msCancelAnimationFrame ||
    function(e) {
      clearTimeout(e);
    };
  r.AudioContext = r.AudioContext || r.webkitAudioContext;
  var e = false;
  try {
    var t = Object.defineProperty({}, 'passive', {
      get: function() {
        e = true;
      }
    });
    r.addEventListener('_', null, t);
    r.removeEventListener('_', null, t);
  } catch (e) {}
  var n = (function(e) {
    try {
      var t = '_';
      e.setItem(t, t);
      e.removeItem(t);
      return true;
    } catch (e) {
      return false;
    }
  })(r.localStorage);
  if (
    r.location !== r.top.location ||
    (r.location.href &&
      !r.location.href.match(/https:\/\/playsnake\.org|neave\.local|192\.168/))
  ) {
    top.location.href = 'https://playsnake.org/';
  }
  (function(e, t, n, i, s, a, o) {
    e['GoogleAnalyticsObject'] = s;
    (e[s] =
      e[s] ||
      function() {
        (e[s].q = e[s].q || []).push(arguments);
      }),
      (e[s].l = 1 * new Date());
    (a = t.createElement(n)), (o = t.getElementsByTagName(n)[0]);
    a.async = 1;
    a.src = i;
    o.parentNode.insertBefore(a, o);
  })(r, s, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  var i = s.getElementById('consent');
  var a = !!i;
  var o = 'UA-56095-11';
  r['ga-disable-' + o] = a;
  ga('set', 'anonymizeIp', true);
  ga('create', o, 'auto');
  function l() {
    (r.adsbygoogle || []).pauseAdRequests = 0;
    r['ga-disable-' + o] = false;
    ga('send', 'pageview');
    if (a) {
      s.body.classList.add('cookies-consent');
    }
  }
  function u() {
    if (!a || (n && localStorage.getItem('consent'))) {
      l();
    } else {
      i.addEventListener('click', function() {
        l();
        if (n) {
          localStorage.setItem('consent', true);
        }
      });
    }
  }
  function f(e, t) {
    this.x = e;
    this.y = t;
  }
  function h() {
    this.direction = p.DOWN;
    this.nextDirection = p.DOWN;
    this.cells = [];
    this.reset();
  }
  h.prototype.reset = function() {
    this.direction = p.DOWN;
    this.nextDirection = p.DOWN;
    this.cells = [new f(10, 2), new f(10, 1), new f(10, 0)];
  };
  h.prototype.containsCell = function(e, t) {
    for (var n = this.cells.length; n--; ) {
      var i = this.cells[n];
      if (i.x === e && i.y === t) {
        return true;
      }
    }
    return false;
  };
  h.prototype.render = function(e) {
    for (var t = w.cells.length; t--; ) {
      var n = w.cells[t];
      if (n.x >= 0 && n.x < C.width && n.y >= 0 && n.y < C.height) {
        var i = P[n.x][n.y];
        if (e) {
          i.classList.add('snake');
        } else {
          i.classList.remove('snake');
        }
      }
    }
  };
  h.prototype.move = function() {
    for (var e = this.cells.length - 1; e > 0; e--) {
      this.cells[e].x = this.cells[e - 1].x;
      this.cells[e].y = this.cells[e - 1].y;
    }
    switch (this.nextDirection) {
      case p.LEFT:
        this.cells[0].x--;
        break;
      case p.RIGHT:
        this.cells[0].x++;
        break;
      case p.UP:
        this.cells[0].y--;
        break;
      case p.DOWN:
        this.cells[0].y++;
        break;
    }
    this.direction = this.nextDirection;
    if (
      this.cells[0].x < 0 ||
      this.cells[0].x >= C.width ||
      this.cells[0].y < 0 ||
      this.cells[0].y >= C.height
    ) {
      z();
      return;
    }
    for (var t = 1; t < this.cells.length; t++) {
      if (
        this.cells[0].x === this.cells[t].x &&
        this.cells[0].y === this.cells[t].y
      ) {
        z();
        return;
      }
    }
    if (this.cells[0].x === D.x && this.cells[0].y === D.y) {
      var n = this.cells.length - 1;
      this.cells.push(new f(this.cells[n].x, this.cells[n].y));
      k[O].score += D.score;
      B();
      v('high');
      D.eat();
      D.generate();
    } else if (D.score > 5) {
      D.score -= 5;
    }
  };
  function d() {
    this.x = 0;
    this.y = 0;
    this.score = 0;
  }
  d.prototype.eat = function() {
    P[this.x][this.y].classList.remove('food');
  };
  d.prototype.generate = function() {
    if (w.cells.length < C.width * C.height - 1) {
      var e, t;
      do {
        e = Math.floor(Math.random() * C.width);
        t = Math.floor(Math.random() * C.height);
      } while (w.containsCell(e, t));
      P[e][t].classList.add('food');
      this.x = e;
      this.y = t;
      this.score = 100;
    }
  };
  function m(e, t) {
    this.name = e;
    this.speed = t;
    this.score = 0;
  }
  m.prototype.getBestScore = function() {
    if (n) {
      return parseInt(localStorage.getItem('score' + O), 10) || 0;
    }
    return 0;
  };
  function g(t) {
    var e = new XMLHttpRequest();
    e.open('GET', '/assets/audio/' + t + '.mp3', true);
    e.responseType = 'arraybuffer';
    e.onload = function() {
      A.decodeAudioData(
        e.response,
        function(e) {
          N[t] = e;
        },
        function() {}
      );
    };
    e.send();
  }
  function v(e) {
    if (I || !N[e]) {
      return;
    }
    if (A && A.resume) {
      A.resume();
    }
    var t = A.createBufferSource();
    t.buffer = N[e];
    t.connect(A.destination);
    if (t.start) {
      t.start(0);
    } else {
      t.noteOn(0);
    }
  }
  var y = {},
    p = { UP: 0, DOWN: 1, LEFT: 2, RIGHT: 3 },
    x = {
      INTRO: 'intro',
      COUNTDOWN: 'countdown',
      PLAYING: 'playing',
      ENDED: 'ended',
      PAUSED: 'paused'
    },
    L = x.INTRO,
    w,
    D,
    N = [],
    A,
    I = false,
    E,
    S,
    T = 0,
    b = 0,
    O = 0,
    k = [new m('Slug', 150), new m('Worm', 100), new m('Python', 50)],
    P = [[]],
    C = { width: 21, height: 15 },
    G = { x: 0, y: 0 };
  function q() {
    s.addEventListener('keydown', function(e) {
      switch (e.keyCode) {
        case 38:
        case 87:
          if (L === x.PLAYING && w.direction !== p.DOWN) {
            w.nextDirection = p.UP;
          }
          break;
        case 40:
        case 83:
          if (L === x.PLAYING && w.direction !== p.UP) {
            w.nextDirection = p.DOWN;
          }
          break;
        case 37:
        case 65:
          if (L === x.PLAYING && w.direction !== p.RIGHT) {
            w.nextDirection = p.LEFT;
          }
          break;
        case 39:
        case 68:
          if (L === x.PLAYING && w.direction !== p.LEFT) {
            w.nextDirection = p.RIGHT;
          }
          break;
        case 77:
          X();
          break;
        case 32:
        case 80:
          $();
          break;
      }
    });
  }
  function F() {
    s.addEventListener(
      'touchstart',
      function(e) {
        if (L === x.PLAYING || L === x.COUNTDOWN) {
          e.preventDefault();
        }
        G.x = e.changedTouches[0].screenX;
        G.y = e.changedTouches[0].screenY;
      },
      e ? { passive: false } : false
    );
    s.addEventListener(
      'touchmove',
      function(e) {
        var t = e.changedTouches[0].screenX - G.x,
          n = e.changedTouches[0].screenY - G.y;
        if (L !== x.PLAYING || Math.sqrt(t * t + n * n) < 22) {
          return;
        }
        G.x = e.changedTouches[0].screenX;
        G.y = e.changedTouches[0].screenY;
        var i = ((Math.atan2(n, t) / Math.PI) * 180 + 360) % 360;
        if (i >= 45 && i < 135) {
          if (w.direction !== p.UP) {
            w.nextDirection = p.DOWN;
          }
        } else if (i >= 135 && i < 225) {
          if (w.direction !== p.RIGHT) {
            w.nextDirection = p.LEFT;
          }
        } else if (i >= 225 && i < 315) {
          if (w.direction !== p.DOWN) {
            w.nextDirection = p.UP;
          }
        } else if (i >= 315 || i < 45) {
          if (w.direction !== p.LEFT) {
            w.nextDirection = p.RIGHT;
          }
        }
      },
      e ? { passive: true } : false
    );
    y.board.addEventListener(
      'touchstart',
      function(e) {
        if (L === x.PLAYING || L === x.COUNTDOWN) {
          e.preventDefault();
        }
      },
      e ? { passive: false } : false
    );
  }
  function R(e) {
    _(parseInt(e.target.dataset.level, 10));
  }
  function U() {
    var e = this.dataset && this.dataset.url ? this.dataset.url : '',
      t = this.dataset && this.dataset.text ? this.dataset.text : '',
      n = k[O].score;
    t = t.replace('%d', n);
    if (navigator.share && r.Promise) {
      navigator
        .share({ title: 'Snake', text: t, url: e })
        .then(function() {
          c('Share', 'Navigator', n);
        })
        .catch(function() {});
    } else {
      var i = 600,
        s = 340,
        a = screenX + (innerWidth - i) / 2,
        o = screenY + (innerHeight - s) / 2;
      r.open(
        'https://neave.com/share/?url=' + encodeURIComponent(e) + '&text=' + t,
        'snake-share',
        'resizable=yes,toolbar=no,scrollbars=yes,status=no,width=' +
          i +
          ',height=' +
          s +
          ',left=' +
          a +
          ',top=' +
          o
      );
      c('Share', 'Social', n);
    }
  }
  function W() {
    y.board.addEventListener(
      'mousedown',
      function(e) {
        if (L === x.PLAYING || L === x.PAUSED) {
          $();
        } else if (L === x.ENDED) {
          y.game.classList.remove('best', 'share');
          Q(x.INTRO);
          T++;
          if (T > 2 && navigator.onLine) {
            location.reload();
          } else {
            j();
          }
        }
      },
      false
    );
    for (var e = y.introButtons.length; e--; ) {
      y.introButtons[e].addEventListener('click', R, false);
    }
    y.share.addEventListener('click', U, false);
  }
  function Y() {
    y.level.textContent = k[O].name;
  }
  function B() {
    y.score.textContent = k[O].score.toString();
  }
  function M() {
    y.best.textContent = k[O].getBestScore().toString();
  }
  function H() {
    for (var e = y.mute.length; e--; ) {
      y.mute[e].style.display = I ? 'none' : '';
    }
  }
  function X() {
    I = !I;
    if (n) {
      try {
        localStorage.setItem('muted', I.toString());
      } catch (e) {}
    }
    H();
    c('Mute', I ? 'muted' : 'unmuted');
  }
  function z() {
    ne();
    Q(x.ENDED);
    v('die');
    if (n) {
      if (k[O].score > k[O].getBestScore()) {
        try {
          localStorage.setItem('score' + O, k[O].score);
        } catch (e) {}
        y.game.classList.add('best');
      }
    }
    M();
    if (k[O].score > 0) {
      y.game.classList.add('share');
    }
    c('Game', 'ended', k[O].name.toLowerCase(), k[O].score);
  }
  function j() {
    w.render(false);
    w.reset();
    D.eat();
  }
  function _(e) {
    if (L !== x.INTRO) {
      return;
    }
    O = isNaN(e) ? 1 : e;
    k[O].score = 0;
    Y();
    B();
    M();
    Q(x.COUNTDOWN);
    b = 4;
    J();
    c('Game', 'started', k[O].name.toLowerCase());
  }
  function J() {
    b--;
    if (b > 0) {
      v('low');
      y.countdown.textContent = b.toString();
      setTimeout(J, 500);
    } else {
      v('high');
      y.countdown.textContent = 'GO!';
      setTimeout(K, 500);
    }
  }
  function K() {
    Q(x.PLAYING);
    D.generate();
    te();
  }
  function Q(e) {
    y.game.classList.remove(L);
    y.game.classList.add(e);
    L = e;
  }
  function V() {
    Q(x.PAUSED);
    ne();
  }
  function Z() {
    Q(x.PLAYING);
    te();
  }
  function $() {
    if (L === x.PLAYING) {
      V();
    } else if (L === x.PAUSED) {
      Z();
    }
  }
  function ee() {
    S = requestAnimationFrame(te);
  }
  function te() {
    E = setTimeout(ee, k[O].speed);
    w.render(false);
    w.move();
    w.render(true);
  }
  function ne() {
    clearTimeout(E);
    cancelAnimationFrame(S);
  }
  function ie() {
    for (var e = 0; e < C.width * C.height; e++) {
      var t = e % C.width,
        n = Math.floor(e / C.width) % C.height,
        i = s.createElement('div');
      if (n === 0) {
        P[t] = [];
      }
      P[t][n] = i;
      i.className = 'cell';
      y.board.appendChild(i);
    }
  }
  s.addEventListener('DOMContentLoaded', function() {
    y = {
      game: s.querySelector('.game'),
      board: s.querySelector('.game .board'),
      score: s.querySelector('.info .score'),
      best: s.querySelector('.info .best'),
      level: s.querySelector('.info .level'),
      share: s.querySelector('.info.share'),
      introButtons: s.querySelectorAll('.game nav .level'),
      countdown: s.querySelector('.game h2.countdown'),
      muteButton: s.querySelector('.mute'),
      mute: s.querySelectorAll('.mute path'),
      privacy: s.querySelector('.privacy')
    };
    ie();
    q();
    F();
    W();
    if (y.game.dataset && y.game.dataset.level0) {
      k[0].name = y.game.dataset.level0;
      k[1].name = y.game.dataset.level1;
      k[2].name = y.game.dataset.level2;
    }
    if (r.AudioContext) {
      A = new AudioContext();
      g('low');
      g('high');
      g('die');
      if (n) {
        try {
          I = localStorage.getItem('muted') === 'true';
        } catch (e) {
          I = false;
        }
      }
      H();
      y.muteButton.addEventListener(
        'touchstart',
        function(e) {
          e.preventDefault();
          X();
        },
        e ? { passive: false } : false
      );
      y.muteButton.addEventListener(
        'click',
        function(e) {
          e.preventDefault();
          X();
        },
        e ? { passive: false } : false
      );
    }
    w = new h();
    D = new d();
    u();
    j();
  });
})(window, document);