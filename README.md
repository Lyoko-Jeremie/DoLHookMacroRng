# HookMacroRng

---

设置接下来生成的随机数序列：      
这个序列耗尽之后会恢复游戏原始逻辑，或者也可以手动清除序列
```javascript
window.hookMacroRng.setRngList([1, 5, 7, 8, 12, 98, 12, 342, 98]);

// reset  恢复游戏原始逻辑
window.hookMacroRng.setRngList();
```

---

设置一个用来生成随机数的函数：    
函数返回值将作为随机数，如果返回值为`undefined`则会使用游戏原始逻辑生成随机数。
函数参数为`min`、`max`和`args`，`args`是一个数组，里面为原始的`rng`宏的传入数据，可以使用`args.length`来检查原始传入了多少个参数。
```javascript
window.hookMacroRng.setRngHook(
    // (min: number, max: number, args: any[]) => number | undefined
    (min, max, args) => {
        return random(min, max);
    }
);

// reset  恢复游戏原始逻辑
window.hookMacroRng.setRngHook();
```
