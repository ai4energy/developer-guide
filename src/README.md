---
icon: puzzle-piece
title: 开发者手册
author: Mingtao Li

---

设计中。

## 单位

在有些软件实现中，组件是以xml文件来存储的。它内部首先定义了一系列单位，然后自己可以定义变量类型。对于一个变量类型而言，需要名字、单位，最大值、最小值、默认值。

我们可以按照如下的代码设置数据表:
```sql
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(50) UNIQUE NOT NULL,  -- 单位的符号
    abbreviation VARCHAR(50),  -- 单位的简写
    name VARCHAR(100),  -- 单位的全名
    equivalent VARCHAR(100),  -- 单位的等效表达式或转换因子
    uses_scientific_notation BOOLEAN,  -- 是否采用科学计数法
    doc TEXT,  -- 英文文档或描述
    doc_zh TEXT  -- 简体中文文档或描述
);
```

对应的我们可以生成相应的单位结构
```julia
struct unit
  id::Int
  symbol::String
  abbreviation::String
  name::String
  equivalent::String
  uses_scientific_notation::Bool
  doc::String
  doc_zh::String
  #_realunit ##可以用来抓取由此生成的Unitful格式的单位
end
```
当然，也可以使用参数类型更有弹性，可以以后再说。

然后我们使用如下的sql命令插入一些我们会用到的单位：

