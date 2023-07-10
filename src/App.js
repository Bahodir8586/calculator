import { useState } from "react";
import classes from "./App.module.scss";

export const App = () => {
  const [monthlySalary, setMonthlySalary] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);
  const [creditPercent, setCreditPercent] = useState(17);
  const [profitFromCredit, setProfitFromCredit] = useState(0);
  const [period, setPeriod] = useState(0);

  const [resultWithCredit, setResultWithCredit] = useState("");
  const [minimalPeriodToCoverCredit, setMinimalPeriodToCoverCredit] =
    useState("");
  const [timeWithoutCredit, setTimeWithoutCredit] = useState("");
  const [conclusion, setConclusion] = useState("");

  const calculate = () => {
    const minPeriodCredit = calculateMinimumPeriod();
    const minPeriodWithoutCredit = calculateMinimalPeriodToGetWithoutCredit();
    let leftAmount = creditAmount;
    for (let i = 0; i < period; i++) {
      leftAmount = +leftAmount + +(leftAmount * creditPercent) / 1200;
      leftAmount = leftAmount - monthlySalary - profitFromCredit;
    }
    if (leftAmount < 0) {
      setResultWithCredit(
        `Kreditni to'langan va ${formatNumber(-leftAmount)} so'm foyda!`
      );
    } else {
      setResultWithCredit(
        `Kreditni to'lanmagan va ${formatNumber(leftAmount)} so'm qoldi!.`
      );
    }
    setMinimalPeriodToCoverCredit(
      `Kreditni to'lash uchun kerak bo'lgan minimal muddat: ${minPeriodCredit} oy!`
    );
    setTimeWithoutCredit(
      `Maqsadga kreditsiz yetishish mumkin bo'lgan minimal muddat: ${minPeriodWithoutCredit} oy!`
    );

    if (minPeriodCredit < minPeriodWithoutCredit) {
      setConclusion("Kreditda foydaliroq");
    } else {
      setConclusion("Kreditsiz foydaliroq");
    }
  };

  const calculateMinimumPeriod = () => {
    let leftAmount = creditAmount;
    let month = 0;
    while (leftAmount > 0) {
      leftAmount = +leftAmount + +(leftAmount * creditPercent) / 1200;
      leftAmount = leftAmount - monthlySalary - profitFromCredit;
      month++;
    }
    return month;
  };

  const calculateMinimalPeriodToGetWithoutCredit = () => {
    return (creditAmount / monthlySalary).toFixed(0);
  };

  function formatNumber(number) {
    return number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  return (
    <div className={classes.app}>
      <div className={classes.inputBox}>
        <label className={classes.label}>Oylik to'planadigan daromad</label>
        <input
          type="number"
          className={classes.input}
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(e.target.value)}
        />
      </div>
      <div className={classes.inputBox}>
        <label className={classes.label}>Olinadigan kredit summasi</label>
        <input
          type="number"
          className={classes.input}
          value={creditAmount}
          onChange={(e) => setCreditAmount(e.target.value)}
        />
      </div>
      <div className={classes.inputBox}>
        <label className={classes.label}>Kredit foizi</label>
        <input
          type="number"
          className={classes.input}
          value={creditPercent}
          onChange={(e) => setCreditPercent(e.target.value)}
        />
      </div>
      <div className={classes.inputBox}>
        <label className={classes.label}>Kreditdan keladigan daromad</label>
        <input
          type="number"
          className={classes.input}
          value={profitFromCredit}
          onChange={(e) => setProfitFromCredit(e.target.value)}
        />
      </div>
      <div className={classes.inputBox}>
        <label className={classes.label}>Muddat (oyda)</label>
        <input
          type="number"
          className={classes.input}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        />
      </div>
      <div>
        <button className={classes.button} onClick={calculate}>
          Hisoblash
        </button>
      </div>
      <p>{resultWithCredit}</p>
      <p>{minimalPeriodToCoverCredit}</p>
      <p>{timeWithoutCredit}</p>
      <p>{conclusion}</p>
    </div>
  );
};
