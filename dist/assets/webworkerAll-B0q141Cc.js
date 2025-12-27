import{E as m,U as ht,T as fe,a as ft,a4 as v,a5 as T,t as S,ae as pe,$ as W,af as O,V as pt,m as X,ag as gt,ah as ge,a0 as Fe,ai as E,aj as mt,ak as F,w as K,F as xt,G as Me,v as Re,M as B,l as k,d as Be,I as M,a7 as ie,R as ae,H as Ue,al as _t,am as D,c as I,B as R,D as oe,S as $,y as j,an as yt,ao as le,L as se,ap as L,s as ue,n as Ge,q as ze,a9 as ke,ac as Ae,o as bt,p as vt,aa as Tt,ab as wt,ad as Ct,aq as St,ar as Q,e as C,as as Pt}from"./index-HrDsaxoc.js";import{c as q,a as Ft,b as Mt,B as De}from"./colorToUniform-BXaCBwVl.js";class Oe{static init(e){Object.defineProperty(this,"resizeTo",{configurable:!0,set(t){globalThis.removeEventListener("resize",this.queueResize),this._resizeTo=t,t&&(globalThis.addEventListener("resize",this.queueResize),this.resize())},get(){return this._resizeTo}}),this.queueResize=()=>{this._resizeTo&&(this._cancelResize(),this._resizeId=requestAnimationFrame(()=>this.resize()))},this._cancelResize=()=>{this._resizeId&&(cancelAnimationFrame(this._resizeId),this._resizeId=null)},this.resize=()=>{if(!this._resizeTo)return;this._cancelResize();let t,r;if(this._resizeTo===globalThis.window)t=globalThis.innerWidth,r=globalThis.innerHeight;else{const{clientWidth:s,clientHeight:n}=this._resizeTo;t=s,r=n}this.renderer.resize(t,r),this.render()},this._resizeId=null,this._resizeTo=null,this.resizeTo=e.resizeTo||null}static destroy(){globalThis.removeEventListener("resize",this.queueResize),this._cancelResize(),this._cancelResize=null,this.queueResize=null,this.resizeTo=null,this.resize=null}}Oe.extension=m.Application;class Ie{static init(e){e=Object.assign({autoStart:!0,sharedTicker:!1},e),Object.defineProperty(this,"ticker",{configurable:!0,set(t){this._ticker&&this._ticker.remove(this.render,this),this._ticker=t,t&&t.add(this.render,this,ht.LOW)},get(){return this._ticker}}),this.stop=()=>{this._ticker.stop()},this.start=()=>{this._ticker.start()},this._ticker=null,this.ticker=e.sharedTicker?fe.shared:new fe,e.autoStart&&this.start()}static destroy(){if(this._ticker){const e=this._ticker;this.ticker=null,e.destroy()}}}Ie.extension=m.Application;class Rt extends ft{constructor(){super(...arguments),this.chars=Object.create(null),this.lineHeight=0,this.fontFamily="",this.fontMetrics={fontSize:0,ascent:0,descent:0},this.baseLineOffset=0,this.distanceField={type:"none",range:0},this.pages=[],this.applyFillAsTint=!0,this.baseMeasurementFontSize=100,this.baseRenderedFontSize=100}get font(){return v(T,"BitmapFont.font is deprecated, please use BitmapFont.fontFamily instead."),this.fontFamily}get pageTextures(){return v(T,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}get size(){return v(T,"BitmapFont.size is deprecated, please use BitmapFont.fontMetrics.fontSize instead."),this.fontMetrics.fontSize}get distanceFieldRange(){return v(T,"BitmapFont.distanceFieldRange is deprecated, please use BitmapFont.distanceField.range instead."),this.distanceField.range}get distanceFieldType(){return v(T,"BitmapFont.distanceFieldType is deprecated, please use BitmapFont.distanceField.type instead."),this.distanceField.type}destroy(e=!1){var t;this.emit("destroy",this),this.removeAllListeners();for(const r in this.chars)(t=this.chars[r].texture)==null||t.destroy();this.chars=null,e&&(this.pages.forEach(r=>r.texture.destroy(!0)),this.pages=null)}}const We=class Ee extends Rt{constructor(e){super(),this.resolution=1,this.pages=[],this._padding=0,this._measureCache=Object.create(null),this._currentChars=[],this._currentX=0,this._currentY=0,this._currentMaxCharHeight=0,this._currentPageIndex=-1,this._skipKerning=!1;const t={...Ee.defaultOptions,...e};this._textureSize=t.textureSize,this._mipmap=t.mipmap;const r=t.style.clone();t.overrideFill&&(r._fill.color=16777215,r._fill.alpha=1,r._fill.texture=S.WHITE,r._fill.fill=null),this.applyFillAsTint=t.overrideFill;const s=r.fontSize;r.fontSize=this.baseMeasurementFontSize;const n=pe(r);t.overrideSize?r._stroke&&(r._stroke.width*=this.baseRenderedFontSize/s):r.fontSize=this.baseRenderedFontSize=s,this._style=r,this._skipKerning=t.skipKerning??!1,this.resolution=t.resolution??1,this._padding=t.padding??4,t.textureStyle&&(this._textureStyle=t.textureStyle instanceof W?t.textureStyle:new W(t.textureStyle)),this.fontMetrics=O.measureFont(n),this.lineHeight=r.lineHeight||this.fontMetrics.fontSize||r.fontSize}ensureCharacters(e){var b,x;const t=O.graphemeSegmenter(e).filter(g=>!this._currentChars.includes(g)).filter((g,p,w)=>w.indexOf(g)===p);if(!t.length)return;this._currentChars=[...this._currentChars,...t];let r;this._currentPageIndex===-1?r=this._nextPage():r=this.pages[this._currentPageIndex];let{canvas:s,context:n}=r.canvasAndContext,i=r.texture.source;const a=this._style;let l=this._currentX,u=this._currentY,d=this._currentMaxCharHeight;const c=this.baseRenderedFontSize/this.baseMeasurementFontSize,h=this._padding*c;let f=!1;const y=s.width/this.resolution,_=s.height/this.resolution;for(let g=0;g<t.length;g++){const p=t[g],w=O.measureText(p,a,s,!1);w.lineHeight=w.height;const P=w.width*c,G=Math.ceil((a.fontStyle==="italic"?2:1)*P),A=w.height*c,U=G+h*2,V=A+h*2;if(f=!1,p!==`
`&&p!=="\r"&&p!=="	"&&p!==" "&&(f=!0,d=Math.ceil(Math.max(V,d))),l+U>y&&(u+=d,d=V,l=0,u+d>_)){i.update();const z=this._nextPage();s=z.canvasAndContext.canvas,n=z.canvasAndContext.context,i=z.texture.source,l=0,u=0,d=0}const ct=P/c-(((b=a.dropShadow)==null?void 0:b.distance)??0)-(((x=a._stroke)==null?void 0:x.width)??0);if(this.chars[p]={id:p.codePointAt(0),xOffset:-this._padding,yOffset:-this._padding,xAdvance:ct,kerning:{}},f){this._drawGlyph(n,w,l+h,u+h,c,a);const z=i.width*c,he=i.height*c,dt=new pt(l/z*i.width,u/he*i.height,U/z*i.width,V/he*i.height);this.chars[p].texture=new S({source:i,frame:dt}),l+=Math.ceil(U)}}i.update(),this._currentX=l,this._currentY=u,this._currentMaxCharHeight=d,this._skipKerning&&this._applyKerning(t,n)}get pageTextures(){return v(T,"BitmapFont.pageTextures is deprecated, please use BitmapFont.pages instead."),this.pages}_applyKerning(e,t){const r=this._measureCache;for(let s=0;s<e.length;s++){const n=e[s];for(let i=0;i<this._currentChars.length;i++){const a=this._currentChars[i];let l=r[n];l||(l=r[n]=t.measureText(n).width);let u=r[a];u||(u=r[a]=t.measureText(a).width);let d=t.measureText(n+a).width,c=d-(l+u);c&&(this.chars[n].kerning[a]=c),d=t.measureText(n+a).width,c=d-(l+u),c&&(this.chars[a].kerning[n]=c)}}}_nextPage(){this._currentPageIndex++;const e=this.resolution,t=X.getOptimalCanvasAndContext(this._textureSize,this._textureSize,e);this._setupContext(t.context,this._style,e);const r=e*(this.baseRenderedFontSize/this.baseMeasurementFontSize),s=new S({source:new gt({resource:t.canvas,resolution:r,alphaMode:"premultiply-alpha-on-upload",autoGenerateMipmaps:this._mipmap})});this._textureStyle&&(s.source.style=this._textureStyle);const n={canvasAndContext:t,texture:s};return this.pages[this._currentPageIndex]=n,n}_setupContext(e,t,r){t.fontSize=this.baseRenderedFontSize,e.scale(r,r),e.font=pe(t),t.fontSize=this.baseMeasurementFontSize,e.textBaseline=t.textBaseline;const s=t._stroke,n=(s==null?void 0:s.width)??0;if(s&&(e.lineWidth=n,e.lineJoin=s.join,e.miterLimit=s.miterLimit,e.strokeStyle=ge(s,e)),t._fill&&(e.fillStyle=ge(t._fill,e)),t.dropShadow){const i=t.dropShadow,a=Fe.shared.setValue(i.color).toArray(),l=i.blur*r,u=i.distance*r;e.shadowColor=`rgba(${a[0]*255},${a[1]*255},${a[2]*255},${i.alpha})`,e.shadowBlur=l,e.shadowOffsetX=Math.cos(i.angle)*u,e.shadowOffsetY=Math.sin(i.angle)*u}else e.shadowColor="black",e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0}_drawGlyph(e,t,r,s,n,i){const a=t.text,l=t.fontProperties,u=i._stroke,d=((u==null?void 0:u.width)??0)*n,c=r+d/2,h=s-d/2,f=l.descent*n,y=t.lineHeight*n;let _=!1;i.stroke&&d&&(_=!0,e.strokeText(a,c,h+y-f));const{shadowBlur:b,shadowOffsetX:x,shadowOffsetY:g}=e;i._fill&&(_&&(e.shadowBlur=0,e.shadowOffsetX=0,e.shadowOffsetY=0),e.fillText(a,c,h+y-f)),_&&(e.shadowBlur=b,e.shadowOffsetX=x,e.shadowOffsetY=g)}destroy(){super.destroy();for(let e=0;e<this.pages.length;e++){const{canvasAndContext:t,texture:r}=this.pages[e];X.returnCanvasAndContext(t),r.destroy(!0)}this.pages=null}};We.defaultOptions={textureSize:512,style:new E,mipmap:!0};let me=We;function Ve(o,e,t,r){const s={width:0,height:0,offsetY:0,scale:e.fontSize/t.baseMeasurementFontSize,lines:[{width:0,charPositions:[],spaceWidth:0,spacesIndex:[],chars:[]}]};s.offsetY=t.baseLineOffset;let n=s.lines[0],i=null,a=!0;const l={width:0,start:0,index:0,positions:[],chars:[]},u=t.baseMeasurementFontSize/e.fontSize,d=e.letterSpacing*u,c=e.wordWrapWidth*u,h=e.lineHeight?e.lineHeight*u:t.lineHeight,f=e.wordWrap&&e.breakWords,y=x=>{const g=n.width;for(let p=0;p<l.index;p++){const w=x.positions[p];n.chars.push(x.chars[p]),n.charPositions.push(w+g)}n.width+=x.width,a=!1,l.width=0,l.index=0,l.chars.length=0},_=()=>{let x=n.chars.length-1;if(r){let g=n.chars[x];for(;g===" ";)n.width-=t.chars[g].xAdvance,g=n.chars[--x]}s.width=Math.max(s.width,n.width),n={width:0,charPositions:[],chars:[],spaceWidth:0,spacesIndex:[]},a=!0,s.lines.push(n),s.height+=h},b=x=>x-d>c;for(let x=0;x<o.length+1;x++){let g;const p=x===o.length;p||(g=o[x]);const w=t.chars[g]||t.chars[" "];if(/(?:\s)/.test(g)||g==="\r"||g===`
`||p){if(!a&&e.wordWrap&&b(n.width+l.width)?(_(),y(l),p||n.charPositions.push(0)):(l.start=n.width,y(l),p||n.charPositions.push(0)),g==="\r"||g===`
`)_();else if(!p){const U=w.xAdvance+(w.kerning[i]||0)+d;n.width+=U,n.spaceWidth=U,n.spacesIndex.push(n.charPositions.length),n.chars.push(g)}}else{const A=w.kerning[i]||0,U=w.xAdvance+A+d;f&&b(n.width+l.width+U)&&(y(l),_()),l.positions[l.index++]=l.width+A,l.chars.push(g),l.width+=U}i=g}return _(),e.align==="center"?Bt(s):e.align==="right"?Ut(s):e.align==="justify"&&Gt(s),s}function Bt(o){for(let e=0;e<o.lines.length;e++){const t=o.lines[e],r=o.width/2-t.width/2;for(let s=0;s<t.charPositions.length;s++)t.charPositions[s]+=r}}function Ut(o){for(let e=0;e<o.lines.length;e++){const t=o.lines[e],r=o.width-t.width;for(let s=0;s<t.charPositions.length;s++)t.charPositions[s]+=r}}function Gt(o){const e=o.width;for(let t=0;t<o.lines.length;t++){const r=o.lines[t];let s=0,n=r.spacesIndex[s++],i=0;const a=r.spacesIndex.length,u=(e-r.width)/a;for(let d=0;d<r.charPositions.length;d++)d===n&&(n=r.spacesIndex[s++],i+=u),r.charPositions[d]+=i}}function zt(o){if(o==="")return[];typeof o=="string"&&(o=[o]);const e=[];for(let t=0,r=o.length;t<r;t++){const s=o[t];if(Array.isArray(s)){if(s.length!==2)throw new Error(`[BitmapFont]: Invalid character range length, expecting 2 got ${s.length}.`);if(s[0].length===0||s[1].length===0)throw new Error("[BitmapFont]: Invalid character delimiter.");const n=s[0].charCodeAt(0),i=s[1].charCodeAt(0);if(i<n)throw new Error("[BitmapFont]: Invalid character range.");for(let a=n,l=i;a<=l;a++)e.push(String.fromCharCode(a))}else e.push(...Array.from(s))}if(e.length===0)throw new Error("[BitmapFont]: Empty set when resolving characters.");return e}let H=0;class kt{constructor(){this.ALPHA=[["a","z"],["A","Z"]," "],this.NUMERIC=[["0","9"]],this.ALPHANUMERIC=[["a","z"],["A","Z"],["0","9"]," "],this.ASCII=[[" ","~"]],this.defaultOptions={chars:this.ALPHANUMERIC,resolution:1,padding:4,skipKerning:!1,textureStyle:null},this.measureCache=mt(1e3)}getFont(e,t){var i;let r=`${t.fontFamily}-bitmap`,s=!0;if(t._fill.fill&&!t._stroke?(r+=t._fill.fill.styleKey,s=!1):(t._stroke||t.dropShadow)&&(r=`${t.styleKey}-bitmap`,s=!1),!F.has(r)){const a=Object.create(t);a.lineHeight=0;const l=new me({style:a,overrideFill:s,overrideSize:!0,...this.defaultOptions});H++,H>50&&K("BitmapText",`You have dynamically created ${H} bitmap fonts, this can be inefficient. Try pre installing your font styles using \`BitmapFont.install({name:"style1", style})\``),l.once("destroy",()=>{H--,F.remove(r)}),F.set(r,l)}const n=F.get(r);return(i=n.ensureCharacters)==null||i.call(n,e),n}getLayout(e,t,r=!0){const s=this.getFont(e,t),n=`${e}-${t.styleKey}-${r}`;if(this.measureCache.has(n))return this.measureCache.get(n);const i=O.graphemeSegmenter(e),a=Ve(i,t,s,r);return this.measureCache.set(n,a),a}measureText(e,t,r=!0){return this.getLayout(e,t,r)}install(...e){var u,d,c,h;let t=e[0];typeof t=="string"&&(t={name:t,style:e[1],chars:(u=e[2])==null?void 0:u.chars,resolution:(d=e[2])==null?void 0:d.resolution,padding:(c=e[2])==null?void 0:c.padding,skipKerning:(h=e[2])==null?void 0:h.skipKerning},v(T,"BitmapFontManager.install(name, style, options) is deprecated, use BitmapFontManager.install({name, style, ...options})"));const r=t==null?void 0:t.name;if(!r)throw new Error("[BitmapFontManager] Property `name` is required.");t={...this.defaultOptions,...t};const s=t.style,n=s instanceof E?s:new E(s),i=t.dynamicFill??this._canUseTintForStyle(n),a=new me({style:n,overrideFill:i,skipKerning:t.skipKerning,padding:t.padding,resolution:t.resolution,overrideSize:!1,textureStyle:t.textureStyle}),l=zt(t.chars);return a.ensureCharacters(l.join("")),F.set(`${r}-bitmap`,a),a.once("destroy",()=>F.remove(`${r}-bitmap`)),a}uninstall(e){const t=`${e}-bitmap`,r=F.get(t);r&&r.destroy()}_canUseTintForStyle(e){return!e._stroke&&(!e.dropShadow||e.dropShadow.color===0)&&!e._fill.fill&&e._fill.color===16777215}}const At=new kt;var Dt=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`,Ot=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`,xe=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class It extends xt{constructor(){const e=Me.from({vertex:{source:xe,entryPoint:"mainVertex"},fragment:{source:xe,entryPoint:"mainFragment"},name:"passthrough-filter"}),t=Re.from({vertex:Dt,fragment:Ot,name:"passthrough-filter"});super({gpuProgram:e,glProgram:t})}}class Le{constructor(e){this._renderer=e}push(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:t,filterEffect:e})}pop(e,t,r){this._renderer.renderPipes.batch.break(r),r.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(e){e.action==="pushFilter"?this._renderer.filter.push(e):e.action==="popFilter"&&this._renderer.filter.pop()}destroy(){this._renderer=null}}Le.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"filter"};const _e=new B;function Wt(o,e){e.clear();const t=e.matrix;for(let r=0;r<o.length;r++){const s=o[r];if(s.globalDisplayStatus<7)continue;const n=s.renderGroup??s.parentRenderGroup;n!=null&&n.isCachedAsTexture?e.matrix=_e.copyFrom(n.textureOffsetInverseTransform).append(s.worldTransform):n!=null&&n._parentCacheAsTextureRenderGroup?e.matrix=_e.copyFrom(n._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(s.groupTransform):e.matrix=s.worldTransform,e.addBounds(s.bounds)}return e.matrix=t,e}const Et=new ie({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class Vt{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new Ue,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.globalFrame={x:0,y:0,width:0,height:0},this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class He{constructor(e){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new k({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new Be({}),this.renderer=e}get activeBackTexture(){var e;return(e=this._activeFilterData)==null?void 0:e.backTexture}push(e){const t=this.renderer,r=e.filterEffect.filters,s=this._pushFilterData();s.skip=!1,s.filters=r,s.container=e.container,s.outputRenderSurface=t.renderTarget.renderSurface;const n=t.renderTarget.renderTarget.colorTexture.source,i=n.resolution,a=n.antialias;if(r.every(f=>!f.enabled)){s.skip=!0;return}const l=s.bounds;if(this._calculateFilterArea(e,l),this._calculateFilterBounds(s,t.renderTarget.rootViewPort,a,i,1),s.skip)return;const u=this._getPreviousFilterData(),d=this._findFilterResolution(i);let c=0,h=0;u&&(c=u.bounds.minX,h=u.bounds.minY),this._calculateGlobalFrame(s,c,h,d,n.width,n.height),this._setupFilterTextures(s,l,t,u)}generateFilteredTexture({texture:e,filters:t}){const r=this._pushFilterData();this._activeFilterData=r,r.skip=!1,r.filters=t;const s=e.source,n=s.resolution,i=s.antialias;if(t.every(f=>!f.enabled))return r.skip=!0,e;const a=r.bounds;if(a.addRect(e.frame),this._calculateFilterBounds(r,a.rectangle,i,n,0),r.skip)return e;const l=n;this._calculateGlobalFrame(r,0,0,l,s.width,s.height),r.outputRenderSurface=M.getOptimalTexture(a.width,a.height,r.resolution,r.antialias),r.backTexture=S.EMPTY,r.inputTexture=e,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(r,!0);const h=r.outputRenderSurface;return h.source.alphaMode="premultiplied-alpha",h}pop(){const e=this.renderer,t=this._popFilterData();t.skip||(e.globalUniforms.pop(),e.renderTarget.finishRenderPass(),this._activeFilterData=t,this._applyFiltersToTexture(t,!1),t.blendRequired&&M.returnTexture(t.backTexture),M.returnTexture(t.inputTexture))}getBackTexture(e,t,r){const s=e.colorTexture.source._resolution,n=M.getOptimalTexture(t.width,t.height,s,!1);let i=t.minX,a=t.minY;r&&(i-=r.minX,a-=r.minY),i=Math.floor(i*s),a=Math.floor(a*s);const l=Math.ceil(t.width*s),u=Math.ceil(t.height*s);return this.renderer.renderTarget.copyToTexture(e,n,{x:i,y:a},{width:l,height:u},{x:0,y:0}),n}applyFilter(e,t,r,s){const n=this.renderer,i=this._activeFilterData,l=i.outputRenderSurface===r,u=n.renderTarget.rootRenderTarget.colorTexture.source._resolution,d=this._findFilterResolution(u);let c=0,h=0;if(l){const y=this._findPreviousFilterOffset();c=y.x,h=y.y}this._updateFilterUniforms(t,r,i,c,h,d,l,s);const f=e.enabled?e:this._getPassthroughFilter();this._setupBindGroupsAndRender(f,t,n)}calculateSpriteMatrix(e,t){const r=this._activeFilterData,s=e.set(r.inputTexture._source.width,0,0,r.inputTexture._source.height,r.bounds.minX,r.bounds.minY),n=t.worldTransform.copyTo(B.shared),i=t.renderGroup||t.parentRenderGroup;return i&&i.cacheToLocalTransform&&n.prepend(i.cacheToLocalTransform),n.invert(),s.prepend(n),s.scale(1/t.texture.orig.width,1/t.texture.orig.height),s.translate(t.anchor.x,t.anchor.y),s}destroy(){var e;(e=this._passthroughFilter)==null||e.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new It),this._passthroughFilter}_setupBindGroupsAndRender(e,t,r){if(r.renderPipes.uniformBatch){const s=r.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(s,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);this._globalFilterBindGroup.setResource(t.source,1),this._globalFilterBindGroup.setResource(t.source.style,2),e.groups[0]=this._globalFilterBindGroup,r.encoder.draw({geometry:Et,shader:e,state:e._state,topology:"triangle-list"}),r.type===ae.WEBGL&&r.renderTarget.finishRenderPass()}_setupFilterTextures(e,t,r,s){if(e.backTexture=S.EMPTY,e.inputTexture=M.getOptimalTexture(t.width,t.height,e.resolution,e.antialias),e.blendRequired){r.renderTarget.finishRenderPass();const n=r.renderTarget.getRenderTarget(e.outputRenderSurface);e.backTexture=this.getBackTexture(n,t,s==null?void 0:s.bounds)}r.renderTarget.bind(e.inputTexture,!0),r.globalUniforms.push({offset:t})}_calculateGlobalFrame(e,t,r,s,n,i){const a=e.globalFrame;a.x=t*s,a.y=r*s,a.width=n*s,a.height=i*s}_updateFilterUniforms(e,t,r,s,n,i,a,l){const u=this._filterGlobalUniforms.uniforms,d=u.uOutputFrame,c=u.uInputSize,h=u.uInputPixel,f=u.uInputClamp,y=u.uGlobalFrame,_=u.uOutputTexture;a?(d[0]=r.bounds.minX-s,d[1]=r.bounds.minY-n):(d[0]=0,d[1]=0),d[2]=e.frame.width,d[3]=e.frame.height,c[0]=e.source.width,c[1]=e.source.height,c[2]=1/c[0],c[3]=1/c[1],h[0]=e.source.pixelWidth,h[1]=e.source.pixelHeight,h[2]=1/h[0],h[3]=1/h[1],f[0]=.5*h[2],f[1]=.5*h[3],f[2]=e.frame.width*c[2]-.5*h[2],f[3]=e.frame.height*c[3]-.5*h[3];const b=this.renderer.renderTarget.rootRenderTarget.colorTexture;y[0]=s*i,y[1]=n*i,y[2]=b.source.width*i,y[3]=b.source.height*i,t instanceof S&&(t.source.resource=null);const x=this.renderer.renderTarget.getRenderTarget(t);this.renderer.renderTarget.bind(t,!!l),t instanceof S?(_[0]=t.frame.width,_[1]=t.frame.height):(_[0]=x.width,_[1]=x.height),_[2]=x.isRoot?-1:1,this._filterGlobalUniforms.update()}_findFilterResolution(e){let t=this._filterStackIndex-1;for(;t>0&&this._filterStack[t].skip;)--t;return t>0&&this._filterStack[t].inputTexture?this._filterStack[t].inputTexture.source._resolution:e}_findPreviousFilterOffset(){let e=0,t=0,r=this._filterStackIndex;for(;r>0;){r--;const s=this._filterStack[r];if(!s.skip){e=s.bounds.minX,t=s.bounds.minY;break}}return{x:e,y:t}}_calculateFilterArea(e,t){if(e.renderables?Wt(e.renderables,t):e.filterEffect.filterArea?(t.clear(),t.addRect(e.filterEffect.filterArea),t.applyMatrix(e.container.worldTransform)):e.container.getFastGlobalBounds(!0,t),e.container){const s=(e.container.renderGroup||e.container.parentRenderGroup).cacheToLocalTransform;s&&t.applyMatrix(s)}}_applyFiltersToTexture(e,t){const r=e.inputTexture,s=e.bounds,n=e.filters,i=e.firstEnabledIndex,a=e.lastEnabledIndex;if(this._globalFilterBindGroup.setResource(r.source.style,2),this._globalFilterBindGroup.setResource(e.backTexture.source,3),i===a)n[i].apply(this,r,e.outputRenderSurface,t);else{let l=e.inputTexture;const u=M.getOptimalTexture(s.width,s.height,l.source._resolution,!1);let d=u;for(let c=i;c<a;c++){const h=n[c];if(!h.enabled)continue;h.apply(this,l,d,!0);const f=l;l=d,d=f}n[a].apply(this,l,e.outputRenderSurface,t),M.returnTexture(u)}}_calculateFilterBounds(e,t,r,s,n){var x;const i=this.renderer,a=e.bounds,l=e.filters;let u=1/0,d=0,c=!0,h=!1,f=!1,y=!0,_=-1,b=-1;for(let g=0;g<l.length;g++){const p=l[g];if(!p.enabled)continue;if(_===-1&&(_=g),b=g,u=Math.min(u,p.resolution==="inherit"?s:p.resolution),d+=p.padding,p.antialias==="off"?c=!1:p.antialias==="inherit"&&c&&(c=r),p.clipToViewport||(y=!1),!!!(p.compatibleRenderers&i.type)){f=!1;break}if(p.blendRequired&&!(((x=i.backBuffer)==null?void 0:x.useBackBuffer)??!0)){K("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),f=!1;break}f=!0,h||(h=p.blendRequired)}if(!f){e.skip=!0;return}if(y&&a.fitBounds(0,t.width/s,0,t.height/s),a.scale(u).ceil().scale(1/u).pad((d|0)*n),!a.isPositive){e.skip=!0;return}e.antialias=c,e.resolution=u,e.blendRequired=h,e.firstEnabledIndex=_,e.lastEnabledIndex=b}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){let e,t=this._filterStackIndex-1;for(;t>0&&(t--,e=this._filterStack[t],!!e.skip););return e}_pushFilterData(){let e=this._filterStack[this._filterStackIndex];return e||(e=this._filterStack[this._filterStackIndex]=new Vt),this._filterStackIndex++,e}}He.extension={type:[m.WebGLSystem,m.WebGPUSystem],name:"filter"};class N extends _t{constructor(e){e instanceof D&&(e={context:e});const{context:t,roundPixels:r,...s}=e||{};super({label:"Graphics",...s}),this.renderPipeId="graphics",t?this._context=t:this._context=this._ownedContext=new D,this._context.on("update",this.onViewUpdate,this),this.didViewUpdate=!0,this.allowChildren=!1,this.roundPixels=r??!1}set context(e){e!==this._context&&(this._context.off("update",this.onViewUpdate,this),this._context=e,this._context.on("update",this.onViewUpdate,this),this.onViewUpdate())}get context(){return this._context}get bounds(){return this._context.bounds}updateBounds(){}containsPoint(e){return this._context.containsPoint(e)}destroy(e){this._ownedContext&&!e?this._ownedContext.destroy(e):(e===!0||(e==null?void 0:e.context)===!0)&&this._context.destroy(e),this._ownedContext=null,this._context=null,super.destroy(e)}_callContextMethod(e,t){return this.context[e](...t),this}setFillStyle(...e){return this._callContextMethod("setFillStyle",e)}setStrokeStyle(...e){return this._callContextMethod("setStrokeStyle",e)}fill(...e){return this._callContextMethod("fill",e)}stroke(...e){return this._callContextMethod("stroke",e)}texture(...e){return this._callContextMethod("texture",e)}beginPath(){return this._callContextMethod("beginPath",[])}cut(){return this._callContextMethod("cut",[])}arc(...e){return this._callContextMethod("arc",e)}arcTo(...e){return this._callContextMethod("arcTo",e)}arcToSvg(...e){return this._callContextMethod("arcToSvg",e)}bezierCurveTo(...e){return this._callContextMethod("bezierCurveTo",e)}closePath(){return this._callContextMethod("closePath",[])}ellipse(...e){return this._callContextMethod("ellipse",e)}circle(...e){return this._callContextMethod("circle",e)}path(...e){return this._callContextMethod("path",e)}lineTo(...e){return this._callContextMethod("lineTo",e)}moveTo(...e){return this._callContextMethod("moveTo",e)}quadraticCurveTo(...e){return this._callContextMethod("quadraticCurveTo",e)}rect(...e){return this._callContextMethod("rect",e)}roundRect(...e){return this._callContextMethod("roundRect",e)}poly(...e){return this._callContextMethod("poly",e)}regularPoly(...e){return this._callContextMethod("regularPoly",e)}roundPoly(...e){return this._callContextMethod("roundPoly",e)}roundShape(...e){return this._callContextMethod("roundShape",e)}filletRect(...e){return this._callContextMethod("filletRect",e)}chamferRect(...e){return this._callContextMethod("chamferRect",e)}star(...e){return this._callContextMethod("star",e)}svg(...e){return this._callContextMethod("svg",e)}restore(...e){return this._callContextMethod("restore",e)}save(){return this._callContextMethod("save",[])}getTransform(){return this.context.getTransform()}resetTransform(){return this._callContextMethod("resetTransform",[])}rotateTransform(...e){return this._callContextMethod("rotate",e)}scaleTransform(...e){return this._callContextMethod("scale",e)}setTransform(...e){return this._callContextMethod("setTransform",e)}transform(...e){return this._callContextMethod("transform",e)}translateTransform(...e){return this._callContextMethod("translate",e)}clear(){return this._callContextMethod("clear",[])}get fillStyle(){return this._context.fillStyle}set fillStyle(e){this._context.fillStyle=e}get strokeStyle(){return this._context.strokeStyle}set strokeStyle(e){this._context.strokeStyle=e}clone(e=!1){return e?new N(this._context.clone()):(this._ownedContext=null,new N(this._context))}lineStyle(e,t,r){v(T,"Graphics#lineStyle is no longer needed. Use Graphics#setStrokeStyle to set the stroke style.");const s={};return e&&(s.width=e),t&&(s.color=t),r&&(s.alpha=r),this.context.strokeStyle=s,this}beginFill(e,t){v(T,"Graphics#beginFill is no longer needed. Use Graphics#fill to fill the shape with the desired style.");const r={};return e!==void 0&&(r.color=e),t!==void 0&&(r.alpha=t),this.context.fillStyle=r,this}endFill(){v(T,"Graphics#endFill is no longer needed. Use Graphics#fill to fill the shape with the desired style."),this.context.fill();const e=this.context.strokeStyle;return(e.width!==D.defaultStrokeStyle.width||e.color!==D.defaultStrokeStyle.color||e.alpha!==D.defaultStrokeStyle.alpha)&&this.context.stroke(),this}drawCircle(...e){return v(T,"Graphics#drawCircle has been renamed to Graphics#circle"),this._callContextMethod("circle",e)}drawEllipse(...e){return v(T,"Graphics#drawEllipse has been renamed to Graphics#ellipse"),this._callContextMethod("ellipse",e)}drawPolygon(...e){return v(T,"Graphics#drawPolygon has been renamed to Graphics#poly"),this._callContextMethod("poly",e)}drawRect(...e){return v(T,"Graphics#drawRect has been renamed to Graphics#rect"),this._callContextMethod("rect",e)}drawRoundedRect(...e){return v(T,"Graphics#drawRoundedRect has been renamed to Graphics#roundRect"),this._callContextMethod("roundRect",e)}drawStar(...e){return v(T,"Graphics#drawStar has been renamed to Graphics#star"),this._callContextMethod("star",e)}}const Ye=class Xe extends ie{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(v(T,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...Xe.defaultOptions,...t};const r=t.positions||new Float32Array([0,0,1,0,1,1,0,1]);let s=t.uvs;s||(t.positions?s=new Float32Array(r.length):s=new Float32Array([0,0,1,0,1,1,0,1]));const n=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,a=new I({data:r,label:"attribute-mesh-positions",shrinkToFit:i,usage:R.VERTEX|R.COPY_DST}),l=new I({data:s,label:"attribute-mesh-uvs",shrinkToFit:i,usage:R.VERTEX|R.COPY_DST}),u=new I({data:n,label:"index-mesh-buffer",shrinkToFit:i,usage:R.INDEX|R.COPY_DST});super({attributes:{aPosition:{buffer:a,format:"float32x2",stride:8,offset:0},aUV:{buffer:l,format:"float32x2",stride:8,offset:0}},indexBuffer:u,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};Ye.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let ce=Ye;const ye="http://www.w3.org/2000/svg",be="http://www.w3.org/1999/xhtml";class Ke{constructor(){this.svgRoot=document.createElementNS(ye,"svg"),this.foreignObject=document.createElementNS(ye,"foreignObject"),this.domElement=document.createElementNS(be,"div"),this.styleElement=document.createElementNS(be,"style");const{foreignObject:e,svgRoot:t,styleElement:r,domElement:s}=this;e.setAttribute("width","10000"),e.setAttribute("height","10000"),e.style.overflow="hidden",t.appendChild(e),e.appendChild(r),e.appendChild(s),this.image=oe.get().createImage()}destroy(){this.svgRoot.remove(),this.foreignObject.remove(),this.styleElement.remove(),this.domElement.remove(),this.image.src="",this.image.remove(),this.svgRoot=null,this.foreignObject=null,this.styleElement=null,this.domElement=null,this.image=null,this.canvasAndContext=null}}let ve;function Lt(o,e,t,r){r||(r=ve||(ve=new Ke));const{domElement:s,styleElement:n,svgRoot:i}=r;s.innerHTML=`<style>${e.cssStyle};</style><div style='padding:0'>${o}</div>`,s.setAttribute("style","transform-origin: top left; display: inline-block"),t&&(n.textContent=t),document.body.appendChild(i);const a=s.getBoundingClientRect();i.remove();const l=e.padding*2;return{width:a.width-l,height:a.height-l}}class Ht{constructor(){this.batches=[],this.batched=!1}destroy(){this.batches.forEach(e=>{j.return(e)}),this.batches.length=0}}class $e{constructor(e,t){this.state=$.for2d(),this.renderer=e,this._adaptor=t,this.renderer.runners.contextChange.add(this)}contextChange(){this._adaptor.contextChange(this.renderer)}validateRenderable(e){const t=e.context,r=!!e._gpuData,s=this.renderer.graphicsContext.updateGpuContext(t);return!!(s.isBatchable||r!==s.isBatchable)}addRenderable(e,t){const r=this.renderer.graphicsContext.updateGpuContext(e.context);e.didViewUpdate&&this._rebuild(e),r.isBatchable?this._addToBatcher(e,t):(this.renderer.renderPipes.batch.break(t),t.add(e))}updateRenderable(e){const r=this._getGpuDataForRenderable(e).batches;for(let s=0;s<r.length;s++){const n=r[s];n._batcher.updateElement(n)}}execute(e){if(!e.isRenderable)return;const t=this.renderer,r=e.context;if(!t.graphicsContext.getGpuContext(r).batches.length)return;const n=r.customShader||this._adaptor.shader;this.state.blendMode=e.groupBlendMode;const i=n.resources.localUniforms.uniforms;i.uTransformMatrix=e.groupTransform,i.uRound=t._roundPixels|e._roundPixels,q(e.groupColorAlpha,i.uColor,0),this._adaptor.execute(this,e)}_rebuild(e){const t=this._getGpuDataForRenderable(e),r=this.renderer.graphicsContext.updateGpuContext(e.context);t.destroy(),r.isBatchable&&this._updateBatchesForRenderable(e,t)}_addToBatcher(e,t){const r=this.renderer.renderPipes.batch,s=this._getGpuDataForRenderable(e).batches;for(let n=0;n<s.length;n++){const i=s[n];r.addToBatch(i,t)}}_getGpuDataForRenderable(e){return e._gpuData[this.renderer.uid]||this._initGpuDataForRenderable(e)}_initGpuDataForRenderable(e){const t=new Ht;return e._gpuData[this.renderer.uid]=t,t}_updateBatchesForRenderable(e,t){const r=e.context,s=this.renderer.graphicsContext.getGpuContext(r),n=this.renderer._roundPixels|e._roundPixels;t.batches=s.batches.map(i=>{const a=j.get(yt);return i.copyTo(a),a.renderable=e,a.roundPixels=n,a})}destroy(){this.renderer=null,this._adaptor.destroy(),this._adaptor=null,this.state=null}}$e.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"graphics"};const je=class Ne extends ce{constructor(...e){super({});let t=e[0]??{};typeof t=="number"&&(v(T,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),t={width:t,height:e[1],verticesX:e[2],verticesY:e[3]}),this.build(t)}build(e){e={...Ne.defaultOptions,...e},this.verticesX=this.verticesX??e.verticesX,this.verticesY=this.verticesY??e.verticesY,this.width=this.width??e.width,this.height=this.height??e.height;const t=this.verticesX*this.verticesY,r=[],s=[],n=[],i=this.verticesX-1,a=this.verticesY-1,l=this.width/i,u=this.height/a;for(let c=0;c<t;c++){const h=c%this.verticesX,f=c/this.verticesX|0;r.push(h*l,f*u),s.push(h/i,f/a)}const d=i*a;for(let c=0;c<d;c++){const h=c%i,f=c/i|0,y=f*this.verticesX+h,_=f*this.verticesX+h+1,b=(f+1)*this.verticesX+h,x=(f+1)*this.verticesX+h+1;n.push(y,_,b,_,x,b)}this.buffers[0].data=new Float32Array(r),this.buffers[1].data=new Float32Array(s),this.indexBuffer.data=new Uint32Array(n),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};je.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let Yt=je;class de{constructor(){this.batcherName="default",this.packAsQuad=!1,this.indexOffset=0,this.attributeOffset=0,this.roundPixels=0,this._batcher=null,this._batch=null,this._textureMatrixUpdateId=-1,this._uvUpdateId=-1}get blendMode(){return this.renderable.groupBlendMode}get topology(){return this._topology||this.geometry.topology}set topology(e){this._topology=e}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.geometry=null,this._uvUpdateId=-1,this._textureMatrixUpdateId=-1}setTexture(e){this.texture!==e&&(this.texture=e,this._textureMatrixUpdateId=-1)}get uvs(){const t=this.geometry.getBuffer("aUV"),r=t.data;let s=r;const n=this.texture.textureMatrix;return n.isSimple||(s=this._transformedUvs,(this._textureMatrixUpdateId!==n._updateID||this._uvUpdateId!==t._updateID)&&((!s||s.length<r.length)&&(s=this._transformedUvs=new Float32Array(r.length)),this._textureMatrixUpdateId=n._updateID,this._uvUpdateId=t._updateID,n.multiplyUvs(r,s))),s}get positions(){return this.geometry.positions}get indices(){return this.geometry.indices}get color(){return this.renderable.groupColorAlpha}get groupTransform(){return this.renderable.groupTransform}get attributeSize(){return this.geometry.positions.length/2}get indexSize(){return this.geometry.indices.length}}class Te{destroy(){}}class qe{constructor(e,t){this.localUniforms=new k({uTransformMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),this.localUniformsBindGroup=new Be({0:this.localUniforms}),this.renderer=e,this._adaptor=t,this._adaptor.init()}validateRenderable(e){const t=this._getMeshData(e),r=t.batched,s=e.batched;if(t.batched=s,r!==s)return!0;if(s){const n=e._geometry;if(n.indices.length!==t.indexSize||n.positions.length!==t.vertexSize)return t.indexSize=n.indices.length,t.vertexSize=n.positions.length,!0;const i=this._getBatchableMesh(e);return i.texture.uid!==e._texture.uid&&(i._textureMatrixUpdateId=-1),!i._batcher.checkAndUpdateTexture(i,e._texture)}return!1}addRenderable(e,t){var n,i;const r=this.renderer.renderPipes.batch,s=this._getMeshData(e);if(e.didViewUpdate&&(s.indexSize=(n=e._geometry.indices)==null?void 0:n.length,s.vertexSize=(i=e._geometry.positions)==null?void 0:i.length),s.batched){const a=this._getBatchableMesh(e);a.setTexture(e._texture),a.geometry=e._geometry,r.addToBatch(a,t)}else r.break(t),t.add(e)}updateRenderable(e){if(e.batched){const t=this._getBatchableMesh(e);t.setTexture(e._texture),t.geometry=e._geometry,t._batcher.updateElement(t)}}execute(e){if(!e.isRenderable)return;e.state.blendMode=le(e.groupBlendMode,e.texture._source);const t=this.localUniforms;t.uniforms.uTransformMatrix=e.groupTransform,t.uniforms.uRound=this.renderer._roundPixels|e._roundPixels,t.update(),q(e.groupColorAlpha,t.uniforms.uColor,0),this._adaptor.execute(this,e)}_getMeshData(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new Te),e._gpuData[this.renderer.uid].meshData||this._initMeshData(e)}_initMeshData(e){return e._gpuData[this.renderer.uid].meshData={batched:e.batched,indexSize:0,vertexSize:0},e._gpuData[this.renderer.uid].meshData}_getBatchableMesh(e){var t,r;return(t=e._gpuData)[r=this.renderer.uid]||(t[r]=new Te),e._gpuData[this.renderer.uid].batchableMesh||this._initBatchableMesh(e)}_initBatchableMesh(e){const t=new de;return t.renderable=e,t.setTexture(e._texture),t.transform=e.groupTransform,t.roundPixels=this.renderer._roundPixels|e._roundPixels,e._gpuData[this.renderer.uid].batchableMesh=t,t}destroy(){this.localUniforms=null,this.localUniformsBindGroup=null,this._adaptor.destroy(),this._adaptor=null,this.renderer=null}}qe.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"mesh"};class Xt{execute(e,t){const r=e.state,s=e.renderer,n=t.shader||e.defaultShader;n.resources.uTexture=t.texture._source,n.resources.uniforms=e.localUniforms;const i=s.gl,a=e.getBuffers(t);s.shader.bind(n),s.state.set(r),s.geometry.bind(a.geometry,n.glProgram);const u=a.geometry.indexBuffer.data.BYTES_PER_ELEMENT===2?i.UNSIGNED_SHORT:i.UNSIGNED_INT;i.drawElements(i.TRIANGLES,t.particleChildren.length*6,u,0)}}class Kt{execute(e,t){const r=e.renderer,s=t.shader||e.defaultShader;s.groups[0]=r.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms,!0),s.groups[1]=r.texture.getTextureBindGroup(t.texture);const n=e.state,i=e.getBuffers(t);r.encoder.draw({geometry:i.geometry,shader:t.shader||e.defaultShader,state:n,size:t.particleChildren.length*6})}}function we(o,e=null){const t=o*6;if(t>65535?e||(e=new Uint32Array(t)):e||(e=new Uint16Array(t)),e.length!==t)throw new Error(`Out buffer length is incorrect, got ${e.length} and expected ${t}`);for(let r=0,s=0;r<t;r+=6,s+=4)e[r+0]=s+0,e[r+1]=s+1,e[r+2]=s+2,e[r+3]=s+0,e[r+4]=s+2,e[r+5]=s+3;return e}function $t(o){return{dynamicUpdate:Ce(o,!0),staticUpdate:Ce(o,!1)}}function Ce(o,e){const t=[];t.push(`

        var index = 0;

        for (let i = 0; i < ps.length; ++i)
        {
            const p = ps[i];

            `);let r=0;for(const n in o){const i=o[n];if(e!==i.dynamic)continue;t.push(`offset = index + ${r}`),t.push(i.code);const a=se(i.format);r+=a.stride/4}t.push(`
            index += stride * 4;
        }
    `),t.unshift(`
        var stride = ${r};
    `);const s=t.join(`
`);return new Function("ps","f32v","u32v",s)}class jt{constructor(e){this._size=0,this._generateParticleUpdateCache={};const t=this._size=e.size??1e3,r=e.properties;let s=0,n=0;for(const d in r){const c=r[d],h=se(c.format);c.dynamic?n+=h.stride:s+=h.stride}this._dynamicStride=n/4,this._staticStride=s/4,this.staticAttributeBuffer=new L(t*4*s),this.dynamicAttributeBuffer=new L(t*4*n),this.indexBuffer=we(t);const i=new ie;let a=0,l=0;this._staticBuffer=new I({data:new Float32Array(1),label:"static-particle-buffer",shrinkToFit:!1,usage:R.VERTEX|R.COPY_DST}),this._dynamicBuffer=new I({data:new Float32Array(1),label:"dynamic-particle-buffer",shrinkToFit:!1,usage:R.VERTEX|R.COPY_DST});for(const d in r){const c=r[d],h=se(c.format);c.dynamic?(i.addAttribute(c.attributeName,{buffer:this._dynamicBuffer,stride:this._dynamicStride*4,offset:a*4,format:c.format}),a+=h.size):(i.addAttribute(c.attributeName,{buffer:this._staticBuffer,stride:this._staticStride*4,offset:l*4,format:c.format}),l+=h.size)}i.addIndex(this.indexBuffer);const u=this.getParticleUpdate(r);this._dynamicUpload=u.dynamicUpdate,this._staticUpload=u.staticUpdate,this.geometry=i}getParticleUpdate(e){const t=Nt(e);return this._generateParticleUpdateCache[t]?this._generateParticleUpdateCache[t]:(this._generateParticleUpdateCache[t]=this.generateParticleUpdate(e),this._generateParticleUpdateCache[t])}generateParticleUpdate(e){return $t(e)}update(e,t){e.length>this._size&&(t=!0,this._size=Math.max(e.length,this._size*1.5|0),this.staticAttributeBuffer=new L(this._size*this._staticStride*4*4),this.dynamicAttributeBuffer=new L(this._size*this._dynamicStride*4*4),this.indexBuffer=we(this._size),this.geometry.indexBuffer.setDataWithSize(this.indexBuffer,this.indexBuffer.byteLength,!0));const r=this.dynamicAttributeBuffer;if(this._dynamicUpload(e,r.float32View,r.uint32View),this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View,e.length*this._dynamicStride*4,!0),t){const s=this.staticAttributeBuffer;this._staticUpload(e,s.float32View,s.uint32View),this._staticBuffer.setDataWithSize(s.float32View,e.length*this._staticStride*4,!0)}}destroy(){this._staticBuffer.destroy(),this._dynamicBuffer.destroy(),this.geometry.destroy()}}function Nt(o){const e=[];for(const t in o){const r=o[t];e.push(t,r.code,r.dynamic?"d":"s")}return e.join("_")}var qt=`varying vec2 vUV;
varying vec4 vColor;

uniform sampler2D uTexture;

void main(void){
    vec4 color = texture2D(uTexture, vUV) * vColor;
    gl_FragColor = color;
}`,Qt=`attribute vec2 aVertex;
attribute vec2 aUV;
attribute vec4 aColor;

attribute vec2 aPosition;
attribute float aRotation;

uniform mat3 uTranslationMatrix;
uniform float uRound;
uniform vec2 uResolution;
uniform vec4 uColor;

varying vec2 vUV;
varying vec4 vColor;

vec2 roundPixels(vec2 position, vec2 targetSize)
{       
    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

void main(void){
    float cosRotation = cos(aRotation);
    float sinRotation = sin(aRotation);
    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;
    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;

    vec2 v = vec2(x, y);
    v = v + aPosition;

    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    if(uRound == 1.0)
    {
        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
    }

    vUV = aUV;
    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;
}
`,Se=`
struct ParticleUniforms {
  uTranslationMatrix:mat3x3<f32>,
  uColor:vec4<f32>,
  uRound:f32,
  uResolution:vec2<f32>,
};

fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
{
  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
}

@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;

@group(1) @binding(0) var uTexture: texture_2d<f32>;
@group(1) @binding(1) var uSampler : sampler;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>,
    @location(1) color : vec4<f32>,
  };
@vertex
fn mainVertex(
  @location(0) aVertex: vec2<f32>,
  @location(1) aPosition: vec2<f32>,
  @location(2) aUV: vec2<f32>,
  @location(3) aColor: vec4<f32>,
  @location(4) aRotation: f32,
) -> VSOutput {
  
   let v = vec2(
       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),
       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)
   ) + aPosition;

   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

   if(uniforms.uRound == 1.0) {
       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);
   }

    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;

  return VSOutput(
   position,
   aUV,
   vColor,
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
  @location(1) color: vec4<f32>,
  @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {

    var sample = textureSample(uTexture, uSampler, uv) * color;
   
    return sample;
}`;class Jt extends ue{constructor(){const e=Re.from({vertex:Qt,fragment:qt}),t=Me.from({fragment:{source:Se,entryPoint:"mainFragment"},vertex:{source:Se,entryPoint:"mainVertex"}});super({glProgram:e,gpuProgram:t,resources:{uTexture:S.WHITE.source,uSampler:new W({}),uniforms:{uTranslationMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Fe(16777215),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}}})}}class Qe{constructor(e,t){this.state=$.for2d(),this.localUniforms=new k({uTranslationMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Float32Array(4),type:"vec4<f32>"},uRound:{value:1,type:"f32"},uResolution:{value:[0,0],type:"vec2<f32>"}}),this.renderer=e,this.adaptor=t,this.defaultShader=new Jt,this.state=$.for2d()}validateRenderable(e){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}getBuffers(e){return e._gpuData[this.renderer.uid]||this._initBuffer(e)}_initBuffer(e){return e._gpuData[this.renderer.uid]=new jt({size:e.particleChildren.length,properties:e._properties}),e._gpuData[this.renderer.uid]}updateRenderable(e){}execute(e){const t=e.particleChildren;if(t.length===0)return;const r=this.renderer,s=this.getBuffers(e);e.texture||(e.texture=t[0].texture);const n=this.state;s.update(t,e._childrenDirty),e._childrenDirty=!1,n.blendMode=le(e.blendMode,e.texture._source);const i=this.localUniforms.uniforms,a=i.uTranslationMatrix;e.worldTransform.copyTo(a),a.prepend(r.globalUniforms.globalUniformData.projectionMatrix),i.uResolution=r.globalUniforms.globalUniformData.resolution,i.uRound=r._roundPixels|e._roundPixels,q(e.groupColorAlpha,i.uColor,0),this.adaptor.execute(this,e)}destroy(){this.renderer=null,this.defaultShader&&(this.defaultShader.destroy(),this.defaultShader=null)}}class Je extends Qe{constructor(e){super(e,new Xt)}}Je.extension={type:[m.WebGLPipes],name:"particle"};class Ze extends Qe{constructor(e){super(e,new Kt)}}Ze.extension={type:[m.WebGPUPipes],name:"particle"};const et=class tt extends Yt{constructor(e={}){e={...tt.defaultOptions,...e},super({width:e.width,height:e.height,verticesX:4,verticesY:4}),this.update(e)}update(e){var t,r;this.width=e.width??this.width,this.height=e.height??this.height,this._originalWidth=e.originalWidth??this._originalWidth,this._originalHeight=e.originalHeight??this._originalHeight,this._leftWidth=e.leftWidth??this._leftWidth,this._rightWidth=e.rightWidth??this._rightWidth,this._topHeight=e.topHeight??this._topHeight,this._bottomHeight=e.bottomHeight??this._bottomHeight,this._anchorX=(t=e.anchor)==null?void 0:t.x,this._anchorY=(r=e.anchor)==null?void 0:r.y,this.updateUvs(),this.updatePositions()}updatePositions(){const e=this.positions,{width:t,height:r,_leftWidth:s,_rightWidth:n,_topHeight:i,_bottomHeight:a,_anchorX:l,_anchorY:u}=this,d=s+n,c=t>d?1:t/d,h=i+a,f=r>h?1:r/h,y=Math.min(c,f),_=l*t,b=u*r;e[0]=e[8]=e[16]=e[24]=-_,e[2]=e[10]=e[18]=e[26]=s*y-_,e[4]=e[12]=e[20]=e[28]=t-n*y-_,e[6]=e[14]=e[22]=e[30]=t-_,e[1]=e[3]=e[5]=e[7]=-b,e[9]=e[11]=e[13]=e[15]=i*y-b,e[17]=e[19]=e[21]=e[23]=r-a*y-b,e[25]=e[27]=e[29]=e[31]=r-b,this.getBuffer("aPosition").update()}updateUvs(){const e=this.uvs;e[0]=e[8]=e[16]=e[24]=0,e[1]=e[3]=e[5]=e[7]=0,e[6]=e[14]=e[22]=e[30]=1,e[25]=e[27]=e[29]=e[31]=1;const t=1/this._originalWidth,r=1/this._originalHeight;e[2]=e[10]=e[18]=e[26]=t*this._leftWidth,e[9]=e[11]=e[13]=e[15]=r*this._topHeight,e[4]=e[12]=e[20]=e[28]=1-t*this._rightWidth,e[17]=e[19]=e[21]=e[23]=1-r*this._bottomHeight,this.getBuffer("aUV").update()}};et.defaultOptions={width:100,height:100,leftWidth:10,topHeight:10,rightWidth:10,bottomHeight:10,originalWidth:100,originalHeight:100};let Zt=et;class er extends de{constructor(){super(),this.geometry=new Zt}destroy(){this.geometry.destroy()}}class rt{constructor(e){this._renderer=e}addRenderable(e,t){const r=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,r),this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuSprite(e);e.didViewUpdate&&this._updateBatchableSprite(e,t),t._batcher.updateElement(t)}validateRenderable(e){const t=this._getGpuSprite(e);return!t._batcher.checkAndUpdateTexture(t,e._texture)}_updateBatchableSprite(e,t){t.geometry.update(e),t.setTexture(e._texture)}_getGpuSprite(e){return e._gpuData[this._renderer.uid]||this._initGPUSprite(e)}_initGPUSprite(e){const t=e._gpuData[this._renderer.uid]=new er,r=t;return r.renderable=e,r.transform=e.groupTransform,r.texture=e._texture,r.roundPixels=this._renderer._roundPixels|e._roundPixels,e.didViewUpdate||this._updateBatchableSprite(e,r),t}destroy(){this._renderer=null}}rt.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"nineSliceSprite"};const tr={name:"tiling-bit",vertex:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`
            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;

            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;
        `},fragment:{header:`
            struct TilingUniforms {
                uMapCoord:mat3x3<f32>,
                uClampFrame:vec4<f32>,
                uClampOffset:vec2<f32>,
                uTextureTransform:mat3x3<f32>,
                uSizeAnchor:vec4<f32>
            };

            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;
            @group(2) @binding(1) var uTexture: texture_2d<f32>;
            @group(2) @binding(2) var uSampler: sampler;
        `,main:`

            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);
            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;
            var unclamped = coord;
            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);

            var bias = 0.;

            if(unclamped.x == coord.x && unclamped.y == coord.y)
            {
                bias = -32.;
            }

            outColor = textureSampleBias(uTexture, uSampler, coord, bias);
        `}},rr={name:"tiling-bit",vertex:{header:`
            uniform mat3 uTextureTransform;
            uniform vec4 uSizeAnchor;

        `,main:`
            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;

            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;
        `},fragment:{header:`
            uniform sampler2D uTexture;
            uniform mat3 uMapCoord;
            uniform vec4 uClampFrame;
            uniform vec2 uClampOffset;
        `,main:`

        vec2 coord = vUV + ceil(uClampOffset - vUV);
        coord = (uMapCoord * vec3(coord, 1.0)).xy;
        vec2 unclamped = coord;
        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0

        `}};let J,Z;class sr extends ue{constructor(){J??(J=Ge({name:"tiling-sprite-shader",bits:[Ft,tr,ze]})),Z??(Z=ke({name:"tiling-sprite-shader",bits:[Mt,rr,Ae]}));const e=new k({uMapCoord:{value:new B,type:"mat3x3<f32>"},uClampFrame:{value:new Float32Array([0,0,1,1]),type:"vec4<f32>"},uClampOffset:{value:new Float32Array([0,0]),type:"vec2<f32>"},uTextureTransform:{value:new B,type:"mat3x3<f32>"},uSizeAnchor:{value:new Float32Array([100,100,.5,.5]),type:"vec4<f32>"}});super({glProgram:Z,gpuProgram:J,resources:{localUniforms:new k({uTransformMatrix:{value:new B,type:"mat3x3<f32>"},uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uRound:{value:0,type:"f32"}}),tilingUniforms:e,uTexture:S.EMPTY.source,uSampler:S.EMPTY.source.style}})}updateUniforms(e,t,r,s,n,i){const a=this.resources.tilingUniforms,l=i.width,u=i.height,d=i.textureMatrix,c=a.uniforms.uTextureTransform;c.set(r.a*l/e,r.b*l/t,r.c*u/e,r.d*u/t,r.tx/e,r.ty/t),c.invert(),a.uniforms.uMapCoord=d.mapCoord,a.uniforms.uClampFrame=d.uClampFrame,a.uniforms.uClampOffset=d.uClampOffset,a.uniforms.uTextureTransform=c,a.uniforms.uSizeAnchor[0]=e,a.uniforms.uSizeAnchor[1]=t,a.uniforms.uSizeAnchor[2]=s,a.uniforms.uSizeAnchor[3]=n,i&&(this.resources.uTexture=i.source,this.resources.uSampler=i.source.style)}}class nr extends ce{constructor(){super({positions:new Float32Array([0,0,1,0,1,1,0,1]),uvs:new Float32Array([0,0,1,0,1,1,0,1]),indices:new Uint32Array([0,1,2,0,2,3])})}}function ir(o,e){const t=o.anchor.x,r=o.anchor.y;e[0]=-t*o.width,e[1]=-r*o.height,e[2]=(1-t)*o.width,e[3]=-r*o.height,e[4]=(1-t)*o.width,e[5]=(1-r)*o.height,e[6]=-t*o.width,e[7]=(1-r)*o.height}function ar(o,e,t,r){let s=0;const n=o.length/e,i=r.a,a=r.b,l=r.c,u=r.d,d=r.tx,c=r.ty;for(t*=e;s<n;){const h=o[t],f=o[t+1];o[t]=i*h+l*f+d,o[t+1]=a*h+u*f+c,t+=e,s++}}function or(o,e){const t=o.texture,r=t.frame.width,s=t.frame.height;let n=0,i=0;o.applyAnchorToTexture&&(n=o.anchor.x,i=o.anchor.y),e[0]=e[6]=-n,e[2]=e[4]=1-n,e[1]=e[3]=-i,e[5]=e[7]=1-i;const a=B.shared;a.copyFrom(o._tileTransform.matrix),a.tx/=o.width,a.ty/=o.height,a.invert(),a.scale(o.width/r,o.height/s),ar(e,2,0,a)}const Y=new nr;class lr{constructor(){this.canBatch=!0,this.geometry=new ce({indices:Y.indices.slice(),positions:Y.positions.slice(),uvs:Y.uvs.slice()})}destroy(){var e;this.geometry.destroy(),(e=this.shader)==null||e.destroy()}}class st{constructor(e){this._state=$.default2d,this._renderer=e}validateRenderable(e){const t=this._getTilingSpriteData(e),r=t.canBatch;this._updateCanBatch(e);const s=t.canBatch;if(s&&s===r){const{batchableMesh:n}=t;return!n._batcher.checkAndUpdateTexture(n,e.texture)}return r!==s}addRenderable(e,t){const r=this._renderer.renderPipes.batch;this._updateCanBatch(e);const s=this._getTilingSpriteData(e),{geometry:n,canBatch:i}=s;if(i){s.batchableMesh||(s.batchableMesh=new de);const a=s.batchableMesh;e.didViewUpdate&&(this._updateBatchableMesh(e),a.geometry=n,a.renderable=e,a.transform=e.groupTransform,a.setTexture(e._texture)),a.roundPixels=this._renderer._roundPixels|e._roundPixels,r.addToBatch(a,t)}else r.break(t),s.shader||(s.shader=new sr),this.updateRenderable(e),t.add(e)}execute(e){const{shader:t}=this._getTilingSpriteData(e);t.groups[0]=this._renderer.globalUniforms.bindGroup;const r=t.resources.localUniforms.uniforms;r.uTransformMatrix=e.groupTransform,r.uRound=this._renderer._roundPixels|e._roundPixels,q(e.groupColorAlpha,r.uColor,0),this._state.blendMode=le(e.groupBlendMode,e.texture._source),this._renderer.encoder.draw({geometry:Y,shader:t,state:this._state})}updateRenderable(e){const t=this._getTilingSpriteData(e),{canBatch:r}=t;if(r){const{batchableMesh:s}=t;e.didViewUpdate&&this._updateBatchableMesh(e),s._batcher.updateElement(s)}else if(e.didViewUpdate){const{shader:s}=t;s.updateUniforms(e.width,e.height,e._tileTransform.matrix,e.anchor.x,e.anchor.y,e.texture)}}_getTilingSpriteData(e){return e._gpuData[this._renderer.uid]||this._initTilingSpriteData(e)}_initTilingSpriteData(e){const t=new lr;return t.renderable=e,e._gpuData[this._renderer.uid]=t,t}_updateBatchableMesh(e){const t=this._getTilingSpriteData(e),{geometry:r}=t,s=e.texture.source.style;s.addressMode!=="repeat"&&(s.addressMode="repeat",s.update()),or(e,r.uvs),ir(e,r.positions)}destroy(){this._renderer=null}_updateCanBatch(e){const t=this._getTilingSpriteData(e),r=e.texture;let s=!0;return this._renderer.type===ae.WEBGL&&(s=this._renderer.context.supports.nonPowOf2wrapping),t.canBatch=r.textureMatrix.isSimple&&(s||r.source.isPowerOfTwo),t.canBatch}}st.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"tilingSprite"};const ur={name:"local-uniform-msdf-bit",vertex:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32,
                uRound:f32,
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `},fragment:{header:`
            struct LocalUniforms {
                uColor:vec4<f32>,
                uTransformMatrix:mat3x3<f32>,
                uDistance: f32
            }

            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;
         `,main:`
            outColor = vec4<f32>(calculateMSDFAlpha(outColor, localUniforms.uColor, localUniforms.uDistance));
        `}},cr={name:"local-uniform-msdf-bit",vertex:{header:`
            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix *= uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `},fragment:{header:`
            uniform float uDistance;
         `,main:`
            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));
        `}},dr={name:"msdf-bit",fragment:{header:`
            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {

                // MSDF
                var median = msdfColor.r + msdfColor.g + msdfColor.b -
                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                var screenPxDistance = distance * (median - 0.5);
                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);
                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));
                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);
                var coverage: f32 = pow(shapeColor.a * alpha, gamma);

                return coverage;

            }
        `}},hr={name:"msdf-bit",fragment:{header:`
            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {

                // MSDF
                float median = msdfColor.r + msdfColor.g + msdfColor.b -
                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -
                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));

                // SDF
                median = min(median, msdfColor.a);

                float screenPxDistance = distance * (median - 0.5);
                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);

                if (median < 0.01) {
                    alpha = 0.0;
                } else if (median > 0.99) {
                    alpha = 1.0;
                }

                // Gamma correction for coverage-like alpha
                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));
                float gamma = mix(1.0, 1.0 / 2.2, luma);
                float coverage = pow(shapeColor.a * alpha, gamma);

                return coverage;
            }
        `}};let ee,te;class fr extends ue{constructor(e){const t=new k({uColor:{value:new Float32Array([1,1,1,1]),type:"vec4<f32>"},uTransformMatrix:{value:new B,type:"mat3x3<f32>"},uDistance:{value:4,type:"f32"},uRound:{value:0,type:"f32"}});ee??(ee=Ge({name:"sdf-shader",bits:[bt,vt(e),ur,dr,ze]})),te??(te=ke({name:"sdf-shader",bits:[Tt,wt(e),cr,hr,Ae]})),super({glProgram:te,gpuProgram:ee,resources:{localUniforms:t,batchSamplers:Ct(e)}})}}class pr extends N{destroy(){this.context.customShader&&this.context.customShader.destroy(),super.destroy()}}class nt{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuBitmapText(e);return this._renderer.renderPipes.graphics.validateRenderable(t)}addRenderable(e,t){const r=this._getGpuBitmapText(e);Pe(e,r),e._didTextUpdate&&(e._didTextUpdate=!1,this._updateContext(e,r)),this._renderer.renderPipes.graphics.addRenderable(r,t),r.context.customShader&&this._updateDistanceField(e)}updateRenderable(e){const t=this._getGpuBitmapText(e);Pe(e,t),this._renderer.renderPipes.graphics.updateRenderable(t),t.context.customShader&&this._updateDistanceField(e)}_updateContext(e,t){const{context:r}=t,s=At.getFont(e.text,e._style);r.clear(),s.distanceField.type!=="none"&&(r.customShader||(r.customShader=new fr(this._renderer.limits.maxBatchableTextures)));const n=O.graphemeSegmenter(e.text),i=e._style;let a=s.baseLineOffset;const l=Ve(n,i,s,!0),u=i.padding,d=l.scale;let c=l.width,h=l.height+l.offsetY;i._stroke&&(c+=i._stroke.width/d,h+=i._stroke.width/d),r.translate(-e._anchor._x*c-u,-e._anchor._y*h-u).scale(d,d);const f=s.applyFillAsTint?i._fill.color:16777215;let y=s.fontMetrics.fontSize,_=s.lineHeight;i.lineHeight&&(y=i.fontSize/d,_=i.lineHeight/d);let b=(_-y)/2;b-s.baseLineOffset<0&&(b=0);for(let x=0;x<l.lines.length;x++){const g=l.lines[x];for(let p=0;p<g.charPositions.length;p++){const w=g.chars[p],P=s.chars[w];if(P!=null&&P.texture){const G=P.texture;r.texture(G,f||"black",Math.round(g.charPositions[p]+P.xOffset),Math.round(a+P.yOffset+b),G.orig.width,G.orig.height)}}a+=_}}_getGpuBitmapText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new pr;return e._gpuData[this._renderer.uid]=t,this._updateContext(e,t),t}_updateDistanceField(e){const t=this._getGpuBitmapText(e).context,r=e._style.fontFamily,s=F.get(`${r}-bitmap`),{a:n,b:i,c:a,d:l}=e.groupTransform,u=Math.sqrt(n*n+i*i),d=Math.sqrt(a*a+l*l),c=(Math.abs(u)+Math.abs(d))/2,h=s.baseRenderedFontSize/e._style.fontSize,f=c*s.distanceField.range*(1/h);t.customShader.resources.localUniforms.uniforms.uDistance=f}destroy(){this._renderer=null}}nt.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"bitmapText"};function Pe(o,e){e.groupTransform=o.groupTransform,e.groupColorAlpha=o.groupColorAlpha,e.groupColor=o.groupColor,e.groupBlendMode=o.groupBlendMode,e.globalDisplayStatus=o.globalDisplayStatus,e.groupTransform=o.groupTransform,e.localDisplayStatus=o.localDisplayStatus,e.groupAlpha=o.groupAlpha,e._roundPixels=o._roundPixels}class gr extends De{constructor(e){super(),this.generatingTexture=!1,this.currentKey="--",this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{htmlText:e}=this._renderer;e.getReferenceCount(this.currentKey)===null?e.returnTexturePromise(this.texturePromise):e.decreaseReferenceCount(this.currentKey),this._renderer.runners.resolutionChange.remove(this),this.texturePromise=null,this._renderer=null}}function ne(o,e){const{texture:t,bounds:r}=o,s=e._style._getFinalPadding();St(r,e._anchor,t);const n=e._anchor._x*s*2,i=e._anchor._y*s*2;r.minX-=s-n,r.minY-=s-i,r.maxX-=s-n,r.maxY-=s-i}class it{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const s=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==s)&&this._updateGpuText(e).catch(n=>{console.error(n)}),e._didTextUpdate=!1,ne(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}async _updateGpuText(e){e._didTextUpdate=!1;const t=this._getGpuText(e);if(t.generatingTexture)return;const r=t.texturePromise;t.texturePromise=null,t.generatingTexture=!0,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;let s=this._renderer.htmlText.getTexturePromise(e);r&&(s=s.finally(()=>{this._renderer.htmlText.decreaseReferenceCount(t.currentKey),this._renderer.htmlText.returnTexturePromise(r)})),t.texturePromise=s,t.currentKey=e.styleKey,t.texture=await s;const n=e.renderGroup||e.parentRenderGroup;n&&(n.structureDidChange=!0),t.generatingTexture=!1,ne(t,e)}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new gr(this._renderer);return t.renderable=e,t.transform=e.groupTransform,t.texture=S.EMPTY,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}it.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"htmlText"};function mr(){const{userAgent:o}=oe.get().getNavigator();return/^((?!chrome|android).)*safari/i.test(o)}const xr=new Ue;function at(o,e,t,r){const s=xr;s.minX=0,s.minY=0,s.maxX=o.width/r|0,s.maxY=o.height/r|0;const n=M.getOptimalTexture(s.width,s.height,r,!1);return n.source.uploadMethodId="image",n.source.resource=o,n.source.alphaMode="premultiply-alpha-on-upload",n.frame.width=e/r,n.frame.height=t/r,n.source.emit("update",n.source),n.updateUvs(),n}function _r(o,e){const t=e.fontFamily,r=[],s={},n=/font-family:([^;"\s]+)/g,i=o.match(n);function a(l){s[l]||(r.push(l),s[l]=!0)}if(Array.isArray(t))for(let l=0;l<t.length;l++)a(t[l]);else a(t);i&&i.forEach(l=>{const u=l.split(":")[1].trim();a(u)});for(const l in e.tagStyles){const u=e.tagStyles[l].fontFamily;a(u)}return r}async function yr(o){const t=await(await oe.get().fetch(o)).blob(),r=new FileReader;return await new Promise((n,i)=>{r.onloadend=()=>n(r.result),r.onerror=i,r.readAsDataURL(t)})}async function br(o,e){const t=await yr(e);return`@font-face {
        font-family: "${o.fontFamily}";
        font-weight: ${o.fontWeight};
        font-style: ${o.fontStyle};
        src: url('${t}');
    }`}const re=new Map;async function vr(o){const e=o.filter(t=>F.has(`${t}-and-url`)).map(t=>{if(!re.has(t)){const{entries:r}=F.get(`${t}-and-url`),s=[];r.forEach(n=>{const i=n.url,l=n.faces.map(u=>({weight:u.weight,style:u.style}));s.push(...l.map(u=>br({fontWeight:u.weight,fontStyle:u.style,fontFamily:t},i)))}),re.set(t,Promise.all(s).then(n=>n.join(`
`)))}return re.get(t)});return(await Promise.all(e)).join(`
`)}function Tr(o,e,t,r,s){const{domElement:n,styleElement:i,svgRoot:a}=s;n.innerHTML=`<style>${e.cssStyle}</style><div style='padding:0;'>${o}</div>`,n.setAttribute("style",`transform: scale(${t});transform-origin: top left; display: inline-block`),i.textContent=r;const{width:l,height:u}=s.image;return a.setAttribute("width",l.toString()),a.setAttribute("height",u.toString()),new XMLSerializer().serializeToString(a)}function wr(o,e){const t=X.getOptimalCanvasAndContext(o.width,o.height,e),{context:r}=t;return r.clearRect(0,0,o.width,o.height),r.drawImage(o,0,0),t}function Cr(o,e,t){return new Promise(async r=>{t&&await new Promise(s=>setTimeout(s,100)),o.onload=()=>{r()},o.src=`data:image/svg+xml;charset=utf8,${encodeURIComponent(e)}`,o.crossOrigin="anonymous"})}class ot{constructor(e){this._activeTextures={},this._renderer=e,this._createCanvas=e.type===ae.WEBGPU}getTexture(e){return this.getTexturePromise(e)}getManagedTexture(e){const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].promise;const r=this._buildTexturePromise(e).then(s=>(this._activeTextures[t].texture=s,s));return this._activeTextures[t]={texture:null,promise:r,usageCount:1},r}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??null}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}decreaseReferenceCount(e){const t=this._activeTextures[e];t&&(t.usageCount--,t.usageCount===0&&(t.texture?this._cleanUp(t.texture):t.promise.then(r=>{t.texture=r,this._cleanUp(t.texture)}).catch(()=>{K("HTMLTextSystem: Failed to clean texture")}),this._activeTextures[e]=null))}getTexturePromise(e){return this._buildTexturePromise(e)}async _buildTexturePromise(e){const{text:t,style:r,resolution:s,textureStyle:n}=e,i=j.get(Ke),a=_r(t,r),l=await vr(a),u=Lt(t,r,l,i),d=Math.ceil(Math.ceil(Math.max(1,u.width)+r.padding*2)*s),c=Math.ceil(Math.ceil(Math.max(1,u.height)+r.padding*2)*s),h=i.image,f=2;h.width=(d|0)+f,h.height=(c|0)+f;const y=Tr(t,r,s,l,i);await Cr(h,y,mr()&&a.length>0);const _=h;let b;this._createCanvas&&(b=wr(h,s));const x=at(b?b.canvas:_,h.width-f,h.height-f,s);return n&&(x.source.style=n),this._createCanvas&&(this._renderer.texture.initSource(x.source),X.returnCanvasAndContext(b)),j.return(i),x}returnTexturePromise(e){e.then(t=>{this._cleanUp(t)}).catch(()=>{K("HTMLTextSystem: Failed to clean texture")})}_cleanUp(e){M.returnTexture(e,!0),e.source.resource=null,e.source.uploadMethodId="unknown"}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexturePromise(this._activeTextures[e].promise);this._activeTextures=null}}ot.extension={type:[m.WebGLSystem,m.WebGPUSystem,m.CanvasSystem],name:"htmlText"};class Sr extends De{constructor(e){super(),this._renderer=e,e.runners.resolutionChange.add(this)}resolutionChange(){const e=this.renderable;e._autoResolution&&e.onViewUpdate()}destroy(){const{canvasText:e}=this._renderer;e.getReferenceCount(this.currentKey)>0?e.decreaseReferenceCount(this.currentKey):this.texture&&e.returnTexture(this.texture),this._renderer.runners.resolutionChange.remove(this),this._renderer=null}}class lt{constructor(e){this._renderer=e}validateRenderable(e){const t=this._getGpuText(e),r=e.styleKey;return t.currentKey!==r?!0:e._didTextUpdate}addRenderable(e,t){const r=this._getGpuText(e);if(e._didTextUpdate){const s=e._autoResolution?this._renderer.resolution:e.resolution;(r.currentKey!==e.styleKey||e.resolution!==s)&&this._updateGpuText(e),e._didTextUpdate=!1,ne(r,e)}this._renderer.renderPipes.batch.addToBatch(r,t)}updateRenderable(e){const t=this._getGpuText(e);t._batcher.updateElement(t)}_updateGpuText(e){const t=this._getGpuText(e);t.texture&&this._renderer.canvasText.decreaseReferenceCount(t.currentKey),e._resolution=e._autoResolution?this._renderer.resolution:e.resolution,t.texture=this._renderer.canvasText.getManagedTexture(e),t.currentKey=e.styleKey}_getGpuText(e){return e._gpuData[this._renderer.uid]||this.initGpuText(e)}initGpuText(e){const t=new Sr(this._renderer);return t.currentKey="--",t.renderable=e,t.transform=e.groupTransform,t.bounds={minX:0,maxX:1,minY:0,maxY:0},t.roundPixels=this._renderer._roundPixels|e._roundPixels,e._gpuData[this._renderer.uid]=t,t}destroy(){this._renderer=null}}lt.extension={type:[m.WebGLPipes,m.WebGPUPipes,m.CanvasPipes],name:"text"};class ut{constructor(e){this._activeTextures={},this._renderer=e}getTexture(e,t,r,s){typeof e=="string"&&(v("8.0.0","CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"),e={text:e,style:r,resolution:t}),e.style instanceof E||(e.style=new E(e.style)),e.textureStyle instanceof W||(e.textureStyle=new W(e.textureStyle)),typeof e.text!="string"&&(e.text=e.text.toString());const{text:n,style:i,textureStyle:a}=e,l=e.resolution??this._renderer.resolution,{frame:u,canvasAndContext:d}=Q.getCanvasAndContext({text:n,style:i,resolution:l}),c=at(d.canvas,u.width,u.height,l);if(a&&(c.source.style=a),i.trim&&(u.pad(i.padding),c.frame.copyFrom(u),c.frame.scale(1/l),c.updateUvs()),i.filters){const h=this._applyFilters(c,i.filters);return this.returnTexture(c),Q.returnCanvasAndContext(d),h}return this._renderer.texture.initSource(c._source),Q.returnCanvasAndContext(d),c}returnTexture(e){const t=e.source;t.resource=null,t.uploadMethodId="unknown",t.alphaMode="no-premultiply-alpha",M.returnTexture(e,!0)}renderTextToCanvas(){v("8.10.0","CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead")}getManagedTexture(e){e._resolution=e._autoResolution?this._renderer.resolution:e.resolution;const t=e.styleKey;if(this._activeTextures[t])return this._increaseReferenceCount(t),this._activeTextures[t].texture;const r=this.getTexture({text:e.text,style:e.style,resolution:e._resolution,textureStyle:e.textureStyle});return this._activeTextures[t]={texture:r,usageCount:1},r}decreaseReferenceCount(e){const t=this._activeTextures[e];t.usageCount--,t.usageCount===0&&(this.returnTexture(t.texture),this._activeTextures[e]=null)}getReferenceCount(e){var t;return((t=this._activeTextures[e])==null?void 0:t.usageCount)??0}_increaseReferenceCount(e){this._activeTextures[e].usageCount++}_applyFilters(e,t){const r=this._renderer.renderTarget.renderTarget,s=this._renderer.filter.generateFilteredTexture({texture:e,filters:t});return this._renderer.renderTarget.bind(r,!1),s}destroy(){this._renderer=null;for(const e in this._activeTextures)this._activeTextures[e]&&this.returnTexture(this._activeTextures[e].texture);this._activeTextures=null}}ut.extension={type:[m.WebGLSystem,m.WebGPUSystem,m.CanvasSystem],name:"canvasText"};C.add(Oe);C.add(Ie);C.add($e);C.add(Pt);C.add(qe);C.add(Je);C.add(Ze);C.add(ut);C.add(lt);C.add(nt);C.add(ot);C.add(it);C.add(st);C.add(rt);C.add(He);C.add(Le);