```sql
INSERT INTO "units" ("id", "symbol", "abbreviation", "name", "equivalent", "uses_scientific_notation", "doc", "doc_zh") VALUES
(1,	'm',	'm',	'Meter',	'm',	't',	'The meter is the base unit of length in the International System of Units.',	'米是国际单位制中长度的基本单位。'),
(2,	'kg',	'kg',	'Kilogram',	'kg',	't',	'The kilogram is the base unit of mass in the International System of Units.',	'千克是国际单位制中质量的基本单位。'),
(3,	's',	's',	'Second',	's',	't',	'The second is the base unit of time in the International System of Units.',	'秒是国际单位制中时间的基本单位。'),
(4,	'A',	'A',	'Ampere',	'A',	't',	'The ampere is the base unit of electric current in the International System of Units.',	'安培是国际单位制中电流的基本单位。'),
(5,	'K',	'K',	'Kelvin',	'K',	't',	'The kelvin is the base unit of thermodynamic temperature in the International System of Units.',	'开尔文是国际单位制中热力学温度的基本单位。'),
(6,	'mol',	'mol',	'Mole',	'mol',	't',	'The mole is the base unit of amount of substance in the International System of Units.',	'摩尔是国际单位制中物质的量的基本单位。'),
(7,	'cd',	'cd',	'Candela',	'cd',	't',	'The candela is the base unit of luminous intensity in the International System of Units.',	'坎德拉是国际单位制中光强的基本单位。'),
(8,	'Unitless',	'dimless',	'DimLess',	'1.0',	'f',	'A dimensionless unit.',	'无量纲单位。'),
(9,	'rad',	'rad',	'Radian',	'm/m',	't',	'The radian is the unit of angular measure in the International System of Units.',	'弧度是国际单位制中角度测量的单位。'),
(10,	'sr',	'sr',	'Steradian',	'm^2/m^2',	't',	'The steradian is the SI unit of solid angle. It is used in three-dimensional geometry.',	'球面度是国际单位制中的立体角单位，用于三维几何。'),
(11,	'g',	'g',	'Gram',	'kg/1000',	't',	'The gram is a unit of mass in the metric system.',	'克是公制系统中质量的单位。'),
(12,	'degree',	'°',	'Degree',	'pi/180',	'f',	'The degree is a unit of angular measure used in geometry and trigonometry.',	'度是几何和三角学中用于角度测量的单位。'),
(19,	'V',	'V',	'Volt',	'1W/A',	't',	'The volt is the SI unit of electric potential.',	'伏特是国际单位制中电压或电势差的单位。'),
(18,	'C',	'C',	'Coulomb',	'1A*s',	't',	'The coulomb is the SI unit of electric charge.',	'库仑是国际单位制中电荷的单位。'),
(17,	'W',	'W',	'Watt',	'1J/s',	't',	'The watt is the SI unit of power.',	'瓦特是国际单位制中功率的单位。'),
(16,	'J',	'J',	'Joule',	'1N*m',	't',	'The joule is the SI unit of energy.',	'焦耳是国际单位制中能量的单位。'),
(15,	'Pa',	'Pa',	'Pascal',	'1N/m^2',	't',	'The pascal is the SI unit of pressure.',	'帕斯卡是国际单位制中压力的单位。'),
(14,	'N',	'N',	'Newton',	'1kg*m/s^2',	't',	'The newton is the SI unit of force.',	'牛顿是国际单位制中力的单位。'),
(13,	'Hz',	'Hz',	'Hertz',	'1/s',	't',	'The hertz is the unit of frequency in the International System of Units.',	'赫兹是国际单位制中频率的单位。'),
(20,	'Ω',	'Ω',	'Ohm',	'1V/A',	't',	'The ohm is the SI unit of electrical resistance.',	'欧姆是电阻的国际单位制单位。'),
(21,	'S',	'S',	'Siemens',	'1/Ω',	't',	'The Siemens is the SI unit of electrical conductance.',	'西门子是电导的国际单位制单位。'),
(22,	'F',	'F',	'Farad',	'1s^4*A^2/(kg*m^2)',	't',	'The Farad is the SI unit of electrical capacitance.',	'法拉是电容量的国际单位制单位。'),
(23,	'H',	'H',	'Henry',	'1J/(A^2)',	't',	'The Henry is the SI unit of electrical inductance.',	'亨利是电感的国际单位制单位。'),
(24,	'T',	'T',	'Tesla',	'1kg/(A*s^2)',	't',	'The Tesla is the SI unit of magnetic flux density.',	'特斯拉是磁感应强度的国际单位制单位。'),
(25,	'Wb',	'Wb',	'Weber',	'1kg*m^2/(A*s^2)',	't',	'The Weber is the SI unit of magnetic flux.',	'韦伯是磁通量的国际单位制单位。'),
(26,	'lm',	'lm',	'Lumen',	'1cd*sr',	't',	'The Lumen is the SI unit of luminous flux.',	'流明是光通量的国际单位制单位。'),
(27,	'lx',	'lx',	'Lux',	'1lm/m^2',	't',	'The Lux is the SI unit of illuminance.',	'勒克司是照度的国际单位制单位。'),
(28,	'Bq',	'Bq',	'Becquerel',	'1/s',	't',	NULL,	NULL),
(29,	'Gy',	'Gy',	'Gray',	'1J/kg',	't',	'The gray is the SI unit of ionizing radiation dose, defined as the absorption of 1 joule per kilogram of matter.',	'戈瑞是国际单位制中电离辐射剂量的单位，定义为1焦耳在每千克物质中的吸收。'),
(30,	'Sv',	'Sv',	'Sievert',	'1J/kg',	't',	'The sievert is the SI unit of the biological effect of an ionizing radiation dose. It is defined as the health effect of 1 gray of radiation, scaled by a quality factor.',	'西弗特是国际单位制中电离辐射剂量的生物效应单位。它被定义为1戈瑞辐射的健康影响，通过一个质量因子进行缩放。'),
(31,	'kat',	'kat',	'Katal',	'1mol/s',	't',	'The katal is the SI unit of catalytic activity, defined as 1 mole of catalyzed substrate per second.',	'卡特是国际单位制中催化活性的单位，定义为每秒催化的底物中的1摩尔。'),
(32,	'%',	'%',	'Percent',	'1/100',	'f',	'Percent is a unit meaning parts per hundred.',	'百分比是一个表示百分之一的单位。'),
(33,	'‰',	'‰',	'Permille',	'1/1000',	'f',	'Permille is a unit meaning parts per thousand.',	'千分比是一个表示千分之一的单位。'),
(34,	'‱',	'‱',	'Pertenthousand',	'1/10000',	'f',	'Pertenthousand is a unit meaning parts per ten thousand.',	'万分比是一个表示万分之一的单位。'),
(35,	'minute',	'minute',	'Minute',	'60s',	'f',	'The minute is a unit of time defined as 60 seconds.',	'分钟是一个时间单位，定义为60秒。'),
(36,	'hr',	'hr',	'Hour',	'3600s',	'f',	'The hour is a unit of time defined as 60 minutes.',	'小时是一个时间单位，定义为60分钟。'),
(37,	'd',	'd',	'Day',	'86400s',	'f',	'The day is a unit of time defined as 24 hours.',	'天是一个时间单位，定义为24小时。'),
(38,	'wk',	'wk',	'Week',	'604800s',	'f',	'The week is a unit of time, defined as 7 days.',	'周是一个时间单位，定义为7天。'),
(39,	'yr',	'yr',	'Year',	'31557600s',	't',	'The year is a unit of time, defined as 365.25 days.',	'年是一个时间单位，定义为365.25天。'),
(40,	'rps',	'rps',	'RevolutionsPerSecond',	'2π*rad/s',	'f',	'Revolutions per second is a unit of rotational speed, defined as 2π radians per second.',	'每秒转数是一个旋转速度单位，定义为每秒2π弧度。'),
(41,	'rpm',	'rpm',	'RevolutionsPerMinute',	'2π*rad/minute',	'f',	'Revolutions per minute is a unit of rotational speed, defined as 2π radians per minute.',	'每分钟转数是一个旋转速度单位，定义为每分钟2π弧度。'),
(42,	'a',	'a',	'Are',	'100m^2',	'f',	'The are is a metric unit of area, defined as 100 square meters.',	'公顷是面积的度量单位，定义为100平方米。'),
(43,	'b',	'b',	'Barn',	'100fm^2',	't',	'The barn is a metric unit of area, defined as 100 femtometers squared.',	'巴恩是面积的度量单位，定义为100飞米的平方。'),
(44,	'L',	'L',	'Liter',	'm^3/1000',	't',	'The liter is a metric unit of volume, defined as 0.001 cubic meters.',	'升是体积的度量单位，定义为0.001立方米。'),
(45,	'M',	'M',	'Molar',	'1mol/L',	't',	'The molarity unit is used to measure the concentration of a solute in a solution.',	'摩尔浓度单位用于测量溶液中溶质的浓度。'),
(46,	'q',	'q',	'ElementaryCharge',	'1.602176634e-19*C',	't',	'The elementary charge is the charge of a single electron.',	'基本电荷是单个电子的电荷。'),
(47,	'eV',	'eV',	'ElectronVolt',	'q*V',	't',	'The electron-volt is a unit of energy defined as the energy of a single elementary charge moved across a potential difference of one volt.',	'电子伏是能量的单位，定义为单个基本电荷在电势差为一伏特的情况下移动的能量。'),
(48,	'Hz2π',	'Hz2π',	'AngHertz',	'2π/s',	't',	'Hz2π is a unit for convenience in angular frequency, equal to 2π hertz.',	'Hz2π是角频率的便利单位，等于2π赫兹。'),
(49,	'bar',	'bar',	'Bar',	'100000Pa',	't',	'The bar is a metric unit of pressure, defined as 100 kilopascals.',	'巴是压力的度量单位，定义为100千帕。'),
(50,	'atm',	'atm',	'Atmosphere',	'101325Pa',	't',	'The standard atmosphere is a unit of pressure, defined as 101,325 pascals.',	'标准大气压是压力的度量单位，定义为101325帕斯卡。'),
(51,	'Torr',	'Torr',	'Torr',	'101325Pa/760',	't',	'The torr is a unit of pressure, defined as 1/760 of an atmosphere.',	'托是压力的单位，定义为1/760个大气压。'),
(52,	'c0',	'c0',	'SpeedOfLightInVacuum',	'299792458m/s',	't',	'The speed of light in a vacuum is approximately 299,792,458 meters per second.',	'真空中的光速约为每秒299,792,458米。'),
(53,	'c',	'c',	'SpeedOfLight',	'1c0',	'f',	'The speed of light in a vacuum is approximately 299,792,458 meters per second.',	'真空中的光速约为每秒299,792,458米。'),
(54,	'u',	'u',	'UnifiedAtomicMassUnit',	'1.66053906660e-27kg',	'f',	'The unified atomic mass unit is a unit of mass used for expressing atomic and molecular weights.',	'统一原子质量单位是用于表示原子和分子质量的单位。');
```

