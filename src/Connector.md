---
icon: puzzle-piece
title: 连接器类型
author: Mingtao Li
---
## 连接器

在Modelingtoolkit中，连接器（connector）是使用@connector宏来实现的。定义一个函数生成某ODESystem，而同时在前面加上@connector就会定义成连接器。

连接器实际上是通过ODESystem的connector_type提供的。

```julia
    """
    connector_type: type of the system
    """
    connector_type::Any
```




## 连接器类型
连接器用于组件间的连接。

它有四个方面的内容需要设置，参数和变量，图形表示，端口类别，显示模板。

### 参数和变量

对于参数声明，必须提供一个类型 - 整数、实数或外部对象（ForeignObject）。

如果选择了外部对象（ForeignObject），还可以提供一个类别。

对于整数和实数参数，还可以提供一个默认值。

外部对象主要是用于物性（流股）。

对于分布域声明，必须提供下限和上限。

对于变量声明，必须提供变量类型；这应该从项目中声明的所有变量类型的下拉列表中选择（或者跨项目引用的项目）。连接类型可以包括标量和数组变量：

要定义数组的维数，请单击scalar单元格以访问维度编辑器。

在“添加新维度”框中，可以选择在此连接类型中声明的整数参数，或者键入一个文字值（例如，7）。

可以通过添加多个维度来声明多维变量 - 多个维度可以使用“上移”和“下移”按钮进行排序。

### 图形表示
流程图模型中不同单元之间的连接与连接类型相关联。这些连接在流程图模型的拓扑选项卡上以图形方式显示 - 此类连接的图形表示由其连接类型确定。

图形表示选项卡上提供的信息确定了端口和连接线的颜色，以及线的粗细。

### 端口类别和连接规则
数字孪生强制执行一些规则，以确保在构建流程图模型时只能进行有效的连接，因此所有端口必须定义为进口、出口或双向端口。在定义模型端口时，开发人员必须指定端口属于这些类别中的哪一个，数字孪生会强制执行以下表格中显示的规则（例如，可以将出口端口连接到进口端口，但不能将出口连接到出口）。


此外，对于特定的连接类型，可以通过定义新的用户指定类别来定义额外的规则。PML利用了这种能力：在PML中，端口必须是节点（Node）或连接器（Connector），不允许进行节点到节点的连接。

### 显示模板
“显示模板选项卡”允许您定义连接类型携带的哪些变量应出现在结果流表中。

在此选项卡上，您为应出现在流表中的每个变量提供一个标签，并指定这些数量在表格中的顺序。请注意，只有出现在“显示模板选项卡”上的那些数量才会出现在流表中。

参考Modelingtoolkit的/src/systems/connectors.jl，以下是代码片段：

```julia
abstract type AbstractConnectorType end
struct StreamConnector <: AbstractConnectorType end
struct RegularConnector <: AbstractConnectorType end
struct DomainConnector <: AbstractConnectorType end
```

说明它能很好的处理DomainConnector情形。而对于数组的情况，这是由@variable 和@parameter 的数组设置决定的。

但是Modelingtoolkit本身的connector不能处理有外部对象的情况，我们需要考虑一下。就是外部的物性对象之类的，需要思考如何实现，才能具有普遍适用性。

### Modelica标准库中Fluid的Interface解读

文件地址：/Modelica 4.0.0+maint.om/Fluid/Interfaces.mo

这段代码是Modelica语言中的一种定义，用于描述一个名为"FluidPort"的连接器（connector）。这个连接器主要用于表示在管道网络中进行流体传输的接口。以下是代码中的一些重要元素的解释：

1. **connector FluidPort**: 这是一个连接器类型的定义，用于描述一种可以连接到其他组件的接口类型。在这种情况下，它描述了一个用于流体流动的接口。

2. **"Interface for quasi one-dimensional fluid flow in a piping network (incompressible or compressible, one or more phases, one or more substances)"**: 这是对连接器用途的简要描述，表明它适用于描述在管道网络中进行流体流动的情况，可以涵盖不可压缩或可压缩流体、单相或多相流动以及单一或多个物质的情况。

3. **replaceable package Medium = Modelica.Media.Interfaces.PartialMedium**: 这是一个可替代的部分介质包（replaceable package），它指定了连接器可以使用的介质模型。这意味着在实际使用时，你可以选择不同的介质模型来与这个连接器一起使用，以适应不同的流体和条件。
就是外部对象啦。

4. **flow Medium.MassFlowRate m_flow**: 这是一个流动量（flow variable），用于表示从连接点进入组件的质量流速。这个变量通常用于描述流入组件的质量流动。

5. **Medium.AbsolutePressure p**: 这是一个用于表示连接点的热力学压力的变量。它表示与连接点相关的压力。

6. **stream Medium.SpecificEnthalpy h_outflow**: 这是一个流变量（stream variable），用于表示如果 `m_flow < 0` 时，与连接点接近的特定热焓。通常用于描述在负质量流速情况下的出流。

7. **stream Medium.MassFraction Xi_outflow[Medium.nXi]**: 这是一组流变量，表示如果 `m_flow < 0` 时，与连接点接近的独立混合物质量分数。这些变量通常用于描述在负质量流速情况下的出流中各种组分的质量分数。

8. **stream Medium.ExtraProperty C_outflow[Medium.nC]**: 这是一组流变量，表示如果 `m_flow < 0` 时，与连接点接近的额外属性。这些属性通常用于描述在负质量流速情况下的出流中的其他特性。

总之，这段代码定义了一个连接器，用于描述流体传输的接口，可以处理多种流体和条件，还可以选择不同的介质模型。这对于建模涉及流体流动的系统非常有用。

就是说流体中的连接器，有介质类型，质量流量、绝对压力、比焓、质量分数、额外属性。

接下来定义了FluidPort_a，只是通过annotation赋予了一个默认的名字，并且加上了图标。

接下来定义了FluidPort_b，它与FluidPort_a只是默认名字和图标不一样。

而FluidPorts_a和FluidPorts_b则是向量化的，就是数组形式的。

接下来定义了PartialTwoPort模型，这种模型是为了继承用的，定义了介质，port_a和port_b。

进一步基于PartialTwoPort定义了PartialTwoPortTransport。定义了dp，通过质量流速获得了压降。还有质量平衡方程。

对于ThermoSysPro这个modelica包而言，也是首先定义了单位（在Units.mo中）。然后在Fluid中的interfaces下定义了一些connectors。在Properties/Fluid下也定义了一些interfaces。不过从包的结构可以看出，EDF出品的ThermoSysPro相对而言较少用到继承（在modelica中是extends）。

从[TransiEnt Library](https://github.com/TransiEnt-official)也可看出其设计是较少用到继承的。