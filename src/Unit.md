


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
