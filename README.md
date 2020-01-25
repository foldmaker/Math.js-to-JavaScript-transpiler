# Math.js to JavaScript transpiler
Tiny transpiler made with [foldmaker.js](https://github.com/foldmaker), that converts mixed [math.js](https://github.com/josdejong/mathjs/) and JS syntax into [acorn](https://github.com/acornjs/acorn)-parsable format.


```js
for (j = 0; j < 5; j++) {
  while(foo) { // multiline while block
    bar()
  }
  while(1000 m === 1 km) bar() // one line while block
}

{ // just a plain scope block
  // Some invalid JavaScript syntax (also valid Math.js syntax)
  G = 6.67408e-11 m^3 kg^-1 s^-2  // Gravitational constant
  mbody = 5.972e24 kg             // Mass of Earth
  dvdt(r, v, m, phi, gamma) = -mu / r^2 * sin(gamma) + T / m
}

// Multiline Math.js syntax
result_stage1 = ndsolve(
  [drdt, dvdt, dmdt, dphidt, dgammadt], 
  [r0, v0, m0, phi0, gamma_0], 
  dt, 
  tfinal
)
```

is transpiled to 

```js
for (_(`j = 0`); _(`j < 5`); _(`j++`)) {;_line(2)
  while(_(`foo`)) { /* multiline while block */;_line(3)
    _(`bar()`);_line(4)
  };_line(5)
  while(_(`1000 m === 1 km`)) _(`bar()`)/* one line while block */;_line(6)
};_line(7)
;_line(8)
{ /* just a plain scope block */;_line(9)
  /* Some invalid JavaScript syntax (also valid Math.js syntax) */;_line(10)
  _(`G = 6.67408e-11 m^3 kg^-1 s^-2`)/* Gravitational constant */;_line(11)
  _(`mbody = 5.972e24 kg`)/* Mass of Earth */;_line(12)
  _(`dvdt(r, v, m, phi, gamma) = -mu / r^2 * sin(gamma) + T / m`);_line(13)
};_line(14)
;_line(15)
/* Multiline Math.js syntax */;_line(16)
_(`result_stage1 = ndsolve(${_multi(17)}
  [drdt, dvdt, dmdt, dphidt, dgammadt], ${_multi(18)}
  [r0, v0, m0, phi0, gamma_0], ${_multi(19)}
  dt, ${_multi(20)}
  tfinal${_multi(21)}
)`);_line(22)
```
