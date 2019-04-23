import moment from 'moment';
moment.locale("pt-br");
import ReactDOMServer from 'react-dom/server'

export function serialize(obj) {
    let str = [];
    for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }

    return str.join("&");
}

export function allBut(propList, props) {
    let newProps = {};
    for (let key in props) {
        if (props.hasOwnProperty(key)) {
            let found = propList.filter(e => e === key).length > 0;
            if (!found) {
                newProps[key] = props[key];
            }
        }
    }
    return newProps
}

// http://stackoverflow.com/questions/4994201/is-object-empty
// Speed up calls to hasOwnProperty
let hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj === null) {
        return true;
    }

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) {
        return false;
    }
    if (obj.length === 0) {
        return true;
    }

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (let key in obj) {
        if (hasOwnProperty.call(obj, key)) {
            return false;
        }
    }

    return true;
}

const INI_FLN = 'initial and full last name';
export function namef(name, format = INI_FLN) {
    switch (format) {
        case INI_FLN:
            let n = name.split(' ');
            return n[0].charAt(0).toUpperCase()
                + '. ' + n[n.length - 1].charAt(0).toUpperCase()
                + n[n.length - 1].slice(1).toLowerCase();
        default:
            return name;
    }
}

export function parseCalConf(config) {
    let hoursTotal = config.scheduling.attendingHours.reduce((pre, cur) => pre + (cur[1] - cur[0]), 0);
    let slotsCount = (hoursTotal * 60) / config.scheduling.slotMinDuration;
    let slotsTotal = slotsCount * config.scheduling.concurrent;

    return {
        slotCount: () => slotsTotal,
        isAttendingHour: (hour) => config.scheduling.attendingHours.reduce(
            (pre, cur) => pre || (hour >= cur[0] && hour <= cur[1])
        ),
        isAttendingDay: (day) => config.scheduling.attendingDays.indexOf(day),
        config
    };
}

export function inRangeGroup(num, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (num >= arr[i][0] && num <= arr[i][1]) {
            return true
        }
    }
    return false;
}

export function fieldsHaveError(fields) {
    for (let f in fields) {
        if (fields.hasOwnProperty(f)) {
            if (fields[f].error && fields[f].touched) return true;
        }
    }
    return false;
}

export function isObject(val) {
    if (val === null) {
        return false;
    }
    return ((typeof val === 'function') || (typeof val === 'object'));
}

export function isRA(arr, def) {
    return Array.isArray(arr) ? arr : def;
}

export function genpass() {
    return Math.random().toString(36).substr(2, 8);
}

export const format = {
    SPTBR: 'DD/MM/YYYY',
    EXTPTBR: 'DD [de] MMMM, YYYY',
    MONYEA: 'MM/YYYY',
    DAYMON: 'DD/MM',
    RFC3349: 'YYYY-MM-DDTHH:mm:ssZ',
};

export function sumArrayFrom(l, index) {
    if (l.length === 0) {
        return 0;
    }
    return l.reduce(function (a, b, c) {
        if (c >= index) {
            return fl(a) + fl(b);
        } else {
            return 0;
        }
    })
}

/*
 * Transforms a string to a float or zero (0) if NaN
 * */
export function fl(int) {
    return parseFloat(isFinite(int) ? int : 0) || 0;
}

/*
 *  Sums the values from $obj[$keys]
 * */
export function sumKeys(obj, keys) {
    return keys.reduce(function (sum, v) {
        return sum + fl(obj[v]);
    }, 0);
}

/* Transforms an array to a empty object with array's values as keys
 * ['name', 'id'] => {name: '', id: ''}
 */
export function lToOK(arr) {
    return arr.reduce(function (o, v) {
        o[v] = '';
        return o;
    }, {});
}

/*
 * Returns true if element is not in viewport
 * */
export function isElementOutViewport(el) {
    if (!el) {
        return false;
    }
    let rect = el.getBoundingClientRect();
    return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
}

/*
 * Returns a range of months, from $start to $end, formatted according to $format
 * */
export function monthRange(start, end, format) {
    let mrange = [];
    for (let i = start; i <= end; i++) {
        mrange.push(moment(i, 'M').format(format));
    }
    return mrange;
}

/*
 * Returns a number formatted as prefix + XXX.XXX,YY
 * */
export function prettyNumber(num, prefix, ignoreZero, withDecimal) {
    let n = parseFloat(num);
    if (n === 0 && ignoreZero) {
        return '';
    }
    if (isNaN(n)) {
        return '';
    }
    let p = n.toFixed(2).split(".");
    return (n < 0 ? '-' : '') + prefix + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num === "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
        }, "") + (
            withDecimal
            && "," + p[1]
            || ''
        );
}

