import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as e,o as p,c as o,b as n,d as a,e as c,a as i}from"./app-25c4cfed.js";const l={},u=n("h2",{id:"变量",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#变量","aria-hidden":"true"},"#"),a(" 变量")],-1),r=n("p",null,"在Modelingtoolkit中，变量是使用@variable宏来定义的。我们默认所有的变量都是时间的函数。",-1),k=n("p",null,"定义一个变量需要一个符号来表示。同时我们可以在这个符号上搭载上变量的相关信息，包括其变量类型。",-1),d={href:"https://blog.csdn.net/jake484/article/details/121450196",target:"_blank",rel:"noopener noreferrer"},m=i(`<p>以下代码片段来自Modelingtoolkit的/src/variables.jl:</p><div class="language-julia line-numbers-mode" data-ext="julia"><pre class="language-julia"><code><span class="token keyword">struct</span> VariableUnit <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableConnectType <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableNoiseType <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableInput <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableOutput <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableIrreducible <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableStatePriority <span class="token keyword">end</span>
<span class="token keyword">struct</span> VariableMisc <span class="token keyword">end</span>
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>unit<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableUnit
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>connect<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableConnectType
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>noise<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableNoiseType
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>input<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableInput
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>output<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableOutput
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>irreducible<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableIrreducible
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>state_priority<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableStatePriority
Symbolics<span class="token punctuation">.</span>option_to_metadata_type<span class="token punctuation">(</span><span class="token punctuation">::</span>Val<span class="token punctuation">{</span><span class="token punctuation">:</span>misc<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span> VariableMisc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到Modelingtoolkit的变量提供了misc这个metadata，我们可以用它来记录我们想记录的信息。具体而言就是生成变量的时候，我们把其misc这个metadata设置成我们要的变量类型的实例。</p><p>比如说我们有个Activate_Energy活化能变量类型，而activate_energy是Activate_Energy的实例。ke是一个变量，我们可以设置ke的misc这个metadata为activate_energy。</p><p>（具体需要写代码实现。）</p>`,5);function b(_,v){const s=e("ExternalLinkIcon");return p(),o("div",null,[u,r,k,n("p",null,[a("Modelingtoolkit的设计使用了Symbolics.jl库，而Symbolics.jl允许在符号上搭载metadata信息，这给我们设计变量提供了很多便利。关于metadata的使用，可以参考"),n("a",d,[a("杨景懿写的一篇博客"),c(s)]),a("，或者阅读Modelingtoolkit的源码。")]),m])}const h=t(l,[["render",b],["__file","Variable.html.vue"]]);export{h as default};