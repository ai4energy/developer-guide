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



## 变量类型

在流程仿真中，由模型方程计算的所有量都是变量；变量始终是实数（连续）数字，并且必须始终被赋予变量类型。

变量类型包含以下信息：

1. 名称，可以在全局范围内引用此类型。
2. 变量类型的默认值。这个值将用作涉及此类型变量的任何迭代计算的初始猜测，除非为单个变量覆盖了它，或者从先前的计算中获得了更好的猜测。
3. 变量类型的值的上下限。涉及此类型变量的任何计算必须得出在这些上下限内的结果。这些限制可以用于确保计算结果在物理上有意义。同样，这些限制可以针对单个此类型的变量进行覆盖。
4. 可选的测量单位。建议提供这一信息，以提高模型的可读性。

我们可以使用如下的命令创建变量类型表:
```sql
-- 创建变量类型表
CREATE TABLE variable_types (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(50) UNIQUE NOT NULL,  -- 变量类型的符号
    abbreviation VARCHAR(50),  -- 变量类型的简写
    unit_id INTEGER REFERENCES units(id),  -- 关联的单位ID
    min_value DOUBLE PRECISION,  -- 最小值
    max_value DOUBLE PRECISION,  -- 最大值
    default_value DOUBLE PRECISION,  -- 默认值
    doc TEXT,  -- 英文文档或描述
    doc_zh TEXT  -- 简体中文文档或描述
);
```

同样的，针对每一条记录，我们可以生成一个julia类型（结构体），并生成一个该类型的实例（以const global的形式），export出来备用。
