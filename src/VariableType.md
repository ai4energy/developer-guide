---
icon: puzzle-piece
title: 变量类型
author: Mingtao Li
---

## 变量类型
在一个数字孪生项目中，首先可用的实体组是“变量类型”。变量类型有如下一些字段：

name, Quantity type, Unit, Delta, Default Value, Min Value, Max Value.

所选择的计量单位还决定了Quantity type，不能独立选择。

其中Delta用来标记这个变量是否是差值，如果是，就会忽略偏移量。（例如，对于温度差异，需要在转换为开尔文时忽略摄氏度的偏移量）。

基于文本或“无单位”的变量类型携带的信息要少得多：只包括默认值和边界值，以及一个可选的纯文本计量单位，仅用于可读性，不参与任何单位转换的计算。

在modelica中，实际上也是存在变量类型定义的。比如说modelica的标准库有个Units包。在其SI里，定义了一系列的type，实际就是变量类型。比如：

```modelica
type Angle = Real (
    final quantity="Angle",
    final unit="rad",
    displayUnit="deg");
```
代表Angle是个类型，实际上就是实数变量，单位是rad。显式单位是deg。

在三相交流电里头，还涉及到了复数。通常不用。暂时忽略。

此外Modelica的标准库的Units还定义非国际单位制的单位，以及单位转换。

