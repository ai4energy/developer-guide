import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as s,a as e}from"./app-d2551be0.js";const t={},i=e(`<h2 id="组件类型" tabindex="-1"><a class="header-anchor" href="#组件类型" aria-hidden="true">#</a> 组件类型</h2><p>在Modelingtoolkit中，各个组件都是ODESystem，包括连接器（connector）。所以没有办法直接通过成员变量读取其信息。而从sicp我们知道，如果想有字段记录额外的信息的话，可以有两种做法。一种是加个wrapper。一种是增加一个字段。先前我们由于没有考虑让上游修改，拟采用的是加个wrapper的做法。而现在，上游Modelingtoolkit修改了其代码，我们可以以metada的形式记录相关信息。</p><p>以下代码片段来自Modelingtoolkit的/src/systems/diffeqs/odesystem.jl</p><div class="language-julia line-numbers-mode" data-ext="julia"><pre class="language-julia"><code><span class="token keyword">struct</span> ODESystem <span class="token operator">&lt;:</span> AbstractODESystem
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token string">&quot;&quot;&quot;
    metadata: metadata for the system, to be used by downstream packages.
    &quot;&quot;&quot;</span>
    metadata<span class="token punctuation">::</span>Any
    <span class="token string">&quot;&quot;&quot;
    gui_metadata: metadata for MTK GUI.
    &quot;&quot;&quot;</span>
    gui_metadata<span class="token punctuation">::</span>Union<span class="token punctuation">{</span>Nothing<span class="token punctuation">,</span> GUIMetadata<span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这说明上游给我们了metadata这个字段可以记录我们的信息。并且，他们还设置了gui_metadata用以记录他们的GUI信息（我们暂时用不到）。</p><p>我们可以生成一个ODESystem，在metadata中使用一个类型的实例常量记录其相关信息。</p><p>例如有个Boiler函数，它会生成一个ODESystem。假如boiler表示这个ODESystem实例。</p><div class="language-julia line-numbers-mode" data-ext="julia"><pre class="language-julia"><code>@named boiler<span class="token operator">=</span>Boiler<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们完全可以生成一个BoilerType类型，把boilertype定义为BoilerType类型实例，再把boiler的metadata赋值为boilertype。<br> 这样boiler就含有我们所需的一切信息。<br> 而对于把boiler存储到数据库的函数，我们可以读取其boilertype的信息，根据boilertype进行多重分发。完美解决</p><div class="language-julia line-numbers-mode" data-ext="julia"><pre class="language-julia"><code>savetodatabase<span class="token punctuation">(</span>boiler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10),o=[i];function l(p,c){return n(),s("div",null,o)}const r=a(t,[["render",l],["__file","Component.html.vue"]]);export{r as default};