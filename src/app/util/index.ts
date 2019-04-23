export function omit<T extends object, K extends keyof T>(target: T, ...omitKeys: K[]): Omit<T, K> {
  return (Object.keys(target) as K[]).reduce(
    (res, key) => {
      if (!omitKeys.includes(key)) {
        res[key] = target[key];
      }
      return res;
    },
    {} as Omit<T, K>
  );
}

export const format = {
  SPTBR: 'DD/MM/YYYY',
  EXTPTBR: 'DD [de] MMMM, YYYY',
  DASHUN: 'YYYY-MM-DD',
  MONYEA: 'MM/YYYY',
  DAYMON: 'DD/MM',
  RFC3349: 'YYYY-MM-DDTHH:mm:ssZ'
};

export function formatMinutes(m: number): string {
  if (Number.isNaN(Number(m))) {
    m = 0;
  }
  if (m === 0) {
    return '00:00';
  }
  const h: number = Math.floor(m / 60);
  let min = (m - h * 60).toFixed();
  if (parseInt(min) < 10) {
    min = `0${min}`;
  }
  let hour: string = h + '';
  if (Math.abs(h) < 10) {
    hour = `${(h < 0 && '-') || ''}0${Math.abs(h)}`;
  }
  return `${hour}:${min}`;
}

export function fmtMinutes(m: number): string {
  if (Number.isNaN(Number(m))) {
    m = 0;
  }
  if (m === 0) {
    return '00:00';
  }
  const h: number = Math.floor(m);
  let min = ((m - h) * 60).toFixed();
  if (parseInt(min) < 10) {
    min = `0${min}`;
  }
  return `${h}:${min === '0' ? '00' : min}`;
}

export function fmtCurrency(n: number, s: string = ''): string {
  n = Number(n);
  if (n === 0) {
    return '0';
  }

  return `${s} ${n.toFixed(2)}`;
}

export function fromCents(n: number): number {
  n = Number(n) || 0;

  return n / 100;
}

export function toCents(n: number): number {
  n = Number(n) || 0;

  return n * 100;
}

export function sortByKey(k: string): (a, b) => number {
  return (a, b) => {
    if (a[k] < b[k]) return -1;
    if (a[k] > b[k]) return 1;

    return 0;
  };
}

export function fuzzySearch(term: string, text: string) {
  if (typeof term !== 'string' || typeof text !== 'string') return false;
  // Build Regex String
  var matchTerm = '.*';

  // Split all the search terms
  var terms = term.split(' ');
  term = term.replace(/\W/g, ''); // strip non alpha numeric

  for (var i = 0; i < terms.length; i++) {
    matchTerm += '(?=.*' + terms[i] + '.*)';
  }

  matchTerm += '.*';

  // Convert to Regex
  // => /.*(?=.*TERM1.*)(?=.*TERM2.*).*/
  var matchRegex = new RegExp(matchTerm.toUpperCase());

  return text.toUpperCase().match(matchRegex);
}

/*
 * Throttles a event listeners with requestAnimationFrame
 * */
export function throttle(type: string, name: string, obj: Element | Window = window) {
  let running = false;

  let func = function() {
    if (running) {
      return;
    }

    running = true;

    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };

  obj.addEventListener(type, func);
}

export function truncateWith(text, max, symbol = '\u2026') {
  return text.substr(0, max - 1) + (text.length > max ? symbol : '');
}

/*
 * Returns the width of the browser's scrollbar
 * */
export function getScrollbarWidth() {
  let outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;
  // force scrollbars
  outer.style.overflow = 'scroll';

  // add innerdiv
  let inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  // remove divs
  outer.parentNode && outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}
