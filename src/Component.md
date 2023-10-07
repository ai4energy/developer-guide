
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


