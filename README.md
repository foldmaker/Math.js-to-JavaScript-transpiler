# Math.js-to-JavaScript-transpiler
Tiny transpiler made with foldmaker.js, that adds JS-like if, else, while and for loops to Math.js


```js
for (i = 0; i < 4; i++){
    for (j = 0; j < 5; j++){
        while(foo) {
            bar()
        }
        while(1) bar()
        { // just a plain scope block
          45
        }
    }
}

if (1) {
  doIt()
}
// Some constants
G = 6.67408e-11 m^3 kg^-1 s^-2  // Gravitational constant
mbody = 5.972e24 kg             // Mass of Earth
```

is transpiled to 

```js
for(_("i = 0");_("i < 4");_("i++")){;_line(2)
for(_("j = 0");_("j < 5");_("j++")){;_line(3)
{_start();while(_("foo")){;_line(4)
_("bar()");_line(5)
};_end()};_line(6)
{_start();while(_("1"))_("bar()");_line(7)
;_end()}{/* just a plain scope block */;_line(8)
_("45");_line(9)
};_line(10)
};_line(11)
};_line(12)
;_line(13)
{_start();if(_("1")){;_line(14)
_("doIt()");_line(15)
};_end()};_line(16)
/* Some constants */;_line(17)
_("G = 6.67408e-11 m^3 kg^-1 s^-2")/* Gravitational constant */;_line(18)
_("mbody = 5.972e24 kg")/* Mass of Earth */;_line(19)
```
