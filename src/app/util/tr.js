import Status from '../constants/Status';
import { BRTypes, years, monthsLabel, months, monthsEn } from '../constants/App';
import { Operator, SubitemType } from '../constants/pnl';

const status = {
    [Status.Cancelled]: "Cancelado",
    [Status.Scheduled]: "Marcado",
    [Status.Confirmed]: "Confirmado",
    [Status.Attended]: "Atendido",
    [Status.Missed]: "Falta",
    [Status.Wait]: "Espera",
};

const brtypes = {
    [BRTypes.forecast]: "Forecast",
    [BRTypes.lrp]: "LRP",
    [BRTypes.budget]: "Budget",
};

const pnl = {
    [Operator.Sum]: "Soma",
    [Operator.Subtract]: "Subtração",
    [Operator.Divide]: "Divisão",
    [Operator.Multiply]: "Multiplicação",
    [SubitemType.Total]: "Total",
    [SubitemType.Account]: "Conta",
};


export default function tr(str, def) {
    if (status[str]) return status[str];
    if (brtypes[str]) return brtypes[str];
    if (pnl[str]) return pnl[str];

    return def || str;
}

export function columnLabel(col, y, en) {
    const i = years.indexOf(col);
    if (i >= 0) {
        return `${ y + Math.floor(i / 2) }.${ (i % 2) + 1 }`;
    }

    const m = months.indexOf(col);
    if (m >= 0) {
        return en ? monthsEn[m] : monthsLabel[m];
    }

    return col;
}
