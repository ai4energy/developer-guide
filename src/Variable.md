
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