/*
 * Returns a number formatted as R$XXX.XXX,YY
 * */
export function formatReal(num, prefix) {
    let n = parseFloat(num);
    if (isNaN(n)) return '';
    let p = n.toFixed(2).split(".");
    return (n < 0 ? '-' : '') + prefix + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
            return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
        }, "") + "." + p[1];
}

/*
 * Returns a number formatted as R$XXX,XXX.YY to XXXXXX.YY
 * */
export function unformatReal(str) {
    return parseFloat(str.replace(/[R$,]/g, ''));
}

function datenum(v, date1904) {
    if (date1904) {
        v += 1462;
    }
    let epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

/*
 * Helper for handsontable custom renderer as React Component
 * */
export function enhancerRenderer(func) {
    return (...args) => {
        args[1].innerHTML = ReactDOMServer.renderToString(func.apply(null, args));
        return args[1]
    }
}

/*
 * Helper for calculating percentage variation
 * */
export function percentVariation(original, result) {
    if (original === 0) {
        return 1;
    }

    return (result - original) / Math.abs(original);
}

const FullNumber = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen'
];

/*
 *  Helper to write a number to text
 * */
export function toFullNumber(n) {
    if (typeof n !== 'number') {
        return '';
    }
    if (n > FullNumber.length - 1) {
        return '';
    }
    return FullNumber[n];
}

/*
 * Returns the width of the browser's scrollbar
 * */
export function getScrollbarWidth() {
    let outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    let inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}

/*
 * Throttles a event listeners with requestAnimationFrame
 * */
export function throttle(type, name, obj) {
    let running = false;

    obj = obj || window;

    let func = function () {
        if (running) {
            return;
        }

        running = true;

        requestAnimationFrame(function () {
            obj.dispatchEvent(new CustomEvent(name));
            running = false;
        });
    };

    obj.addEventListener(type, func);
}

/*
 * Generic column worksheet table data extract
 * */
export function extractWorkbook(worksheet, cols, rowHandler, rows, time) {
    return (new Extractor(worksheet, cols, rowHandler, rows, time)).start();
}

export class Extractor {
    run = false;
    mappedCols = {};

    constructor(worksheet, cols, rowHandler, rows, time) {
        this.worksheet = worksheet;
        this.cols = cols;
        this.rowHandler = rowHandler;

        this.rows = rows || 300;
        this.time = time || 50;

        this.count = worksheet.rowCount;
        if (this.count < 2) {
            return;
        }
        // map columns
        let cRow = worksheet.getRow(1);
        if (cRow && cols) {
            cRow.values.forEach((x, k) => this.mappedCols[x] = k);
        }
    }

    parse(start) {
        if (this.run === false) {
            return;
        }
        window.setTimeout(() => {
            let end = start + this.rows;
            if (end > this.count) {
                end = this.count;
            }
            this.parseRows(start, end);
            if (end < this.count) {
                this.parse(end + 1);
            }
        }, this.time);
    }

    parseRows(start, end) {
        for (let rowNumber = start; rowNumber <= end; rowNumber++) {
            if (!this.run) {
                return;
            }
            const row = this.worksheet.getRow(rowNumber);
            let r = row.values;
            if (this.cols) {
                let v = {};
                this.cols.forEach(c => v[c] = r[this.mappedCols[c]]);
                this.rowHandler(v, rowNumber, this.count);
            } else {
                this.rowHandler(r, rowNumber, this.count);
            }
        }
    }

    stop() {
        this.run = false;
        return this;
    }

    start() {
        this.run = true;
        this.parse(2);
        return this;
    }
}

/*
 * Function to darken a hex color
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * */
export function shadeColor2(color, percent) {
    color = color + '';
    let f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent,
        R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}


/*
 * Function to blend two hex colors together
 * https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 * */
export function blendColors(c0, c1, p) {
    c0 = c0 + '';
    c1 = c1 + '';
    let f = parseInt(c0.slice(1), 16), t = parseInt(c1.slice(1), 16), R1 = f >> 16, G1 = f >> 8 & 0x00FF,
        B1 = f & 0x0000FF, R2 = t >> 16, G2 = t >> 8 & 0x00FF, B2 = t & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((R2 - R1) * p) + R1) * 0x10000 + (Math.round((G2 - G1) * p) + G1) * 0x100 + (Math.round((B2 - B1) * p) + B1)).toString(16).slice(1);
}
