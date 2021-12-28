---
layout: default
title: JavaScript memos
date: '2021-11-15'
---
### Заметки в работе с javascript

##### Exponential value
<br/>
Если число содержит больше 7 нулей после запятой - оно принимает вид экспоненты

```JavaScript
4.56e-10 // = 0.000000000456
```
Если число содержит больше 20 нулей до запятой - оно принимает вид экспоненты

```JavaScript
5e+21 // = 5000000000000000000000
```
В JavaScript нет встроенной возможности преобразовать экспоненту в строку, приведя его к нормальному виду.<br/>
Поэтому каждый изголяется как может. Можно использовать библиотеку
[decimal.js](https://mikemcl.github.io/decimal.js) , можно написать свою фукнцию, как это сделал я.
<br/>
```JavaScript
export function convertExponential(value: string | number): string {
  return Number(value).toExponential().replace(/^(\d+)\.?(\d*)[eE]([+-]?\d+)$/, (...match: string[]) => {
    let converted: string;

    /**
     * If there was a match in \.? regexp
     * e.g. "1.274e-8" (0.00000274 OR 2740000000)
     */
    if (match[2].length > 0) {

      /** -> decimal part */
      if (Number(match[3]) > 0) {
        const times = (n: number, f: () => void) => { while (n-- > 0) f(); };
        converted = match[1].concat(match[2]);

        if (Number(match[3]) < match[2].length) {
          converted = converted.substring(0, Number(match[3]) + 1)
            .concat('.')
            .concat(converted.substring(Number(match[3]) + 1, converted.length));
        }

        times(Number(match[3]) - match[2].length, () => { converted = converted.concat('0'); });

        return converted;

      /**  -> NO decimal part */
      } else if (Number(match[3]) < 0){
        const times = (n: number, f: () => void) => { while (n++ < 0) f(); };
        converted = '0.';
        times(Number(match[3]) + 1, () => { converted = converted.concat('0'); });

        return converted.concat(match[1]).concat(match[2]);

      /**  -> NOT exponential */
      } else {
        converted = match[1].concat(match[2]);
        converted = converted.substring(0, Number(match[3]) + 1)
          .concat('.')
          .concat(converted.substring(Number(match[3]) + 1, converted.length));

        return converted;
      }

    /**
     * If there was a match in [eE], but NONE in \.? regexp
     * e.g. "4e-8" (0.00000004 OR 40000000000)
     */
    } else {

      /** -> decimal part */
      if (Number(match[3]) > 0) {
        const times = (n: number, f: () => void) => { while (n-- > 0) f(); };
        converted = match[1];
        times(Number(match[3]), () => { converted = converted.concat('0'); });

        return converted;

      /**  -> NO decimal part */
      } else if (Number(match[3]) < 0){
        const times = (n: number, f: () => void) => { while (n++ < 0) f(); };
        converted = '0.';
        times(Number(match[3]) + 1, () => { converted = converted.concat('0'); });

        return converted.concat(match[1]);

      /**  -> NOT exponential */
      } else {
        return match[1];
      }
    }
  });
}
```