接下来，julia函数查询单位表，获取记录，根据每一条记录生成一个类型，并产生一个这个类型的实例。把这个实例设置为常数。
```julia
struct unit
  id::Int
  symbol::String
  abbreviation::String
  name::String
  equivalent::String
  uses_scientific_notation::Bool
  doc::String
  doc_zh::String
  #_realunit ##可以用来抓取由此生成的Unitful格式的单位
end

const global m = unit()
```
这些常数就可以在定义变量类型的时候用到。

在DAETools中是通过units.h定义的，可以参考一下。在julia中Unitful.jl提供了非常强大的单位支持。我们只需要定义好结构，借助Unitful.jl实现运算功能。

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

## 变量

在Modelingtoolkit中，变量是使用@variable宏来定义的。我们默认所有的变量都是时间的函数。

定义一个变量需要一个符号来表示。同时我们可以在这个符号上搭载上变量的相关信息，包括其变量类型。

Modelingtoolkit的设计使用了Symbolics.jl库，而Symbolics.jl允许在符号上搭载metadata信息，这给我们设计变量提供了很多便利。关于metadata的使用，可以参考[杨景懿写的一篇博客](https://blog.csdn.net/jake484/article/details/121450196)，或者阅读Modelingtoolkit的源码。

以下代码片段来自Modelingtoolkit的/src/variables.jl:
```julia
struct VariableUnit end
struct VariableConnectType end
struct VariableNoiseType end
struct VariableInput end
struct VariableOutput end
struct VariableIrreducible end
struct VariableStatePriority end
struct VariableMisc end
Symbolics.option_to_metadata_type(::Val{:unit}) = VariableUnit
Symbolics.option_to_metadata_type(::Val{:connect}) = VariableConnectType
Symbolics.option_to_metadata_type(::Val{:noise}) = VariableNoiseType
Symbolics.option_to_metadata_type(::Val{:input}) = VariableInput
Symbolics.option_to_metadata_type(::Val{:output}) = VariableOutput
Symbolics.option_to_metadata_type(::Val{:irreducible}) = VariableIrreducible
Symbolics.option_to_metadata_type(::Val{:state_priority}) = VariableStatePriority
Symbolics.option_to_metadata_type(::Val{:misc}) = VariableMisc
```
可以看到Modelingtoolkit的变量提供了misc这个metadata，我们可以用它来记录我们想记录的信息。具体而言就是生成变量的时候，我们把其misc这个metadata设置成我们要的变量类型的实例。

比如说我们有个Activate_Energy活化能变量类型，而activate_energy是Activate_Energy的实例。ke是一个变量，我们可以设置ke的misc这个metadata为activate_energy。

（具体需要写代码实现。）

## 组件类型


在Modelingtoolkit中，各个组件都是ODESystem，包括连接器（connector）。所以没有办法直接通过成员变量读取其信息。而从sicp我们知道，如果想有字段记录额外的信息的话，可以有两种做法。一种是加个wrapper。一种是增加一个字段。先前我们由于没有考虑让上游修改，拟采用的是加个wrapper的做法。而现在，上游Modelingtoolkit修改了其代码，我们可以以metada的形式记录相关信息。

以下代码片段来自Modelingtoolkit的/src/systems/diffeqs/odesystem.jl

```julia
struct ODESystem <: AbstractODESystem
    ......
    """
    metadata: metadata for the system, to be used by downstream packages.
    """
    metadata::Any
    """
    gui_metadata: metadata for MTK GUI.
    """
    gui_metadata::Union{Nothing, GUIMetadata}
    ......
    end
end
```

这说明上游给我们了metadata这个字段可以记录我们的信息。并且，他们还设置了gui_metadata用以记录他们的GUI信息（我们暂时用不到）。

我们可以生成一个ODESystem，在metadata中使用一个类型的实例常量记录其相关信息。

例如有个Boiler函数，它会生成一个ODESystem。假如boiler表示这个ODESystem实例。
```julia
@named boiler=Boiler()
```
我们完全可以生成一个BoilerType类型，把boilertype定义为BoilerType类型实例，再把boiler的metadata赋值为boilertype。
这样boiler就含有我们所需的一切信息。
而对于把boiler存储到数据库的函数，我们可以读取其boilertype的信息，根据boilertype进行多重分发。完美解决
```julia
savetodatabase(boiler)
```

## 连接器

在Modelingtoolkit中，连接器（connector）是使用@connector宏来实现的。定义一个函数生成某ODESystem，而同时在前面加上@connector就会定义成连接器。

连接器实际上是通过ODESystem的connector_type提供的。

```julia
    """
    connector_type: type of the system
    """
    connector_type::Any
```


