---
icon: puzzle-piece
title: 介质类型
author: Mingtao Li
---

## 介质类型

在流程模拟中，介质是很重要的。我们需要能处理不同的介质。包括水、水蒸气、以及一些常见的化工流股。这在ThermoSysPro中是放在Properties下的。而在TransiEnt Library库中，则是在Basics/Media和Basics/Interfaces下定义了介质和接口。TransiEnt Library使用了TILMedia。而TILMedia是ClaRaLibrary组织开发的，在https://github.com/ClaRaLibrary, 在https://www.tlk-thermo.com/index.php/en/tilmedia-suite 也有相关信息。在buildings库中，则是在Media下定义了介质。我们主要参照ThermoSysPro。

我们可以开发一个julia Media package。首先物性作为组件，它是有输入输出变量的。也就是说，它是因果关系模型，而非非因果关系模型。借助Modelingtoolkit的变量input和output这样的metadata实现。

建立AbstractMedia， SolidMedia， 等等抽象类型。然后在不同的抽象类型下面建立具体的介质类型。给出物性计算的函数。register这些函数。

拟这么设计：一个介质放在一个module里，在这个module里有一些函数，不同的函数返回不一样的ODESystem。而每个具体的ODESystem里就是对应的方程系统（当然会用到register的外部物性函数）。对应的connector有个mediatype选择器，不同的选择器会导致不一样的media的ODESystem引入。而连接器的这个media和组件的media也要对应上，否则就会出现连接错误。





