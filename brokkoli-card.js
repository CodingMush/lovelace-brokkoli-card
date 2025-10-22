/*! For license information please see brokkoli-card.js.LICENSE.txt */
(()=>{"use strict";var t={4147:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0});const n=i(4356),s=i(2823),a=i(4135),o=i(3167);class r extends s.LitElement{constructor(){super(...arguments),this.controlRenderers={[a.FormControlType.Dropdown]:o.renderDropdown,[a.FormControlType.Radio]:o.renderRadio,[a.FormControlType.Checkboxes]:o.renderCheckboxes,[a.FormControlType.EntityDropdown]:o.renderDropdown,[a.FormControlType.Switch]:o.renderSwitch,[a.FormControlType.Textbox]:o.renderTextbox,[a.FormControlType.Filler]:o.renderFiller}}setConfig(t){this._config=t,this.requestUpdate("_config")}set hass(t){this._hass=t}renderForm(t){return s.html`
            <div class="card-config">
                ${t.map((t=>{const e=t.cssClass?`form-row ${t.cssClass}`:"form-row";return t.hidden?"":s.html`
                        <div class="${e}">
                            <label>${t.label}</label>
                            ${t.controls.map((t=>this.renderControl(t)))}
                        </div>
                        `}))}            
            </div>
            `}renderControl(t){const e=this.controlRenderers[t.type];if(!e)throw new Error(`Unsupported control type: ${t.type}`);return e(this,t)}_valueChanged(t){if(!this._config||!this._hass)return;const e=t.target,i=t.detail;if("HA-CHECKBOX"===e.tagName){const t=this._config[e.configValue].indexOf(e.value);let i;i=e.checked&&t<0?[...this._config[e.configValue],e.value]:!e.checked&&t>-1?[...this._config[e.configValue].slice(0,t),...this._config[e.configValue].slice(t+1)]:this._config[e.configValue],this._config={...this._config,[e.configValue]:i}}else if(e.configValue)if(e.configValue.indexOf(".")>-1){const[t,i]=e.configValue.split(".");this._config={...this._config,[t]:{...this._config[t],[i]:e.checked}}}else this._config={...this._config,[e.configValue]:void 0===e.checked&&(null==i?void 0:i.value)?e.checked||i.value:e.value||e.checked};(0,n.fireEvent)(this,"config-changed",{config:this._config},{bubbles:!0,composed:!0}),this.requestUpdate("_config")}static get styles(){return s.css`
            .form-row {
                margin-bottom: 10px;
            }
            .form-control {
                display: flex;
                align-items: center;
            }
            ha-switch {
                padding: 16px 6px;
            }
            .side-by-side {
                display: flex;
                flex-flow: row wrap;
            }            
            .side-by-side > label {
                width: 100%;
            }
            .side-by-side > .form-control {
                width: 49%;
                padding: 2px;
            }
            ha-textfield { 
                width: 100%;
            }
        `}}e.default=r},4135:(t,e)=>{var i;Object.defineProperty(e,"__esModule",{value:!0}),e.FormControlType=void 0,function(t){t.Dropdown="dropdown",t.Checkbox="checkbox",t.Checkboxes="checkboxes",t.Radio="radio",t.Switch="switch",t.Textbox="textbox",t.Filler="filler",t.EntityDropdown="entity-dropdown"}(i||(e.FormControlType=i={}))},3167:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.renderCheckboxes=e.renderRadio=e.renderDropdown=e.renderSwitch=e.renderTextbox=e.renderEntityDropdown=e.renderFiller=void 0;const n=i(2823),s=i(5770);e.renderFiller=()=>n.html`<div class="form-control"></div>`,e.renderEntityDropdown=(t,e)=>{var i;return n.html`
    <div class="form-control">
        <ha-entity-picker
            label="${e.label}"
            .value="${null!==(i=t._config[e.configValue])&&void 0!==i?i:""}"
            .configValue="${e.configValue}"
            .hass="${t._hass}"
            domain-filter="${e.domain}"
            @change="${t._valueChanged}">
        </ha-entity-picker>
    </div>
    `},e.renderTextbox=(t,e)=>{var i;return n.html`
    <div class="form-control">
        <ha-textfield
            label="${e.label}"
            .value="${null!==(i=t._config[e.configValue])&&void 0!==i?i:""}"
            .configValue="${e.configValue}"
            @change="${t._valueChanged}">
        </ha-textfield>
    </div>
    `},e.renderSwitch=(t,e)=>n.html`
    <div class="form-control">
        <ha-switch
            id="${e.configValue}"
            name="${e.configValue}"
            .checked="${t._config[e.configValue]}"
            .configValue="${e.configValue}"
            @change="${t._valueChanged}"
        >
        </ha-switch>
        <label for="${e.configValue}">${e.label}</label>
    </div>
    `,e.renderDropdown=(t,e)=>{var i;const a=null!==(i=e.items)&&void 0!==i?i:(0,s.getEntitiesByDomain)(t._hass,e.domain);return n.html`  
    <div class="form-control">
        <ha-combo-box
            label="${e.label}"
            .value="${t._config[e.configValue]}"
            .configValue="${e.configValue}"
            .items="${a}"
            @value-changed="${t._valueChanged}"
            @change=${t._valueChanged}
        ></ha-combo-box>
    </div>
      `},e.renderRadio=(t,e)=>n.html`
        <div class="form-control">
            <label>${e.label}</label>
            ${e.items.map((i=>n.html`
                    <ha-radio
                        id="${e.configValue}_${i.value}"
                        name="${e.configValue}"
                        .checked="${t._config[e.configValue]===i.value}"
                        .configValue="${e.configValue}"
                        .value="${i.value}"
                        @change="${t._valueChanged}"
                    >
                    </ha-radio>
                    <label for="${e.configValue}_${i.value}">${i.label}</label>
                `))}
        </div>
      `,e.renderCheckboxes=(t,e)=>n.html`
        <label>${e.label}</label>
        ${e.items.map((i=>{var s;return n.html`                
            <div class="form-control">
                <ha-checkbox
                    id="${e.configValue}_${i.value}"
                    name="${e.configValue}[]"
                    .checked="${(null===(s=t._config[e.configValue])||void 0===s?void 0:s.indexOf(i.value))>-1}"
                    .configValue="${e.configValue}"
                    .value="${i.value}"
                    @change="${t._valueChanged}"
                >
                </ha-checkbox>
                <label for="${e.configValue}_${i.value}">${i.label}</label>
            </div>
            `}))}
      `},5770:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getDropdownOptionsFromEnum=e.formatList=e.getEntitiesByDeviceClass=e.getEntitiesByDomain=void 0,e.getEntitiesByDomain=(t,i)=>Object.keys(t.states).filter((t=>t.substr(0,t.indexOf("."))===i)).map((i=>(0,e.formatList)(i,t))),e.getEntitiesByDeviceClass=(t,i,n)=>Object.keys(t.states).filter((e=>e.substr(0,e.indexOf("."))===i&&t.states[e].attributes.device_class===n)).map((i=>(0,e.formatList)(i,t))),e.formatList=(t,e)=>({label:e.states[t].attributes.friendly_name,value:t}),e.getDropdownOptionsFromEnum=t=>{const e=[];for(const[i,n]of Object.entries(t))e.push({value:n,label:i});return e}},4356:(t,e,i)=>{i.r(e),i.d(e,{DEFAULT_DOMAIN_ICON:()=>Z,DEFAULT_PANEL:()=>K,DEFAULT_VIEW_ENTITY_ID:()=>rt,DOMAINS_HIDE_MORE_INFO:()=>et,DOMAINS_MORE_INFO_NO_HISTORY:()=>it,DOMAINS_TOGGLE:()=>st,DOMAINS_WITH_CARD:()=>Q,DOMAINS_WITH_MORE_INFO:()=>tt,NumberFormat:()=>n,STATES_OFF:()=>nt,TimeFormat:()=>s,UNIT_C:()=>at,UNIT_F:()=>ot,applyThemesOnElement:()=>L,computeCardSize:()=>N,computeDomain:()=>R,computeEntity:()=>z,computeRTL:()=>H,computeRTLDirection:()=>G,computeStateDisplay:()=>J,computeStateDomain:()=>V,createThing:()=>ht,debounce:()=>ut,domainIcon:()=>mt,evaluateFilter:()=>gt,fireEvent:()=>lt,fixedIcons:()=>pt,formatDate:()=>c,formatDateMonth:()=>_,formatDateMonthYear:()=>f,formatDateNumeric:()=>u,formatDateShort:()=>m,formatDateTime:()=>$,formatDateTimeNumeric:()=>E,formatDateTimeWithSeconds:()=>T,formatDateWeekday:()=>l,formatDateYear:()=>b,formatNumber:()=>Y,formatTime:()=>D,formatTimeWeekday:()=>O,formatTimeWithSeconds:()=>P,forwardHaptic:()=>ft,getLovelace:()=>Et,handleAction:()=>wt,handleActionConfig:()=>bt,handleClick:()=>xt,hasAction:()=>$t,hasConfigOrEntityChanged:()=>kt,hasDoubleClick:()=>Tt,isNumericState:()=>B,navigate:()=>vt,numberFormatToLocale:()=>W,relativeTime:()=>M,round:()=>q,stateIcon:()=>At,timerTimeRemaining:()=>j,toggleEntity:()=>yt,turnOnOffEntities:()=>It,turnOnOffEntity:()=>_t});var n,s,a,o=function(){return o=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var s in e=arguments[i])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t},o.apply(this,arguments)},r={second:45,minute:45,hour:22,day:5},l=function(t,e){return d(e).format(t)},d=function(t){return new Intl.DateTimeFormat(t.language,{weekday:"long",month:"long",day:"numeric"})},c=function(t,e){return h(e).format(t)},h=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric"})},u=function(t,e){return p(e).format(t)},p=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric"})},m=function(t,e){return g(e).format(t)},g=function(t){return new Intl.DateTimeFormat(t.language,{day:"numeric",month:"short"})},f=function(t,e){return v(e).format(t)},v=function(t){return new Intl.DateTimeFormat(t.language,{month:"long",year:"numeric"})},_=function(t,e){return y(e).format(t)},y=function(t){return new Intl.DateTimeFormat(t.language,{month:"long"})},b=function(t,e){return w(e).format(t)},w=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric"})};(a=n||(n={})).language="language",a.system="system",a.comma_decimal="comma_decimal",a.decimal_comma="decimal_comma",a.space_comma="space_comma",a.none="none",function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(s||(s={}));var x=function(t){if(t.time_format===s.language||t.time_format===s.system){var e=t.time_format===s.language?t.language:void 0,i=(new Date).toLocaleString(e);return i.includes("AM")||i.includes("PM")}return t.time_format===s.am_pm},$=function(t,e){return k(e).format(t)},k=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:x(t)?"numeric":"2-digit",minute:"2-digit",hour12:x(t)})},T=function(t,e){return I(e).format(t)},I=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"long",day:"numeric",hour:x(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:x(t)})},E=function(t,e){return S(e).format(t)},S=function(t){return new Intl.DateTimeFormat(t.language,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit",hour12:x(t)})},D=function(t,e){return A(e).format(t)},A=function(t){return new Intl.DateTimeFormat(t.language,{hour:"numeric",minute:"2-digit",hour12:x(t)})},P=function(t,e){return C(e).format(t)},C=function(t){return new Intl.DateTimeFormat(t.language,{hour:x(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:x(t)})},O=function(t,e){return U(e).format(t)},U=function(t){return new Intl.DateTimeFormat(t.language,{hour:x(t)?"numeric":"2-digit",minute:"2-digit",second:"2-digit",hour12:x(t)})},M=function(t,e,i,n){void 0===n&&(n=!0);var s=function(t,e,i){void 0===e&&(e=Date.now()),void 0===i&&(i={});var n=o(o({},r),i||{}),s=(+t-+e)/1e3;if(Math.abs(s)<n.second)return{value:Math.round(s),unit:"second"};var a=s/60;if(Math.abs(a)<n.minute)return{value:Math.round(a),unit:"minute"};var l=s/3600;if(Math.abs(l)<n.hour)return{value:Math.round(l),unit:"hour"};var d=s/86400;if(Math.abs(d)<n.day)return{value:Math.round(d),unit:"day"};var c=new Date(t),h=new Date(e),u=c.getFullYear()-h.getFullYear();if(Math.round(Math.abs(u))>0)return{value:Math.round(u),unit:"year"};var p=12*u+c.getMonth()-h.getMonth();if(Math.round(Math.abs(p))>0)return{value:Math.round(p),unit:"month"};var m=s/604800;return{value:Math.round(m),unit:"week"}}(t,i);return n?function(t){return new Intl.RelativeTimeFormat(t.language,{numeric:"auto"})}(e).format(s.value,s.unit):Intl.NumberFormat(e.language,{style:"unit",unit:s.unit,unitDisplay:"long"}).format(Math.abs(s.value))};function j(t){var e,i=3600*(e=t.attributes.remaining.split(":").map(Number))[0]+60*e[1]+e[2];if("active"===t.state){var n=(new Date).getTime(),s=new Date(t.last_changed).getTime();i=Math.max(i-(n-s)/1e3,0)}return i}function F(){return(F=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t}).apply(this,arguments)}var L=function(t,e,i,n){void 0===n&&(n=!1),t._themes||(t._themes={});var s=e.default_theme;("default"===i||i&&e.themes[i])&&(s=i);var a=F({},t._themes);if("default"!==s){var o=e.themes[s];Object.keys(o).forEach((function(e){var i="--"+e;t._themes[i]="",a[i]=o[e]}))}if(t.updateStyles?t.updateStyles(a):window.ShadyCSS&&window.ShadyCSS.styleSubtree(t,a),n){var r=document.querySelector("meta[name=theme-color]");if(r){r.hasAttribute("default-content")||r.setAttribute("default-content",r.getAttribute("content"));var l=a["--primary-color"]||r.getAttribute("default-content");r.setAttribute("content",l)}}},N=function(t){return"function"==typeof t.getCardSize?t.getCardSize():4};function R(t){return t.substr(0,t.indexOf("."))}function z(t){return t.substr(t.indexOf(".")+1)}function H(t){var e,i=(null==t||null==(e=t.locale)?void 0:e.language)||"en";return t.translationMetadata.translations[i]&&t.translationMetadata.translations[i].isRTL||!1}function G(t){return H(t)?"rtl":"ltr"}function V(t){return R(t.entity_id)}var B=function(t){return!!t.attributes.unit_of_measurement||!!t.attributes.state_class},W=function(t){switch(t.number_format){case n.comma_decimal:return["en-US","en"];case n.decimal_comma:return["de","es","it"];case n.space_comma:return["fr","sv","cs"];case n.system:return;default:return t.language}},q=function(t,e){return void 0===e&&(e=2),Math.round(t*Math.pow(10,e))/Math.pow(10,e)},Y=function(t,e,i){var s=e?W(e):void 0;if(Number.isNaN=Number.isNaN||function t(e){return"number"==typeof e&&t(e)},(null==e?void 0:e.number_format)!==n.none&&!Number.isNaN(Number(t))&&Intl)try{return new Intl.NumberFormat(s,X(t,i)).format(Number(t))}catch(e){return console.error(e),new Intl.NumberFormat(void 0,X(t,i)).format(Number(t))}return"string"==typeof t?t:q(t,null==i?void 0:i.maximumFractionDigits).toString()+("currency"===(null==i?void 0:i.style)?" "+i.currency:"")},X=function(t,e){var i=F({maximumFractionDigits:2},e);if("string"!=typeof t)return i;if(!e||!e.minimumFractionDigits&&!e.maximumFractionDigits){var n=t.indexOf(".")>-1?t.split(".")[1].length:0;i.minimumFractionDigits=n,i.maximumFractionDigits=n}return i},J=function(t,e,i,n){var s=void 0!==n?n:e.state;if("unknown"===s||"unavailable"===s)return t("state.default."+s);if(B(e)){if("monetary"===e.attributes.device_class)try{return Y(s,i,{style:"currency",currency:e.attributes.unit_of_measurement})}catch(t){}return Y(s,i)+(e.attributes.unit_of_measurement?" "+e.attributes.unit_of_measurement:"")}var a=V(e);if("input_datetime"===a){var o;if(void 0===n)return e.attributes.has_date&&e.attributes.has_time?(o=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day,e.attributes.hour,e.attributes.minute),$(o,i)):e.attributes.has_date?(o=new Date(e.attributes.year,e.attributes.month-1,e.attributes.day),c(o,i)):e.attributes.has_time?((o=new Date).setHours(e.attributes.hour,e.attributes.minute),D(o,i)):e.state;try{var r=n.split(" ");if(2===r.length)return $(new Date(r.join("T")),i);if(1===r.length){if(n.includes("-"))return c(new Date(n+"T00:00"),i);if(n.includes(":")){var l=new Date;return D(new Date(l.toISOString().split("T")[0]+"T"+n),i)}}return n}catch(t){return n}}return"humidifier"===a&&"on"===s&&e.attributes.humidity?e.attributes.humidity+" %":"counter"===a||"number"===a||"input_number"===a?Y(s,i):e.attributes.device_class&&t("component."+a+".state."+e.attributes.device_class+"."+s)||t("component."+a+".state._."+s)||s},Z="mdi:bookmark",K="lovelace",Q=["climate","cover","configurator","input_select","input_number","input_text","lock","media_player","scene","script","timer","vacuum","water_heater","weblink"],tt=["alarm_control_panel","automation","camera","climate","configurator","cover","fan","group","history_graph","input_datetime","light","lock","media_player","script","sun","updater","vacuum","water_heater","weather"],et=["input_number","input_select","input_text","scene","weblink"],it=["camera","configurator","history_graph","scene"],nt=["closed","locked","off"],st=new Set(["fan","input_boolean","light","switch","group","automation"]),at="°C",ot="°F",rt="group.default_view",lt=function(t,e,i,n){n=n||{},i=null==i?{}:i;var s=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return s.detail=i,t.dispatchEvent(s),s},dt=new Set(["call-service","divider","section","weblink","cast","select"]),ct={alert:"toggle",automation:"toggle",climate:"climate",cover:"cover",fan:"toggle",group:"group",input_boolean:"toggle",input_number:"input-number",input_select:"input-select",input_text:"input-text",light:"toggle",lock:"lock",media_player:"media-player",remote:"toggle",scene:"scene",script:"script",sensor:"sensor",timer:"timer",switch:"toggle",vacuum:"toggle",water_heater:"climate",input_datetime:"input-datetime"},ht=function(t,e){void 0===e&&(e=!1);var i=function(t,e){return n("hui-error-card",{type:"error",error:t,config:e})},n=function(t,e){var n=window.document.createElement(t);try{if(!n.setConfig)return;n.setConfig(e)}catch(n){return console.error(t,n),i(n.message,e)}return n};if(!t||"object"!=typeof t||!e&&!t.type)return i("No type defined",t);var s=t.type;if(s&&s.startsWith("custom:"))s=s.substr(7);else if(e)if(dt.has(s))s="hui-"+s+"-row";else{if(!t.entity)return i("Invalid config given.",t);var a=t.entity.split(".",1)[0];s="hui-"+(ct[a]||"text")+"-entity-row"}else s="hui-"+s+"-card";if(customElements.get(s))return n(s,t);var o=i("Custom element doesn't exist: "+t.type+".",t);o.style.display="None";var r=setTimeout((function(){o.style.display=""}),2e3);return customElements.whenDefined(t.type).then((function(){clearTimeout(r),lt(o,"ll-rebuild",{},o)})),o},ut=function(t,e,i){var n;return void 0===i&&(i=!1),function(){var s=[].slice.call(arguments),a=this,o=i&&!n;clearTimeout(n),n=setTimeout((function(){n=null,i||t.apply(a,s)}),e),o&&t.apply(a,s)}},pt={alert:"mdi:alert",automation:"mdi:playlist-play",calendar:"mdi:calendar",camera:"mdi:video",climate:"mdi:thermostat",configurator:"mdi:settings",conversation:"mdi:text-to-speech",device_tracker:"mdi:account",fan:"mdi:fan",group:"mdi:google-circles-communities",history_graph:"mdi:chart-line",homeassistant:"mdi:home-assistant",homekit:"mdi:home-automation",image_processing:"mdi:image-filter-frames",input_boolean:"mdi:drawing",input_datetime:"mdi:calendar-clock",input_number:"mdi:ray-vertex",input_select:"mdi:format-list-bulleted",input_text:"mdi:textbox",light:"mdi:lightbulb",mailbox:"mdi:mailbox",notify:"mdi:comment-alert",person:"mdi:account",plant:"mdi:flower",proximity:"mdi:apple-safari",remote:"mdi:remote",scene:"mdi:google-pages",script:"mdi:file-document",sensor:"mdi:eye",simple_alarm:"mdi:bell",sun:"mdi:white-balance-sunny",switch:"mdi:flash",timer:"mdi:timer",updater:"mdi:cloud-upload",vacuum:"mdi:robot-vacuum",water_heater:"mdi:thermometer",weblink:"mdi:open-in-new"};function mt(t,e){if(t in pt)return pt[t];switch(t){case"alarm_control_panel":switch(e){case"armed_home":return"mdi:bell-plus";case"armed_night":return"mdi:bell-sleep";case"disarmed":return"mdi:bell-outline";case"triggered":return"mdi:bell-ring";default:return"mdi:bell"}case"binary_sensor":return e&&"off"===e?"mdi:radiobox-blank":"mdi:checkbox-marked-circle";case"cover":return"closed"===e?"mdi:window-closed":"mdi:window-open";case"lock":return e&&"unlocked"===e?"mdi:lock-open":"mdi:lock";case"media_player":return e&&"off"!==e&&"idle"!==e?"mdi:cast-connected":"mdi:cast";case"zwave":switch(e){case"dead":return"mdi:emoticon-dead";case"sleeping":return"mdi:sleep";case"initializing":return"mdi:timer-sand";default:return"mdi:z-wave"}default:return console.warn("Unable to find icon for domain "+t+" ("+e+")"),"mdi:bookmark"}}var gt=function(t,e){var i=e.value||e,n=e.attribute?t.attributes[e.attribute]:t.state;switch(e.operator||"=="){case"==":return n===i;case"<=":return n<=i;case"<":return n<i;case">=":return n>=i;case">":return n>i;case"!=":return n!==i;case"regex":return n.match(i);default:return!1}},ft=function(t){lt(window,"haptic",t)},vt=function(t,e,i){void 0===i&&(i=!1),i?history.replaceState(null,"",e):history.pushState(null,"",e),lt(window,"location-changed",{replace:i})},_t=function(t,e,i){void 0===i&&(i=!0);var n,s=R(e),a="group"===s?"homeassistant":s;switch(s){case"lock":n=i?"unlock":"lock";break;case"cover":n=i?"open_cover":"close_cover";break;default:n=i?"turn_on":"turn_off"}return t.callService(a,n,{entity_id:e})},yt=function(t,e){var i=nt.includes(t.states[e].state);return _t(t,e,i)},bt=function(t,e,i,n){if(n||(n={action:"more-info"}),!n.confirmation||n.confirmation.exemptions&&n.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||(ft("warning"),confirm(n.confirmation.text||"Are you sure you want to "+n.action+"?")))switch(n.action){case"more-info":(i.entity||i.camera_image)&&lt(t,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":n.navigation_path&&vt(0,n.navigation_path);break;case"url":n.url_path&&window.open(n.url_path);break;case"toggle":i.entity&&(yt(e,i.entity),ft("success"));break;case"call-service":if(!n.service)return void ft("failure");var s=n.service.split(".",2);e.callService(s[0],s[1],n.service_data,n.target),ft("success");break;case"fire-dom-event":lt(t,"ll-custom",n)}},wt=function(t,e,i,n){var s;"double_tap"===n&&i.double_tap_action?s=i.double_tap_action:"hold"===n&&i.hold_action?s=i.hold_action:"tap"===n&&i.tap_action&&(s=i.tap_action),bt(t,e,i,s)},xt=function(t,e,i,n,s){var a;if(s&&i.double_tap_action?a=i.double_tap_action:n&&i.hold_action?a=i.hold_action:!n&&i.tap_action&&(a=i.tap_action),a||(a={action:"more-info"}),!a.confirmation||a.confirmation.exemptions&&a.confirmation.exemptions.some((function(t){return t.user===e.user.id}))||confirm(a.confirmation.text||"Are you sure you want to "+a.action+"?"))switch(a.action){case"more-info":(a.entity||i.entity||i.camera_image)&&(lt(t,"hass-more-info",{entityId:a.entity?a.entity:i.entity?i.entity:i.camera_image}),a.haptic&&ft(a.haptic));break;case"navigate":a.navigation_path&&(vt(0,a.navigation_path),a.haptic&&ft(a.haptic));break;case"url":a.url_path&&window.open(a.url_path),a.haptic&&ft(a.haptic);break;case"toggle":i.entity&&(yt(e,i.entity),a.haptic&&ft(a.haptic));break;case"call-service":if(!a.service)return;var o=a.service.split(".",2),r=o[0],l=o[1],d=F({},a.service_data);"entity"===d.entity_id&&(d.entity_id=i.entity),e.callService(r,l,d,a.target),a.haptic&&ft(a.haptic);break;case"fire-dom-event":lt(t,"ll-custom",a),a.haptic&&ft(a.haptic)}};function $t(t){return void 0!==t&&"none"!==t.action}function kt(t,e,i){if(e.has("config")||i)return!0;if(t.config.entity){var n=e.get("hass");return!n||n.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}function Tt(t){return void 0!==t&&"none"!==t.action}var It=function(t,e,i){void 0===i&&(i=!0);var n={};e.forEach((function(e){if(nt.includes(t.states[e].state)===i){var s=R(e),a=["cover","lock"].includes(s)?s:"homeassistant";a in n||(n[a]=[]),n[a].push(e)}})),Object.keys(n).forEach((function(e){var s;switch(e){case"lock":s=i?"unlock":"lock";break;case"cover":s=i?"open_cover":"close_cover";break;default:s=i?"turn_on":"turn_off"}t.callService(e,s,{entity_id:n[e]})}))},Et=function(){var t=document.querySelector("home-assistant");if(t=(t=(t=(t=(t=(t=(t=(t=t&&t.shadowRoot)&&t.querySelector("home-assistant-main"))&&t.shadowRoot)&&t.querySelector("app-drawer-layout partial-panel-resolver"))&&t.shadowRoot||t)&&t.querySelector("ha-panel-lovelace"))&&t.shadowRoot)&&t.querySelector("hui-root")){var e=t.lovelace;return e.current_view=t.___curView,e}return null},St={humidity:"mdi:water-percent",illuminance:"mdi:brightness-5",temperature:"mdi:thermometer",pressure:"mdi:gauge",power:"mdi:flash",signal_strength:"mdi:wifi"},Dt={binary_sensor:function(t,e){var i="off"===t;switch(null==e?void 0:e.attributes.device_class){case"battery":return i?"mdi:battery":"mdi:battery-outline";case"battery_charging":return i?"mdi:battery":"mdi:battery-charging";case"cold":return i?"mdi:thermometer":"mdi:snowflake";case"connectivity":return i?"mdi:server-network-off":"mdi:server-network";case"door":return i?"mdi:door-closed":"mdi:door-open";case"garage_door":return i?"mdi:garage":"mdi:garage-open";case"power":case"plug":return i?"mdi:power-plug-off":"mdi:power-plug";case"gas":case"problem":case"safety":case"tamper":return i?"mdi:check-circle":"mdi:alert-circle";case"smoke":return i?"mdi:check-circle":"mdi:smoke";case"heat":return i?"mdi:thermometer":"mdi:fire";case"light":return i?"mdi:brightness-5":"mdi:brightness-7";case"lock":return i?"mdi:lock":"mdi:lock-open";case"moisture":return i?"mdi:water-off":"mdi:water";case"motion":return i?"mdi:walk":"mdi:run";case"occupancy":case"presence":return i?"mdi:home-outline":"mdi:home";case"opening":return i?"mdi:square":"mdi:square-outline";case"running":return i?"mdi:stop":"mdi:play";case"sound":return i?"mdi:music-note-off":"mdi:music-note";case"update":return i?"mdi:package":"mdi:package-up";case"vibration":return i?"mdi:crop-portrait":"mdi:vibrate";case"window":return i?"mdi:window-closed":"mdi:window-open";default:return i?"mdi:radiobox-blank":"mdi:checkbox-marked-circle"}},cover:function(t){var e="closed"!==t.state;switch(t.attributes.device_class){case"garage":return e?"mdi:garage-open":"mdi:garage";case"door":return e?"mdi:door-open":"mdi:door-closed";case"shutter":return e?"mdi:window-shutter-open":"mdi:window-shutter";case"blind":return e?"mdi:blinds-open":"mdi:blinds";case"window":return e?"mdi:window-open":"mdi:window-closed";default:return mt("cover",t.state)}},sensor:function(t){var e=t.attributes.device_class;if(e&&e in St)return St[e];if("battery"===e){var i=Number(t.state);if(isNaN(i))return"mdi:battery-unknown";var n=10*Math.round(i/10);return n>=100?"mdi:battery":n<=0?"mdi:battery-alert":"hass:battery-"+n}var s=t.attributes.unit_of_measurement;return"°C"===s||"°F"===s?"mdi:thermometer":mt("sensor")},input_datetime:function(t){return t.attributes.has_date?t.attributes.has_time?mt("input_datetime"):"mdi:calendar":"mdi:clock"}},At=function(t){if(!t)return"mdi:bookmark";if(t.attributes.icon)return t.attributes.icon;var e=R(t.entity_id);return e in Dt?Dt[e](t):mt(e,t.state)}},4828:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o},s=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const a=i(4437),o=i(2924),r=i(6800),l=i(9130),d=i(8330),c=i(9429),h=i(4139),u=i(2135),p=i(2413);i(4507),i(6822),i(5953),i(2618),i(1261),console.info(`%c BROKKOLI-CARD %c ${d.version}`,"color: cyan; background: black; font-weight: bold;","color: darkblue; background: white; font-weight: bold;"),window.customCards=window.customCards||[],window.customCards.push({type:h.CARD_NAME,name:"Brokkoli card",preview:!0,description:"Custom brokkoli card for https://github.com/Olen/homeassistant-plant"});let m=class extends a.LitElement{constructor(){super(...arguments),this._expanded={attributes:!1,timeline:!1,consumption:!1,history:!1,details:!1},this._expandedOrder=[],this._showGallery=!1,this._currentImageIndex=0,this._nextImageIndex=1,this._isFading=!1,this._activePopup=null,this._showFlyoutMenu=!1,this._popupData={},this._showPlantDropdown=!1,this.selectedPlantEntity=null,this._listenToSelector=null,this._selectedEntities=[],this._imageUrls=[],this._handleOutsideDropdownClick=()=>{this._showPlantDropdown=!1,this.requestUpdate()},this._handleOutsideClick=t=>{t.composedPath().some((t=>t instanceof HTMLElement&&t.classList.contains("flyout-menu")))||(this._showFlyoutMenu=!1,document.removeEventListener("click",this._handleOutsideClick))},this._handleCycleMemberSelected=t=>{var e;if((null===(e=this.config)||void 0===e?void 0:e.entity)&&this.stateObj&&t.detail){const{originalEntityId:e,selectedEntityId:i,sourceCardId:n}=t.detail;if(n===this)return;(e===this.config.entity||this._popupData.originalEntity&&this._popupData.originalEntity===e)&&(this.selectedPlantEntity=i,!this._popupData.originalEntity&&this.stateObj&&(this._popupData.originalEntity=this.stateObj.entity_id),this._hass&&(this.stateObj=this._hass.states[i],this.get_data(this._hass).then((()=>{var t,e;const n=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll("flower-graph");n&&n.forEach((t=>{t&&(t.entityId=i,"function"==typeof t.updateDateRange?t.updateDateRange().then((()=>{"function"==typeof t.updateGraphData&&t.updateGraphData(!0)})):"function"==typeof t.updateGraphData&&t.updateGraphData(!0))}));const s=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll("flower-consumption");s&&s.forEach((t=>{t&&(t.entityId=i)})),this.requestUpdate()}))))}},this._handleCardEntitySelected=t=>{if(this._listenToSelector&&t.detail){const{sourceIdentifier:e,selectedEntityId:i,selectedEntities:n}=t.detail;if(e===this._listenToSelector){if(n&&Array.isArray(n)?this._selectedEntities=[...n]:this._selectedEntities=i?[i]:[],this.selectedPlantEntity=i,!i)return this.stateObj=void 0,void this.requestUpdate();this._hass&&i&&this._hass.states[i]&&(this.stateObj=this._hass.states[i],this.get_data(this._hass).then((()=>{var t,e;const n=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll("flower-graph");n&&n.forEach((t=>{t&&(t.entityId=i,"function"==typeof t.updateDateRange?t.updateDateRange().then((()=>{"function"==typeof t.updateGraphData&&t.updateGraphData(!0)})):"function"==typeof t.updateGraphData&&t.updateGraphData(!0))}));const s=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll("flower-consumption");s&&s.forEach((t=>{t&&(t.entityId=i)})),this.requestUpdate()})))}}}}getGrowthPhaseIcon(t){return(0,h.getGrowthPhaseIcon)(t,this._hass,this.stateObj)}disconnectedCallback(){super.disconnectedCallback(),this._imageRotationInterval&&clearInterval(this._imageRotationInterval),window.removeEventListener("brokkoli-card-cycle-member-selected",this._handleCycleMemberSelected),window.removeEventListener("brokkoli-card-entity-selected",this._handleCardEntitySelected)}connectedCallback(){super.connectedCallback(),window.addEventListener("brokkoli-card-cycle-member-selected",this._handleCycleMemberSelected),window.addEventListener("brokkoli-card-entity-selected",this._handleCardEntitySelected)}set hass(t){var e,i;this._hass=t,p.TranslationUtils.initializeTranslations(t).then((()=>{this.requestUpdate()})),this.selectedPlantEntity?this.stateObj=t.states[this.selectedPlantEntity]:(null===(e=this.config)||void 0===e?void 0:e.entity)?this.stateObj=t.states[this.config.entity]:this.stateObj=void 0,this.previousFetchDate||(this.previousFetchDate=0),(this.selectedPlantEntity||(null===(i=this.config)||void 0===i?void 0:i.entity))&&Date.now()>this.previousFetchDate+1e3&&(this.previousFetchDate=Date.now(),this.get_data(t).then((()=>{this.requestUpdate()})))}static getConfigElement(){return s(this,void 0,void 0,(function*(){return yield Promise.resolve().then((()=>i(43))),document.createElement(h.CARD_EDITOR_NAME)}))}static getStubConfig(t){const e=t=>{if("object"==typeof t&&"entity_id"in t&&"string"==typeof t.entity_id&&(0===t.entity_id.indexOf("plant.")||0===t.entity_id.indexOf("cycle.")||0===t.entity_id.indexOf("tent.")))return!!t};let i=[];try{i=Object.values(t.states).filter(e)}catch(t){console.info(`Unable to get ha-data: ${t}`)}return{entity:i.length>0?i[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:[...h.default_show_bars],show_elements:[...h.default_show_elements],option_elements:[...h.default_option_elements]}}setConfig(t){var e;if(!t.entity&&!t.listen_to)throw new Error(this._hass?p.TranslationUtils.translateUI(this._hass,"config_error_entity_required"):"Du musst entweder eine Entity oder listen_to definieren");if(this.config=Object.assign(Object.assign({},t),{show_elements:t.show_elements||[...h.default_show_elements],option_elements:t.option_elements||[...h.default_option_elements]}),t.listen_to&&(this._listenToSelector=t.listen_to),this._expandedOrder=[],null===(e=this.config.default_expanded_options)||void 0===e?void 0:e.length){const t=this.config.default_expanded_options.filter((t=>this.config.option_elements.includes(t)));this._expanded=Object.assign(Object.assign({},this._expanded),Object.fromEntries(t.map((t=>[t,!0])))),this._expandedOrder=[...t]}}_renderElement(t){var e;if(null===(e=this.stateObj)||void 0===e?void 0:e.entity_id.startsWith("tent."))return this._renderTentElement(t);switch(t){case"header":return this._renderHeader();case"attributes":return this._renderAttributes();case"options":return this._renderOptions();case"timeline":return this._renderTimeline();case"consumption":return this._renderConsumption();case"history":return this._renderHistory();case"details":return this._renderDetails();default:return a.html``}}_renderHeader(){if(!this._hass||!this.stateObj)return a.html``;const t=this.stateObj.entity_id.startsWith("tent."),e=this.stateObj.entity_id.startsWith("cycle."),i=this.stateObj.attributes.friendly_name||this.stateObj.entity_id.split(".")[1];let n="mdi:flower-outline";t?n="mdi:tent":e&&(n="mdi:grass");let s="";return!t&&this.stateObj.attributes.growth_phase&&(s=this.getGrowthPhaseIcon(this.stateObj.attributes.growth_phase)),a.html`
            <div class="header">
                <div class="header-left">
                    <div class="entity-icon">
                        <ha-icon icon="${n}"></ha-icon>
                    </div>
                    <div class="entity-info">
                        <div class="entity-name">${i}</div>
                        ${!t&&this.stateObj.attributes.growth_phase?a.html`
                            <div class="growth-phase">
                                <ha-icon icon="${s}"></ha-icon>
                                ${p.TranslationUtils.translateGrowthPhase(this._hass,this.stateObj.attributes.growth_phase)}
                            </div>
                        `:""}
                    </div>
                </div>
                <div class="header-right">
                    ${this._renderBattery()}
                    <ha-icon-button
                        .label=${this._hass.localize("ui.dialogs.more_info_control.inspect")}
                        @click=${this._handleMoreInfo}
                    ></ha-icon-button>
                </div>
            </div>
        `}_renderTentElement(t){if(!this._hass||!this.stateObj)return a.html``;switch(t){case"header":return this._renderHeader();case"sensors":return this._renderTentSensors();case"maintenance":return this._renderTentMaintenance();case"journal":return this._renderTentJournal();default:return a.html``}}_renderTentSensors(){if(!this._hass||!this.stateObj)return a.html``;const t=this.stateObj.attributes.sensors||[],e=this.stateObj.attributes.sensor_details||[];return a.html`
            <div class="tent-sensors">
                <h3>Sensoren</h3>
                <div class="sensor-grid">
                    ${e.map((t=>a.html`
                        <div class="sensor-card">
                            <div class="sensor-name">${t.entity_id}</div>
                            ${t.state?a.html`
                                <div class="sensor-value">${t.state.state} ${t.state.unit}</div>
                                <div class="sensor-device-class">${t.state.device_class}</div>
                            `:a.html`
                                <div class="sensor-value">Keine Daten</div>
                            `}
                        </div>
                    `))}
                </div>
                ${0===t.length?a.html`
                    <p class="no-sensors">Keine Sensoren zugewiesen</p>
                `:""}
            </div>
        `}_renderTentMaintenance(){if(!this._hass||!this.stateObj)return a.html``;const t=this.stateObj.attributes.maintenance_entries||[];return a.html`
            <div class="tent-maintenance">
                <h3>Wartung</h3>
                <div class="maintenance-entries">
                    ${t.map((t=>a.html`
                        <div class="maintenance-entry">
                            <div class="entry-header">
                                <span class="timestamp">${new Date(t.timestamp).toLocaleString()}</span>
                                <span class="performed-by">${t.performed_by}</span>
                            </div>
                            <div class="entry-content">
                                <p>${t.description}</p>
                                ${t.cost>0?a.html`<p class="cost">Kosten: ${t.cost.toFixed(2)} €</p>`:""}
                            </div>
                        </div>
                    `))}
                </div>
                ${0===t.length?a.html`
                    <p class="no-maintenance">Keine Wartungseinträge vorhanden</p>
                `:""}
            </div>
        `}_renderTentJournal(){if(!this._hass||!this.stateObj)return a.html``;const t=this.stateObj.attributes.journal_entries||[];return a.html`
            <div class="tent-journal">
                <h3>Journal</h3>
                <div class="journal-entries">
                    ${t.map((t=>a.html`
                        <div class="journal-entry">
                            <div class="entry-header">
                                <span class="timestamp">${new Date(t.timestamp).toLocaleString()}</span>
                                <span class="author">${t.author}</span>
                            </div>
                            <div class="entry-content">
                                <p>${t.content}</p>
                            </div>
                        </div>
                    `))}
                </div>
                ${0===t.length?a.html`
                    <p class="no-journal">Keine Journal-Einträge vorhanden</p>
                `:""}
            </div>
        `}_togglePlantDropdown(t){t.stopPropagation(),this._showPlantDropdown=!this._showPlantDropdown,this.requestUpdate(),this._showPlantDropdown&&document.addEventListener("click",this._handleOutsideDropdownClick,{once:!0})}_renderPlantDropdown(t){if(!t.length&&this._selectedEntities.length>0&&(t=[...this._selectedEntities]),!t.length){const t=p.TranslationUtils.translateUI(this._hass,"no_plants_found");return a.html`
                <div class="plant-dropdown">
                    <div class="plant-dropdown-item">${t}</div>
                </div>
            `}const e=[...null!==this.selectedPlantEntity&&this._popupData.originalEntity?[this._popupData.originalEntity]:[],...t];return a.html`
            <div class="plant-dropdown">
                ${e.map((t=>{const e=this._hass.states[t];if(!e){const e=p.TranslationUtils.translateUI(this._hass,"entity_not_found");return a.html`
                            <div class="plant-dropdown-item">
                                <div class="plant-dropdown-name">${t}</div>
                                <div class="plant-dropdown-info">${e}</div>
                            </div>
                        `}const i=t.startsWith("cycle."),n=e.attributes.friendly_name||t.split(".")[1];if(i){const t=p.TranslationUtils.translateUI(this._hass,"return_to_cycle");return a.html`
                            <div class="plant-dropdown-item" @click="${()=>this._returnToCycle()}">
                                <div class="plant-dropdown-name">${n}</div>
                                <div class="plant-dropdown-info">${t}</div>
                            </div>
                        `}const s=e.attributes.strain||"",o=e.attributes.breeder||"";return a.html`
                        <div class="plant-dropdown-item" @click="${()=>this._selectPlant(t)}">
                            <div class="plant-dropdown-name">${n}</div>
                            <div class="plant-dropdown-info">${s} - ${o}</div>
                        </div>
                    `}))}
            </div>
        `}_selectPlant(t){this.selectedPlantEntity=t,this._showPlantDropdown=!1,!this._popupData.originalEntity&&this.stateObj&&(this._popupData.originalEntity=this.stateObj.entity_id),this._hass&&(this.stateObj=this._hass.states[t],this.get_data(this._hass).then((()=>{var e,i,n;const s=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll("flower-graph");s&&s.forEach((e=>{e&&(e.entityId=t,"function"==typeof e.updateDateRange?e.updateDateRange().then((()=>{"function"==typeof e.updateGraphData&&e.updateGraphData(!0)})):"function"==typeof e.updateGraphData&&e.updateGraphData(!0))}));const a=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelectorAll("flower-consumption");a&&a.forEach((e=>{e&&(e.entityId=t)}));const o=new CustomEvent("brokkoli-card-cycle-member-selected",{bubbles:!0,composed:!0,detail:{originalEntityId:this._popupData.originalEntity||(null===(n=this.config)||void 0===n?void 0:n.entity),selectedEntityId:t,sourceCardId:this}});window.dispatchEvent(o),this.requestUpdate()})))}_toggleFlyoutMenu(t){t.stopPropagation(),this._showFlyoutMenu=!this._showFlyoutMenu,this._showFlyoutMenu?document.addEventListener("click",this._handleOutsideClick):document.removeEventListener("click",this._handleOutsideClick)}_renderFlyoutMenu(){const t=null!==this.selectedPlantEntity;return a.html`
            <div class="flyout-menu">
                ${t?a.html`
                    <div class="flyout-menu-item" @click="${this._returnToCycle}">
                        <ha-icon icon="mdi:arrow-left"></ha-icon>
                        <span>${p.TranslationUtils.translateUI(this._hass,"return_to_cycle")}</span>
                    </div>
                    <div class="flyout-menu-divider"></div>
                `:""}
                <div class="flyout-menu-item" @click="${()=>{this._activePopup="clone",this._showFlyoutMenu=!1}}">
                    <ha-icon icon="mdi:content-duplicate"></ha-icon>
                    <span>${p.TranslationUtils.translateUI(this._hass,"clone_plant")}</span>
                </div>
                <div class="flyout-menu-item" @click="${()=>{this._activePopup="move",this._showFlyoutMenu=!1}}">
                    <ha-icon icon="mdi:arrow-decision"></ha-icon>
                    <span>${p.TranslationUtils.translateUI(this._hass,"move_to_cycle")}</span>
                </div>
                <div class="flyout-menu-item" @click="${()=>{this._activePopup="replace",this._showFlyoutMenu=!1}}">
                    <ha-icon icon="mdi:swap-horizontal"></ha-icon>
                    <span>${p.TranslationUtils.translateUI(this._hass,"replace_sensors")}</span>
                </div>
                <div class="flyout-menu-item" @click="${()=>{this._activePopup="remove",this._showFlyoutMenu=!1}}">
                    <ha-icon icon="mdi:delete-outline"></ha-icon>
                    <span>${p.TranslationUtils.translateUI(this._hass,"delete_plant")}</span>
                </div>
            </div>
        `}_returnToCycle(){this._popupData.originalEntity&&this._hass&&(this.selectedPlantEntity=null,this.stateObj=this._hass.states[this._popupData.originalEntity],this.get_data(this._hass).then((()=>{var t,e;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll("flower-graph");i&&i.forEach((t=>{t&&(t.entityId=this._popupData.originalEntity,"function"==typeof t.updateDateRange?t.updateDateRange().then((()=>{"function"==typeof t.updateGraphData&&t.updateGraphData(!0)})):"function"==typeof t.updateGraphData&&t.updateGraphData(!0))}));const n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll("flower-consumption");n&&n.forEach((t=>{t&&(t.entityId=this._popupData.originalEntity)}));const s=new CustomEvent("brokkoli-card-cycle-member-selected",{bubbles:!0,composed:!0,detail:{originalEntityId:this._popupData.originalEntity,selectedEntityId:this._popupData.originalEntity,sourceCardId:this}});window.dispatchEvent(s),this._popupData.originalEntity=null,this.requestUpdate()}))),this._showPlantDropdown=!1}_handleClonePlant(){return s(this,void 0,void 0,(function*(){yield this._hass.callService("plant","clone_plant",Object.assign({source_entity_id:this.stateObj.entity_id},this._popupData)),this._closePopup()}))}_handleMoveToCycle(){return s(this,void 0,void 0,(function*(){yield this._hass.callService("plant","move_to_cycle",{plant_entity:this.stateObj.entity_id,cycle_entity:this._popupData.cycle_entity}),this._closePopup()}))}_handleRemovePlant(){return s(this,void 0,void 0,(function*(){yield this._hass.callService("plant","remove_plant",{plant_entity:this.stateObj.entity_id}),this._closePopup()}))}_handleReplaceSensors(){return s(this,void 0,void 0,(function*(){const t=["temperature","moisture","illuminance","humidity","conductivity","power_consumption"],e=this.stateObj.entity_id.split(".")[1];for(const i of t){const t=this._popupData[`new_${i}_sensor`];if(t){const n=`sensor.${e}_${i}`;yield this._hass.callService("plant","replace_sensor",{meter_entity:n,new_sensor:t})}}this._closePopup()}))}_closePopup(){this._activePopup=null,this._popupData={},this.requestUpdate()}_renderPopups(){if(!this._activePopup)return a.html``;switch(this._activePopup){case"clone":return this._renderClonePopup();case"move":return this._renderMovePopup();case"remove":return this._renderRemovePopup();case"replace":return this._renderReplacePopup();default:return a.html``}}_renderClonePopup(){return a.html`
            <div class="popup-dialog" @click="${this._closePopup}">
                <div class="popup-content" @click="${t=>t.stopPropagation()}">
                    <div class="popup-title">${p.TranslationUtils.translateUI(this._hass,"clone_plant")}</div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateField(this._hass,"friendly_name")}</label>
                        <input type="text" .value="${this._popupData.name||""}"
                               @input="${t=>this._popupData.name=t.target.value}">
                    </div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateSensor(this._hass,"temperature")}</label>
                        <input type="text" .value="${this._popupData.temperature_sensor||""}"
                               @input="${t=>this._popupData.temperature_sensor=t.target.value}">
                    </div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateSensor(this._hass,"soil_moisture")}</label>
                        <input type="text" .value="${this._popupData.moisture_sensor||""}"
                               @input="${t=>this._popupData.moisture_sensor=t.target.value}">
                    </div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateSensor(this._hass,"illuminance")}</label>
                        <input type="text" .value="${this._popupData.illuminance_sensor||""}"
                               @input="${t=>this._popupData.illuminance_sensor=t.target.value}">
                    </div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateSensor(this._hass,"air_humidity")}</label>
                        <input type="text" .value="${this._popupData.humidity_sensor||""}"
                               @input="${t=>this._popupData.humidity_sensor=t.target.value}">
                    </div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateSensor(this._hass,"conductivity")}</label>
                        <input type="text" .value="${this._popupData.conductivity_sensor||""}"
                               @input="${t=>this._popupData.conductivity_sensor=t.target.value}">
                    </div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateSensor(this._hass,"power_consumption")}</label>
                        <input type="text" .value="${this._popupData.power_consumption_sensor||""}"
                               @input="${t=>this._popupData.power_consumption_sensor=t.target.value}">
                    </div>
                    <div class="popup-buttons">
                        <button @click="${this._closePopup}">${p.TranslationUtils.translateUI(this._hass,"cancel")}</button>
                        <button @click="${this._handleClonePlant}">${p.TranslationUtils.translateUI(this._hass,"clone")}</button>
                    </div>
                </div>
            </div>
        `}_renderMovePopup(){const t=Object.entries(this._hass.states).filter((([t])=>t.startsWith("cycle."))).map((([t,e])=>{var i;return{entity_id:t,name:(null===(i=e.attributes)||void 0===i?void 0:i.friendly_name)||t.split(".")[1]}}));return a.html`
            <div class="popup-dialog" @click="${this._closePopup}">
                <div class="popup-content" @click="${t=>t.stopPropagation()}">
                    <div class="popup-title">${p.TranslationUtils.translateUI(this._hass,"move_to_cycle")}</div>
                    <div class="form-field">
                        <label>${p.TranslationUtils.translateUI(this._hass,"select_cycle")}</label>
                        <select @change="${t=>this._popupData.cycle_entity=t.target.value}">
                            <option value="">${p.TranslationUtils.translateUI(this._hass,"please_select")}</option>
                            ${t.map((t=>a.html`
                                <option value="${t.entity_id}">${t.name}</option>
                            `))}
                        </select>
                    </div>
                    <div class="popup-buttons">
                        <button @click="${this._closePopup}">${p.TranslationUtils.translateUI(this._hass,"cancel")}</button>
                        <button @click="${this._handleMoveToCycle}" ?disabled="${!this._popupData.cycle_entity}">
                            ${p.TranslationUtils.translateUI(this._hass,"move")}
                        </button>
                    </div>
                </div>
            </div>
        `}_renderRemovePopup(){return a.html`
            <div class="popup-dialog" @click="${this._closePopup}">
                <div class="popup-content" @click="${t=>t.stopPropagation()}">
                    <div class="popup-title">${p.TranslationUtils.translateUI(this._hass,"delete_plant")}</div>
                    <p>${p.TranslationUtils.translateUI(this._hass,"delete_plant_confirmation")}</p>
                    <div class="popup-buttons">
                        <button @click="${this._closePopup}">${p.TranslationUtils.translateUI(this._hass,"cancel")}</button>
                        <button @click="${this._handleRemovePlant}" class="danger">
                            ${p.TranslationUtils.translateUI(this._hass,"confirm_delete")}
                        </button>
                    </div>
                </div>
            </div>
        `}_renderReplacePopup(){const t=this.stateObj.entity_id.split(".")[1],e=[{key:"temperature",label:p.TranslationUtils.translateSensor(this._hass,"temperature"),icon:"mdi:thermometer"},{key:"moisture",label:p.TranslationUtils.translateSensor(this._hass,"soil_moisture"),icon:"mdi:water-percent"},{key:"illuminance",label:p.TranslationUtils.translateSensor(this._hass,"illuminance"),icon:"mdi:brightness-5"},{key:"humidity",label:p.TranslationUtils.translateSensor(this._hass,"air_humidity"),icon:"mdi:water"},{key:"conductivity",label:p.TranslationUtils.translateSensor(this._hass,"conductivity"),icon:"mdi:flash"},{key:"power_consumption",label:p.TranslationUtils.translateSensor(this._hass,"power_consumption"),icon:"mdi:power-plug"}],i=e=>{const i=new RegExp(`^sensor\\..*_(${e}|min_${e}|max_${e}|soil_moisture|air_humidity)$`);return Object.entries(this._hass.states).filter((([e])=>!(!e.startsWith("sensor.")||i.test(e)||e.includes(`${t}_`)||e.includes("plant")))).filter((([,t])=>{var i,n;const s=null===(i=t.attributes)||void 0===i?void 0:i.device_class,a=null===(n=t.attributes)||void 0===n?void 0:n.unit_of_measurement;switch(e){case"temperature":return"temperature"===s||"°C"===a||"°F"===a;case"moisture":case"humidity":return"humidity"===s||"%"===a;case"illuminance":return"illuminance"===s||"lx"===a||"lm"===a;case"conductivity":return"µS/cm"===a||"mS/cm"===a;case"power_consumption":return"power"===s||"energy"===s||"W"===a||"kW"===a||"kWh"===a||"Wh"===a;default:return!1}})).map((([t,e])=>{var i;return{entity_id:t,name:(null===(i=e.attributes)||void 0===i?void 0:i.friendly_name)||t}}))};return a.html`
            <div class="popup-dialog" @click="${this._closePopup}">
                <div class="popup-content" @click="${t=>t.stopPropagation()}">
                    <div class="popup-title">${p.TranslationUtils.translateUI(this._hass,"replace_sensors")}</div>
                    ${e.map((t=>{const e=i(t.key);return a.html`
                            <div class="form-field">
                                <label>
                                    <ha-icon icon="${t.icon}"></ha-icon>
                                    ${t.label}
                                </label>
                                <select @change="${e=>this._popupData[`new_${t.key}_sensor`]=e.target.value}">
                                    <option value="">${p.TranslationUtils.translateUI(this._hass,"please_select")}</option>
                                    ${e.length>0?e.map((t=>a.html`
                                            <option value="${t.entity_id}">${t.name}</option>
                                        `)):a.html`<option value="" disabled>${p.TranslationUtils.translateUI(this._hass,"no_matching_sensors")}</option>`}
                                </select>
                            </div>
                        `}))}
                    <div class="popup-buttons">
                        <button @click="${this._closePopup}">${p.TranslationUtils.translateUI(this._hass,"cancel")}</button>
                        <button @click="${this._handleReplaceSensors}">${p.TranslationUtils.translateUI(this._hass,"replace_sensors")}</button>
                    </div>
                </div>
            </div>
        `}_renderOptions(){var t,e,i,n,s;const o=this.config.option_elements;if(0===o.length)return a.html``;const r={attributes:{icon:"mdi:tune",expanded:null===(t=this._expanded)||void 0===t?void 0:t.attributes},timeline:{icon:"mdi:chart-timeline-variant",expanded:null===(e=this._expanded)||void 0===e?void 0:e.timeline},consumption:{icon:"mdi:chart-box-outline",expanded:null===(i=this._expanded)||void 0===i?void 0:i.consumption},history:{icon:"mdi:history",expanded:null===(n=this._expanded)||void 0===n?void 0:n.history},details:{icon:"mdi:information-outline",expanded:null===(s=this._expanded)||void 0===s?void 0:s.details}};return a.html`
            <div class="options-container">
                ${o.map((t=>{if(t in r){const e=r[t];return a.html`
                            <div class="options-section ${e.expanded?"expanded":""}" 
                                 @click="${e=>this._toggleExpand(e,t)}">
                                <ha-icon icon="${e.icon}"></ha-icon>
                            </div>
                        `}return""}))}
            </div>
        `}_renderTimeline(){var t;const e=this.selectedPlantEntity||this.config.entity;return this.config.show_elements.includes("timeline")?a.html`
                <div class="timeline-container">
                    <flower-graph
                        .hass=${this._hass}
                        .entityId=${e}
                    ></flower-graph>
                    <flower-timeline
                        .hass=${this._hass}
                        .entityId=${e}
                    ></flower-timeline>
                </div>
            `:(null===(t=this._expanded)||void 0===t?void 0:t.timeline)?a.html`
                <div class="expanded-content show" data-section="timeline">
                    <flower-graph
                        .hass=${this._hass}
                        .entityId=${e}
                    ></flower-graph>
                    <flower-timeline
                        .hass=${this._hass}
                        .entityId=${e}
                    ></flower-timeline>
                </div>
            `:a.html`<div class="expanded-content" data-section="timeline"></div>`}_renderConsumption(){var t;const e=this.selectedPlantEntity||this.config.entity;return this.config.show_elements.includes("consumption")?a.html`
                <div class="component-container">
                    <flower-consumption
                        .hass=${this._hass}
                        .entityId=${e}
                    ></flower-consumption>
                </div>
            `:(null===(t=this._expanded)||void 0===t?void 0:t.consumption)?a.html`
                <div class="expanded-content show" data-section="consumption">
                    <flower-consumption
                        .hass=${this._hass}
                        .entityId=${e}
                    ></flower-consumption>
                </div>
            `:a.html`<div class="expanded-content" data-section="consumption"></div>`}_renderHistory(){var t;const e=this.selectedPlantEntity||this.config.entity;return this.config.show_elements.includes("history")?a.html`
                <div class="component-container">
                    <flower-history
                        .hass=${this._hass}
                        .entityId=${e}
                        .historyGroups=${this.config.history_groups}
                        .linePosition=${this.config.history_line_position}
                    ></flower-history>
                </div>
            `:(null===(t=this._expanded)||void 0===t?void 0:t.history)?a.html`
                <div class="expanded-content show" data-section="history">
                    <flower-history
                        .hass=${this._hass}
                        .entityId=${e}
                        .historyGroups=${this.config.history_groups}
                        .linePosition=${this.config.history_line_position}
                    ></flower-history>
                </div>
            `:a.html`<div class="expanded-content" data-section="history"></div>`}_renderDetails(){var t;return this.config.show_elements.includes("details")?a.html`
                <div class="plant-details">
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"strain")}</span>
                        <span class="value">${this.stateObj.attributes.variety||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"feminized")}</span>
                        <span class="value">${this.stateObj.attributes.feminized||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"effects")}</span>
                        <span class="value">${this.stateObj.attributes.effects||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"smell")}</span>
                        <span class="value">${this.stateObj.attributes.smell||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"taste")}</span>
                        <span class="value">${this.stateObj.attributes.taste||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"phenotype")}</span>
                        <span class="value">${this.stateObj.attributes.phenotype||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"hunger")}</span>
                        <span class="value">${this.stateObj.attributes.hunger||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"growth_stretch")}</span>
                        <span class="value">${this.stateObj.attributes.growth_stretch||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"flower_stretch")}</span>
                        <span class="value">${this.stateObj.attributes.flower_stretch||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"mold_resistance")}</span>
                        <span class="value">${this.stateObj.attributes.mold_resistance||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"difficulty")}</span>
                        <span class="value">${this.stateObj.attributes.difficulty||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"yield")}</span>
                        <span class="value">${this.stateObj.attributes.yield||"-"}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"website")}</span>
                        ${this.stateObj.attributes.website?a.html`
                            <a href="${this.stateObj.attributes.website}" target="_blank" class="value link">${this.stateObj.attributes.website}</a>
                        `:a.html`<span class="value">-</span>`}
                    </div>
                    <div class="detail-item">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"notes")}</span>
                        <span class="value">${this.stateObj.attributes.notes||"-"}</span>
                    </div>
                    <div class="detail-item full-width">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"infotext1")}</span>
                        <span class="value">${this.stateObj.attributes.infotext1||"-"}</span>
                    </div>
                    <div class="detail-item full-width">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"infotext2")}</span>
                        <span class="value">${this.stateObj.attributes.infotext2||"-"}</span>
                    </div>
                    <div class="detail-item full-width">
                        <span class="label">${p.TranslationUtils.translateField(this._hass,"lineage")}</span>
                        <span class="value">${this.stateObj.attributes.lineage||"-"}</span>
                    </div>
                </div>
            `:(null===(t=this._expanded)||void 0===t?void 0:t.details)?a.html`
                <div class="expanded-content show" data-section="details">
                    <div class="plant-details">
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"strain")}</span>
                            <span class="value">${this.stateObj.attributes.variety||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"feminized")}</span>
                            <span class="value">${this.stateObj.attributes.feminized||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"effects")}</span>
                            <span class="value">${this.stateObj.attributes.effects||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"smell")}</span>
                            <span class="value">${this.stateObj.attributes.smell||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"taste")}</span>
                            <span class="value">${this.stateObj.attributes.taste||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"phenotype")}</span>
                            <span class="value">${this.stateObj.attributes.phenotype||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"hunger")}</span>
                            <span class="value">${this.stateObj.attributes.hunger||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"growth_stretch")}</span>
                            <span class="value">${this.stateObj.attributes.growth_stretch||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"flower_stretch")}</span>
                            <span class="value">${this.stateObj.attributes.flower_stretch||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"mold_resistance")}</span>
                            <span class="value">${this.stateObj.attributes.mold_resistance||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"difficulty")}</span>
                            <span class="value">${this.stateObj.attributes.difficulty||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"yield")}</span>
                            <span class="value">${this.stateObj.attributes.yield||"-"}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"website")}</span>
                            ${this.stateObj.attributes.website?a.html`
                                <a href="${this.stateObj.attributes.website}" target="_blank" class="value link">${this.stateObj.attributes.website}</a>
                            `:a.html`<span class="value">-</span>`}
                        </div>
                        <div class="detail-item">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"notes")}</span>
                            <span class="value">${this.stateObj.attributes.notes||"-"}</span>
                        </div>
                        <div class="detail-item full-width">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"infotext1")}</span>
                            <span class="value">${this.stateObj.attributes.infotext1||"-"}</span>
                        </div>
                        <div class="detail-item full-width">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"infotext2")}</span>
                            <span class="value">${this.stateObj.attributes.infotext2||"-"}</span>
                        </div>
                        <div class="detail-item full-width">
                            <span class="label">${p.TranslationUtils.translateField(this._hass,"lineage")}</span>
                            <span class="value">${this.stateObj.attributes.lineage||"-"}</span>
                        </div>
                    </div>
                </div>
            `:a.html`<div class="expanded-content" data-section="details"></div>`}_renderAttributes(){var t;return this.config.show_elements.includes("attributes")?a.html`${(0,c.renderAttributes)(this)}`:(null===(t=this._expanded)||void 0===t?void 0:t.attributes)?a.html`
                <div class="expanded-content show" data-section="attributes">
                    ${(0,c.renderAttributes)(this)}
                </div>
            `:a.html`<div class="expanded-content" data-section="attributes"></div>`}_renderBattery(){return a.html`${(0,c.renderBattery)(this)}`}_handleMoreInfo(){this.stateObj&&(0,u.moreInfo)(this,this.stateObj.entity_id)}render(){if(!this.config||!this._hass)return a.html``;if(!this.stateObj&&!this._listenToSelector){const t=p.TranslationUtils.translateUI(this._hass,"entity_unavailable"),e=p.TranslationUtils.translateUI(this._hass,"no_entity_configured");return a.html`
                <hui-warning>
                ${t}: ${this.config.entity||e}
                </hui-warning>
              `}if(!this.stateObj&&this._listenToSelector)return a.html``;const t=this.config.show_elements,e="header"===t[0]&&this.config.display_type!==l.DisplayType.Compact?"card-margin-top":"",i=t.map((t=>this._renderElement(t))),n=this._expandedOrder.filter((e=>!t.includes(e)&&this._expanded[e])).map((t=>{switch(t){case"attributes":return this._renderAttributes();case"timeline":return this._renderTimeline();case"consumption":return this._renderConsumption();case"history":return this._renderHistory();case"details":return this._renderDetails();default:return a.html``}})),s=this.config.option_elements.filter((e=>!t.includes(e)&&!this._expandedOrder.includes(e))).map((t=>{switch(t){case"attributes":return this._renderAttributes();case"timeline":return this._renderTimeline();case"consumption":return this._renderConsumption();case"history":return this._renderHistory();case"details":return this._renderDetails();default:return a.html``}}));return a.html`
            <ha-card class="${e}">
                ${i}
                ${n}
                ${s}
            </ha-card>
            ${this._showGallery?a.html`
                <flower-gallery
                    .hass=${this._hass}
                    .entityId=${this.stateObj.entity_id}
                    .images=${this._imageUrls}
                    .onClose=${()=>this._showGallery=!1}
                ></flower-gallery>
            `:""}
        `}_toggleExpand(t,e){t.stopPropagation();const i=Object.assign({},this._expanded),n=!i[e];i[e]=n;let s=[...this._expandedOrder];n?s.includes(e)||s.push(e):s=s.filter((t=>t!==e)),this._expanded=i,this._expandedOrder=s,this.requestUpdate()}get_data(t){return s(this,void 0,void 0,(function*(){var e,i;try{const n=this.selectedPlantEntity||(null===(e=this.config)||void 0===e?void 0:e.entity);if(this.plantinfo=yield t.callWS({type:"plant/get_info",entity_id:n}),null===(i=this.stateObj)||void 0===i?void 0:i.attributes.images){const t=this.stateObj.attributes.download_path||"/local/images/plants/",e=[...this.stateObj.attributes.images].sort(((t,e)=>{var i,n;const s=(null===(i=t.match(/_(\d{8}_\d{6})/))||void 0===i?void 0:i[1])||"",a=(null===(n=e.match(/_(\d{8}_\d{6})/))||void 0===n?void 0:n[1])||"";return s.localeCompare(a)})),i=yield this._filterImagesAfterFirstPhase(e);this._imageUrls=i.map((e=>`${t}${e}`)),this.stateObj.attributes.entity_picture&&this._imageUrls.unshift(this.stateObj.attributes.entity_picture),this._currentImageIndex=0,this._nextImageIndex=this._imageUrls.length>1?1:0,this._isFading=!1,this._startImageRotation()}else this._imageUrls=[],this._currentImageIndex=0,this._nextImageIndex=0,this._imageRotationInterval&&(clearInterval(this._imageRotationInterval),this._imageRotationInterval=void 0)}catch(t){this.plantinfo={result:{}},this._imageUrls=[],this._currentImageIndex=0,this._nextImageIndex=0}}))}getCardSize(){return 5}static get styles(){return r.style}_changeImage(){return s(this,void 0,void 0,(function*(){if(this._imageUrls.length<=1)return;this._nextImageIndex=(this._currentImageIndex+1)%this._imageUrls.length;const t=new Image;t.src=this._imageUrls[this._nextImageIndex],yield new Promise((e=>{t.onload=e,t.onerror=e})),this._isFading=!0,this.requestUpdate(),yield new Promise((t=>setTimeout(t,500))),this._currentImageIndex=this._nextImageIndex,this._isFading=!1,this.requestUpdate()}))}_startImageRotation(){this._imageRotationInterval&&clearInterval(this._imageRotationInterval),this._imageUrls.length>1&&(this._imageRotationInterval=setInterval((()=>{this._changeImage()}),1e4))}_filterImagesAfterFirstPhase(t){return s(this,void 0,void 0,(function*(){var e,i,n,s,a;if(!(null===(s=null===(n=null===(i=null===(e=this.plantinfo)||void 0===e?void 0:e.result)||void 0===i?void 0:i.helpers)||void 0===n?void 0:n.growth_phase)||void 0===s?void 0:s.entity_id))return t;const o=this.plantinfo.result.helpers.growth_phase.entity_id,r=null===(a=this._hass)||void 0===a?void 0:a.states[o];if(!r)return t;const l=["samen","keimen","wurzeln","wachstum","blüte","geerntet","entfernt"];let d=null;for(const t of l){const e=r.attributes[`${"entfernt"===t||"geerntet"===t?t:t+"_beginn"}`];if(e){d=new Date(e);break}}return d?t.filter((t=>{const e=t.match(/_(\d{8}_\d{6})/);if(!e)return!0;const i=e[1],n=i.slice(0,4),s=i.slice(4,6),a=i.slice(6,8),o=i.slice(9,11),r=i.slice(11,13);return new Date(`${n}-${s}-${a}T${o}:${r}:00`)>=d})):t}))}};n([(0,o.property)()],m.prototype,"_hass",void 0),n([(0,o.property)()],m.prototype,"config",void 0),n([(0,o.state)()],m.prototype,"_expanded",void 0),n([(0,o.state)()],m.prototype,"_expandedOrder",void 0),n([(0,o.state)()],m.prototype,"_showGallery",void 0),n([(0,o.state)()],m.prototype,"_currentImageIndex",void 0),n([(0,o.state)()],m.prototype,"_nextImageIndex",void 0),n([(0,o.state)()],m.prototype,"_isFading",void 0),n([(0,o.state)()],m.prototype,"_activePopup",void 0),n([(0,o.state)()],m.prototype,"_showFlyoutMenu",void 0),n([(0,o.state)()],m.prototype,"_popupData",void 0),n([(0,o.state)()],m.prototype,"_showPlantDropdown",void 0),n([(0,o.state)()],m.prototype,"selectedPlantEntity",void 0),n([(0,o.state)()],m.prototype,"_listenToSelector",void 0),n([(0,o.state)()],m.prototype,"_selectedEntities",void 0),m=n([(0,o.customElement)(h.CARD_NAME)],m),e.default=m},2618:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o},s=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.FlowerConsumption=void 0;const a=i(4437),o=i(2924),r=i(4356),l=i(2075),d=i(2413),c=120,h=60;let u=class extends a.LitElement{constructor(){super(...arguments),this._charts=new Map,this._selectedPhase=null,this._phaseData=new Map,this._consumptionData=null,this._lastOptions=new Map,this._lastPhaseData=new Map}firstUpdated(){return s(this,void 0,void 0,(function*(){window.ApexCharts||(yield this._loadApexChartsScript())}))}disconnectedCallback(){super.disconnectedCallback(),this._charts.forEach((t=>{t&&t.destroy()})),this._charts.clear(),this._lastPhaseData.clear()}_showMoreInfo(t){(0,r.fireEvent)(this,"hass-more-info",{entityId:t})}_updateConsumptionForPhase(t,e){return s(this,void 0,void 0,(function*(){if(!this.hass)return;if(!e)return this._selectedPhase=null,this._consumptionData=null,this._triggerValueAnimation(),void this.requestUpdate();const i=this._phaseData.get(e);if(!i)return;const n=i.start.toISOString(),s=(i.end||new Date).toISOString();try{const e=[`sensor.${t}_total_ppfd_mol_integral`,`sensor.${t}_total_fertilizer_consumption`,`sensor.${t}_total_water_consumption`,`sensor.${t}_total_power_consumption`,`sensor.${t}_energy_cost`].map((t=>this.hass.callApi("GET",`history/period/${n}?filter_entity_id=${t}&end_time=${s}`))),i=yield Promise.all(e),a=t=>{if(!t||!t[0]||t[0].length<2)return 0;const e=t[0].filter((t=>"unavailable"!==t.state&&"unknown"!==t.state)).map((t=>parseFloat(t.state)));return e.length>=2?e[e.length-1]-e[0]:e[0]||0};this._consumptionData={ppfd:a(i[0]),fertilizer:a(i[1]),water:a(i[2]),power:a(i[3]),cost:a(i[4])},this._triggerValueAnimation(),this.requestUpdate()}catch(t){console.warn("Fehler beim Laden der Verbrauchsdaten:",t)}}))}_triggerValueAnimation(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelectorAll(".consumption-item");e&&e.forEach((t=>{t.classList.remove("animate"),t.offsetWidth,t.classList.add("animate")}))}render(){var t,e,i,n,s;if(!this.hass||!this.entityId)return a.html``;const o=this.entityId.split(".")[1],r=(t,e=1)=>("string"==typeof t&&(t=parseFloat(t)),isNaN(t)?"N/A":t.toFixed(e));return a.html`
            <div class="consumption-data">
                <div class="consumption-item" @click="${()=>this._showMoreInfo(`sensor.${o}_total_ppfd_mol_integral`)}">
                    <ha-icon icon="mdi:counter"></ha-icon>
                    <div class="consumption-details">
                        <span class="label">${d.TranslationUtils.translateSensor(this.hass,"total_ppfd")}</span>
                        <span class="value consumption-value">${r(this._consumptionData?this._consumptionData.ppfd:(null===(t=this.hass.states[`sensor.${o}_total_ppfd_mol_integral`])||void 0===t?void 0:t.state)||"N/A")} mol/s⋅m²</span>
                    </div>
                </div>
                <div class="consumption-item" @click="${()=>this._showMoreInfo(`sensor.${o}_total_fertilizer_consumption`)}">
                    <ha-icon icon="mdi:chart-line-variant"></ha-icon>
                    <div class="consumption-details">
                        <span class="label">${d.TranslationUtils.translateSensor(this.hass,"fertilizer_consumption")}</span>
                        <span class="value consumption-value">${r(this._consumptionData?this._consumptionData.fertilizer:(null===(e=this.hass.states[`sensor.${o}_total_fertilizer_consumption`])||void 0===e?void 0:e.state)||"N/A")} μS/cm</span>
                    </div>
                </div>
                <div class="consumption-item" @click="${()=>this._showMoreInfo(`sensor.${o}_total_water_consumption`)}">
                    <ha-icon icon="mdi:water-pump"></ha-icon>
                    <div class="consumption-details">
                        <span class="label">${d.TranslationUtils.translateSensor(this.hass,"water_consumption")}</span>
                        <span class="value consumption-value">${r(this._consumptionData?this._consumptionData.water:(null===(i=this.hass.states[`sensor.${o}_total_water_consumption`])||void 0===i?void 0:i.state)||"N/A")} L</span>
                    </div>
                </div>
                <div class="consumption-item" @click="${()=>this._showMoreInfo(`sensor.${o}_total_power_consumption`)}">
                    <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                    <div class="consumption-details">
                        <span class="label">${d.TranslationUtils.translateSensor(this.hass,"power_consumption")}</span>
                        <span class="value consumption-value">${r(this._consumptionData?this._consumptionData.power:(null===(n=this.hass.states[`sensor.${o}_total_power_consumption`])||void 0===n?void 0:n.state)||"N/A")} kWh</span>
                    </div>
                </div>
                <div class="consumption-item large" @click="${()=>this._showMoreInfo(`sensor.${o}_energy_cost`)}">
                    <ha-icon icon="mdi:cash-multiple"></ha-icon>
                    <div class="consumption-details large">
                        <span class="label">${d.TranslationUtils.translateSensor(this.hass,"energy_cost")}</span>
                        <span class="value consumption-value">${r(this._consumptionData?this._consumptionData.cost:(null===(s=this.hass.states[`sensor.${o}_energy_cost`])||void 0===s?void 0:s.state)||"N/A",2)} €</span>
                    </div>
                </div>
            </div>

            <div class="consumption-charts-container">
                <div class="pie-chart-container">
                    ${this._renderPieChart(o)}
                </div>
            </div>
        `}_renderPieChart(t){const e=this.hass.states[`select.${t}_growth_phase`];if(!e)return a.html`
                <div style="text-align: center; padding: 20px;">
                    Keine Daten für das Pie Chart verfügbar
                </div>
            `;const i={seeds:this._calculatePhaseDuration(e.attributes.seeds_start,e.attributes.seeds_duration,e.attributes.germination_start),Germination:this._calculatePhaseDuration(e.attributes.germination_start,e.attributes.germination_duration,e.attributes.rooting_start),Rooting:this._calculatePhaseDuration(e.attributes.rooting_start,e.attributes.rooting_duration,e.attributes.growing_start),Growing:this._calculatePhaseDuration(e.attributes.growing_start,e.attributes.growing_duration,e.attributes.flowering_start),"Flowering Past":0,"Flowering To Go":0,Harvested:this._calculatePhaseDuration(e.attributes.harvested,e.attributes.harvested_duration,e.attributes.removed_start)},n=this.hass.states[`number.${t}_flowering_duration`],s=e.attributes.flowering_start,o=s&&"null"!==s&&""!==s;if(null==n?void 0:n.state){const t=parseInt(n.state);if(o){const e=new Date(s),n=new Date,a=Math.floor((n.getTime()-e.getTime())/864e5);a>=0?(i["Flowering Past"]=Math.min(a,t),i["Flowering To Go"]=Math.max(0,t-a)):i["Flowering To Go"]=t}else i["Flowering To Go"]=t}return 0===Object.values(i).reduce(((t,e)=>t+e),0)?a.html`
                <div style="text-align: center; padding: 20px;">
${d.TranslationUtils.translateUI(this.hass,"no_completed_phases")}
                </div>
            `:a.html`
            <div class="pie-chart">
                <div id="pie-chart-${t}"></div>
            </div>
        `}_calculatePhaseDuration(t,e,i){if(!t||"null"===t||""===t)return 0;if(e)return e;const n=new Date(t);let s;return s=i&&"null"!==i&&""!==i?new Date(i):new Date,Math.max(0,Math.floor((s.getTime()-n.getTime())/864e5))}_getPhaseDataString(t){return t?JSON.stringify({samen:t.attributes.samen_dauer||0,keimen:t.attributes.keimen_dauer||0,wurzeln:t.attributes.wurzeln_dauer||0,wachstum:t.attributes.wachstum_dauer||0,bluete:t.attributes.blüte_dauer||0,geerntet:t.attributes.geerntet_dauer||0}):""}_initPieChart(t){return s(this,void 0,void 0,(function*(){var e,i,n;if(!window.ApexCharts)try{yield this._loadApexChartsScript()}catch(t){return void console.error("Fehler beim Laden von ApexCharts:",t)}const s=this._charts.has("pie"),a=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(`#pie-chart-${t}`);if(!a)return;const o=null===(i=this.hass)||void 0===i?void 0:i.states[`select.${t}_growth_phase`];if(!o)return;const r=this._getPhaseDataString(o);if(r===this._lastPhaseData.get(t)&&s)return;this._lastPhaseData.set(t,r);const l={seeds:this._calculatePhaseDuration(o.attributes.seeds_start,o.attributes.seeds_duration,o.attributes.germination_start),Germination:this._calculatePhaseDuration(o.attributes.germination_start,o.attributes.germination_duration,o.attributes.rooting_start),Rooting:this._calculatePhaseDuration(o.attributes.rooting_start,o.attributes.rooting_duration,o.attributes.growing_start),Growing:this._calculatePhaseDuration(o.attributes.growing_start,o.attributes.growing_duration,o.attributes.flowering_start),"Flowering Past":0,"Flowering To Go":0,Harvested:this._calculatePhaseDuration(o.attributes.harvested,o.attributes.harvested_duration,o.attributes.removed_start)},d=this.hass.states[`number.${t}_flowering_duration`],u=o.attributes.blüte_beginn,p=u&&"null"!==u&&""!==u;if(null==d?void 0:d.state){const t=parseInt(d.state);if(p){const e=new Date(u),i=new Date,n=Math.floor((i.getTime()-e.getTime())/864e5);n>=0?(l["Flowering Past"]=Math.min(n,t),l["Flowering To Go"]=Math.max(0,t-n)):l["Flowering To Go"]=t}else l["Flowering To Go"]=t}const m=Object.values(l).filter((t=>t>0)),g=Object.entries(l).filter((([,t])=>t>0)).map((([t])=>t)),f=this._charts.get("pie");if(f)return void f.updateOptions({labels:g,series:m});const v={chart:{type:"pie",background:"transparent",redrawOnParentResize:!0,animations:{enabled:!0,speed:800,animateGradually:{enabled:!0,delay:150},dynamicAnimation:{enabled:!0,speed:350}},events:{dataPointSelection:(e,i,n)=>{if(0===n.selectedDataPoints[0].length||this._selectedPhase===g[n.dataPointIndex]&&1===n.selectedDataPoints[0].length)this._updateConsumptionForPhase(t,null),n.selectedDataPoints[0]=[],i.w.globals.selectedDataPoints[0]=[];else{const e=g[n.dataPointIndex];this._selectedPhase=e,this._updateConsumptionForPhase(t,e)}}}},series:m,labels:g,colors:[`hsl(${c}, ${h}%, 55%)`,`hsl(${c}, ${h}%, 50%)`,`hsl(${c}, ${h}%, 45%)`,`hsl(${c}, ${h}%, 40%)`,`hsl(${c}, ${h}%, 35%)`,`hsl(${c}, ${h}%, 30%)`,`hsl(${c}, ${h}%, 45%)`],legend:{show:!1},dataLabels:{enabled:!0,style:{fontSize:"clamp(10px, 1.2vw, 14px)",fontFamily:"var(--paper-font-body1_-_font-family)"},textAnchor:"start",distributed:!0,color:"var(--primary-text-color)",formatter:function(t,e){const i=e.w.globals.series[e.seriesIndex],n=e.w.globals.labels[e.seriesIndex];if("Blüte To Go"===n){const t=m[g.indexOf("Blüte Past")]||0;return t>0?["Blüte",`${t}/${i}/${t+i} Tage`]:["Blüte",`${i} Tage`]}return"Blüte Past"===n?[""]:[`${n}`,`${i} Tage`]}},tooltip:{enabled:!0,theme:"light",style:{fontSize:"clamp(10px, 1.2vw, 14px)"},y:{formatter:function(t){return`${t} Tage`}}},plotOptions:{pie:{dataLabels:{minAngleToShowLabel:0,offset:-25},donut:{size:"0%"},expandOnClick:!0,offsetX:0,offsetY:0}},stroke:{show:!0,width:2,colors:["var(--card-background-color)"]},theme:{mode:"light",palette:"palette1"}};if(o){const e=["samen","keimen","wurzeln","wachstum","blüte","geerntet"];if(e.forEach(((t,i)=>{const n=o.attributes[`${t}_beginn`];if(n){const s=new Date(n);let a=null;if(i<e.length-1){const t=e[i+1],n=o.attributes[`${t}_beginn`];n&&(a=new Date(n))}a||o.state!==t||(a=new Date),this._phaseData.set(t.charAt(0).toUpperCase()+t.slice(1),{start:s,end:a,duration:a?Math.floor((a.getTime()-s.getTime())/864e5):0})}})),o.attributes.blüte_beginn){const e=new Date(o.attributes.blüte_beginn),i=new Date;this._phaseData.set("Blüte Past",{start:e,end:i,duration:Math.floor((i.getTime()-e.getTime())/864e5)});const s=null===(n=this.hass)||void 0===n?void 0:n.states[`number.${t}_flowering_duration`];if(null==s?void 0:s.state){const t=parseInt(s.state),n=new Date(e);n.setDate(n.getDate()+t),this._phaseData.set("Blüte To Go",{start:i,end:n,duration:Math.floor((n.getTime()-i.getTime())/864e5)})}}}const _=new window.ApexCharts(a,v);yield _.render(),this._charts.set("pie",_)}))}_loadApexChartsScript(){return s(this,void 0,void 0,(function*(){const t=document.createElement("link");t.rel="stylesheet",t.href="https://cdn.jsdelivr.net/npm/apexcharts@4.4.0/dist/apexcharts.css",document.head.appendChild(t);const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/apexcharts@4.4.0/dist/apexcharts.min.js";const i=new Promise((t=>{e.onload=()=>{setTimeout(t,100)}}));document.head.appendChild(e),yield i}))}updated(t){if(super.updated(t),this.entityId&&this.hass){const e=this.entityId.split(".")[1];(t.has("entityId")||t.has("hass"))&&(t.has("entityId")&&(this._charts.forEach((t=>{t.destroy()})),this._charts.clear(),this._lastPhaseData.clear()),this._initPieChart(e))}}};e.FlowerConsumption=u,u.styles=l.style,n([(0,o.property)()],u.prototype,"hass",void 0),n([(0,o.property)()],u.prototype,"entityId",void 0),n([(0,o.state)()],u.prototype,"_charts",void 0),n([(0,o.state)()],u.prototype,"_selectedPhase",void 0),n([(0,o.state)()],u.prototype,"_phaseData",void 0),n([(0,o.state)()],u.prototype,"_consumptionData",void 0),e.FlowerConsumption=u=n([(0,o.customElement)("flower-consumption")],u)},4507:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o},s=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.FlowerGallery=void 0;const a=i(4437),o=i(2924),r=i(3534),l=i(364),d=i(8063),c=i(2413),h=i(4139);class u extends a.LitElement{constructor(){super(...arguments),this.images=[],this._currentImageIndex=0,this._isFading=!1,this._showFlyout=!1,this._showDeleteFlyout=!1,this._showMainImageFlyout=!1,this._showOtherImages=!1,this._reparentedToBody=!1,this._plantInfo=null,this._isLoading=!1,this._imagesList=[],this._isImagesLoading=!1,this._otherImagesList=[]}_changeImage(){return s(this,arguments,void 0,(function*(t="next"){this._isFading=!0,this.requestUpdate(),yield new Promise((t=>setTimeout(t,500))),this._currentImageIndex="next"===t?(this._currentImageIndex+1)%this.images.length:(this._currentImageIndex-1+this.images.length)%this.images.length,this._isFading=!1,this.requestUpdate()}))}_selectImage(t){return s(this,void 0,void 0,(function*(){t!==this._currentImageIndex&&(this._isFading=!0,this.requestUpdate(),yield new Promise((t=>setTimeout(t,500))),this._currentImageIndex=t,this._isFading=!1,this.requestUpdate())}))}_toggleFlyout(t){t.preventDefault(),t.stopPropagation(),this._showFlyout=!this._showFlyout}_toggleDeleteFlyout(t){t.preventDefault(),t.stopPropagation(),this._showDeleteFlyout=!this._showDeleteFlyout}_toggleMainImageFlyout(t){t.preventDefault(),t.stopPropagation(),this._showMainImageFlyout=!this._showMainImageFlyout}_toggleOtherImages(t){t.preventDefault(),t.stopPropagation(),this._showOtherImages=!this._showOtherImages,this.requestUpdate()}_calculateOtherImagesWidth(){return 84*this._otherImagesList.length+8*Math.max(0,this._otherImagesList.length-1)+16}_handleFileUpload(t){return s(this,void 0,void 0,(function*(){const e=t.target.files;if(e&&e.length>0){const t=e[0];if(!t.type.startsWith("image/"))return void alert(c.TranslationUtils.translateUI(this.hass,"upload_images_only"));if(t.size>10485760)return void alert(c.TranslationUtils.translateUI(this.hass,"image_too_large"));try{yield this._uploadImage(t),this._showFlyout=!1}catch(t){alert(c.TranslationUtils.translateUI(this.hass,"upload_error")+": "+t.message)}}}))}_uploadImage(t){return s(this,void 0,void 0,(function*(){if(!this.entityId||!this.hass)return;const e=16384,i=new FileReader;i.onload=i=>s(this,void 0,void 0,(function*(){var n;if(!(null===(n=i.target)||void 0===n?void 0:n.result))return;const s=i.target.result,a=Math.ceil(s.byteLength/e);for(let i=0;i<a;i++){const n=s.slice(i*e,(i+1)*e),o=Array.from(new Uint8Array(n)).map((t=>t.toString(16).padStart(2,"0"))).join("");try{yield this.hass.connection.sendMessagePromise({type:"plant/upload_image",entity_id:this.entityId,filename:t.name,chunk:o,chunk_index:i,total_chunks:a})}catch(t){throw console.error("Upload error:",t),t}}yield this.hass.callService("homeassistant","update_entity",{entity_id:this.entityId}),setTimeout((()=>{this._initGallery()}),1e3)})),i.readAsArrayBuffer(t)}))}_deleteImage(t){return s(this,void 0,void 0,(function*(){if(this.entityId&&this.hass)try{yield this.hass.connection.sendMessagePromise({type:"plant/delete_image",entity_id:this.entityId,filename:t}),yield this.hass.callService("homeassistant","update_entity",{entity_id:this.entityId})}catch(t){throw new Error(`${c.TranslationUtils.translateUI(this.hass,"delete_image_error")}: ${t.message}`)}}))}_setMainImage(t){return s(this,void 0,void 0,(function*(){if(this.entityId&&this.hass)try{yield this.hass.connection.sendMessagePromise({type:"plant/set_main_image",entity_id:this.entityId,filename:t}),yield this.hass.callService("homeassistant","update_entity",{entity_id:this.entityId})}catch(t){throw new Error(`${c.TranslationUtils.translateUI(this.hass,"set_main_image_error")}: ${t.message}`)}}))}_close(t){t.stopPropagation(),this._imageRotationInterval&&clearInterval(this._imageRotationInterval),this.onClose&&this.onClose(),this.remove()}_loadPlantInfo(){return s(this,void 0,void 0,(function*(){if(this.entityId&&this.hass&&!this._isLoading){this._isLoading=!0;try{this._plantInfo=yield d.PlantEntityUtils.getPlantInfo(this.hass,this.entityId),yield this._initGallery()}catch(t){console.warn("Fehler beim Laden der Pflanzen-Info:",t),this._plantInfo=null}finally{this._isLoading=!1}}}))}_initGallery(){return s(this,void 0,void 0,(function*(){if(this.entityId&&this.hass&&this._plantInfo&&!this._isImagesLoading){this._isImagesLoading=!0;try{this._imagesList=yield u.getImagesWithDates(this.hass,this.entityId,this._plantInfo),this._otherImagesList=yield u.getOtherImagesWithDates(this.hass,this.entityId,this._plantInfo);const t=[...this._imagesList,...this._otherImagesList];this.images.length,this.images=t.map((t=>t.url)),this._imageRotationInterval&&clearInterval(this._imageRotationInterval),this.images.length>1&&(this._imageRotationInterval=setInterval((()=>{this._changeImage()}),1e4)),this.requestUpdate()}catch(t){console.warn("Fehler beim Laden der Bilder:",t)}finally{this._isImagesLoading=!1}}}))}connectedCallback(){super.connectedCallback(),this.parentElement!==document.body&&(document.body.appendChild(this),this._reparentedToBody=!0),void 0!==this.initialImageIndex&&(this._currentImageIndex=this.initialImageIndex),this._loadPlantInfo()}disconnectedCallback(){super.disconnectedCallback(),this._imageRotationInterval&&clearInterval(this._imageRotationInterval)}static get styles(){return l.galleryStyles}static getImageDateFromUrl(t){const e=t.match(/_(\d{8}_\d{6})/);if(!e)return null;const i=e[1],n=i.slice(0,4),s=i.slice(4,6),a=i.slice(6,8),o=i.slice(9,11),r=i.slice(11,13);return new Date(`${n}-${s}-${a}T${o}:${r}:00`)}static getImagesWithDates(t,e,i){return s(this,void 0,void 0,(function*(){const n=t.states[e];if(!(null==n?void 0:n.attributes.images))return[];const s=n.attributes.download_path||"/local/images/plants/",a=[];let o;return o=i?yield this.getFirstPhaseDate(t,e,i):yield this.getFirstPhaseDate(t,e),n.attributes.entity_picture&&o&&a.push({url:n.attributes.entity_picture,date:o}),n.attributes.images.forEach((t=>{const e=this.getImageDateFromUrl(t);e&&o&&e>=o&&a.push({url:`${s}${t}`,date:e})})),a.sort(((t,e)=>t.date.getTime()-e.date.getTime()))}))}static getOtherImagesWithDates(t,e,i){return s(this,void 0,void 0,(function*(){const n=t.states[e];if(!(null==n?void 0:n.attributes.images))return[];const s=n.attributes.download_path||"/local/images/plants/",a=[];let o;return o=i?yield this.getFirstPhaseDate(t,e,i):yield this.getFirstPhaseDate(t,e),o?(n.attributes.images.forEach((t=>{const e=this.getImageDateFromUrl(t);e?e<o&&a.push({url:`${s}${t}`,date:e}):a.push({url:`${s}${t}`,date:new Date(1970,0,1)})})),a.sort(((t,e)=>t.date.getTime()-e.date.getTime()))):[]}))}static getFirstPhaseDate(t,e,i){return s(this,void 0,void 0,(function*(){var n,s,a,o;if(i){if(!(null===(s=null===(n=null==i?void 0:i.helpers)||void 0===n?void 0:n.growth_phase)||void 0===s?void 0:s.entity_id))return null;const e=i.helpers.growth_phase.entity_id,a=t.states[e];if(!a)return null;const o=h.PHASES;for(const t of o){const e=a.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`];if(e)return new Date(e)}return null}try{const i=yield d.PlantEntityUtils.getPlantInfo(t,e);if(!(null===(o=null===(a=null==i?void 0:i.helpers)||void 0===a?void 0:a.growth_phase)||void 0===o?void 0:o.entity_id))return null;const n=i.helpers.growth_phase.entity_id,s=t.states[n];if(!s)return null;const r=h.PHASES;for(const t of r){const e=s.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`];if(e)return new Date(e)}return null}catch(t){return console.warn("Fehler beim Laden der Pflanzen-Info für getFirstPhaseDate:",t),null}}))}_getGroupedImages(){var t,e,i;if(!this.entityId||!this.hass||!this._plantInfo)return[];const n=[];if(this._otherImagesList.length>0){const t=[];this._otherImagesList.forEach(((e,i)=>{t.push({url:e.url,day:i+1,totalDays:this._otherImagesList.length})})),n.push({phase:c.TranslationUtils.translateUI(this.hass,"other_images"),images:t,color:"var(--secondary-text-color)"})}if(!(null===(i=null===(e=null===(t=this._plantInfo)||void 0===t?void 0:t.helpers)||void 0===e?void 0:e.growth_phase)||void 0===i?void 0:i.entity_id))return n;const s=this._plantInfo.helpers.growth_phase.entity_id,a=this.hass.states[s];if(!a)return n;const o=h.PHASES;let r="",l=[];const d=o.filter((t=>null!=a.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`])),u={};o.forEach((t=>{u[t]=c.TranslationUtils.translateGrowthPhase(this.hass,t)}));let p=null;for(const t of o){const e=a.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`];if(e){p=new Date(e);break}}if(!p)return n;if(this._imagesList.forEach((t=>{const e=t.url,i=t.date;let s="",c=0,h=0;for(const t of o){const e=a.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`];if(e){const n=new Date(e);i>=n&&(s=u[t],c=Math.floor((i.getTime()-n.getTime())/864e5))}}if(h=Math.floor((i.getTime()-p.getTime())/864e5),s){if(s!==r){if(l.length>0){const t=o.find((t=>u[t]===r)),e=t?d.indexOf(t):-1;let i="var(--primary-color)";"harvested"===t?i="repeating-linear-gradient(45deg, var(--primary-color), var(--primary-color) 10px, var(--dark-primary-color) 10px, var(--dark-primary-color) 20px)":"removed"===t?i="repeating-linear-gradient(45deg, var(--error-color), var(--error-color) 10px, var(--dark-error-color) 10px, var(--dark-error-color) 20px)":t&&(i=`hsl(var(--hue, 120), var(--saturation, 60%), ${55-e/Math.max(1,d.length-1)*25}%)`),n.push({phase:r,images:l,color:i})}r=s,l=[]}l.push({url:e,day:c+1,totalDays:h+1})}})),l.length>0){const t=o.find((t=>u[t]===r)),e=t?d.indexOf(t):-1;let i="var(--primary-color)";"harvested"===t?i="repeating-linear-gradient(45deg, var(--primary-color), var(--primary-color) 10px, var(--dark-primary-color) 10px, var(--dark-primary-color) 20px)":"removed"===t?i="repeating-linear-gradient(45deg, var(--error-color), var(--error-color) 10px, var(--dark-error-color) 10px, var(--dark-error-color) 20px)":t&&(i=`hsl(var(--hue, 120), var(--saturation, 60%), ${55-e/Math.max(1,d.length-1)*25}%)`),n.push({phase:r,images:l,color:i})}return n}_getImageDate(t){var e,i,n,s;let a=this._imagesList.find((e=>e.url===t));if(a||(a=this._otherImagesList.find((e=>e.url===t))),!a)return c.TranslationUtils.translateUI(this.hass,"unknown_date");const o=a.date;if(o.getTime()===new Date(1970,0,1).getTime())return`<div class="date-line">${c.TranslationUtils.translateUI(this.hass,"unknown_date")}</div>`;const r=o.toLocaleDateString("de-DE",{weekday:"short",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});if(!(null===(n=null===(i=null===(e=this._plantInfo)||void 0===e?void 0:e.helpers)||void 0===i?void 0:i.growth_phase)||void 0===n?void 0:n.entity_id))return r;const l=this._plantInfo.helpers.growth_phase.entity_id,d=null===(s=this.hass)||void 0===s?void 0:s.states[l];if(!d)return r;const u=h.PHASES;let p="",m=0,g=0,f=null;for(const t of u){const e=d.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`];if(e){f=new Date(e);break}}for(const t of u){const e=d.attributes[`${"removed"===t||"harvested"===t?t:t+"_start"}`];if(e){const i=new Date(e);o>=i&&(p=c.TranslationUtils.translateGrowthPhase(this.hass,t),m=Math.floor((o.getTime()-i.getTime())/864e5))}}if(f&&(g=Math.floor((o.getTime()-f.getTime())/864e5)),0===this.images.indexOf(t)){let t=`<div class="date-line">${r}</div>`;return t+=`<div class="info-line">Tag 1 <span class="phase">${p}</span>/1 Total</div>`,t}let v=`<div class="date-line">${r}</div>`;return v+=`<div class="info-line">Tag ${m+1} <span class="phase">${p}</span>/${g+1} Total</div>`,v}render(){return a.html`
            <div class="gallery-overlay" @click="${this._close}">
                <div class="gallery-content" @click="${t=>t.stopPropagation()}">
                    <div class="gallery-header">
                        <span class="gallery-date">
                            ${this.images.length>0?(0,r.unsafeHTML)(this._getImageDate(this.images[this._currentImageIndex])):c.TranslationUtils.translateUI(this.hass,"no_images_available")}
                        </span>
                        <div class="gallery-header-buttons">
                            <div class="flyout-container ${this._showFlyout?"open":""} ${this._showDeleteFlyout?"delete-open":""} ${this._showMainImageFlyout?"main-open":""}">
                                <ha-icon-button
                                    @click="${this._toggleFlyout}"
                                    .label=${c.TranslationUtils.translateUI(this.hass,"add_image")}
                                    class="add-button"
                                >
                                    <ha-icon icon="mdi:camera-plus"></ha-icon>
                                </ha-icon-button>
                                <div class="flyout-menu">
                                    <label class="flyout-option">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            @change="${t=>{this._handleFileUpload(t),this._showFlyout=!1}}"
                                            style="display: none;"
                                        >
                                        <ha-icon-button>
                                            <ha-icon icon="mdi:image"></ha-icon>
                                        </ha-icon-button>
                                    </label>
                                    <label class="flyout-option">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            capture="environment"
                                            @change="${t=>{this._handleFileUpload(t),this._showFlyout=!1}}"
                                            style="display: none;"
                                        >
                                        <ha-icon-button>
                                            <ha-icon icon="mdi:camera"></ha-icon>
                                        </ha-icon-button>
                                    </label>
                                </div>
                            </div>
                            ${this.images.length>0?a.html`
                                <div class="flyout-container ${this._showMainImageFlyout?"open":""} ${this._showDeleteFlyout?"delete-open":""}">
                                    <ha-icon-button
                                        @click="${this._toggleMainImageFlyout}"
                                        .label=${c.TranslationUtils.translateUI(this.hass,"set_as_main_image")}
                                        class="main-button"
                                    >
                                        <ha-icon icon="mdi:image-check"></ha-icon>
                                    </ha-icon-button>
                                    <div class="flyout-menu">
                                        <ha-icon-button
                                            @click="${()=>s(this,void 0,void 0,(function*(){const t=this.images[this._currentImageIndex].split("/").pop();if(t)try{yield this._setMainImage(t),this._showMainImageFlyout=!1}catch(t){alert(c.TranslationUtils.translateUI(this.hass,"set_main_image_error")+": "+t.message)}}))}"
                                            class="confirm-main"
                                            style="--mdc-icon-button-size: 32px; color: var(--primary-color, #03a9f4);"
                                        >
                                            <ha-icon icon="mdi:check"></ha-icon>
                                        </ha-icon-button>
                                    </div>
                                </div>
                                <div class="flyout-container ${this._showDeleteFlyout?"open":""}">
                                    <ha-icon-button
                                        @click="${this._toggleDeleteFlyout}"
                                        .label=${c.TranslationUtils.translateUI(this.hass,"delete_image")}
                                        class="delete-button"
                                    >
                                        <ha-icon icon="mdi:delete"></ha-icon>
                                    </ha-icon-button>
                                    <div class="flyout-menu">
                                        <ha-icon-button
                                            @click="${()=>s(this,void 0,void 0,(function*(){const t=this.images[this._currentImageIndex].split("/").pop();if(t)try{yield this._deleteImage(t),this._showDeleteFlyout=!1,this.images=this.images.filter((e=>!e.includes(t))),this._currentImageIndex>=this.images.length&&(this._currentImageIndex=Math.max(0,this.images.length-1))}catch(t){alert(c.TranslationUtils.translateUI(this.hass,"delete_error")+": "+t.message)}}))}"
                                            class="confirm-delete"
                                            style="--mdc-icon-button-size: 32px; color: var(--error-color, #db4437);"
                                        >
                                            <ha-icon icon="mdi:check"></ha-icon>
                                        </ha-icon-button>
                                    </div>
                                </div>
                            `:""}
                            <ha-icon-button
                                @click="${this._close}"
                                .label=${c.TranslationUtils.translateUI(this.hass,"close")}
                            >
                                <ha-icon icon="mdi:close"></ha-icon>
                            </ha-icon-button>
                        </div>
                    </div>
                    
                    ${this.images.length>0?a.html`
                        <div class="gallery-image-container">
                            <ha-icon-button
                                class="gallery-nav prev"
                                @click="${()=>this._changeImage("prev")}"
                                .label=${c.TranslationUtils.translateUI(this.hass,"previous_image")}
                            >
                                <ha-icon icon="mdi:chevron-left"></ha-icon>
                            </ha-icon-button>
                            <a href="${this.images[this._currentImageIndex]}" target="_blank">
                                <img class="gallery-image ${this._isFading?"fade":""}" 
                                    src="${this.images[this._currentImageIndex]}"
                                >
                            </a>
                            <ha-icon-button
                                class="gallery-nav next"
                                @click="${()=>this._changeImage("next")}"
                                .label=${c.TranslationUtils.translateUI(this.hass,"next_image")}
                            >
                                <ha-icon icon="mdi:chevron-right"></ha-icon>
                            </ha-icon-button>
                        </div>
                        <div class="gallery-thumbnails">
                            <div class="thumbnails-container">
                                ${this._otherImagesList.length>0?a.html`
                                    <div class="nav-toggle ${this._showOtherImages?"open":"closed"}"
                                         @click="${this._toggleOtherImages}">
                                        <ha-icon icon="mdi:chevron-left" class="nav-icon"></ha-icon>
                                    </div>
                                `:""}
                                <div class="thumbnails-scroll ${this._otherImagesList.length>0?"has-other-images":""} ${this._showOtherImages?"shifted-right":""}"
                                     style="--other-images-width: ${this._otherImagesList.length>0?this._calculateOtherImagesWidth():0}px">
                                    ${this._getGroupedImages().map((t=>a.html`
                                        <div class="thumbnail-group">
                                            <div class="thumbnail-group-label" style="--phase-color: ${t.color}">
                                                ${t.phase}
                                            </div>
                                            <div class="thumbnail-group-images">
                                                ${t.images.map((t=>a.html`
                                                    <div class="thumbnail-container ${this.images[this._currentImageIndex]===t.url?"active":""}"
                                                         @click="${()=>this._selectImage(this.images.indexOf(t.url))}">
                                                        <div class="thumbnail-day">Tag ${t.day}/${t.totalDays}</div>
                                                        <img class="thumbnail" src="${t.url}">
                                                    </div>
                                                `))}
                                            </div>
                                        </div>
                                    `))}
                                </div>
                            </div>
                        </div>
                    `:a.html`
                        <div class="no-images-message">
                            <ha-icon icon="mdi:image-off"></ha-icon>
                            <span>${c.TranslationUtils.translateUI(this.hass,"no_images_available")}</span>
                            <span>${c.TranslationUtils.translateUI(this.hass,"click_camera_to_add_image")}</span>
                        </div>
                    `}
                </div>
            </div>
        `}}e.FlowerGallery=u,n([(0,o.property)()],u.prototype,"hass",void 0),n([(0,o.property)()],u.prototype,"entityId",void 0),n([(0,o.property)({type:Array})],u.prototype,"images",void 0),n([(0,o.property)()],u.prototype,"onClose",void 0),n([(0,o.property)()],u.prototype,"getImageDate",void 0),n([(0,o.property)({type:Number})],u.prototype,"initialImageIndex",void 0),n([(0,o.state)()],u.prototype,"_currentImageIndex",void 0),n([(0,o.state)()],u.prototype,"_isFading",void 0),n([(0,o.state)()],u.prototype,"_showFlyout",void 0),n([(0,o.state)()],u.prototype,"_showDeleteFlyout",void 0),n([(0,o.state)()],u.prototype,"_showMainImageFlyout",void 0),n([(0,o.state)()],u.prototype,"_showOtherImages",void 0),customElements.get("flower-gallery")||customElements.define("flower-gallery",u)},5953:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o},s=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.FlowerGraph=e.chartOptions=void 0,e.setStartTimestamp=c;const a=i(4437),o=i(2924),r=i(1334),l=i(8063),d=i(2413);function c(t){window.startTimestamp=t}e.chartOptions={chart:{type:"rangeArea",height:250,animations:{enabled:!0,speed:800,animateGradually:{enabled:!0,delay:150},dynamicAnimation:{enabled:!0,speed:350}},background:"transparent",zoom:{enabled:!0,autoScaleYaxis:!1,allowMouseWheelZoom:!0,type:"x"},toolbar:{show:!0,tools:{download:!1,selection:!0,zoom:!0,zoomin:!0,zoomout:!0,pan:!0,reset:!0},autoSelected:"zoom"}},series:[],legend:{show:!0,showForSingleSeries:!0,position:"right",horizontalAlign:"left",offsetY:5,offsetX:0,fontSize:"0px",markers:{size:0}},xaxis:{type:"datetime",labels:{rotateAlways:!1,datetimeUTC:!1,hideOverlappingLabels:!0,formatter:function(t,e,i){var n,s,a,o;const r=new Date(t),l=new Date(window.startTimestamp||r);l.setHours(0,0,0,0);const d=Math.floor((r.getTime()-l.getTime())/864e5)+1,c=(null===(s=null===(n=null==i?void 0:i.w)||void 0===n?void 0:n.globals)||void 0===s?void 0:s.minX)||0,h=((null===(o=null===(a=null==i?void 0:i.w)||void 0===a?void 0:a.globals)||void 0===o?void 0:o.maxX)||0)-c;if(h<2592e5)return new Date(r.getTime()-36e5).getDate()!==r.getDate()?`(${d}) ${new Intl.DateTimeFormat(void 0,{day:"numeric",month:"numeric"}).format(r)}`:new Intl.DateTimeFormat(void 0,{hour:"2-digit",minute:"2-digit"}).format(r);if(h<26784e5)return`${d} | ${new Intl.DateTimeFormat(void 0,{day:"numeric",month:"numeric"}).format(r)}`;{const t=new Date(r.getTime()+864e5);return r.getMonth()!==t.getMonth()?`${d} | ${new Intl.DateTimeFormat(void 0,{day:"numeric",month:"numeric",year:"2-digit"}).format(r)}`:`${d} | ${new Intl.DateTimeFormat(void 0,{day:"numeric",month:"numeric"}).format(r)}`}},style:{fontSize:"12px",fontFamily:"var(--paper-font-body1_-_font-family)"}},axisBorder:{show:!1},axisTicks:{show:!1},crosshairs:{show:!0,width:1,position:"back",opacity:.9,stroke:{color:"#b6b6b6",width:1,dashArray:3}},tooltip:{enabled:!1}},yaxis:[{labels:{formatter:t=>`${t.toFixed(0)}`,style:{fontSize:"11px",fontFamily:"var(--paper-font-body1_-_font-family)"},offsetX:-5},min:0,max:35,tickAmount:10,axisBorder:{show:!1},axisTicks:{show:!1}},{opposite:!0,labels:{formatter:t=>`${t.toFixed(0)}`,style:{fontSize:"11px",fontFamily:"var(--paper-font-body1_-_font-family)"},offsetX:5},min:0,max:100,floating:!0,tickAmount:10,axisBorder:{show:!1},axisTicks:{show:!1}}],stroke:{curve:"smooth",width:Array(20).fill(2),dashArray:Array(20).fill(0)},colors:[],tooltip:{enabled:!0,shared:!0,intersect:!1,followCursor:!1,custom:function({series:t,dataPointIndex:e,w:i}){try{const n=i.globals.seriesX[0][e];if(!n||isNaN(n)||n<=0)return console.warn("[Graph] Ungültiger Timestamp:",n),'<div class="tooltip-error">Ungültige Zeitdaten</div>';const s=new Date(n);if(isNaN(s.getTime()))return console.warn("[Graph] Ungültiges Datum für Timestamp:",n),'<div class="tooltip-error">Ungültiges Datum</div>';let a=0;if(window.startTimestamp){const t=window.startTimestamp<1e12?1e3*window.startTimestamp:window.startTimestamp,e=new Date(t);if(!isNaN(e.getTime())){const t=new Date(e);t.setHours(0,0,0,0),a=Math.floor((s.getTime()-t.getTime())/864e5)+1}}const o=new Intl.DateTimeFormat(void 0,{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"}).format(s),r=a>0?`<strong>Tag ${a}</strong> - ${o}`:o;return`\n                    <div class="tooltip-container">\n                        <div class="tooltip-header">${r}</div>\n                        <div class="tooltip-content">${(i.config.series?i.config.series.filter(((t,e)=>e%2==1)).map(((t,e)=>{const n=2*e;return{name:t.name,unit:i.config.series[n].unit||"",color:i.config.colors[n],index:n}})):[]).map((n=>{var s,a,o;const r=void 0!==(null===(a=null===(s=i.globals.seriesRangeStart)||void 0===s?void 0:s[n.index])||void 0===a?void 0:a[e])?{min:i.globals.seriesRangeStart[n.index][e],max:i.globals.seriesRangeEnd[n.index][e]}:void 0,l=null===(o=t[n.index+1])||void 0===o?void 0:o[e];return`<div class="tooltip-sensor-name" style="color: ${n.color}">${n.name}:</div><div class="tooltip-range">${r?`${Number(r.min).toFixed(0)} - ${Number(r.max).toFixed(0)}`:"-"}</div><div class="tooltip-mean">${null==l?"-":`${Number(l).toFixed(1)}${n.unit}`}</div>`})).join("")}</div>\n                    </div>\n                `}catch(t){return console.error("Fehler beim Erstellen des Tooltips:",t),'<div class="tooltip-error">Fehler beim Laden der Daten</div>'}},fillSeriesColor:!1,theme:!1,onDatasetHover:{highlightDataSeries:!0}},dataLabels:{enabled:!1},markers:{size:[0,0],strokeWidth:2,hover:{size:3,sizeOffset:3}},fill:{type:["solid","solid"],opacity:[.24,1]},grid:{show:!1,padding:{top:0,right:0,bottom:0,left:0}},theme:{mode:"light"}};let h=class extends a.LitElement{constructor(){super(...arguments),this._data=[],this._dateRange=[new Date,new Date],this._lastUpdate=0,this._scriptLoaded=!1,this._prevRangeData=null,this._prevMeanData=null,this._prevMoistureRangeData=null,this._prevMoistureMeanData=null,this._isConnected=!1,this._plantInfo=null,this._sensorTypes=[{id:"temperature",scale:1,yaxis:0,color:"#2E93fA"},{id:"conductivity",scale:.01,yaxis:0,color:"#00D2FF"},{id:"dli",scale:1,yaxis:0,color:"#FFB900"},{id:"health",scale:6,yaxis:0,color:"#FF4560",apiPath:"helpers.health"},{id:"water_consumption",scale:1,yaxis:0,color:"#775DD0"},{id:"fertilizer_consumption",scale:.01,yaxis:0,color:"#00D2FF"},{id:"power_consumption",scale:1,yaxis:0,color:"#FEB019"},{id:"soil_moisture",scale:1,yaxis:1,color:"#00E396",apiPath:"moisture"},{id:"illuminance",scale:.01,yaxis:1,color:"#CED4DC"},{id:"humidity",scale:1,yaxis:1,color:"#008FFB"}],this._sensors=[]}connectedCallback(){const t=Object.create(null,{connectedCallback:{get:()=>super.connectedCallback}});return s(this,void 0,void 0,(function*(){t.connectedCallback.call(this),this._isConnected=!0,this.entityId&&this.hass&&(yield this._loadScripts(),yield this._loadFlatpickr())}))}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1,this._chart&&(this._chart.destroy(),this._chart=void 0),this._picker&&(this._picker.destroy(),this._picker=void 0)}firstUpdated(){return s(this,void 0,void 0,(function*(){this.entityId&&this.hass&&(yield this._loadScripts(),yield this._loadFlatpickr(),this._initDatePicker(),this._plantInfo=yield this._getPlantInfo(),this._plantInfo?(this._updateSensorsFromPlantInfo(),yield this.updateDateRange(),this._initChart(),this.requestUpdate()):console.warn("Keine Pflanzeninformationen verfügbar"))}))}_updateSensorsFromPlantInfo(){this._plantInfo&&(this._sensors=this._sensorTypes.map((t=>{const e=(t.apiPath||t.id).split(".");let i=this._plantInfo;for(const t of e){if(!i||"object"!=typeof i||!i[t]){i=null;break}i=i[t]}return"helpers"===e[0]&&i&&i.entity_id?{id:t.id,name:this.hass?d.TranslationUtils.translateSensor(this.hass,t.id):t.id,scale:t.scale,yaxis:t.yaxis,color:t.color,entityId:i.entity_id,icon:i.icon,unit:i.unit_of_measurement}:{id:t.id,name:this.hass?d.TranslationUtils.translateSensor(this.hass,t.id):t.id,scale:t.scale,yaxis:t.yaxis,color:t.color,entityId:(null==i?void 0:i.sensor)||null,icon:null==i?void 0:i.icon,unit:null==i?void 0:i.unit_of_measurement}})).filter((t=>null!==t.entityId)))}updateDateRange(){return s(this,void 0,void 0,(function*(){if(!this.entityId||!this.hass)return;const t=this.entityId.split(".")[1],e=this.hass.states[`select.${t}_growth_phase`];if(null==e?void 0:e.attributes){const t=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],i=[];for(const n of t){const t=e.attributes[`${"entfernt"===n||"geerntet"===n?n:n+"_beginn"}`];if(t){const e=new Date(t);isNaN(e.getTime())||i.push(e)}}if(i.length>0){const t=new Date(Math.min(...i.map((t=>t.getTime()))));this._dateRange=[t,new Date],this._picker&&this._picker.setDate(this._dateRange,!1)}}return this._dateRange}))}_loadScripts(){return s(this,void 0,void 0,(function*(){if(this._scriptLoaded||window.ApexCharts)return void(this._scriptLoaded=!0);const t=document.createElement("link");t.rel="stylesheet",t.href="https://cdn.jsdelivr.net/npm/apexcharts@4.4.0/dist/apexcharts.css",document.head.appendChild(t);const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/apexcharts@4.4.0/dist/apexcharts.min.js";const i=new Promise((t=>{e.onload=t}));document.head.appendChild(e),yield i,this._scriptLoaded=!0}))}_loadFlatpickr(){return s(this,void 0,void 0,(function*(){if(window.flatpickr)return;const t=document.createElement("link");t.rel="stylesheet",t.href="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css",document.head.appendChild(t);const e=document.createElement("script");e.src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js";const i=new Promise((t=>{e.onload=t}));document.head.appendChild(e),yield i;const n=document.createElement("script");n.src="https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/l10n/de.js";const s=new Promise((t=>{n.onload=t}));document.head.appendChild(n),yield s}))}updated(t){const e=Object.create(null,{updated:{get:()=>super.updated}});return s(this,void 0,void 0,(function*(){if(e.updated.call(this,t),!this._scriptLoaded)return yield this._loadScripts(),void(yield this._loadFlatpickr());if(t.has("entityId"))this.updateGraphData();else if(t.has("hass")&&this.hass&&this.entityId){const e=t.get("hass");if(!e)return;const i=`sensor.${this.entityId.split(".")[1]}_temperature`,n=e.states[i],s=this.hass.states[i];(null==n?void 0:n.state)!==(null==s?void 0:s.state)&&this.updateGraphData()}}))}_initDatePicker(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#date-picker");e&&window.flatpickr&&(this._picker=window.flatpickr(e,{mode:"range",enableTime:!0,time_24hr:!0,locale:"de",defaultDate:this._dateRange,formatDate:t=>{const e=(this._dateRange[1].getTime()-this._dateRange[0].getTime())/864e5;return e>30?t.toLocaleDateString(void 0,{day:"2-digit",month:"2-digit",year:"2-digit"}):e>2?t.toLocaleDateString(void 0,{day:"2-digit",month:"2-digit"}):t.toLocaleString(void 0,{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"})},onChange:t=>{2===t.length&&(this._dateRange=[t[0],t[1]],this.updateGraphData())}}))}_getPlantInfo(){return s(this,void 0,void 0,(function*(){return this.entityId&&this.hass?l.PlantEntityUtils.getPlantInfo(this.hass,this.entityId):null}))}updateGraphData(){return s(this,arguments,void 0,(function*(t=!0){if(!this.entityId||!this.hass)return;this._plantInfo=yield this._getPlantInfo(),this._updateSensorsFromPlantInfo();const e=this._dateRange[0].toISOString(),i=this._dateRange[1].toISOString(),n=(this._dateRange[1].getTime()-this._dateRange[0].getTime())/864e5,s={},a=this._sensors.filter((t=>!t.entityId.startsWith("number.")&&!t.entityId.startsWith("input_number."))),o=this._sensors.filter((t=>t.entityId.startsWith("number.")||t.entityId.startsWith("input_number.")));let r="hour";n<=2&&(r="5minute");for(const t of o){const n=yield this.hass.callApi("GET",`history/period/${e}?filter_entity_id=${t.entityId}&end_time=${i}`);if(n&&Array.isArray(n)&&n.length>0){let e=n[0].filter((t=>t.state&&!isNaN(parseFloat(t.state))&&"unavailable"!==t.state&&"unknown"!==t.state)).map((t=>{const e=parseFloat(t.state),i=new Date(t.last_changed).getTime();return{start:new Date(i).toISOString(),end:new Date(i+6e4).toISOString(),mean:e,min:e,max:e,sum:e}}));e=this._groupHistoryData(e,r),e.length>0&&(s[t.entityId]=e)}}if(a.length>0){const t=a.map((t=>t.entityId));let o=null;n<=2&&(o=yield this.hass.callWS({type:"recorder/statistics_during_period",start_time:e,end_time:i,statistic_ids:t,period:"5minute"}),o&&0!==Object.keys(o).length&&Object.values(o).some((t=>t&&t.length>0))||(o=null)),o||(o=yield this.hass.callWS({type:"recorder/statistics_during_period",start_time:e,end_time:i,statistic_ids:t,period:"hour"})),o&&Object.assign(s,o)}const l=[];if(this._sensors.forEach((t=>{const e=t.entityId;let i=[],n=[];if(s[e]&&s[e].length>0){const a=s[e].filter((t=>null!==t.mean)),o=this._getScale(t.id);if(a.length>50){const t=this._groupGraphData(a,o);i=t.rangeData,n=t.meanData}else i=a.map((t=>({x:new Date(t.start).getTime(),y:[t.min*o,t.max*o]}))),n=a.map((t=>({x:new Date(t.start).getTime(),y:t.mean*o})))}l.push({rangeData:i,meanData:n})})),this._chart){const e=this._sensors.map(((t,e)=>[{name:`${t.name}bereich`,type:"rangeArea",data:l[e].rangeData,yAxisIndex:t.yaxis,unit:t.unit},{name:t.name,type:"line",data:l[e].meanData,yAxisIndex:t.yaxis,unit:t.unit}])).flat();this._chart.updateSeries(e,t)}this._lastUpdate=Date.now()}))}_getSeriesName(t,e){const i=this.hass?d.TranslationUtils.translateSensor(this.hass,t):t,n=this.hass?d.TranslationUtils.translateUI(this.hass,"tooltip_range"):"Bereich";return e?`${i}${n}`:i}_groupGraphData(t,e=1){if(0===t.length)return{rangeData:[],meanData:[]};const i=t.slice().sort(((t,e)=>new Date(t.start).getTime()-new Date(e.start).getTime())),n=new Date(i[0].start).getTime(),s=(new Date(i[i.length-1].start).getTime()-n)/50,a=[];for(let t=0;t<50;t++)a.push({xValues:[],min:1/0,max:-1/0,sum:0,count:0});i.forEach((t=>{const i=new Date(t.start).getTime();let o=Math.floor((i-n)/s);o>=50&&(o=49);const r=a[o];r.xValues.push(i),r.min=Math.min(r.min,t.min*e),r.max=Math.max(r.max,t.max*e),r.sum+=t.mean*e,r.count++}));const o=[],r=[];return a.forEach((t=>{if(t.count>0){const e=t.xValues.reduce(((t,e)=>t+e),0)/t.count;o.push({x:e,y:[t.min,t.max]}),r.push({x:e,y:t.sum/t.count})}})),{rangeData:o,meanData:r}}_getScale(t){return{temperature:1,conductivity:.01,dli:1,health:1,water_consumption:1,fertilizer_consumption:.01,power_consumption:1,soil_moisture:1,illuminance:.01,humidity:1}[t]||1}_initChart(){return s(this,void 0,void 0,(function*(){var t,i;if(!window.ApexCharts)return void console.warn("ApexCharts ist noch nicht geladen");yield new Promise((t=>requestAnimationFrame(t)));const n=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("#chart");if(!n)return void console.warn("Chart Container nicht gefunden");if(0===n.clientWidth)return void setTimeout((()=>this._initChart()),100);if(this._chart){try{this._chart.destroy()}catch(t){console.warn("Fehler beim Zerstören des alten Charts:",t)}this._chart=void 0}const s=null===(i=this.entityId)||void 0===i?void 0:i.split(".")[1];if(s&&this.hass){const t=this.hass.states[`select.${s}_growth_phase`];if(null==t?void 0:t.attributes){const e=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],i=[];for(const n of e){const e=t.attributes[`${"entfernt"===n||"geerntet"===n?n:n+"_beginn"}`];if(e){const t=new Date(e);isNaN(t.getTime())||i.push(t)}}i.length>0&&c(new Date(Math.min(...i.map((t=>t.getTime())))).getTime())}}const a=[],o=[];for(const t of this._sensors){a.push({name:`${t.name}bereich`,type:"rangeArea",data:[],yAxisIndex:t.yaxis,unit:t.unit}),a.push({name:t.name,type:"line",data:[],yAxisIndex:t.yaxis,unit:t.unit});const e=t.color||"#777777";o.push(e,e)}const r=Object.assign(Object.assign({},e.chartOptions),{series:a,colors:o,chart:Object.assign(Object.assign({},e.chartOptions.chart),{events:{zoomed:(t,{xaxis:e})=>{e&&console.debug("Zoomed event triggered with xaxis:",e)},beforeZoom:(t,{xaxis:e})=>{if(!e||!window.startTimestamp)return;let i=e.min,n=e.max;i<window.startTimestamp&&(i=window.startTimestamp);const s=(new Date).getTime();n>s&&(n=s);const a=new Date(i),o=new Date(n);return isNaN(a.getTime())||isNaN(o.getTime())?(console.warn("Ungültige Datumswerte beim Zoom:",e),{xaxis:{min:i,max:n}}):(this._dateRange=[a,o],this._picker&&this._picker.setDate(this._dateRange,!1),this.updateGraphData(!1),{xaxis:{min:i,max:n}})},beforeResetZoom:()=>{if(this.entityId&&this.hass)try{const t=this.entityId.split(".")[1],e=this.hass.states[`select.${t}_growth_phase`];if(!(null==e?void 0:e.attributes))return;const i=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],n=[];for(const t of i){const i=e.attributes[`${"entfernt"===t||"geerntet"===t?t:t+"_beginn"}`];if(i){const t=new Date(i);isNaN(t.getTime())||n.push(t)}}if(n.length>0){const t=new Date(Math.min(...n.map((t=>t.getTime())))),e=new Date;return this._dateRange=[t,e],this._picker&&this._picker.setDate(this._dateRange,!1),this.updateGraphData(!1),{xaxis:{min:t.getTime(),max:e.getTime()}}}}catch(t){console.warn("Fehler beim Reset-Zoom:",t)}}}})});try{this._chart=new window.ApexCharts(n,r),yield this._chart.render(),this.updateGraphData()}catch(t){console.error("Fehler bei der Chart-Initialisierung:",t),this._chart=void 0}}))}render(){return this.entityId&&this.hass?a.html`
            <div class="graph-container">
                <div class="date-picker-container">
                    <input type="text" id="date-picker" readonly>
                </div>
                <div id="chart"></div>
                
                ${this._plantInfo&&this._sensors.length>0?a.html`
                <div class="custom-legend">
                    ${this._sensors.map(((t,e)=>a.html`
                        <div class="legend-item" @click=${()=>this._toggleSeries(2*e)}>
                            <ha-icon icon="${t.icon||""}" class="legend-marker"></ha-icon>
                            <span class="legend-text">${this._getSeriesName(t.id,!1)}</span>
                        </div>
                    `))}
                </div>
                `:a.html``}
            </div>
        `:a.html``}_toggleSeries(t){if(this._chart&&this.shadowRoot)try{const e=this.shadowRoot.querySelector(`.legend-item:nth-child(${Math.floor(t/2)+1})`);if(!e)return void console.warn("Legend-Item nicht gefunden bei Index:",t);if(e.classList.toggle("inactive"),this._chart&&this._chart.w&&this._chart.w.globals&&this._chart.w.globals.initialSeries){const e=this._chart.w.globals.initialSeries;if(!e||e.length<=t+1)return void console.warn("Serien nicht gefunden:",t);this._chart.toggleSeries(e[t].name),this._chart.toggleSeries(e[t+1].name)}}catch(t){console.error("Fehler beim Umschalten der Serien:",t)}}static get styles(){return r.graphStyles}_groupHistoryData(t,e){if(0===t.length)return[];const i={},n="5minute"===e?3e5:36e5;return t.forEach((t=>{const e=new Date(t.start).getTime(),s=(Math.floor(e/n)*n).toString();i[s]||(i[s]=[]),i[s].push(t)})),Object.entries(i).map((([t,e])=>{const i=Math.min(...e.map((t=>t.min))),s=Math.max(...e.map((t=>t.max))),a=e.reduce(((t,e)=>t+e.mean),0),o=a/e.length;return{start:new Date(parseInt(t)).toISOString(),end:new Date(parseInt(t)+n).toISOString(),mean:o,min:i,max:s,sum:a}})).sort(((t,e)=>new Date(t.start).getTime()-new Date(e.start).getTime()))}};e.FlowerGraph=h,e.FlowerGraph=h=n([(0,o.customElement)("flower-graph")],h)},1261:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o},s=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.FlowerHistory=e.EVENT_TYPES=void 0;const a=i(4437),o=i(2924),r=i(4356),l=i(4302),d=i(4507),c=i(4139),h=i(8063),u=i(2413),p=120,m=60,g=207,f=90,v=280,_=70,y=45,b=100,w=175,x=70,$=330,k=80,T=207,I=90;e.EVENT_TYPES={PHASE:"phase",AREA:"area",POT:"pot-size",TREATMENT:"treatment",IMAGE:"image",JOURNAL:"journal"};const E="phase",S="area",D="pot-size",A="treatment",P="journal";let C=class extends a.LitElement{constructor(){super(...arguments),this.events=[],this._imageUrls=[],this._showGallery=!1,this._selectedImageIndex=null,this._expandedJournalIds=new Set,this._plantingDate=null,this._addMenuOpen=!1,this._selectedAddAction=null,this._newEntryValue="",this._newEntryDate=(new Date).toISOString().split("T")[0],this._addingEntry=!1,this._newEntryAdded=!1}_showMoreInfo(t){(0,r.fireEvent)(this,"hass-more-info",{entityId:t})}connectedCallback(){super.connectedCallback(),this._updateEvents()}updated(t){(t.has("entityId")||t.has("hass"))&&this._updateEvents()}_updateEvents(){return s(this,void 0,void 0,(function*(){if(!this.entityId||!this.hass)return;const t=this.entityId.split(".")[1];this._plantingDate=yield this._getPlantingDate(),this.events=yield this._collectEvents(t)}))}_getPlantingDate(){return s(this,void 0,void 0,(function*(){var t;if(!this.entityId||!this.hass)return null;let e;try{e=yield h.PlantEntityUtils.getPlantInfo(this.hass,this.entityId)}catch(t){return null}const i=null===(t=((null==e?void 0:e.helpers)||{}).growth_phase)||void 0===t?void 0:t.entity_id;if(!i)return null;const n=this.hass.states[i];if(!(null==n?void 0:n.attributes))return null;const s=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],a=[];for(const t of s){const e=n.attributes[`${"entfernt"===t||"geerntet"===t?t:t+"_beginn"}`];if(e){const t=new Date(e);isNaN(t.getTime())||a.push(t)}}return a.length>0?new Date(Math.min(...a.map((t=>t.getTime())))):null}))}_collectEvents(t){return s(this,void 0,void 0,(function*(){var i,n,s,a,o,r,l;if(!this.hass)return[];const c=[],T=this.hass.states[`plant.${t}`];if(!T)return[];let I;try{I=yield h.PlantEntityUtils.getPlantInfo(this.hass,`plant.${t}`)}catch(t){return console.warn("Fehler beim Laden der Pflanzen-Info:"),[]}const E=(null==I?void 0:I.helpers)||{},S=this.historyGroups||Object.values(e.EVENT_TYPES);if(S.includes(e.EVENT_TYPES.PHASE)&&(null===(i=E.growth_phase)||void 0===i?void 0:i.entity_id)){const t=E.growth_phase.entity_id,e=this.hass.states[t];if(e){const t=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],i=[];for(const n of t){const s=null==e?void 0:e.attributes[`${"entfernt"===n||"geerntet"===n?n:n+"_beginn"}`];if(s){const e={date:new Date(s),type:`phase-${n}`,label:u.TranslationUtils.translateGrowthPhase(this.hass,n),description:`${u.TranslationUtils.translateGrowthPhase(this.hass,n)} ${u.TranslationUtils.translateHistory(this.hass,"phase_started")} ${new Date(s).toLocaleDateString()}`};if("entfernt"===n)e.style="display: none;";else if("geerntet"===n)e.style=`background-color: hsl(${p}, 70%, 45%);`;else{const i=t.filter((t=>"entfernt"!==t&&"geerntet"!==t)),s=i.indexOf(n),a=1===i.length?55:55-s/Math.max(1,i.length-1)*25;e.style=`background-color: hsl(${p}, ${m}%, ${a}%)`}i.push(e)}}c.push(...i)}}if(S.includes(e.EVENT_TYPES.IMAGE)){const e=yield d.FlowerGallery.getImagesWithDates(this.hass,`plant.${t}`,I);this._imageUrls=e.map((t=>t.url));const i=e.map(((t,e)=>({date:t.date,type:"image",label:u.TranslationUtils.translateHistory(this.hass,"photo"),description:`${u.TranslationUtils.translateHistory(this.hass,"image_taken")} ${t.date.toLocaleDateString()}`,style:`background-color: hsl(${w}, ${x}%, 45%);`,data:{imageIndex:e,url:t.url}})));c.push(...i)}if(S.includes(e.EVENT_TYPES.POT)&&(null===(n=E.pot_size)||void 0===n?void 0:n.entity_id))try{const t=(null===(s=c[0])||void 0===s?void 0:s.date.toISOString())||(new Date).toISOString(),e=(new Date).toISOString(),i=yield this.hass.callApi("GET",`history/period/${t}?filter_entity_id=${E.pot_size.entity_id}&end_time=${e}`);if(i&&Array.isArray(i)&&i.length>0){let t=null;const e=[],n=i[0];for(let i=0;i<n.length;i++){const s=n[i];s.state&&!isNaN(parseFloat(s.state))&&"unavailable"!==s.state&&"unknown"!==s.state&&(null!==t&&s.state===t||(e.push({date:new Date(s.last_changed),type:"pot-size",label:`${s.state}L`,description:`${u.TranslationUtils.translateHistory(this.hass,"pot_size_changed")} ${s.state}L ${new Date(s.last_changed).toLocaleDateString()}`}),t=s.state))}e.forEach(((t,e)=>{const i=65-10*e;t.style=`background-color: hsl(${g}, ${f}%, ${i}%)`})),c.push(...e)}}catch(t){}if(S.includes(e.EVENT_TYPES.AREA)&&T){const t=((null===(a=null==T?void 0:T.attributes)||void 0===a?void 0:a.area_history)||[]).map((t=>({date:new Date(t.date),type:"area-moved",label:t.area,description:`${u.TranslationUtils.translateHistory(this.hass,"moved_to")} ${t.area} ${new Date(t.date).toLocaleDateString()}`})));t.forEach(((t,e)=>{const i=65-10*e;t.style=`background-color: hsl(${v}, ${_}%, ${i}%)`})),c.push(...t)}if(S.includes(e.EVENT_TYPES.TREATMENT)&&(null===(o=E.treatment)||void 0===o?void 0:o.entity_id))try{const t=(null===(r=c[0])||void 0===r?void 0:r.date.toISOString())||(new Date).toISOString(),e=(new Date).toISOString(),i=yield this.hass.callApi("GET",`history/period/${t}?filter_entity_id=${E.treatment.entity_id}&end_time=${e}`);if(i&&Array.isArray(i)&&i.length>0){const t=[],e=i[0];for(let i=0;i<e.length;i++){const n=e[i];n.state&&"unavailable"!==n.state&&"unknown"!==n.state&&"none"!==n.state&&t.push({date:new Date(n.last_changed),type:"treatment",label:u.TranslationUtils.translateTreatment(this.hass,n.state),description:`${u.TranslationUtils.translateHistory(this.hass,"treatment")}: ${u.TranslationUtils.translateTreatment(this.hass,n.state)} ${new Date(n.last_changed).toLocaleDateString()}`,data:{originalValue:n.state}})}t.forEach(((t,e)=>{const i=Math.max(80-8*e,0);t.style=`background-color: hsl(${y}, ${b}%, ${i}%);`})),c.push(...t)}}catch(t){}if(S.includes(e.EVENT_TYPES.JOURNAL)){const t=null===(l=E.journal)||void 0===l?void 0:l.entity_id;if(t)try{const e=new Date((new Date).setMonth((new Date).getMonth()-6)).toISOString(),i=(new Date).toISOString(),n=yield this.hass.callApi("GET",`history/period/${e}?filter_entity_id=${t}&end_time=${i}`);if(n&&Array.isArray(n)&&n.length>0){const t=n[0];let e="";for(let i=0;i<t.length;i++){const n=t[i];n.state&&"unavailable"!==n.state&&"unknown"!==n.state&&n.state!==e&&(c.push({date:new Date(n.last_changed),type:"journal",label:u.TranslationUtils.translateHistory(this.hass,"journal"),description:n.state,style:`background-color: hsl(${$}, ${k}%, 45%);`}),e=n.state)}}}catch(t){}}return c.sort(((t,e)=>e.date.getTime()-t.date.getTime()))}))}_handleImageClick(t){this._selectedImageIndex=t,this._showGallery=!0}_animateElement(t,e,i){if(t)if(e){t.classList.remove("closing","expanded"),t.style.height="0",t.offsetHeight;const e=t.scrollHeight;t.style.height=`${e}px`,t.classList.add("expanded"),i&&setTimeout(i,300)}else t.style.height=`${t.scrollHeight}px`,t.offsetHeight,t.classList.remove("expanded"),t.classList.add("closing"),setTimeout((()=>{t.classList.remove("closing"),t.style.height="0",i&&i()}),300)}_toggleJournalExpand(t){var e;const i=new Set(this._expandedJournalIds),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(`#journal-${t}`);i.has(t)?this._animateElement(n,!1,(()=>{i.delete(t),this._expandedJournalIds=i})):(i.add(t),this._expandedJournalIds=i,setTimeout((()=>{var e;const i=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(`#journal-${t}`);this._animateElement(i,!0)}),10))}_toggleAddMenu(){var t,e,i,n;if(null!==this._selectedAddAction){const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".form-content"),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".add-header");i&&i.classList.remove("visible"),n&&n.classList.remove("visible"),setTimeout((()=>{this._selectedAddAction=null,this._newEntryValue="",this._addMenuOpen=!1,this.requestUpdate()}),300)}else if(this._addMenuOpen=!this._addMenuOpen,this._newEntryValue="",this._addMenuOpen)this.requestUpdate(),setTimeout((()=>{var t,e;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".add-menu-container"),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".add-menu-options");if(i&&n){const t=n.scrollHeight;i.style.height=`${t}px`,setTimeout((()=>{n.classList.add("visible")}),50)}}),10);else{const t=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector(".add-menu-container"),e=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector(".add-menu-options");e&&e.classList.remove("visible"),t&&(t.style.height="0")}}_selectAddAction(t){var e,i;this._selectedAddAction=t,this._newEntryValue="";const n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelectorAll(".add-option"),s=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector(`.add-option[data-action="${t}"]`);n&&s&&(n.forEach((t=>{t!==s?t.classList.add("fade-out"):t.classList.add("selected")})),setTimeout((()=>{s.classList.add("move-to-header"),setTimeout((()=>{this.requestUpdate(),setTimeout((()=>{var t,e;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".add-header"),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".form-content");if(i&&i.classList.add("visible"),n){n.classList.add("visible");const t=n.querySelector("input, select, textarea");t&&t.focus()}}),50)}),300)}),300))}_addNewEntry(){return s(this,void 0,void 0,(function*(){var t,e,i,n,s;if(this.hass&&this.entityId&&this._selectedAddAction&&this._newEntryValue){this._addingEntry=!0;try{const a=yield h.PlantEntityUtils.getPlantInfo(this.hass,this.entityId);if(!a)return void(this._addingEntry=!1);const o=a.helpers||{},r=null===(t=o.growth_phase)||void 0===t?void 0:t.entity_id,l=null===(e=o.pot_size)||void 0===e?void 0:e.entity_id,d=null===(i=o.treatment)||void 0===i?void 0:i.entity_id,c=null===(n=o.journal)||void 0===n?void 0:n.entity_id;switch(this._selectedAddAction){case E:{if(!r)break;yield this.hass.callService("select","select_option",{entity_id:r,option:this._newEntryValue});const t="entfernt"===this._newEntryValue||"geerntet"===this._newEntryValue?this._newEntryValue:`${this._newEntryValue}_beginn`;yield this.hass.callService("homeassistant","update_entity_attribute",{entity_id:r,attribute:t,value:(new Date).toISOString().split("T")[0]});break}case S:{const t=this._newEntryValue,e="-"===t?"":null===(s=Object.entries(this.hass.areas||{}).find((([,e])=>e.name===t)))||void 0===s?void 0:s[0],i=this.hass.entities[this.entityId];(null==i?void 0:i.device_id)&&(yield this.hass.callService("plant","move_to_area",{device_id:i.device_id,area_id:e||""}));break}case D:if(!l)break;yield this.hass.callService("number","set_value",{entity_id:l,value:parseFloat(this._newEntryValue)});break;case A:if(!d)break;yield this.hass.callService("select","select_option",{entity_id:d,option:this._newEntryValue});break;case P:if(!c)break;yield this.hass.callService("text","set_value",{entity_id:c,value:this._newEntryValue})}this._newEntryAdded=!0,setTimeout((()=>{var t,e;this._newEntryAdded=!1,this._addingEntry=!1;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".form-content"),n=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".add-header");i&&i.classList.remove("visible"),n&&n.classList.remove("visible"),setTimeout((()=>{this._selectedAddAction=null,this._newEntryValue="",this._addMenuOpen=!1,this._updateEvents()}),300)}),1e3)}catch(t){this._addingEntry=!1}}}))}_handleKeyDown(t){t.stopPropagation(),"Enter"!==t.key||t.shiftKey||(t.preventDefault(),this._addNewEntry())}_getIconForAction(t){if(!t)return"";switch(t){case E:return"mdi:sprout";case S:return"mdi:map-marker";case D:return"mdi:cup";case A:return"mdi:medical-bag";case P:return"mdi:notebook";default:return""}}_getColorForAction(t){if(!t)return"";switch(t){case E:return`${p}, ${m}%, 45%`;case S:return`${v}, ${_}%, 45%`;case D:return`${g}, ${f}%, 45%`;case A:return`${y}, ${b}%, 45%`;case P:return`${$}, ${k}%, 45%`;default:return""}}_getLabelForAction(t){if(!t||!this.hass)return"";switch(t){case E:return u.TranslationUtils.translateHistory(this.hass,"growth_phase");case S:return u.TranslationUtils.translateHistory(this.hass,"area");case D:return u.TranslationUtils.translateHistory(this.hass,"pot_size");case A:return u.TranslationUtils.translateHistory(this.hass,"treatment");case P:return u.TranslationUtils.translateHistory(this.hass,"journal");default:return""}}_renderFormForAction(t){var e;if(!t)return a.html``;const i=t=>t.stopPropagation(),n=t=>{t.stopPropagation();const e=t.target.value;this._newEntryValue=e,e&&this._addNewEntry()},s=t=>{t.stopPropagation(),this._newEntryValue=t.target.value},o=t=>{t.stopPropagation(),"Enter"!==t.key||t.shiftKey||(t.preventDefault(),this._newEntryValue&&this._addNewEntry())},r=t=>{t.stopPropagation(),this._newEntryValue&&this._addNewEntry()};switch(t){case E:return a.html`
                    <div class="form-field">
                        <select id="phase-select"
                            @click=${i}
                            @change=${n}
                        >
                            <option value="" disabled selected>${u.TranslationUtils.translateHistory(this.hass,"please_select")}</option>
                            <option value="seeds">${u.TranslationUtils.translateGrowthPhase(this.hass,"seeds")}</option>
                            <option value="germination">${u.TranslationUtils.translateGrowthPhase(this.hass,"germination")}</option>
                            <option value="rooting">${u.TranslationUtils.translateGrowthPhase(this.hass,"rooting")}</option>
                            <option value="growing">${u.TranslationUtils.translateGrowthPhase(this.hass,"growing")}</option>
                            <option value="flowering">${u.TranslationUtils.translateGrowthPhase(this.hass,"flowering")}</option>
                            <option value="removed">${u.TranslationUtils.translateGrowthPhase(this.hass,"removed")}</option>
                            <option value="harvested">${u.TranslationUtils.translateGrowthPhase(this.hass,"harvested")}</option>
                        </select>
                    </div>
                `;case S:{const t=Object.values((null===(e=this.hass)||void 0===e?void 0:e.areas)||{}).map((t=>t.name)).sort(((t,e)=>t.localeCompare(e,"de")));return a.html`
                    <div class="form-field">
                        <select id="area-select"
                            @click=${i}
                            @change=${n}
                        >
                            <option value="" disabled selected>${u.TranslationUtils.translateHistory(this.hass,"please_select")}</option>
                            <option value="-">-</option>
                            ${t.map((t=>a.html`<option value="${t}">${t}</option>`))}
                        </select>
                    </div>
                `}case D:return a.html`
                    <div class="form-field">
                        <input type="number"
                            id="pot-input"
                            min="0.1"
                            step="0.1"
                            placeholder="${u.TranslationUtils.translateHistory(this.hass,"pot_size_placeholder")}"
                            @click=${i}
                            @input=${s}
                            @keydown=${o}
                            @blur=${r}
                        >
                    </div>
                `;case A:return a.html`
                    <div class="form-field">
                        <select id="treatment-select"
                            @click=${i}
                            @change=${n}
                        >
                            <option value="" disabled selected>${u.TranslationUtils.translateHistory(this.hass,"please_select")}</option>
                            <option value="cut">${u.TranslationUtils.translateTreatment(this.hass,"cut")}</option>
                            <option value="super cropping">${u.TranslationUtils.translateTreatment(this.hass,"super cropping")}</option>
                            <option value="topping">${u.TranslationUtils.translateTreatment(this.hass,"topping")}</option>
                            <option value="lollipop">${u.TranslationUtils.translateTreatment(this.hass,"lollipop")}</option>
                            <option value="fim">${u.TranslationUtils.translateTreatment(this.hass,"fim")}</option>
                            <option value="rib">${u.TranslationUtils.translateTreatment(this.hass,"rib")}</option>
                            <option value="spray pest">${u.TranslationUtils.translateTreatment(this.hass,"spray pest")}</option>
                            <option value="spray water">${u.TranslationUtils.translateTreatment(this.hass,"spray water")}</option>
                        </select>
                    </div>
                `;case P:return a.html`
                    <div class="form-field">
                        <textarea id="journal-input"
                            placeholder="${u.TranslationUtils.translateHistory(this.hass,"journal_placeholder")}"
                            @click=${i}
                            @input=${s}
                        ></textarea>
                    </div>
                    <div class="journal-submit">
                        <ha-icon-button
                            icon="mdi:send"
                            @click=${t=>{t.stopPropagation(),this._addNewEntry()}}
                            ?disabled=${!this._newEntryValue}
                            title="${u.TranslationUtils.translateUI(this.hass,"confirm")}"
                        ></ha-icon-button>
                    </div>
                `;default:return a.html``}}render(){if(!this.hass||!this.entityId)return a.html``;const t=this.historyGroups||Object.values(e.EVENT_TYPES),i="right"===this.linePosition?"timeline-right":"";return a.html`
            <div class="history-container">
                <div class="vertical-timeline ${i}">
                    <div class="timeline-line" style="background-color: hsl(${p}, ${m}%, 45%);"></div>

                    <!-- Hinzufügen-Button am Anfang der Timeline -->
                    <div class="phase-item add-item" @click=${this._toggleAddMenu}>
                        <div class="phase-dot add-dot" style="background-color: hsl(${T}, ${I}%, 45%);">
                            <ha-icon icon="mdi:plus" class="dot-icon"></ha-icon>
                        </div>
                        <div class="phase-content add-content">
                            ${null!==this._selectedAddAction?a.html`
                                <!-- Header mit ausgewählter Aktion -->
                                <div class="add-header">
                                    <div class="add-header-title">
                                        <ha-icon icon="${this._getIconForAction(this._selectedAddAction)}"
                                                style="color: hsl(${this._getColorForAction(this._selectedAddAction)});">
                                        </ha-icon>
                                        <span>${this._getLabelForAction(this._selectedAddAction)}</span>
                                    </div>
                                    <ha-icon-button
                                        icon="mdi:close"
                                        @click=${t=>{t.stopPropagation(),this._toggleAddMenu()}}
                                    ></ha-icon-button>
                                </div>

                                <!-- Formular zum Hinzufügen des ausgewählten Eintrags -->
                                <div class="form-content" @click=${t=>t.stopPropagation()}>
                                    ${this._renderFormForAction(this._selectedAddAction)}

                                    ${this._selectedAddAction!==P&&this._selectedAddAction!==E&&this._selectedAddAction!==A&&this._selectedAddAction!==S&&this._selectedAddAction!==D?a.html`
                                        <div class="form-actions">
                                            <ha-icon-button
                                                icon="mdi:check"
                                                @click=${t=>{t.stopPropagation(),this._addNewEntry()}}
                                                ?disabled=${this._addingEntry||!this._newEntryValue}
                                                class="${this._newEntryAdded?"success":""}"
                                                title="${u.TranslationUtils.translateUI(this.hass,"confirm")}"
                                            ></ha-icon-button>
                                        </div>
                                    `:""}
                                </div>
                            `:a.html`
                                <!-- Überschrift für den Hinzufügen-Button -->
                                <div class="phase-header">
                                    <div class="phase-name">${u.TranslationUtils.translateHistory(this.hass,"add_entry")}</div>
                                </div>

                                <!-- Menü zum Hinzufügen neuer Einträge -->
                                <div class="add-menu-container ${this._addMenuOpen?"expanded":""}">
                                    <div class="add-menu-options">
                                        ${t.includes(e.EVENT_TYPES.PHASE)?a.html`
                                            <div class="add-option" data-action="${E}" @click=${t=>{t.stopPropagation(),this._selectAddAction(E)}}>
                                                <ha-icon icon="mdi:sprout" class="option-icon" style="color: hsl(${p}, ${m}%, 45%);"></ha-icon>
                                                <span>${u.TranslationUtils.translateHistory(this.hass,"growth_phase")}</span>
                                            </div>
                                        `:""}
                                        ${t.includes(e.EVENT_TYPES.AREA)?a.html`
                                            <div class="add-option" data-action="${S}" @click=${t=>{t.stopPropagation(),this._selectAddAction(S)}}>
                                                <ha-icon icon="mdi:map-marker" class="option-icon" style="color: hsl(${v}, ${_}%, 45%);"></ha-icon>
                                                <span>${u.TranslationUtils.translateHistory(this.hass,"area")}</span>
                                            </div>
                                        `:""}
                                        ${t.includes(e.EVENT_TYPES.POT)?a.html`
                                            <div class="add-option" data-action="${D}" @click=${t=>{t.stopPropagation(),this._selectAddAction(D)}}>
                                                <ha-icon icon="mdi:cup" class="option-icon" style="color: hsl(${g}, ${f}%, 45%);"></ha-icon>
                                                <span>${u.TranslationUtils.translateHistory(this.hass,"pot_size")}</span>
                                            </div>
                                        `:""}
                                        ${t.includes(e.EVENT_TYPES.TREATMENT)?a.html`
                                            <div class="add-option" data-action="${A}" @click=${t=>{t.stopPropagation(),this._selectAddAction(A)}}>
                                                <ha-icon icon="mdi:medical-bag" class="option-icon" style="color: hsl(${y}, ${b}%, 45%);"></ha-icon>
                                                <span>${u.TranslationUtils.translateHistory(this.hass,"treatment")}</span>
                                            </div>
                                        `:""}
                                        ${t.includes(e.EVENT_TYPES.JOURNAL)?a.html`
                                            <div class="add-option" data-action="${P}" @click=${t=>{t.stopPropagation(),this._selectAddAction(P)}}>
                                                <ha-icon icon="mdi:notebook" class="option-icon" style="color: hsl(${$}, ${k}%, 45%);"></ha-icon>
                                                <span>${u.TranslationUtils.translateHistory(this.hass,"journal")}</span>
                                            </div>
                                        `:""}
                                    </div>
                                </div>
                            `}
                        </div>
                    </div>

                    ${this._renderEvents()}
                </div>
            </div>
            ${this._showGallery?a.html`
                <flower-gallery
                    .hass=${this.hass}
                    .entityId=${this.entityId}
                    .images=${this._imageUrls}
                    .initialImageIndex=${this._selectedImageIndex}
                    .onClose=${()=>{this._showGallery=!1,this._selectedImageIndex=null}}
                ></flower-gallery>
            `:""}
        `}_renderEvents(){return 0===this.events.length?a.html`
                <div class="phase-item">
                    <div class="phase-dot" style="background-color: hsl(${p}, ${m}%, 45%);"></div>
                    <div class="phase-content">
                        <div class="phase-name">Keine Ereignisse verfügbar</div>
                    </div>
                </div>
            `:a.html`
            ${this.events.map(((t,e)=>{var i,n,s;let o="",r="";const l=t.type.startsWith("phase-"),d="journal"===t.type,h=`event-${e}-${t.type}-${t.date.getTime()}`,u=this._expandedJournalIds.has(h);let T="";if(l){o=t.style||`background-color: hsl(${p}, ${m}%, 45%);`;const e=o.match(/background-color:\s*hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);if(e){const[,t,i,n]=e;T=`--milestone-color: hsla(${t}, ${i}%, ${n}%, 0.15)`}else T=`--milestone-color: hsla(${p}, ${m}%, 45%, 0.15)`;const n=t.type.split("-")[1],s=null===(i=this.entityId)||void 0===i?void 0:i.split(".")[1],a=s?this.hass.states[`plant.${s}`]:void 0;r=(0,c.getGrowthPhaseIcon)(n,this.hass,a)}else if("pot-size"===t.type)o=t.style||`background-color: hsl(${g}, ${f}%, 45%);`,r="mdi:cup";else if("area-moved"===t.type)o=t.style||`background-color: hsl(${v}, ${_}%, 45%);`,r="mdi:map-marker";else if("treatment"===t.type){o=t.style||`background-color: hsl(${y}, ${b}%, 45%);`;const e=null===(n=this.entityId)||void 0===n?void 0:n.split(".")[1],i=e?this.hass.states[`plant.${e}`]:void 0,a=(null===(s=t.data)||void 0===s?void 0:s.originalValue)||t.label;r=(0,c.getTreatmentIcon)(a,this.hass,i)}else"image"===t.type?(o=t.style||`background-color: hsl(${w}, ${x}%, 45%);`,r="mdi:camera"):d&&(o=t.style||`background-color: hsl(${$}, ${k}%, 45%);`,r="mdi:notebook");let I=new Date(t.date).toLocaleDateString();if(this._plantingDate&&t.date){const e=new Date(this._plantingDate);e.setHours(0,0,0,0);const i=Math.abs(new Date(t.date).getTime()-e.getTime());I=`${Math.ceil(i/864e5)} | ${I}`}return a.html`
                    <div class="phase-item ${l?"milestone":""}" @click=${()=>{var e;"image"===t.type&&void 0!==(null===(e=t.data)||void 0===e?void 0:e.imageIndex)?this._handleImageClick(t.data.imageIndex):d&&this._toggleJournalExpand(h)}}>
                        <div class="phase-dot ${l?"milestone":""}" style="${o}">
                            ${r?a.html`<ha-icon icon="${r}" class="dot-icon"></ha-icon>`:""}
                        </div>
                        <div class="phase-content ${l?"milestone":""}" style="${l?T:""}">
                            <div class="phase-header">
                                <div class="phase-name">${t.label}</div>
                                <div class="phase-date">${I}</div>
                            </div>
                            <div class="journal-container ${d&&u?"expanded":""}" id="journal-${h}" style="height: 0;">
                                <div class="phase-description">${t.description}</div>
                            </div>
                        </div>
                    </div>
                `}))}
        `}};e.FlowerHistory=C,C.styles=l.historyStyles,n([(0,o.property)()],C.prototype,"hass",void 0),n([(0,o.property)()],C.prototype,"entityId",void 0),n([(0,o.property)({type:Array})],C.prototype,"historyGroups",void 0),n([(0,o.property)({type:String})],C.prototype,"linePosition",void 0),n([(0,o.state)()],C.prototype,"events",void 0),n([(0,o.state)()],C.prototype,"_imageUrls",void 0),n([(0,o.state)()],C.prototype,"_showGallery",void 0),n([(0,o.state)()],C.prototype,"_selectedImageIndex",void 0),n([(0,o.state)()],C.prototype,"_expandedJournalIds",void 0),n([(0,o.state)()],C.prototype,"_plantingDate",void 0),n([(0,o.state)()],C.prototype,"_addMenuOpen",void 0),n([(0,o.state)()],C.prototype,"_selectedAddAction",void 0),n([(0,o.state)()],C.prototype,"_newEntryValue",void 0),n([(0,o.state)()],C.prototype,"_newEntryDate",void 0),n([(0,o.state)()],C.prototype,"_addingEntry",void 0),n([(0,o.state)()],C.prototype,"_newEntryAdded",void 0),e.FlowerHistory=C=n([(0,o.customElement)("flower-history")],C)},6822:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o},s=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.FlowerTimeline=void 0;const a=i(4437),o=i(2924),r=i(4911),l=i(4507),d=i(8063),c=i(2413),h=120,u=60,p=207,m=90,g=280,f=70,v=45,_=100,y=175,b=70;let w=class extends a.LitElement{constructor(){super(...arguments),this.events=[],this.stateHistory=[],this._timelineWidth=500,this.labelOffsets={},this.markerOffsets={},this._showGallery=!1,this._hoveredImageIndex=null,this._hoveredEventIndex=null,this._lastUpdate=0,this._imageUrls=[],this._isLoading=!1}firstUpdated(){var t;const e=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".timeline-events");e&&(this._timelineWidth=e.getBoundingClientRect().width,this._resizeObserver=new ResizeObserver((t=>{for(const e of t)this._timelineWidth=e.contentRect.width,this.requestUpdate()})),this._resizeObserver.observe(e))}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver&&this._resizeObserver.disconnect()}connectedCallback(){const t=Object.create(null,{connectedCallback:{get:()=>super.connectedCallback}});return s(this,void 0,void 0,(function*(){t.connectedCallback.call(this),yield this._updateTimelineData(),yield this._loadPlantInfo()}))}updated(t){const e=Object.create(null,{updated:{get:()=>super.updated}});return s(this,void 0,void 0,(function*(){e.updated.call(this,t),Date.now()-this._lastUpdate>2e3&&(yield this._updateTimelineData(),yield this._loadPlantInfo())}))}_updateTimelineData(){return s(this,void 0,void 0,(function*(){var t;if(this.entityId&&this.hass){const e=this.entityId.split(".")[1];this.events=yield this.collectTimelineEvents(e);try{const e=(null===(t=this.events[0])||void 0===t?void 0:t.date.toISOString())||(new Date).toISOString(),i=(new Date).toISOString(),n=yield this.hass.callApi("GET",`history/period/${e}?filter_entity_id=${this.entityId}&end_time=${i}`);n&&Array.isArray(n)&&n.length>0&&(this.stateHistory=n[0])}catch(t){console.warn("Fehler beim Laden der Status-Historie:"),this.stateHistory=[]}this._lastUpdate=Date.now()}}))}_loadPlantInfo(){return s(this,void 0,void 0,(function*(){if(this.entityId&&this.hass&&!this._isLoading){this._isLoading=!0;try{this._plantInfo=yield d.PlantEntityUtils.getPlantInfo(this.hass,this.entityId)}catch(t){console.warn("Fehler beim Laden der Pflanzen-Info:",t),this._plantInfo=null}finally{this._isLoading=!1}}}))}collectTimelineEvents(t){return s(this,void 0,void 0,(function*(){var e,i,n,s,a,o,r;if(!this.hass)return[];const w=[];let x;try{x=yield d.PlantEntityUtils.getPlantInfo(this.hass,`plant.${t}`)}catch(t){return console.warn("Fehler beim Laden der Pflanzen-Info:",t),[]}const $=(null==x?void 0:x.helpers)||{},k=null===(e=$.growth_phase)||void 0===e?void 0:e.entity_id,T=null===(i=$.pot_size)||void 0===i?void 0:i.entity_id,I=null===(n=$.treatment)||void 0===n?void 0:n.entity_id,E=null===(s=$.location)||void 0===s?void 0:s.entity_id,S=yield l.FlowerGallery.getImagesWithDates(this.hass,`plant.${t}`,x);this._imageUrls=S.map((t=>t.url));const D=S.map(((t,e)=>({date:t.date,type:"image",label:c.TranslationUtils.translateHistory(this.hass,"photo"),description:`${c.TranslationUtils.translateHistory(this.hass,"image_taken")} ${t.date.toLocaleDateString()}`,style:`background-color: hsl(${y}, ${b}%, 45%);`,data:{imageIndex:e,url:t.url}})));w.push(...D);const A=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],P=[];if(k){const t=this.hass.states[k];if(t)for(const e of A){const i=null==t?void 0:t.attributes[`${"entfernt"===e||"geerntet"===e?e:e+"_beginn"}`];if(i){const t={date:new Date(i),type:`phase-${e}`,label:c.TranslationUtils.translateGrowthPhase(this.hass,e),description:`${c.TranslationUtils.translateGrowthPhase(this.hass,e)} ${c.TranslationUtils.translateHistory(this.hass,"phase_started")} ${new Date(i).toLocaleDateString()}`};if("entfernt"===e)t.style="display: none;";else if("geerntet"===e)t.style="\n                                background-color: hsl(120, 70%, 45%);\n                                background-image: repeating-linear-gradient(45deg, \n                                    transparent,\n                                    transparent 2px,\n                                    rgba(255,255,255,0.4) 2px,\n                                    rgba(255,255,255,0.4) 4px\n                                );\n                            ";else{const i=A.filter((t=>"entfernt"!==t&&"geerntet"!==t)),n=i.indexOf(e),s=1===i.length?55:55-n/Math.max(1,i.length-1)*25;t.style=`background-color: hsl(${h}, ${u}%, ${s}%)`}P.push(t)}}}w.push(...P);try{if(T){const t=(null===(a=w[0])||void 0===a?void 0:a.date.toISOString())||(new Date).toISOString(),e=(new Date).toISOString(),i=yield this.hass.callApi("GET",`history/period/${t}?filter_entity_id=${T}&end_time=${e}`);if(i&&Array.isArray(i)&&i.length>0){let t=null;const e=[],n=i[0];for(let i=0;i<n.length;i++){const s=n[i];s.state&&!isNaN(parseFloat(s.state))&&"unavailable"!==s.state&&"unknown"!==s.state&&(null!==t&&s.state===t||(e.push({date:new Date(s.last_changed),type:"pot-size",label:`${s.state}L`,description:`${c.TranslationUtils.translateHistory(this.hass,"pot_size_changed")} ${s.state}L ${new Date(s.last_changed).toLocaleDateString()}`}),t=s.state))}e.forEach(((t,e)=>{const i=65-10*e;t.style=`background-color: hsl(${p}, ${m}%, ${i}%)`})),w.push(...e)}}}catch(t){console.warn("Fehler beim Laden der Topfgrößen-Historie:",t)}try{if(E){const t=(null===(o=w[0])||void 0===o?void 0:o.date.toISOString())||(new Date).toISOString(),e=(new Date).toISOString(),i=yield this.hass.callApi("GET",`history/period/${t}?filter_entity_id=${E}&end_time=${e}`);if(i&&Array.isArray(i)&&i.length>0){const t=[],e=i[0];let n=null;for(let i=0;i<e.length;i++){const s=e[i];if(s.state&&"unavailable"!==s.state&&"unknown"!==s.state)try{const e=JSON.parse(s.state);e&&e.area&&(null!==n&&e.area===n||(t.push({date:new Date(s.last_changed),type:"area-moved",label:e.area,description:`${c.TranslationUtils.translateHistory(this.hass,"moved_to")} ${e.area} ${new Date(s.last_changed).toLocaleDateString()}`}),n=e.area))}catch(t){continue}}t.forEach(((t,e)=>{const i=65-10*e;t.style=`background-color: hsl(${g}, ${f}%, ${i}%)`})),w.push(...t)}}}catch(t){console.warn("Fehler beim Laden der Area-Historie:",t)}try{if(I){const t=(null===(r=w[0])||void 0===r?void 0:r.date.toISOString())||(new Date).toISOString(),e=(new Date).toISOString(),i=yield this.hass.callApi("GET",`history/period/${t}?filter_entity_id=${I}&end_time=${e}`);if(i&&Array.isArray(i)&&i.length>0){const t=[],e=i[0];let n=null;for(let i=0;i<e.length;i++){const s=e[i];s.state&&"unavailable"!==s.state&&"unknown"!==s.state&&"none"!==s.state&&(null!==n&&s.state===n||(t.push({date:new Date(s.last_changed),type:"treatment",label:c.TranslationUtils.translateTreatment(this.hass,s.state),description:`${c.TranslationUtils.translateHistory(this.hass,"treatment")}: ${c.TranslationUtils.translateTreatment(this.hass,s.state)} ${new Date(s.last_changed).toLocaleDateString()}`}),n=s.state))}t.forEach(((t,e)=>{const i=Math.max(80-8*e,0);t.style=`background-color: hsl(${v}, ${_}%, ${i}%);`})),w.push(...t)}}}catch(t){console.warn("Fehler beim Laden der Treatment-Historie:",t)}return w.sort(((t,e)=>t.date.getTime()-e.date.getTime()))}))}static get styles(){return r.timelineStyles}calculateEventPosition(t,e,i){const n=i.getTime()-e.getTime(),s=t.date.getTime()-e.getTime();return Math.min(s/n*100,100)}checkCollisions(t,e,i){const n=new Map,s=new Map;t.forEach((t=>{const s=this.calculateEventPosition(t,e,i);n.set(t,s*this._timelineWidth/100)})),t.sort(((t,e)=>n.get(t)-n.get(e)));for(let e=1;e<t.length;e++){const i=t[e],a=t[e-1],o=n.get(i),r=n.get(a)+(s.get(a)||0)+4;o<r&&s.set(i,r-o)}return s}calculateEventWidth(t,e,i,n,s){const a=this.calculateEventPosition(t,n,s);if("treatment"===t.type)return{position:`${a}%`,width:"2px"};if(e===i.length-1)return{position:`${a}%`,width:`calc(100% - ${a}%)`};const o=i[e+1];return{position:`${a}%`,width:`calc(${this.calculateEventPosition(o,n,s)}% - ${a}%)`}}formatDate(t,e){return"harvest"===(null==e?void 0:e.type)&&e.displayDate?e.displayDate.toLocaleDateString(void 0,{day:"2-digit",month:"2-digit"}):t.toLocaleDateString(void 0,{day:"2-digit",month:"2-digit"})}checkOverlap(t){const e={};let i=0;t.sort(((t,e)=>t.position-e.position));const n=new Map,s=document.createElement("div");s.style.visibility="hidden",s.style.position="absolute",s.className="timeline-label",document.body.appendChild(s),t.forEach((t=>{let e;e=t.index>=this.events.length?c.TranslationUtils.translateHistory(this.hass,"harvest"):this.events[t.index].label,s.textContent=e;const i=s.getBoundingClientRect().width;n.set(t.index,i)})),document.body.removeChild(s);for(let s=0;s<t.length;s++){const a=t[s];let o=!1;for(let e=Math.max(0,s-3);e<s;e++){const s=t[e],r=((n.get(a.index)||0)+(n.get(s.index)||0))/2+1,l=a.position/100*this._timelineWidth,d=s.position/100*this._timelineWidth;if(Math.abs(l-d)<r){o=!0,0===i?i=1:1===i?i=2:2===i&&(i=0);break}}o?e[a.index]=i:(e[a.index]=0,i=0)}return e}renderEventGroup(t,e,i,n,s,o){return a.html`
            ${t.map(((r,l)=>{var d,c,h;const{position:u,width:p}=this.calculateEventWidth(r,l,t,i,n),m=s.get(r)||0,g="image"===r.type,f="treatment"===r.type,v=g?null===(d=r.data)||void 0===d?void 0:d.imageIndex:null,_=this.events.findIndex((t=>t===r)),y=g&&this._hoveredImageIndex===v||this._hoveredEventIndex===_;return a.html`
                    <div class="timeline-event ${r.type}"
                         style="left: calc(${u} + ${m}px); 
                                width: ${p};
                                top: ${null===(c=o.get(e))||void 0===c?void 0:c.top}px;
                                height: ${null===(h=o.get(e))||void 0===h?void 0:h.height}px;
                                ${r.style||""}"
                         title="${r.description}"
                         @click="${()=>{g?this._handleImageClick(v):this._handleTimelineEventClick(r)}}"
                         @mouseenter="${()=>{g&&(this._hoveredImageIndex=v),this._hoveredEventIndex=_}}"
                         @mouseleave="${()=>{g&&(this._hoveredImageIndex=null),this._hoveredEventIndex=null}}"
                         ?data-hovered="${y}"
                         ?data-scale-effect="${g||f}"
                    >
                    </div>
                `}))}
        `}renderStatusIndicators(t,e,i,n){return a.html`
            ${t.map(((t,s)=>{var o,r;const l=new Date(t.last_changed),d=this.stateHistory[s+1],c=d?new Date(d.last_changed):new Date,h=Math.min((l.getTime()-e.getTime())/(i.getTime()-e.getTime())*100,100),u=Math.min((c.getTime()-l.getTime())/(i.getTime()-e.getTime())*100,100-h),p="problem"===t.state?"timeline-status-problem":"unknown"===t.state?"timeline-status-unknown":"";return p?a.html`
                    <div class="timeline-status-indicator ${p}"
                         style="left: ${h}%; 
                                width: ${u}%;
                                top: ${null===(o=n.get("status"))||void 0===o?void 0:o.top}px;
                                height: ${null===(r=n.get("status"))||void 0===r?void 0:r.height}px;">
                    </div>
                `:""}))}
        `}_handleImageClick(t){this._showGallery=!0,this._hoveredImageIndex=t,this.requestUpdate()}renderTimelineItems(t,e,i,n){return a.html`
            ${t.map(((t,s)=>{var o;const r=Math.min((t.date.getTime()-e.getTime())/(i.getTime()-e.getTime())*100,100),l=n?this.labelOffsets[s]||0:this.markerOffsets[s]||0,d="image"===t.type,c=d?null===(o=t.data)||void 0===o?void 0:o.imageIndex:null,h=this.events.findIndex((e=>e===t)),u=d&&this._hoveredImageIndex===c||this._hoveredEventIndex===h;let p="";p=n?1===l?"offset-up":2===l?"offset-up-2":-1===l?"offset-down":"":1===l?"offset-up":2===l?"offset-up-2":-1===l?"offset-down":-2===l?"offset-down-2":"";const m=n?"timeline-label":"timeline-marker",g=n?t.label:this.formatDate(t.date,t);return a.html`
                    <div class="${m} ${p} ${u?"hovered":""}"
                         style="left: ${r}%; ${t.style||""}"
                         @click="${()=>{d?this._handleImageClick(c):this._handleTimelineEventClick(t)}}"
                         @mouseenter="${()=>{d&&(this._hoveredImageIndex=c),this._hoveredEventIndex=h}}"
                         @mouseleave="${()=>{d&&(this._hoveredImageIndex=null),this._hoveredEventIndex=null}}"
                         ?data-hovered="${u}"
                         data-type="${t.type}"
                    >
                        ${g}
                    </div>
                `}))}
        `}_handleTimelineEventClick(t){var e,i,n,s;if("image"===t.type)return;let a=t.date,o=new Date;if(t.type.startsWith("phase-")){const r=t.type.split("-")[1];if(null===(n=null===(i=null===(e=this._plantInfo)||void 0===e?void 0:e.helpers)||void 0===i?void 0:i.growth_phase)||void 0===n?void 0:n.entity_id){const e=this._plantInfo.helpers.growth_phase.entity_id,i=null===(s=this.hass)||void 0===s?void 0:s.states[e];if(null==i?void 0:i.attributes){a=t.date;const e=["samen","keimen","wurzeln","wachstum","blüte","entfernt","geerntet"],n=e.indexOf(r);if(n>=0&&n<e.length-1){const t=e[n+1],s="entfernt"===t||"geerntet"===t?t:`${t}_beginn`,a=i.attributes[s];a&&(o=new Date(a))}}}}else if("area-moved"===t.type){a=t.date;const e=this.events.filter((t=>"area-moved"===t.type)),i=e.findIndex((e=>e.date.getTime()===t.date.getTime()));i>=0&&i<e.length-1&&(o=e[i+1].date)}else if("pot-size"===t.type){a=t.date;const e=this.events.filter((t=>"pot-size"===t.type)),i=e.findIndex((e=>e.date.getTime()===t.date.getTime()));i>=0&&i<e.length-1&&(o=e[i+1].date)}o=new Date(o.getTime()+864e5),this._updateGraph(a,o)}_updateGraph(t,e){var i;const n=null===(i=this.parentNode)||void 0===i?void 0:i.querySelector("flower-graph");n&&(n._dateRange=[t,e],n._picker&&n._picker.setDate(n._dateRange,!1),n.updateGraphData(!0))}render(){var t,e,i;if(!this.entityId||!this.hass||0===this.events.length)return a.html``;let n,s;if(!(null===(t=this._plantInfo)||void 0===t?void 0:t.helpers))return a.html``;{const t=this._plantInfo.helpers,a=null===(e=t.growth_phase)||void 0===e?void 0:e.entity_id,o=null===(i=t.flowering_duration)||void 0===i?void 0:i.entity_id;n=a?this.hass.states[a]:null,s=o?this.hass.states[o]:null}if(!n)return a.html``;const o=this.events[0].date,r=n.state,l=new Date;let d;if("entfernt"===r)d=new Date(n.attributes.entfernt);else if("geerntet"===r)d=new Date(n.attributes.geerntet);else if("blüte"===r&&(null==s?void 0:s.state)){const t=new Date(n.attributes.blüte_beginn);d=new Date(t),d.setDate(d.getDate()+parseInt(s.state))}else(null==s?void 0:s.state)?(d=new Date(l),d.setDate(d.getDate()+parseInt(s.state))):d=l;const h=(l.getTime()-o.getTime())/.9,u=new Date(o.getTime()+h),p=[...this.events],m={date:u,displayDate:d,type:"harvest",label:c.TranslationUtils.translateHistory(this.hass,"harvest"),description:`${c.TranslationUtils.translateHistory(this.hass,"expected_harvest_date")}: ${d.toLocaleDateString()}`};p.push(m);const g=p.map(((t,e)=>({index:e,position:Math.min((t.date.getTime()-o.getTime())/(u.getTime()-o.getTime())*100,100),type:"label",offset:0})));this.labelOffsets=this.checkOverlap(g),this.markerOffsets=Object.fromEntries(Object.entries(this.labelOffsets).map((([t,e])=>[t,-1*e])));const f=this.events.filter((t=>t.type.startsWith("phase"))),v=this.events.filter((t=>t.type.startsWith("area"))),_=this.events.filter((t=>"pot-size"===t.type)),y=this.events.filter((t=>"treatment"===t.type)),b=this.events.filter((t=>"image"===t.type)),w=this.checkCollisions(f,o,u),x=this.checkCollisions(v,o,u),$=this.checkCollisions(_,o,u),k=this.checkCollisions(y,o,u),T=this.checkCollisions(b,o,u),I=new Map;return f.length>0&&I.set("phase",{top:0,height:10}),v.length>0&&I.set("area",{top:10,height:10}),_.length>0&&I.set("pot",{top:20,height:10}),this.stateHistory.length>0&&I.set("status",{top:30,height:4}),y.length>0&&I.set("treatment",{top:0,height:34}),b.length>0&&I.set("image",{top:0,height:34}),a.html`
            <div class="timeline-container">
                <div class="timeline">
                    <div class="timeline-labels">
                        ${this.renderTimelineItems(p,o,u,!0)}
                    </div>
                    <div class="timeline-events">
                        <div class="current-time-line" style="left: 90%;"></div>
                        ${this.renderEventGroup(f,"phase",o,u,w,I)}
                        ${this.renderEventGroup(v,"area",o,u,x,I)}
                        ${this.renderEventGroup(_,"pot",o,u,$,I)}
                        ${this.renderStatusIndicators(this.stateHistory,o,u,I)}
                        ${this.renderEventGroup(y,"treatment",o,u,k,I)}
                        ${this.renderEventGroup(b,"image",o,u,T,I)}
                    </div>
                    <div class="timeline-markers">
                        ${this.renderTimelineItems(p,o,u,!1)}
                    </div>
                </div>
            </div>
            ${this._showGallery?a.html`
                <flower-gallery
                    .hass=${this.hass}
                    .entityId=${this.entityId}
                    .images=${this._imageUrls}
                    .initialImageIndex=${this._hoveredImageIndex}
                    .onClose=${()=>{this._showGallery=!1,this._hoveredImageIndex=null}}
                ></flower-gallery>
            `:""}
        `}};e.FlowerTimeline=w,n([(0,o.property)()],w.prototype,"hass",void 0),n([(0,o.property)()],w.prototype,"entityId",void 0),n([(0,o.property)({type:Array})],w.prototype,"events",void 0),n([(0,o.property)()],w.prototype,"stateHistory",void 0),n([(0,o.state)()],w.prototype,"_timelineWidth",void 0),n([(0,o.state)()],w.prototype,"labelOffsets",void 0),n([(0,o.state)()],w.prototype,"markerOffsets",void 0),n([(0,o.state)()],w.prototype,"_showGallery",void 0),n([(0,o.state)()],w.prototype,"_hoveredImageIndex",void 0),n([(0,o.state)()],w.prototype,"_hoveredEventIndex",void 0),e.FlowerTimeline=w=n([(0,o.customElement)("flower-timeline")],w)},43:function(t,e,i){var n=this&&this.__decorate||function(t,e,i,n){var s,a=arguments.length,o=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,n);else for(var r=t.length-1;r>=0;r--)(s=t[r])&&(o=(a<3?s(o):a>3?s(e,i,o):s(e,i))||o);return a>3&&o&&Object.defineProperty(e,i,o),o};Object.defineProperty(e,"__esModule",{value:!0}),e.BrokkoliCardEditor=void 0;const s=i(4437),a=i(2924),o=i(9130),r=i(4139),l=i(4147),d=i(4135),c=i(5770),h=i(5770),u=i(1261),p=[{label:"Wachstumsphasen",value:u.EVENT_TYPES.PHASE},{label:"Topfgrößen",value:u.EVENT_TYPES.POT},{label:"Standorte",value:u.EVENT_TYPES.AREA},{label:"Behandlungen",value:u.EVENT_TYPES.TREATMENT},{label:"Bilder",value:u.EVENT_TYPES.IMAGE},{label:"Journal",value:u.EVENT_TYPES.JOURNAL}],m=[{label:"Links",value:"left"},{label:"Rechts",value:"right"}],g=r.elementOptions.filter((t=>"header"!==t.value&&"options"!==t.value));let f=class extends l.default{render(){if(!this._hass||!this._config)return s.html``;this._config.show_bars||(this._config=Object.assign(Object.assign({},this._config),{show_bars:[...r.default_show_bars]})),this._config.show_elements||(this._config=Object.assign(Object.assign({},this._config),{show_elements:[...r.default_show_elements]})),this._config.option_elements||(this._config=Object.assign(Object.assign({},this._config),{option_elements:[...r.default_option_elements]})),this._config.full_width_bars||(this._config=Object.assign(Object.assign({},this._config),{full_width_bars:[]}));const t=(e=this._hass,[...(0,c.getEntitiesByDomain)(e,"plant"),...(0,c.getEntitiesByDomain)(e,"cycle")]);var e;const i=(0,h.getEntitiesByDeviceClass)(this._hass,"sensor","battery");return this.renderForm([{controls:[{label:"Display Type",configValue:"display_type",type:d.FormControlType.Radio,items:[{label:"Full",value:o.DisplayType.Full},{label:"Compact",value:o.DisplayType.Compact}]}]},{controls:[{label:"Entity",configValue:"entity",type:d.FormControlType.Dropdown,items:t}]},{controls:[{label:"Battery Sensor",configValue:"battery_sensor",type:d.FormControlType.Dropdown,items:i}]},{controls:[{label:"Show Bars",configValue:"show_bars",type:d.FormControlType.Checkboxes,items:r.plantAttributes}]},{controls:[{label:"Full Width Bars",configValue:"full_width_bars",type:d.FormControlType.Checkboxes,items:r.plantAttributes}]},{controls:[{label:"Show Elements",configValue:"show_elements",type:d.FormControlType.Checkboxes,items:r.elementOptions}]},{controls:[{label:"Option Elements",configValue:"option_elements",type:d.FormControlType.Checkboxes,items:r.elementOptions}]},{controls:[{label:"Default Expanded Options",configValue:"default_expanded_options",type:d.FormControlType.Checkboxes,items:g}]},{controls:[{label:"History Groups",configValue:"history_groups",type:d.FormControlType.Checkboxes,items:p}]},{controls:[{label:"History Line Position",configValue:"history_line_position",type:d.FormControlType.Radio,items:m}]}])}};e.BrokkoliCardEditor=f,e.BrokkoliCardEditor=f=n([(0,a.customElement)("brokkoli-card-editor")],f)},6800:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.style=void 0;const n=i(4437);e.style=n.css`
  /* ===== Base Card Styles ===== */
  ha-card {
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
    max-height: 100%;
    overflow: visible !important;
  }

  .card-margin-top {
    margin-top: 32px;
  }

  /* ===== Header Section ===== */
  .header,
  .header-compact {
    position: relative;
  }

  .header {
    padding-top: 8px;
    height: 100px;
  }

  .header-compact {
    padding-top: 4px;
    height: 55px;
  }

  /* Menu Button */
  .menu-button {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    z-index: 3;
  }

  .menu-button ha-icon {
    color: var(--primary-text-color);
    opacity: 0.7;
  }

  .menu-button:hover ha-icon {
    opacity: 1;
  }

  /* Flyout Menu */
  .flyout-menu {
    position: absolute;
    top: 40px;
    right: 8px;
    background: var(--card-background-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    overflow: hidden;
    min-width: 180px;
  }

  .flyout-menu-item {
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .flyout-menu-item:hover {
    background-color: var(--secondary-background-color);
  }

  .flyout-menu-item ha-icon {
    color: var(--primary-text-color);
    opacity: 0.9;
  }

  .flyout-menu-divider {
    height: 1px;
    background-color: var(--divider-color);
    margin: 4px 0;
  }

  /* Plant Dropdown Styles */
  .plant-dropdown-container {
    position: relative;
    display: block;
    margin: 4px 0 0 132px;
    color: #8c96a5;
    text-transform: capitalize;
  }
  
  .clickable-plants {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .clickable-plants:hover {
    text-decoration: underline;
  }

  .plant-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    background: var(--card-background-color);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 100;
    overflow: hidden;
    min-width: 200px;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 5px;
  }

  .plant-dropdown-item {
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    border-bottom: 1px solid var(--divider-color);
  }

  .plant-dropdown-item:last-child {
    border-bottom: none;
  }

  .plant-dropdown-item:hover {
    background-color: var(--secondary-background-color);
  }

  .plant-dropdown-name {
    font-weight: 500;
    margin-bottom: 4px;
  }

  .plant-dropdown-info {
    font-size: 0.85em;
    opacity: 0.8;
  }

  /* Popup Dialog */
  .popup-dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  .popup-content {
    background: var(--card-background-color);
    border-radius: 8px;
    padding: 24px;
    min-width: 300px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  .popup-title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 20px;
    color: var(--primary-text-color);
    border-bottom: 1px solid var(--divider-color);
    padding-bottom: 10px;
  }

  .popup-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
  }

  .popup-buttons button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.2s;
  }

  .popup-buttons button:first-child {
    background-color: var(--secondary-background-color);
    color: var(--primary-text-color);
  }

  .popup-buttons button:last-child {
    background-color: var(--primary-color);
    color: var(--text-primary-color);
  }

  .popup-buttons button:hover {
    opacity: 0.9;
  }

  .popup-buttons button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .popup-buttons button.danger {
    background-color: var(--error-color);
    color: white;
  }

  /* Form Fields */
  .form-field {
    margin-bottom: 16px;
  }

  .form-field label {
    display: block;
    margin-bottom: 6px;
    color: var(--primary-text-color);
    font-weight: 500;
  }

  .form-field .input-group {
    display: flex;
    gap: 8px;
  }

  .form-field .input-group input {
    flex: 1;
  }

  /* Sensor Replacement Styles */
  .form-field select {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--divider-color);
    border-radius: 4px;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-size: 14px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 12px;
    padding-right: 30px;
  }

  .form-field select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  /* Header Image Container */
  .image-container {
    position: relative;
    width: 100px;
    height: 100px;
    float: left;
    margin: -16px 16px 0;
  }

  .header-compact .image-container {
    width: 50px;
    height: 50px;
    margin: 0 8px;
  }

  /* Header Image */
  .image-container .back-image,
  .image-container .front-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2));
  }

  .image-container .back-image {
    z-index: 1;
  }

  .image-container .front-image {
    z-index: 2;
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  .image-container .front-image.fade {
    opacity: 0;
  }

  .header > img {
    width: 100px;
    height: 100px;
    margin: -16px 16px 0;
  }

  .header-compact > img {
    width: 50px;
    height: 50px;
    margin: 0 8px;
  }

  .header > img.fade,
  .header-compact > img.fade {
    opacity: 0;
  }

  /* Header Text */
  .header > #name,
  .header-compact > #name {
    font-weight: bold;
    text-transform: capitalize;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header > #name {
    width: fit-content;
    max-width: calc(100% - 150px);
    margin: 16px 0 0 132px;
  }

  .header-compact > #name {
    width: calc(100% - 74px);
    margin-top: 8px;
  }

  #name ha-icon {
    color: rgb(240, 163, 163);
  }

  .header > #species {
    text-transform: capitalize;
    color: #8c96a5;
    display: block;
    margin: 4px 0 0 132px;
  }

  .header-compact > #species {
    text-transform: capitalize;
    color: #8c96a5;
    display: block;
    margin: 4px 0 0 0;
  }

  .header-compact .plant-dropdown-container {
    margin: 4px 0 0 0;
  }

  /* Header Status */
  #battery {
    float: right;
    margin: -15px 16px 0 0;
  }

  .header > #status-container {
    display: flex;
    gap: 16px;
    margin: 4px 0 0 132px;
  }

  .header > #status-container span {
    color: #8c96a5;
    display: flex;
    align-items: center;
    font-size: 0.9em;
  }

  .header > #metrics-container {
    display: none;
  }

  .header > #metrics-container ha-icon,
  .header > #status-container ha-icon {
    margin-right: 4px;
  }

  /* ===== Divider ===== */
  .divider {
    height: 1px;
    background-color: #727272;
    opacity: 0.25;
    margin: 0 8px;
  }

  /* ===== Attributes Section ===== */
  .attributes {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  .attributes:first-child {
    margin-top: 16px;
  }

  .attributes.width-100 {
    padding: 2px;
  }

  /* Container für Full-Width Items */
  .attributes.has-full-width-item {
    display: block;
  }

  /* Basis-Styling für alle Attribute */
  .attribute {
    display: flex;
    align-items: center;
    width: 50%;
    box-sizing: border-box;
    position: relative;
  }

  /* Attribute in voller Breite */
  .attribute.width-100,
  .attribute.full-width {
    width: 100%;
  }

  /* Header in Attributen */
  .attribute .header {
    margin-left: auto;
    min-width: 20px;
    height: auto;
    padding-top: 0;
  }

  /* Header in Width-100 ausblenden, aber in Full-Width anzeigen */
  .attribute.width-100 .header {
    display: none;
  }

  .attribute.width-100.full-width .header {
    display: flex;
  }

  /* Icon-Styling */
  .attribute ha-icon {
    margin-right: 8px;
  }

  /* Cursor für klickbare Health-Bar Icons */
  .attribute[data-attribute="health"] ha-icon {
    cursor: pointer;
  }

  /* ===== Meter Styles ===== */
  .meter {
    height: 8px;
    background-color: var(--primary-background-color);
    border-radius: 2px;
    display: inline-grid;
    overflow: hidden;
  }

  .meter.red {
    flex-grow: 1;
    margin-right: 5px;
  }

  .meter.green {
    flex-grow: 10;
    margin-right: 8px;
  }

  /* Spezielle Styles für Health-Bar-Meter */
  .attribute[data-attribute="health"] .meter.green {
    display: grid; 
    grid-template-columns: repeat(10, 1fr); 
    column-gap: 5px; 
    position: relative;
    background-color: transparent;
  }

  /* Health-Bar in Full-Width */
  .attribute.full-width[data-attribute="health"] .meter.green {
    flex: 1;
    width: 100%;
  }

  /* Health-Segmente */
  .attribute[data-attribute="health"] .health-segment {
    grid-row: 1;
    border-radius: 2px;
    height: 8px;
  }

  /* Range-Input für Health-Bar */
  .attribute[data-attribute="health"] .meter.green input[type="range"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.0001;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  .meter > span {
    grid-row: 1;
    grid-column: 1;
    height: 100%;
  }

  .meter > .good {
    background-color: rgba(43, 194, 83, 1);
  }

  .meter > .bad {
    background-color: rgba(240, 163, 163);
  }

  .meter > .unavailable {
    background-color: rgba(158, 158, 158, 1);
  }

  /* ===== Tooltip Styles ===== */
  .tooltip {
    position: relative;
    cursor: pointer;
    overflow: visible !important;
    z-index: 2;
  }

  .tooltip .tip {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    padding: 6px 10px;
    bottom: 150%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(97, 97, 97, 0.9);
    color: white;
    white-space: normal;
    z-index: 99999;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    max-width: 300px;
    min-width: 150px;
    text-align: center;
    word-break: normal;
    overflow-wrap: break-word;
    transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
    transition-delay: 0s;
  }

  .tooltip .tip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(97, 97, 97, 0.9) transparent transparent transparent;
  }

  .battery.tooltip .tip {
    bottom: 180%;
    min-width: unset;
  }

  .tooltip:hover .tip {
    opacity: 1;
    visibility: visible;
    transition-delay: 0.3s;
  }

  /* Ensure tooltips don't get cut off at the edges */
  .attributes .tooltip:first-child .tip {
    left: 20%;
    transform: translateX(0);
  }

  .attributes .tooltip:first-child .tip::after {
    left: 10%;
  }

  .attributes .tooltip:last-child .tip {
    left: 80%;
    transform: translateX(-100%);
  }

  .attributes .tooltip:last-child .tip::after {
    left: 90%;
  }
  
  /* Special handling for compact mode */
  .attributes.width-100 .tooltip .tip {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .attributes.width-100 .tooltip .tip::after {
    left: 50%;
  }

  /* Special handling for full-width items */
  .attributes.has-full-width-item .tooltip .tip {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .attributes.has-full-width-item .tooltip .tip::after {
    left: 50%;
  }

  /* ===== Options Styles ===== */
  .options-container {
    display: flex;
    justify-content: space-between;
    height: 16px;
    line-height: 0;
  }

  /* Wenn options-container das erste Element ist */
  .options-container:first-child {
    margin-top: 0;
  }

  .options-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 2px 0;
    transition: background-color 0.2s ease-in-out;
  }

  .options-section:hover {
    background-color: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.05);
  }

  .options-section ha-icon {
    color: var(--primary-text-color);
    opacity: 0.5;
    width: 12px;
    height: 12px;
    --mdc-icon-size: 12px;
    transform: rotate(0deg);
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, color 0.3s ease-in-out;
  }

  .options-section.expanded ha-icon {
    opacity: 1;
    transform: rotate(180deg);
    color: var(--primary-color, #03a9f4);
  }

  /* ===== Expanded Content Styles ===== */
  .expanded-content {
    display: none;
    padding: 0 8px;
    box-sizing: border-box;
    width: 100%;
    overflow-x: hidden;
  }

  .expanded-content.show {
    display: block;
    animation: fadeIn 0.3s ease-in-out;
    margin: 8px 0;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Wenn expanded-content das erste Element ist */
  .expanded-content.show:first-child {
    margin-top: 16px;
  }

  .expanded-content.show flower-graph,
  .expanded-content.show flower-timeline,
  .expanded-content.show flower-consumption,
  .expanded-content.show flower-history {
    width: 100%;
    max-width: 100%;
    display: block;
  }

  /* Schmale Scrollbar für Webkit-Browser (Chrome, Safari, etc.) */
  .expanded-content.show::-webkit-scrollbar {
    width: 6px;
  }

  .expanded-content.show::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
  }

  .expanded-content.show::-webkit-scrollbar-track {
    background: transparent;
  }

  /* ===== Plant Details Styles ===== */
  .plant-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin: 8px 0;
    padding: 0 8px;
    box-sizing: border-box;
  }

  /* Wenn plant-details das erste Element ist */
  .plant-details:first-child {
    margin-top: 16px;
    padding-top: 8px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px;
    background: var(--card-background-color, #fff);
    border-radius: 4px;
  }

  .detail-item.full-width {
    grid-column: 1 / -1;
  }

  .detail-item .label {
    font-size: 0.8em;
    color: var(--primary-text-color);
    opacity: 0.7;
  }

  .detail-item .value {
    font-size: 0.9em;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .detail-item .link {
    color: var(--primary-color);
    text-decoration: none;
  }

  .detail-item .link:hover {
    text-decoration: underline;
  }

  .detail-item ha-icon {
    color: var(--primary-text-color);
    opacity: 0.7;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 600px) {
    .header > .unit {
      display: none;
    }
  }

  /* ===== Timeline Container Styles ===== */
  .timeline-container {
    width: 100%;
    overflow-x: hidden;
    padding: 0 8px;
    box-sizing: border-box;
    margin: 8px 0;
  }

  /* Wenn der Container das erste Element ist */
  .timeline-container:first-child {
    margin-top: 16px;
  }

  .timeline-container flower-graph,
  .timeline-container flower-timeline {
    width: 100%;
    max-width: 100%;
    display: block;
  }

  /* ===== Component Container Styles ===== */
  .component-container {
    width: 100%;
    overflow-x: hidden;
    padding: 0 8px;
    box-sizing: border-box;
    margin: 0 0 8px 0;
  }

  /* Wenn der Container das erste Element ist */
  .component-container:first-child {
    margin-top: 0;
  }

  .component-container flower-consumption,
  .component-container flower-history {
    width: 100%;
    max-width: 100%;
    display: block;
  }
`},2075:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.style=void 0;const n=i(4437);e.style=n.css`
    /* ===================================
     * Consumption Grid Layout
     * =================================== */
    .consumption-data {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        gap: 4px;
        margin: 8px 0;
    }

    /* ===================================
     * Consumption Item Styles
     * =================================== */
    .consumption-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px;
        border-radius: 4px;
        background: var(--card-background-color, var(--ha-card-background));
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .consumption-item:hover {
        background: var(--primary-background-color);
    }

    /* Large Item (Energiekosten) */
    .consumption-item.large {
        grid-column: 3;
        grid-row: 1 / 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 12px;
        height: 100%;
        box-sizing: border-box;
    }

    /* ===================================
     * Icon Styles
     * =================================== */
    .consumption-item ha-icon {
        color: var(--primary-text-color);
        opacity: 0.7;
        width: 20px;
        height: 20px;
    }

    .consumption-item.large ha-icon {
        width: 48px;
        height: 48px;
        --mdc-icon-size: 48px;
    }

    /* ===================================
     * Consumption Details Text Styles
     * =================================== */
    .consumption-details {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    /* Large Details (Energiekosten) */
    .consumption-details.large {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
    }

    /* Text Sizes */
    .consumption-details .label {
        font-size: 0.7em;
        color: var(--primary-text-color);
        opacity: 0.7;
    }

    .consumption-details .value {
        font-size: 0.8em;
        font-weight: bold;
    }

    .consumption-value {
        display: inline-block;
    }

    .consumption-item.animate ha-icon,
    .consumption-item.animate .label,
    .consumption-item.animate .value {
        animation: value-change 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes value-change {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    .consumption-details.large .label {
        font-size: 0.9em;
    }

    .consumption-details.large .value {
        font-size: 1.6em;
        font-weight: bold;
    }

    /* ===================================
     * Consumption Charts Container
     * =================================== */
    .consumption-charts-container {
        display: flex;
        justify-content: center;
        margin-top: 16px;
    }

    /* ===================================
     * Pie Chart Container
     * =================================== */
    .pie-chart-container {
        width: 100%;
        max-width: 500px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
        background: var(--card-background-color, var(--ha-card-background));
        border-radius: 4px;
        padding: 16px;
    }

    .pie-chart {
        width: 100%;
        min-width: 0;
    }
`},364:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.galleryStyles=void 0;const n=i(4437);e.galleryStyles=n.css`
    .gallery-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px;
    }

    .gallery-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 0px;
        overflow: hidden;
    }

    .gallery-header {
        flex: 0 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        color: white;
        z-index: 2;
        position: relative;
    }

    .gallery-date {
        font-size: 0.85em;
        text-align: left;
        background: rgba(0, 0, 0, 0.5);
        padding: 6px 12px;
        border-radius: 4px;
        max-width: 60%;
        position: absolute;
        top: 16px;
        left: 16px;
        right: 140px;
        z-index: 1;
        font-weight: normal;
        line-height: 1.4;
    }

    .gallery-date .info-line {
        white-space: nowrap;
    }

    .gallery-date .phase,
    .gallery-date .day,
    .gallery-date .total {
        font-weight: bold;
    }

    .gallery-date .bracket {
        font-weight: normal;
    }

    .gallery-header-buttons {
        display: flex;
        gap: 4px;
        align-items: center;
        position: relative;
        z-index: 2;
        margin-left: auto;
        height: 32px;
    }

    .gallery-header ha-icon-button {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 18px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gallery-header ha-icon {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .gallery-image-container {
        flex: 1 1 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        margin: 0;
        padding: 0 24px;
        min-height: 0;
    }

    .gallery-image-container a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .gallery-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
        cursor: zoom-in;
    }

    .gallery-image.fade {
        opacity: 0;
    }

    .gallery-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        padding: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        --mdc-icon-button-size: 48px;
        --mdc-icon-size: 36px;
        color: white;
        z-index: 2;
    }

    .gallery-nav:hover {
        background: rgba(0, 0, 0, 0.8);
    }

    .gallery-nav.prev {
        left: 8px;
    }

    .gallery-nav.next {
        right: 8px;
    }

    .gallery-nav ha-icon {
        width: 36px;
        height: 36px;
        color: white;
    }

    .gallery-thumbnails {
        flex: 0 0 140px;
        padding: 8px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 2;
    }

    .thumbnails-container {
        position: relative;
        width: 100%;
        height: 124px;
        overflow: hidden;
    }

    .thumbnails-scroll {
        display: flex;
        gap: 16px;
        padding: 4px;
        height: 124px;
        overflow-x: auto;
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
        transition: transform 0.3s ease-in-out;
    }

    .thumbnails-scroll.has-other-images {
        transform: translateX(calc(-1 * var(--other-images-width, 150px)));
    }

    .thumbnails-scroll.has-other-images.shifted-right {
        transform: translateX(0px);
    }

    .thumbnail-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex-shrink: 0;
    }

    .thumbnail-group-label {
        color: white;
        font-size: 0.9em;
        text-align: center;
        background: rgba(0, 0, 0, 0.5);
        padding: 2px 8px;
        border-radius: 4px;
        margin-bottom: 2px;
        position: relative;
    }

    .thumbnail-group-label::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: var(--phase-color);
        border-radius: 0 0 4px 4px;
    }

    .thumbnail-group-images {
        display: flex;
        gap: 8px;
        height: 92px;
        flex-shrink: 0;
    }

    .thumbnail-container {
        position: relative;
        flex: 0 0 auto;
        height: 80px;
        aspect-ratio: 1;
        padding: 2px;
        border: 2px solid transparent;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .thumbnail-day {
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        font-size: 0.8em;
        padding: 1px 6px;
        border-radius: 3px;
        white-space: nowrap;
    }

    .thumbnail-container:hover {
        border-color: rgba(255, 255, 255, 0.5);
    }

    .thumbnail-container.active {
        border-color: var(--primary-color, #03a9f4);
    }

    .thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2px;
    }

    .thumbnails-scroll::-webkit-scrollbar {
        height: 6px;
    }

    .thumbnails-scroll::-webkit-scrollbar-track {
        background: transparent;
    }

    .thumbnails-scroll::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 3px;
    }

    .flyout-container {
        position: relative;
        display: flex;
        align-items: center;
        height: 32px;
        transition: transform 0.2s ease-in-out;
    }

    .flyout-container:first-child {
        transform: translateX(0);
    }

    .flyout-container:first-child.delete-open,
    .flyout-container:first-child.main-open {
        transform: translateX(-31px);
    }

    .flyout-container:first-child.delete-open.main-open {
        transform: translateX(-62px);
    }

    .flyout-container:nth-child(2).delete-open,
    .flyout-container:nth-child(2).main-open {
        transform: translateX(-31px);
    }

    .flyout-container:nth-child(2).delete-open.main-open {
        transform: translateX(-62px);
    }

    .flyout-container.delete-open,
    .flyout-container.main-open {
        transform: translateX(-31px);
    }

    .flyout-container.delete-open.main-open {
        transform: translateX(-62px);
    }

    .flyout-menu {
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%) translateX(6px);
        height: 32px;
        background: var(--card-background-color);
        border-radius: 4px;
        padding: 2px;
        display: flex;
        align-items: center;
        gap: 2px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14));
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-in-out;
    }

    .flyout-container.open .flyout-menu {
        transform: translateY(-50%) translateX(0);
        opacity: 1;
        visibility: visible;
    }

    .flyout-option {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;
    }

    .flyout-option ha-icon-button {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 18px;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-button,
    .delete-button,
    .main-button,
    .confirm-delete,
    .confirm-main {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
    }

    .add-button {
        transition: transform 0.2s ease-in-out;
    }

    .flyout-container.open .add-button {
        transform: rotate(45deg);
    }

    .delete-button:hover,
    .main-button:hover,
    .confirm-delete:hover,
    .confirm-main:hover {
        opacity: 0.8;
    }

    .confirm-delete {
        color: var(--error-color, #db4437);
    }

    .confirm-main {
        color: var(--primary-color, #03a9f4);
    }

    .no-images-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 300px;
        color: var(--secondary-text-color);
        gap: 16px;
    }

    .no-images-message ha-icon {
        --mdc-icon-size: 64px;
        opacity: 0.5;
    }

    .nav-toggle {
        position: absolute;
        top: calc(50% + 11px);
        left: 8px;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 80px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 4px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 10;
        opacity: 0.7;
    }

    .nav-toggle:hover {
        background: rgba(0, 0, 0, 0.9);
        opacity: 1;
    }

    .nav-toggle.open {
        opacity: 1;
    }

    .nav-icon {
        --mdc-icon-size: 18px;
        color: white;
        transition: transform 0.3s ease;
    }

    .nav-toggle.open .nav-icon {
        transform: rotate(180deg);
    }

    @media (max-width: 600px) {
        .gallery-date {
            right: 120px;
        }
    }

    @media (max-width: 400px) {
        .gallery-date {
            right: 100px;
        }
    }
`},1334:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.graphStyles=void 0;const n=i(4437);e.graphStyles=n.css`
    .graph-container {
        width: calc(100% +20px);
        margin: 0px -10px 0px -10px !important;
        padding: 0 !important;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: var(--ha-card-border-radius, 4px);
        position: relative;
    }

    .apexcharts-legend {
        width: 9.5% !important;
        overflow: hidden;
    }

    .date-picker-container {
        position: absolute;
        top: 2px;
        right: 125px;
        z-index: 3;
    }

    #date-picker {
        background: var(--ha-card-background, var(--card-background-color, white));
        border: 0px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        padding: 4px 8px;
        font-size: 10px;
        color: var(--primary-text-color);
        cursor: pointer;
        width: 160px;
        text-align: right;
    }

    #date-picker:focus {
        outline: none;
        border-color: var(--primary-color);
    }

    /* Flatpickr Anpassungen */
    .flatpickr-calendar {
        background: var(--ha-card-background, var(--card-background-color, white)) !important;
        border: 1px solid var(--divider-color, #e0e0e0) !important;
        border-radius: var(--ha-card-border-radius, 4px) !important;
        box-shadow: var(--ha-card-box-shadow, none) !important;
    }

    .flatpickr-day {
        color: var(--primary-text-color) !important;
    }

    .flatpickr-day.selected {
        background: var(--primary-color) !important;
        border-color: var(--primary-color) !important;
        color: var(--text-primary-color) !important;
    }

    .flatpickr-day.inRange {
        background: var(--primary-color) !important;
        opacity: 0.5;
        border-color: var(--primary-color) !important;
        color: var(--text-primary-color) !important;
    }

    .flatpickr-current-month,
    .flatpickr-weekday {
        color: var(--primary-text-color) !important;
    }

    .flatpickr-time input {
        color: var(--primary-text-color) !important;
    }

    /* Custom Legend Styles */
    .custom-legend {
        display: flex;
        align-items: left;
        flex-direction: column;
        position: absolute;
        top: 24px;
        right: 10px;
        background: var(--ha-card-background, var(--card-background-color, white));
        padding: 0px;
        border-radius: 4px;
        font-size: 11px;
        gap: 0px;
        width: 9%;
        overflow: hidden;
    }

    .legend-item {
        display: flex;
        align-items: left;
        gap: 6px;
        cursor: pointer;
        opacity: 1;
        transition: opacity 0.2s ease-in-out;
        padding: 0px;
    }

    .legend-item.inactive {
        opacity: 0.5;
    }

    .legend-marker {
        width: 14px;
        height: 14px;
        --mdc-icon-size: 20px;
    }

    .legend-text {
        padding-top: 1px;
        color: var(--primary-text-color);
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Farben für die Legend-Marker */
    .legend-item:nth-child(1) .legend-marker { color: #2E93fA; }  /* Temperatur */
    .legend-item:nth-child(2) .legend-marker { color: #00D2FF; }  /* Leitfähigkeit */
    .legend-item:nth-child(3) .legend-marker { color: #FFB900; }  /* DLI */
    .legend-item:nth-child(4) .legend-marker { color: #FF4560; }  /* Gesundheit */
    .legend-item:nth-child(5) .legend-marker { color: #775DD0; }  /* Wasserverbrauch */
    .legend-item:nth-child(6) .legend-marker { color: #00D2FF; }  /* Leitfähigkeitsverbrauch */
    .legend-item:nth-child(7) .legend-marker { color: #FEB019; }  /* Stromverbrauch */
    .legend-item:nth-child(8) .legend-marker { color: #00E396; }  /* Feuchtigkeit */
    .legend-item:nth-child(9) .legend-marker { color: #CED4DC; }  /* Beleuchtung */
    .legend-item:nth-child(10) .legend-marker { color: #008FFB; } /* Luftfeuchtigkeit */

    /* Scrollbar-Styling */
    .custom-legend::-webkit-scrollbar {
        width: 4px;
    }

    .custom-legend::-webkit-scrollbar-thumb {
        background: var(--divider-color, #e0e0e0);
        border-radius: 2px;
    }

    .custom-legend::-webkit-scrollbar-thumb:hover {
        background: var(--secondary-text-color);
    }

    /* Tooltip Styles */
    .tooltip-container {
        background: var(--ha-card-background, var(--card-background-color, white));
        padding: 0;
        border: 1px solid var(--divider-color, #e0e0e0);
        box-shadow: 2px 2px 6px -4px #999;
        border-radius: 8px;
    }

    .tooltip-header {
        font-weight: normal;
        font-size: 11px;
        background: var(--primary-color);
        color: var(--text-primary-color);
        padding: 6px 8px;
        border-radius: 8px 8px 0 0;
        margin-bottom: 4px;
        margin-top: 0px;
    }

    .tooltip-header strong {
        font-weight: bold;
    }

    .tooltip-content {
        display: grid;
        grid-template-columns: auto auto auto;
        gap: 0 12px;
        align-items: center;
        font-size: 10px;
        padding: 8px;
        line-height: 1.2;
    }

    .tooltip-sensor-name {
        margin: 0;
    }

    .tooltip-range {
        margin: 0;
    }

    .tooltip-mean {
        font-weight: bold;
        margin: 0;
    }

    .tooltip-error {
        background: var(--ha-card-background, var(--card-background-color, white));
        padding: 8px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
    }

    /* Grow Phases Container */
    .grow-phases-container {
        display: flex;
        justify-content: space-between;
        margin: 20px 10px;
        padding: 10px;
        background: var(--ha-card-background, var(--card-background-color, white));
        border-radius: var(--ha-card-border-radius, 4px);
    }

    /* Vertical Timeline */
    .vertical-timeline {
        flex: 0 0 200px;
        position: relative;
        padding-right: 20px;
    }

    .timeline-line {
        position: absolute;
        left: 15px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: var(--primary-color);
    }

    .phase-item {
        position: relative;
        margin: 20px 0;
        padding-left: 40px;
    }

    .phase-dot {
        position: absolute;
        left: 11px;
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
    }

    .phase-content {
        font-size: 0.9em;
    }

    .phase-name {
        font-weight: bold;
        color: var(--primary-text-color);
    }

    .phase-date {
        font-size: 0.8em;
        color: var(--secondary-text-color);
    }

    /* Pie Chart Container */
    .pie-chart-container {
        flex: 0 0 300px;
        height: 300px;
    }
`},4302:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.historyStyles=void 0;const n=i(4437);e.historyStyles=n.css`
    /* ===================================
     * History Container
     * =================================== */
    .history-container {
        margin-top: 16px;
        background: var(--card-background-color, var(--ha-card-background));
        border-radius: 4px;
        overflow: hidden;
        padding: 16px;
    }

    /* ===================================
     * Vertical Timeline
     * =================================== */
    .vertical-timeline {
        position: relative;
        padding: 16px 0;
        margin-left: 8px;
        min-width: 0;
    }

    /* Timeline Line */
    .timeline-line {
        position: absolute;
        left: 8px;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--primary-color);
        opacity: 0.5;
    }

    /* Timeline Items */
    .phase-item {
        position: relative;
        margin: 6px 0;
        padding-left: 32px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    /* Growth Phases haben mehr vertikalen Abstand */
    .phase-item.milestone {
        margin: 16px 0;
    }

    .phase-item:hover {
        padding-left: 34px;
    }

    .phase-dot {
        position: absolute;
        left: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-color: var(--primary-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
        transition: transform 0.2s ease, width 0.2s ease, height 0.2s ease;
    }

    /* Größere Punkte für Growth Phases */
    .phase-dot.milestone {
        width: 26px;
        height: 26px;
        left: -6px;
        border: 2px solid white;
    }

    .phase-item:hover .phase-dot {
        transform: translateY(-50%) scale(1.1);
    }

    .dot-icon {
        color: white;
        --mdc-icon-size: 14px;
        opacity: 0.9;
    }

    /* Größere Icons für Growth Phases */
    .milestone .dot-icon {
        --mdc-icon-size: 20px;
    }

    .phase-content {
        background: var(--card-background-color, var(--ha-card-background));
        padding: 8px 12px;
        border-radius: 4px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        transition: box-shadow 0.2s ease;
    }

    /* Kompaktere Inhalte für normale Events */
    .phase-item:not(.milestone) .phase-content {
        padding: 6px 10px;
    }

    /* Hervorgehobene Inhalte für Growth Phases */
    .phase-content.milestone {
        padding: 10px 12px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12);
        background: linear-gradient(to right, 
            var(--milestone-color, rgba(0,0,0,0.05)) 0%, 
            color-mix(in srgb, var(--milestone-color, rgba(0,0,0,0.05)) 50%, var(--card-background-color, var(--ha-card-background))) 10%, 
            var(--card-background-color, var(--ha-card-background)) 25%);
        background-blend-mode: overlay;
    }

    .phase-item:hover .phase-content {
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .phase-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
    }

    .phase-name {
        font-weight: bold;
        font-size: 0.9em;
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
    }

    /* Größere Schrift für Growth Phases */
    .milestone .phase-name {
        font-size: 1.05em;
    }

    .phase-date {
        font-size: 0.8em;
        color: var(--secondary-text-color);
        margin-top: 0px;
    }

    /* Journal Container mit Animation */
    .journal-container {
        position: relative;
        height: 0;
        overflow: hidden;
        transition: height 0.3s ease-out, opacity 0.3s ease-out, margin-top 0.3s ease-out;
        opacity: 0;
        margin-top: 0;
        will-change: height, opacity, margin-top;
    }

    .journal-container.expanded {
        height: auto;
        opacity: 1;
        margin-top: 8px;
    }

    .journal-container.closing {
        height: 0 !important;
        opacity: 0;
        margin-top: 0;
        pointer-events: none;
    }

    .phase-description {
        font-size: 0.85em;
        color: var(--primary-text-color);
        opacity: 0.8;
        white-space: pre-wrap;
        word-break: break-word;
    }

    /* ===================================
     * Rechte Timeline Styles
     * =================================== */
    .vertical-timeline.timeline-right {
        margin-left: 0;
        margin-right: 8px;
    }

    .vertical-timeline.timeline-right .timeline-line {
        left: auto;
        right: 8px;
    }

    .vertical-timeline.timeline-right .phase-item {
        padding-left: 0;
        padding-right: 32px;
    }

    .vertical-timeline.timeline-right .phase-item:hover {
        padding-left: 0;
        padding-right: 34px;
    }

    .vertical-timeline.timeline-right .phase-dot {
        left: auto;
        right: 1px;
    }

    .vertical-timeline.timeline-right .phase-dot.milestone {
        left: auto;
        right: -6px;
    }

    .vertical-timeline.timeline-right .phase-content.milestone {
        background: linear-gradient(to left, 
            var(--milestone-color, rgba(0,0,0,0.05)) 0%, 
            color-mix(in srgb, var(--milestone-color, rgba(0,0,0,0.05)) 50%, var(--card-background-color, var(--ha-card-background))) 10%, 
            var(--card-background-color, var(--ha-card-background)) 25%);
    }

    /* ===================================
     * Add Entry Styles
     * =================================== */
    .phase-item.add-item {
        margin-bottom: 4px;
        margin-top: 2px;
    }

    .phase-dot.add-dot {
        width: 18px;
        height: 18px;
        left: -2px;
        border: 2px solid var(--card-background-color, var(--ha-card-background));
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    .vertical-timeline.timeline-right .phase-dot.add-dot {
        left: auto;
        right: -2px;
    }

    .add-dot .dot-icon {
        --mdc-icon-size: 12px;
    }

    .phase-content.add-content {
        background: var(--card-background-color, var(--ha-card-background));
        transition: box-shadow 0.3s ease;
        padding: 2px 8px;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }

    .phase-item.add-item:hover .phase-content.add-content {
        box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }

    /* ===================================
     * Neue Animationen für Add Menu
     * =================================== */
    .add-menu-container {
        position: relative;
        overflow: hidden;
        transition: height 0.4s ease-out;
        height: 0;
    }

    .add-menu-container.expanded {
        height: auto;
    }

    /* Add Menu Options */
    .add-menu-options {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 4px 0;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.4s ease-out, transform 0.4s ease-out;
    }

    .add-menu-options.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .add-option {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 4px 6px;
        border-radius: 4px;
        background-color: var(--card-background-color, var(--ha-card-background));
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s, opacity 0.3s, margin-top 0.3s;
        opacity: 1;
    }

    .add-option:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    .add-option.fade-out {
        opacity: 0;
        margin-top: -30px;
        pointer-events: none;
    }

    .add-option.selected {
        opacity: 1;
        transform: translateY(0);
        margin-top: 0;
        position: relative;
        z-index: 2;
        transition: transform 0.4s ease-out, margin-top 0.4s ease-out;
    }

    .add-option.move-to-header {
        transform: translateY(-100%);
        margin-top: -8px;
        border-radius: 4px 4px 0 0;
        box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.1);
    }

    .option-icon {
        --mdc-icon-size: 14px;
        margin-right: 8px;
    }

    .add-option span {
        font-size: 0.8em;
        font-weight: 500;
    }

    /* Add Form Styles */
    .form-content {
        padding: 4px;
        background-color: var(--card-background-color, var(--ha-card-background));
        border-radius: 3px;
        width: 100%;
        box-sizing: border-box;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }

    .form-content.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .form-field {
        margin-bottom: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .form-field input,
    .form-field select,
    .form-field textarea {
        width: 100%;
        padding: 3px 5px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 3px;
        background-color: var(--card-background-color, var(--ha-card-background));
        font-size: 0.8em;
        box-sizing: border-box;
    }

    .form-field textarea {
        min-height: 30px;
        max-height: 80px;
        resize: vertical;
        box-sizing: border-box;
    }

    .form-field select {
        appearance: none;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath fill='rgba(0,0,0,0.5)' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 5px center;
        padding-right: 25px;
        height: auto;
        min-height: 30px;
        cursor: pointer;
        z-index: 10;
        position: relative;
    }

    .form-field select option {
        padding: 5px;
        background-color: var(--card-background-color, var(--ha-card-background));
        color: var(--primary-text-color);
    }

    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 1px var(--primary-color);
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 3px;
    }

    .success {
        color: var(--success-color, #4caf50);
    }

    .add-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }

    .add-header.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .add-header-title {
        font-weight: bold;
        font-size: 0.9em;
        display: flex;
        align-items: center;
    }

    .add-header-title ha-icon {
        margin-right: 6px;
        --mdc-icon-size: 16px;
    }

    .journal-submit {
        display: flex;
        justify-content: flex-end;
        margin-top: 4px;
        margin-bottom: 2px;
        margin-right: 2px;
    }

    .journal-submit ha-icon-button {
        --mdc-icon-button-size: 24px;
        --mdc-icon-size: 14px;
        color: white;
        background-color: var(--success-color, #4CAF50);
        border-radius: 50%;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
        min-width: 24px;
        min-height: 24px;
        padding: 0;
    }

    .journal-submit ha-icon-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 3px rgba(0,0,0,0.2);
    }

    .journal-submit ha-icon-button[disabled] {
        color: rgba(255, 255, 255, 0.5);
        background-color: rgba(76, 175, 80, 0.5);
        box-shadow: none;
    }

    .phase-item.add-item .phase-header {
        margin-bottom: 0;
        padding: 2px 0;
    }

    .phase-item.add-item .phase-name {
        font-size: 0.85em;
    }

    ha-icon-button {
        --mdc-icon-button-size: 24px;
        --mdc-icon-size: 14px;
        color: var(--primary-color);
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        transition: all 0.2s ease;
    }

    ha-icon-button:hover {
        transform: translateY(-1px);
    }

    ha-icon-button[disabled] {
        color: var(--disabled-text-color);
        cursor: not-allowed;
    }

    ha-icon-button.success {
        color: var(--success-color, #4CAF50);
        animation: pulse 0.5s;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`},4911:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.timelineStyles=void 0;const n=i(4437);e.timelineStyles=n.css`
  /* ===== Timeline Container Styles ===== */
  .timeline-container {
    width: calc(100% - 40px);
    margin: 10px 20px 0px 20px;
    padding: 0;
    background: var(--card-background-color, #fff);
    display: flex;
    flex-direction: column;
  }

  .timeline {
    position: relative;
    width: 100%;
    height: 120px;
    margin: 4px 0;
  }

  /* Timeline Labels */
  .timeline-labels {
    position: relative;
    height: 20px;
    margin-bottom: 8px;
  }

  /* Gemeinsame Styles für Labels und Marker */
  .timeline-label,
  .timeline-marker {
    position: absolute;
    transform: translateX(-50%);
    font-size: 0.8em;
    color: white;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
    line-height: 1.2em;
    padding: 2px 6px;
    border-radius: 4px;
    background-color: var(--primary-color);
  }

  /* Label-spezifische Positionierung */
  .timeline-label {
    bottom: 0;
  }

  /* Marker-spezifische Positionierung */
  .timeline-marker {
    top: 0;
    font-size: 0.7em;
  }

  /* Offset-Klassen für Labels */
  .timeline-label.offset-up {
    transform: translateX(-50%) translateY(-100%);
  }

  .timeline-label.offset-up-2 {
    transform: translateX(-50%) translateY(-200%);
  }

  .timeline-label.offset-down {
    transform: translateX(-50%) translateY(0);
  }

  /* Offset-Klassen für Marker */
  .timeline-marker.offset-up {
    transform: translateX(-50%) translateY(0);
  }

  .timeline-marker.offset-down {
    transform: translateX(-50%) translateY(100%);
  }

  .timeline-marker.offset-down-2 {
    transform: translateX(-50%) translateY(200%);
  }

  /* Timeline Events */
  .timeline-events {
    position: relative;
    height: 34px;
    background: transparent;
    overflow: visible;
  }

  /* Aktuelle Zeit-Linie */
  .current-time-line {
    position: absolute;
    width: 1px;
    height: calc(100% + 8px);
    background-color: var(--secondary-text-color);
    top: -4px;
    z-index: 2;
  }

  /* Event-Styles */
  .timeline-event {
    position: absolute;
    min-width: 4px;
    height: 10px !important;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    color: var(--text-primary-color);
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }

  /* Spezielle Styles für Treatment und Image Events */
  .timeline-event.treatment,
  .timeline-event.image {
    position: absolute;
    width: 2px !important;
    height: calc(100% + 8px) !important;
    top: -4px !important;
    margin: 0 !important;
    z-index: 2;
  }

  /* Hover-Effekte für alle Elemente */
  .timeline-event:hover,
  .timeline-event[data-hovered],
  .timeline-label:hover,
  .timeline-marker:hover,
  .timeline-label[data-hovered],
  .timeline-marker[data-hovered],
  .timeline-label.hovered,
  .timeline-marker.hovered {
    filter: brightness(1.2);
    z-index: 10;
  }

  /* Nur für Fotos und Treatments den Größeneffekt */
  .timeline-event[data-scale-effect]:hover,
  .timeline-event[data-scale-effect][data-hovered] {
    transform: scaleX(2);
  }

  /* Timeline Markers Container */
  .timeline-markers {
    position: relative;
    height: 20px;
    margin-top: 8px;
  }

  /* Timeline Status */
  .timeline-status {
    position: absolute;
    left: 0;
    right: 0;
    height: 4px;
    bottom: 4px;
    z-index: 1;
  }

  .timeline-status-indicator {
    position: absolute;
    height: 100%;
  }

  .timeline-status-problem {
    background-color: var(--error-color, #db4437);
  }

  .timeline-status-unknown {
    background-color: var(--disabled-text-color, #bdbdbd);
  }
`},9130:(t,e)=>{var i;Object.defineProperty(e,"__esModule",{value:!0}),e.DisplayType=void 0,function(t){t.Full="full",t.Compact="compact"}(i||(e.DisplayType=i={}))},9429:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.renderAttributeChunks=e.getChunkedDisplayed=e.renderAttribute=e.renderAttributes=e.renderBattery=void 0;const n=i(9130),s=i(4437),a=i(3534),o=i(4139),r=i(2135),l=i(2413);e.renderBattery=t=>{if(!t.config.battery_sensor)return s.html``;const e=t._hass.states[t.config.battery_sensor];if(!e)return s.html``;const i=parseInt(e.state),{icon:n,color:a}=[{threshold:90,icon:"mdi:battery",color:"green"},{threshold:80,icon:"mdi:battery-90",color:"green"},{threshold:70,icon:"mdi:battery-80",color:"green"},{threshold:60,icon:"mdi:battery-70",color:"green"},{threshold:50,icon:"mdi:battery-60",color:"green"},{threshold:40,icon:"mdi:battery-50",color:"green"},{threshold:30,icon:"mdi:battery-40",color:"orange"},{threshold:20,icon:"mdi:battery-30",color:"orange"},{threshold:10,icon:"mdi:battery-20",color:"red"},{threshold:0,icon:"mdi:battery-10",color:"red"},{threshold:-1/0,icon:"mdi:battery-alert-variant-outline",color:"red"}].find((({threshold:t})=>i>t))||{icon:"mdi:battery-alert-variant-outline",color:"red"};return s.html`
        <div class="battery tooltip" @click="${e=>{e.stopPropagation(),(0,r.moreInfo)(t,t.config.battery_sensor)}}">
            <div class="tip">${i}%</div>
            <ha-icon .icon="${n}" style="color: ${a}"></ha-icon>
        </div>
    `},e.renderAttributes=t=>{var i,n,s,a;const r={},l={},d={},c={},h={},u={},p={},m=t.config.show_bars||o.default_show_bars,g=t.selectedPlantEntity||(null===(i=t.config)||void 0===i?void 0:i.entity);if(!g||!t._hass.states[g])return[];if(t.plantinfo&&t.plantinfo.result){const e=t.plantinfo.result;for(const i of m)if(e[i]||"health"===i&&(null===(n=e.helpers)||void 0===n?void 0:n.health)){let n,o,m,g,f,v;if("health"===i){if(!(null===(a=null===(s=e.helpers)||void 0===s?void 0:s.health)||void 0===a?void 0:a.entity_id))continue;const i=t._hass.states[e.helpers.health.entity_id];if(!i)continue;n=5,o=0,m=Number(i.state),g="mdi:heart-pulse",f=i.entity_id,v=""}else({max:n,min:o,current:m,icon:g,sensor:f,unit_of_measurement:v}=e[i]);n=Number(n),o=Number(o),g=String(g),f=String(f),m=Number(m),v=String(v);const _="health"===i?m.toString():t._hass.formatEntityState(t._hass.states[f]).replace(/[^\d,.]/g,"");c[`max_${i}`]={max:n,min:o},h[i]=m,r[i]=g,u[i]=f,d[i]=v,l[i]=v,"dli"===i&&(d.dli="mol/d⋅m²",l.dli='<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>'),p[i]={name:i,current:m,limits:c[`max_${i}`],icon:g,sensor:f,unit_of_measurement:v,display_state:_}}}return(0,e.renderAttributeChunks)(t,p,m)},e.renderAttribute=(t,e)=>{var i;const{max:o,min:d}=e.limits,c=e.unit_of_measurement&&"null"!==e.unit_of_measurement?e.unit_of_measurement:"",h=e.icon||"mdi:help-circle-outline",u=e.current||0,p=!isNaN(u),m=e.display_state,g=(null===(i=t.config.full_width_bars)||void 0===i?void 0:i.includes(e.name))||!1,f=t.config.display_type===n.DisplayType.Compact;if("health"===e.name){const i=Math.floor(2*u);let n;if(i<=5){const t=(i-1)/4;n="rgba(240,163,163,1)",t>=0&&(n=`rgb(${240+15*t}, ${163+51*t}, ${163-163*t})`)}else{const t=(i-5)/5;n=`rgb(${255-212*t}, ${214-20*t}, ${0+83*t})`}const a=Array.from({length:10},((t,e)=>{const i=p&&u>.5*e,a=i?n:"var(--primary-background-color)";return s.html`
                <span class="health-segment ${i?"active":""}" 
                      style="grid-column: ${e+1}; background-color: ${a};">
                </span>
            `})),o=()=>{const i=Math.max(0,u-.5);t._hass.callService("number","set_value",{entity_id:e.sensor,value:i})},r=()=>{const i=Math.min(5,u+.5);t._hass.callService("number","set_value",{entity_id:e.sensor,value:i})};return s.html`
            <div class="attribute ${f||g?"width-100":""} ${g?"full-width":""}" data-attribute="health">
                <ha-icon .icon="${h}" 
                         @click="${t=>{t.stopPropagation(),o()}}">
                </ha-icon>
                <div class="meter green">
                    ${a}
                    <input type="range" 
                           min="0" 
                           max="5" 
                           step="0.5"
                           .value="${u}"
                           @input="${i=>{i.stopPropagation();const n=i.target,s=parseFloat(n.value);t._hass.callService("number","set_value",{entity_id:e.sensor,value:s})}}"
                    >
                </div>
                ${f&&!g?"":s.html`
                    <div class="header" @click="${t=>{t.stopPropagation(),r()}}">
                        <span class="value">${m}</span>
                    </div>
                `}
            </div>
        `}const v=100*Math.max(0,Math.min(1,(u-d)/(o-d))),_=p?l.TranslationUtils.createSensorTooltip(t._hass,e.name,u,d,o,c):l.TranslationUtils.translateUI(t._hass,"unavailable");let y="";return"dli"===e.name?y='<math style="display: inline-grid;" xmlns="http://www.w3.org/1998/Math/MathML"><mrow><mfrac><mrow><mn>mol</mn></mrow><mrow><mn>d</mn><mn>⋅</mn><msup><mn>m</mn><mn>2</mn></msup></mrow></mfrac></mrow></math>':c&&(y=c),s.html`
        <div class="attribute tooltip ${f||g?"width-100":""} ${g?"full-width":""}" data-attribute="${e.name}" @click="${()=>(0,r.moreInfo)(t,e.sensor)}">
            <div class="tip">${(0,a.unsafeHTML)(_)}</div>
            <ha-icon .icon="${h}"></ha-icon>
            <div class="meter red">
                <span class="${p?u<d||u>o?"bad":"good":"unavailable"}" style="width: 100%;"></span>
            </div>
            <div class="meter green">
                <span class="${p?u>o?"bad":"good":"unavailable"}" style="width:${p?v:"0"}%;"></span>
            </div>
            <div class="meter red">
                <span class="bad" style="width:${p?u>o?100:0:"0"}%;"></span>
            </div>
            ${f&&!g?"":s.html`<div class="header"><span class="value">${m}</span>&nbsp;${y?s.html`<span class='unit'>${(0,a.unsafeHTML)(y)}</span>`:""}</div>`}
        </div>
    `},e.getChunkedDisplayed=(t,e,i=[],n=[])=>{const s=[];for(const a of n){const n=t[a];if(n)if(i.includes(a))s.push([n]);else{const t=s.length>0?s[s.length-1]:null;t&&t.length<e&&!i.includes(t[0].name)?t.push(n):s.push([n])}}const a=Object.assign({},t);for(const t of n)delete a[t];const o=Object.values(a);for(let t=0;t<o.length;t++){const n=o[t];if(i.includes(n.name))s.push([n]);else{let t=null;for(let n=s.length-1;n>=0;n--){const a=s[n];if(a.length<e&&!i.includes(a[0].name)){t=a;break}}t&&t.length<e?t.push(n):s.push([n])}}return s},e.renderAttributeChunks=(t,i,a=[])=>{const o=t.config.display_type===n.DisplayType.Compact?1:2,r=t.config.full_width_bars||[],l=(0,e.getChunkedDisplayed)(i,o,r,a),d="attributes "+(t.config.display_type===n.DisplayType.Compact?"width-100":"");return l.map((i=>{const n=1===i.length&&r.includes(i[0].name),a=`${d}${n?" has-full-width-item":""}`;return s.html`<div class="${a}">${i.map((i=>i?s.html`${(0,e.renderAttribute)(t,i)}`:""))}</div>`})).flat()}},4139:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.getGrowthPhaseIcon=e.getTreatmentIcon=e.getTreatmentIconByIndex=e.getGrowthPhaseIconByIndex=e.tentAttributes=e.plantAttributes=e.missingImage=e.tentElementOptions=e.elementOptions=e.default_option_elements=e.default_show_elements=e.default_show_bars=e.PHASES=e.CARD_EDITOR_NAME=e.CARD_NAME=void 0,e.CARD_NAME="brokkoli-card",e.CARD_EDITOR_NAME="brokkoli-card-editor",e.PHASES=["seeds","germination","rooting","growing","flowering","harvested","removed"],e.default_show_bars=["moisture","conductivity","temperature","illuminance","humidity","dli","water_consumption","fertilizer_consumption","ppfd","power_consumption","ph","health"],e.default_show_elements=["header","attributes","options"],e.default_option_elements=["attributes","timeline","consumption","history","details"],e.elementOptions=[{label:"Header",value:"header"},{label:"Attribute Bars",value:"attributes"},{label:"Options Menu",value:"options"},{label:"Timeline",value:"timeline"},{label:"Consumption",value:"consumption"},{label:"History",value:"history"},{label:"Details",value:"details"}],e.tentElementOptions=[{label:"Header",value:"header"},{label:"Sensors",value:"sensors"},{label:"Maintenance",value:"maintenance"},{label:"Journal",value:"journal"}],e.missingImage="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiIGZvY3VzYWJsZT0iZmFsc2UiIHJvbGU9ImltZyIgYXJpYS1oaWRkZW49InRydWUiIHZpZXdCb3g9IjAgMCAyNCAyNCI+CiAgICAgIDxnPgogICAgICA8IS0tP2xpdCQ0MTM0MjMxNjkkLS0+PHBhdGggZD0iTTMsMTNBOSw5IDAgMCwwIDEyLDIyQzEyLDE3IDcuOTcsMTMgMywxM00xMiw1LjVBMi41LDIuNSAwIDAsMSAxNC41LDhBMi41LDIuNSAwIDAsMSAxMiwxMC41QTIuNSwyLjUgMCAwLDEgOS41LDhBMi41LDIuNSAwIDAsMSAxMiw1LjVNNS42LDEwLjI1QTIuNSwyLjUgMCAwLDAgOC4xLDEyLjc1QzguNjMsMTIuNzUgOS4xMiwxMi41OCA5LjUsMTIuMzFDOS41LDEyLjM3IDkuNSwxMi40MyA5LjUsMTIuNUEyLjUsMi41IDAgMCwwIDEyLDE1QTIuNSwyLjUgMCAwLDAgMTQuNSwxMi41QzE0LjUsMTIuNDMgMTQuNSwxMi4zNyAxNC41LDEyLjMxQzE0Ljg4LDEyLjU4IDE1LjM3LDEyLjc1IDE1LjksMTIuNzVDMTcuMjgsMTIuNzUgMTguNCwxMS42MyAxOC40LDEwLjI1QzE4LjQsOS4yNSAxNy44MSw4LjQgMTYuOTcsOEMxNy44MSw3LjYgMTguNCw2Ljc0IDE4LjQsNS43NUMxOC40LDQuMzcgMTcuMjgsMy4yNSAxNS45LDMuMjVDMTUuMzcsMy4yNSAxNC44OCwzLjQxIDE0LjUsMy42OUMxNC41LDMuNjMgMTQuNSwzLjU2IDE0LjUsMy41QTIuNSwyLjUgMCAwLDAgMTIsMUEyLjUsMi41IDAgMCwwIDkuNSwzLjVDOS41LDMuNTYgOS41LDMuNjMgOS41LDMuNjlDOS4xMiwzLjQxIDguNjMsMy4yNSA4LjEsMy4yNUEyLjUsMi41IDAgMCwwIDUuNiw1Ljc1QzUuNiw2Ljc0IDYuMTksNy42IDcuMDMsOEM2LjE5LDguNCA1LjYsOS4yNSA1LjYsMTAuMjVNMTIsMjJBOSw5IDAgMCwwIDIxLDEzQzE2LDEzIDEyLDE3IDEyLDIyWiI+PC9wYXRoPgogICAgICA8L2c+Cjwvc3ZnPgo=",e.plantAttributes=[{label:"Moisture",value:"moisture"},{label:"Conductivity",value:"conductivity"},{label:"Temperature",value:"temperature"},{label:"Illuminance",value:"illuminance"},{label:"Humidity",value:"humidity"},{label:"Daily Light Integral",value:"dli"},{label:"Water Consumption",value:"water_consumption"},{label:"Fertilizer Consumption",value:"fertilizer_consumption"},{label:"PPFD",value:"ppfd"},{label:"Power Consumption",value:"power_consumption"},{label:"pH",value:"ph"},{label:"Health",value:"health"}],e.tentAttributes=[{label:"Illuminance",value:"illuminance"},{label:"Humidity",value:"humidity"},{label:"CO2",value:"co2"},{label:"Power Consumption",value:"power_consumption"},{label:"pH",value:"ph"}];const i=["mdi:seed","mdi:seed-outline","mdi:sprout","mdi:leaf","mdi:flower","mdi:delete","mdi:content-cut"],n=["mdi:help-circle","mdi:content-cut","mdi:arrow-down-bold-circle","mdi:arrow-up-bold-circle","mdi:candy","mdi:scissors-cutting","mdi:leaf","mdi:spray","mdi:water"];e.getGrowthPhaseIconByIndex=t=>t>=0&&t<i.length?i[t]:"mdi:help-circle",e.getTreatmentIconByIndex=t=>t>=0&&t<n.length?n[t]:"mdi:help-circle",e.getTreatmentIcon=(t,i,n)=>{var s,a;if(i&&(null===(s=null==n?void 0:n.attributes)||void 0===s?void 0:s._sensorMap)&&"object"==typeof n.attributes._sensorMap){const s=n.attributes._sensorMap.treatment;if(s){const n=i.states[s];if((null===(a=null==n?void 0:n.attributes)||void 0===a?void 0:a.options)&&Array.isArray(n.attributes.options)){const i=n.attributes.options.findIndex((e=>e===t));if(-1!==i)return(0,e.getTreatmentIconByIndex)(i)}}}switch(t.toLowerCase()){case"":case"none":case"keine":default:return"mdi:help-circle";case"cut":case"schneiden":return"mdi:content-cut";case"super cropping":return"mdi:arrow-down-bold-circle";case"topping":return"mdi:arrow-up-bold-circle";case"lollipop":return"mdi:candy";case"fim":return"mdi:scissors-cutting";case"rib":return"mdi:leaf";case"spray pest":case"spray water":return t.includes("pest")?"mdi:spray":"mdi:water"}},e.getGrowthPhaseIcon=(t,i,n)=>{var s,a;if(i&&(null===(s=null==n?void 0:n.attributes)||void 0===s?void 0:s._sensorMap)&&"object"==typeof n.attributes._sensorMap){const s=n.attributes._sensorMap.growth_phase;if(s){const n=i.states[s];if((null===(a=null==n?void 0:n.attributes)||void 0===a?void 0:a.options)&&Array.isArray(n.attributes.options)){const i=n.attributes.options.findIndex((e=>e===t));if(-1!==i)return(0,e.getGrowthPhaseIconByIndex)(i)}}}switch(t.toLowerCase()){case"seeds":case"samen":return"mdi:seed";case"germination":case"keimen":return"mdi:seed-outline";case"rooting":case"wurzeln":return"mdi:sprout";case"growing":case"wachstum":return"mdi:leaf";case"flower":case"blüte":return"mdi:flower";case"harvested":case"geerntet":return"mdi:content-cut";case"removed":case"entfernt":return"mdi:delete";default:return"mdi:help-circle"}}},8063:function(t,e){var i=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.PlantEntityUtils=void 0;class n{static getPlantInfo(t,e){return i(this,void 0,void 0,(function*(){return e.startsWith("tent.")?(console.debug(`[PLANT-ENTITY] Skipping tent entity: ${e}`),null):this._plantInfoCache[e]?this._plantInfoCache[e]:this._loadPlantInfoWithRetry(t,e)}))}static _loadPlantInfoWithRetry(t,e){return i(this,void 0,void 0,(function*(){try{this._plantLastLoaded[e]=Date.now();const i=yield t.callWS({type:"plant/get_info",entity_id:e}),n="object"==typeof i&&null!==i&&"result"in i?i.result:null;return console.debug(`[PLANT-ENTITY] API response for ${e}:`,n),n&&(this._plantInfoCache[e]=n),this._scheduleNextUpdate(t,e),n}catch(i){return console.error(`[PLANT-ENTITY] Error in API call for ${e}:`,i),this._scheduleNextUpdate(t,e,!0),null}}))}static _scheduleNextUpdate(t,e,i=!1){this._plantRetryTimeouts[e]&&(window.clearTimeout(this._plantRetryTimeouts[e]),delete this._plantRetryTimeouts[e]),this._plantRetryTimeouts[e]=window.setTimeout((()=>{delete this._plantRetryTimeouts[e],this._loadPlantInfoWithRetry(t,e)}),i?1e4:5e3)}static initPlantDataLoading(t,e){t&&0!==e.length&&(this.clearAllTimeouts(),e.forEach((e=>{if(e.startsWith("tent."))return;if(this._plantInfoCache[e])return void(this._plantRetryTimeouts[e]||this._scheduleNextUpdate(t,e));const i=500+2e3*Math.random();this._plantRetryTimeouts[e]=window.setTimeout((()=>{delete this._plantRetryTimeouts[e],this._loadPlantInfoWithRetry(t,e)}),i)})))}static clearAllTimeouts(){Object.values(this._plantRetryTimeouts).forEach((t=>{window.clearTimeout(t)})),this._plantRetryTimeouts={}}static getPlantEntities(t,e="all"){return Object.values(t.states).filter((t=>{if("object"!=typeof t||null===t||!("entity_id"in t)||!("attributes"in t)||"string"!=typeof t.entity_id)return!1;const i=t.entity_id.startsWith("plant."),n=t.entity_id.startsWith("cycle.")&&"member_count"in t.attributes,s=t.entity_id.startsWith("tent.");return"plant"===e?i:"cycle"===e?n:"tent"===e?s:i||n||s}))}static updatePlantInfo(t,e,n){return i(this,void 0,void 0,(function*(){const i=new Map(n),s=e.map((t=>t.entity_id));this.initPlantDataLoading(t,s);for(const t of e){const e=this._plantInfoCache[t.entity_id];e?i.set(t.entity_id,e):i.has(t.entity_id)||i.set(t.entity_id,null)}return i}))}static togglePlantSelection(t,e,i){null==i||i.stopPropagation();const n=new Set(e);return n.has(t)?n.delete(t):n.add(t),n}static clearPlantSelection(){return new Set}}e.PlantEntityUtils=n,n._plantInfoCache={},n._plantRetryTimeouts={},n._plantLastLoaded={}},2413:function(t,e){var i=this&&this.__awaiter||function(t,e,i,n){return new(i||(i=Promise))((function(s,a){function o(t){try{l(n.next(t))}catch(t){a(t)}}function r(t){try{l(n.throw(t))}catch(t){a(t)}}function l(t){var e;t.done?s(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,r)}l((n=n.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.TranslationUtils=void 0;class n{static getLanguage(t){return t.language||"en"}static getCardBaseUrl(){const t=document.getElementsByTagName("script");for(let e=0;e<t.length;e++){const i=t[e].src;if(i&&(i.includes("brokkoli-card.js")||i.includes("brokkoli-list-card.js")||i.includes("brokkoli-area-card.js")))return i.substring(0,i.lastIndexOf("/"))}return"/local/brokkoli-card"}static loadTranslationFile(t){return i(this,void 0,void 0,(function*(){try{const e=`${this.getCardBaseUrl()}/translations/${t}.json`,i=yield fetch(e);if(!i.ok)throw new Error(`Failed to load translation file: ${i.status}`);return yield i.json()}catch(e){return console.warn(`Failed to load translations for language ${t}, falling back to English`,e),"en"!==t?this.loadTranslationFile("en"):{}}}))}static loadTranslations(t){return i(this,void 0,void 0,(function*(){if(this.translationCache.has(t))return this.translationCache.get(t);if(this.loadingPromises.has(t))return this.loadingPromises.get(t);const e=this.loadTranslationFile(t);this.loadingPromises.set(t,e);try{const i=yield e;return this.translationCache.set(t,i),this.loadingPromises.delete(t),i}catch(e){throw this.loadingPromises.delete(t),e}}))}static getTranslation(t,e){const i=this.getLanguage(t);return this.translationCache.has(i)?this.getTranslationFromObject(this.translationCache.get(i),e):(this.isInitialized||this.loadTranslations(i).catch((t=>{console.warn("Failed to load translations:",t)})),e)}static getTranslationFromObject(t,e){try{const i=e.split(".");let n=t;for(const t of i){if(!n||"object"!=typeof n||!(t in n))return e;n=n[t]}return"string"==typeof n?n:e}catch(t){return console.warn("Translation not found:",e,t),e}}static initializeTranslations(t){return i(this,void 0,void 0,(function*(){const e=this.getLanguage(t);try{yield this.loadTranslations(e),this.isInitialized=!0}catch(t){console.warn("Failed to initialize translations:",t),this.isInitialized=!0}}))}static translateField(t,e){return this.getTranslation(t,`frontend.fields.${e}`)}static translateSensor(t,e){return this.getTranslation(t,`frontend.sensors.${e}`)}static translateGrowthPhase(t,e){return this.getTranslation(t,`frontend.growth_phases.${e}`)}static translateTreatment(t,e){return this.getTranslation(t,`frontend.treatments.${e}`)}static translateGraph(t,e){return this.getTranslation(t,`frontend.graph.${e}`)}static translateDiagnostics(t,e){return this.getTranslation(t,`frontend.diagnostics.${e}`)}static translateUI(t,e){return this.getTranslation(t,`frontend.ui.${e}`)}static translateListCard(t,e){return this.getTranslation(t,`frontend.list_card.${e}`)}static translateHistory(t,e){return this.getTranslation(t,`frontend.history.${e}`)}static translate(t,e){return this.getTranslation(t,e)}static translateHelper(t,e){return this.getTranslation(t,`frontend.helpers.${e}`)}static createSensorTooltip(t,e,i,n,s,a){const o=this.translateSensor(t,e),r=this.translateUI(t,"tooltip_min_max");return a?`${o}: ${i} ${a}<br>(${r}: ${n} ~ ${s} ${a})`:`${o}: ${i}<br>(${r}: ${n} ~ ${s})`}}e.TranslationUtils=n,n.translationCache=new Map,n.loadingPromises=new Map,n.isInitialized=!1},2135:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.moreInfo=e.getStubConfig=e.getConfigElement=void 0;const n=i(4356),s=i(4139);e.getConfigElement=()=>document.createElement("brokkoli-card-editor"),e.getStubConfig=t=>{const e=t=>{if("object"==typeof t&&"entity_id"in t&&"string"==typeof t.entity_id&&0===t.entity_id.indexOf("plant."))return!!t};let i=[];try{i=Object.values(t.states).filter(e)}catch(t){console.info(`Unable to get ha-data: ${t}`)}return{entity:i.length>0?i[0].entity_id:"plant.my_plant",battery_sensor:"sensor.myflower_battery",show_bars:s.default_show_bars}},e.moreInfo=(t,e)=>{(0,n.fireEvent)(t,"hass-more-info",{entityId:e},{bubbles:!1,composed:!0})}},2823:(t,e,i)=>{i.r(e),i.d(e,{CSSResult:()=>r,LitElement:()=>gt,ReactiveElement:()=>I,_$LE:()=>vt,_$LH:()=>ut,adoptStyles:()=>c,css:()=>d,defaultConverter:()=>$,getCompatibleStyle:()=>h,html:()=>Y,isServer:()=>_t,mathml:()=>J,noChange:()=>Z,notEqual:()=>k,nothing:()=>K,render:()=>mt,supportsAdoptingStyleSheets:()=>s,svg:()=>X,unsafeCSS:()=>l});const n=globalThis,s=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const l=t=>new r("string"==typeof t?t:t+"",void 0,a),d=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new r(i,t,a)},c=(t,e)=>{if(s)t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const i of e){const e=document.createElement("style"),s=n.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return l(e)})(t):t,{is:u,defineProperty:p,getOwnPropertyDescriptor:m,getOwnPropertyNames:g,getOwnPropertySymbols:f,getPrototypeOf:v}=Object,_=globalThis,y=_.trustedTypes,b=y?y.emptyScript:"",w=_.reactiveElementPolyfillSupport,x=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},k=(t,e)=>!u(t,e),T={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;class I extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=T){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),n=this.getPropertyDescriptor(t,i,e);void 0!==n&&p(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){const{get:n,set:s}=m(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return n?.call(this)},set(e){const a=n?.call(this);s.call(this,e),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??T}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;const t=v(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){const t=this.properties,e=[...g(t),...f(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return c(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),n=this.constructor._$Eu(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,n=i._$Eh.get(t);if(void 0!==n&&this._$Em!==n){const t=i.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=n,this[n]=s.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??k)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}I.elementStyles=[],I.shadowRootOptions={mode:"open"},I[x("elementProperties")]=new Map,I[x("finalized")]=new Map,w?.({ReactiveElement:I}),(_.reactiveElementVersions??=[]).push("2.0.4");const E=globalThis,S=E.trustedTypes,D=S?S.createPolicy("lit-html",{createHTML:t=>t}):void 0,A="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+P,O=`<${C}>`,U=document,M=()=>U.createComment(""),j=t=>null===t||"object"!=typeof t&&"function"!=typeof t,F=Array.isArray,L=t=>F(t)||"function"==typeof t?.[Symbol.iterator],N="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,H=/>/g,G=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,B=/"/g,W=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),Y=q(1),X=q(2),J=q(3),Z=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),Q=new WeakMap,tt=U.createTreeWalker(U,129);function et(t,e){if(!F(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==D?D.createHTML(e):e}const it=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":3===e?"<math>":"",o=R;for(let e=0;e<i;e++){const i=t[e];let r,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===R?"!--"===l[1]?o=z:void 0!==l[1]?o=H:void 0!==l[2]?(W.test(l[2])&&(s=RegExp("</"+l[2],"g")),o=G):void 0!==l[3]&&(o=G):o===G?">"===l[0]?(o=s??R,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,r=l[1],o=void 0===l[3]?G:'"'===l[3]?B:V):o===B||o===V?o=G:o===z||o===H?o=R:(o=G,s=void 0);const h=o===G&&t[e+1].startsWith("/>")?" ":"";a+=o===R?i+O:d>=0?(n.push(r),i.slice(0,d)+A+i.slice(d)+P+h):i+P+(-2===d?e:h)}return[et(t,a+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),n]};class nt{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,a=0;const o=t.length-1,r=this.parts,[l,d]=it(t,e);if(this.el=nt.createElement(l,i),tt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(n=tt.nextNode())&&r.length<o;){if(1===n.nodeType){if(n.hasAttributes())for(const t of n.getAttributeNames())if(t.endsWith(A)){const e=d[a++],i=n.getAttribute(t).split(P),o=/([.?@])?(.*)/.exec(e);r.push({type:1,index:s,name:o[2],strings:i,ctor:"."===o[1]?lt:"?"===o[1]?dt:"@"===o[1]?ct:rt}),n.removeAttribute(t)}else t.startsWith(P)&&(r.push({type:6,index:s}),n.removeAttribute(t));if(W.test(n.tagName)){const t=n.textContent.split(P),e=t.length-1;if(e>0){n.textContent=S?S.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],M()),tt.nextNode(),r.push({type:2,index:++s});n.append(t[e],M())}}}else if(8===n.nodeType)if(n.data===C)r.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(P,t+1));)r.push({type:7,index:s}),t+=P.length-1}s++}}static createElement(t,e){const i=U.createElement("template");return i.innerHTML=t,i}}function st(t,e,i=t,n){if(e===Z)return e;let s=void 0!==n?i._$Co?.[n]:i._$Cl;const a=j(e)?void 0:e._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(t),s._$AT(t,i,n)),void 0!==n?(i._$Co??=[])[n]=s:i._$Cl=s),void 0!==s&&(e=st(t,s._$AS(t,e.values),s,n)),e}class at{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,n=(t?.creationScope??U).importNode(e,!0);tt.currentNode=n;let s=tt.nextNode(),a=0,o=0,r=i[0];for(;void 0!==r;){if(a===r.index){let e;2===r.type?e=new ot(s,s.nextSibling,this,t):1===r.type?e=new r.ctor(s,r.name,r.strings,this,t):6===r.type&&(e=new ht(s,this,t)),this._$AV.push(e),r=i[++o]}a!==r?.index&&(s=tt.nextNode(),a++)}return tt.currentNode=U,n}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class ot{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,n){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=st(this,t,e),j(t)?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==Z&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):L(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&j(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=nt.createElement(et(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(e);else{const t=new at(n,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new nt(t)),e}k(t){F(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new ot(this.O(M()),this.O(M()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class rt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,n,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=st(this,t,e,0),a=!j(t)||t!==this._$AH&&t!==Z,a&&(this._$AH=t);else{const n=t;let o,r;for(t=s[0],o=0;o<s.length-1;o++)r=st(this,n[i+o],e,o),r===Z&&(r=this._$AH[o]),a||=!j(r)||r!==this._$AH[o],r===K?t=K:t!==K&&(t+=(r??"")+s[o+1]),this._$AH[o]=r}a&&!n&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class lt extends rt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class dt extends rt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class ct extends rt{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){if((t=st(this,t,e,0)??K)===Z)return;const i=this._$AH,n=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||n);n&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ht{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){st(this,t)}}const ut={M:A,P,A:C,C:1,L:it,R:at,D:L,V:st,I:ot,H:rt,N:dt,U:ct,B:lt,F:ht},pt=E.litHtmlPolyfillSupport;pt?.(nt,ot),(E.litHtmlVersions??=[]).push("3.2.1");const mt=(t,e,i)=>{const n=i?.renderBefore??e;let s=n._$litPart$;if(void 0===s){const t=i?.renderBefore??null;n._$litPart$=s=new ot(e.insertBefore(M(),t),t,void 0,i??{})}return s._$AI(t),s};class gt extends I{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=mt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Z}}gt._$litElement$=!0,gt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:gt});const ft=globalThis.litElementPolyfillSupport;ft?.({LitElement:gt});const vt={_$AK:(t,e,i)=>{t._$AK(e,i)},_$AL:t=>t._$AL};(globalThis.litElementVersions??=[]).push("4.1.1");const _t=!1},6752:(t,e,i)=>{var n;i.d(e,{JW:()=>I,XX:()=>B,c0:()=>E,ge:()=>G,qy:()=>T,s6:()=>S});const s=window,a=s.trustedTypes,o=a?a.createPolicy("lit-html",{createHTML:t=>t}):void 0,r="$lit$",l=`lit$${(Math.random()+"").slice(9)}$`,d="?"+l,c=`<${d}>`,h=document,u=()=>h.createComment(""),p=t=>null===t||"object"!=typeof t&&"function"!=typeof t,m=Array.isArray,g=t=>m(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,y=/>/g,b=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),w=/'/g,x=/"/g,$=/^(?:script|style|textarea|title)$/i,k=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),T=k(1),I=k(2),E=Symbol.for("lit-noChange"),S=Symbol.for("lit-nothing"),D=new WeakMap,A=h.createTreeWalker(h,129,null,!1);function P(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==o?o.createHTML(e):e}const C=(t,e)=>{const i=t.length-1,n=[];let s,a=2===e?"<svg>":"",o=v;for(let e=0;e<i;e++){const i=t[e];let d,h,u=-1,p=0;for(;p<i.length&&(o.lastIndex=p,h=o.exec(i),null!==h);)p=o.lastIndex,o===v?"!--"===h[1]?o=_:void 0!==h[1]?o=y:void 0!==h[2]?($.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=b):void 0!==h[3]&&(o=b):o===b?">"===h[0]?(o=null!=s?s:v,u=-1):void 0===h[1]?u=-2:(u=o.lastIndex-h[2].length,d=h[1],o=void 0===h[3]?b:'"'===h[3]?x:w):o===x||o===w?o=b:o===_||o===y?o=v:(o=b,s=void 0);const m=o===b&&t[e+1].startsWith("/>")?" ":"";a+=o===v?i+c:u>=0?(n.push(d),i.slice(0,u)+r+i.slice(u)+l+m):i+l+(-2===u?(n.push(void 0),e):m)}return[P(t,a+(t[i]||"<?>")+(2===e?"</svg>":"")),n]};class O{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let s=0,o=0;const c=t.length-1,h=this.parts,[p,m]=C(t,e);if(this.el=O.createElement(p,i),A.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=A.nextNode())&&h.length<c;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(r)||e.startsWith(l)){const i=m[o++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+r).split(l),e=/([.?@])?(.*)/.exec(i);h.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?L:"?"===e[1]?R:"@"===e[1]?z:F})}else h.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if($.test(n.tagName)){const t=n.textContent.split(l),e=t.length-1;if(e>0){n.textContent=a?a.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],u()),A.nextNode(),h.push({type:2,index:++s});n.append(t[e],u())}}}else if(8===n.nodeType)if(n.data===d)h.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(l,t+1));)h.push({type:7,index:s}),t+=l.length-1}s++}}static createElement(t,e){const i=h.createElement("template");return i.innerHTML=t,i}}function U(t,e,i=t,n){var s,a,o,r;if(e===E)return e;let l=void 0!==n?null===(s=i._$Co)||void 0===s?void 0:s[n]:i._$Cl;const d=p(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(a=null==l?void 0:l._$AO)||void 0===a||a.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,n)),void 0!==n?(null!==(o=(r=i)._$Co)&&void 0!==o?o:r._$Co=[])[n]=l:i._$Cl=l),void 0!==l&&(e=U(t,l._$AS(t,e.values),l,n)),e}class M{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:n}=this._$AD,s=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:h).importNode(i,!0);A.currentNode=s;let a=A.nextNode(),o=0,r=0,l=n[0];for(;void 0!==l;){if(o===l.index){let e;2===l.type?e=new j(a,a.nextSibling,this,t):1===l.type?e=new l.ctor(a,l.name,l.strings,this,t):6===l.type&&(e=new H(a,this,t)),this._$AV.push(e),l=n[++r]}o!==(null==l?void 0:l.index)&&(a=A.nextNode(),o++)}return A.currentNode=h,s}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class j{constructor(t,e,i,n){var s;this.type=2,this._$AH=S,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cp=null===(s=null==n?void 0:n.isConnected)||void 0===s||s}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=U(this,t,e),p(t)?t===S||null==t||""===t?(this._$AH!==S&&this._$AR(),this._$AH=S):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):g(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==S&&p(this._$AH)?this._$AA.nextSibling.data=t:this.$(h.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:n}=t,s="number"==typeof n?this._$AC(t):(void 0===n.el&&(n.el=O.createElement(P(n.h,n.h[0]),this.options)),n);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===s)this._$AH.v(i);else{const t=new M(s,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=D.get(t.strings);return void 0===e&&D.set(t.strings,e=new O(t)),e}T(t){m(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,n=0;for(const s of t)n===e.length?e.push(i=new j(this.k(u()),this.k(u()),this,this.options)):i=e[n],i._$AI(s),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class F{constructor(t,e,i,n,s){this.type=1,this._$AH=S,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=S}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){const s=this.strings;let a=!1;if(void 0===s)t=U(this,t,e,0),a=!p(t)||t!==this._$AH&&t!==E,a&&(this._$AH=t);else{const n=t;let o,r;for(t=s[0],o=0;o<s.length-1;o++)r=U(this,n[i+o],e,o),r===E&&(r=this._$AH[o]),a||(a=!p(r)||r!==this._$AH[o]),r===S?t=S:t!==S&&(t+=(null!=r?r:"")+s[o+1]),this._$AH[o]=r}a&&!n&&this.j(t)}j(t){t===S?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class L extends F{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===S?void 0:t}}const N=a?a.emptyScript:"";class R extends F{constructor(){super(...arguments),this.type=4}j(t){t&&t!==S?this.element.setAttribute(this.name,N):this.element.removeAttribute(this.name)}}class z extends F{constructor(t,e,i,n,s){super(t,e,i,n,s),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=U(this,t,e,0))&&void 0!==i?i:S)===E)return;const n=this._$AH,s=t===S&&n!==S||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,a=t!==S&&(n===S||s);s&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class H{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}}const G={O:r,P:l,A:d,C:1,M:C,L:M,R:g,D:U,I:j,V:F,H:R,N:z,U:L,F:H},V=s.litHtmlPolyfillSupport;null==V||V(O,j),(null!==(n=s.litHtmlVersions)&&void 0!==n?n:s.litHtmlVersions=[]).push("2.8.0");const B=(t,e,i)=>{var n,s;const a=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:e;let o=a._$litPart$;if(void 0===o){const t=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;a._$litPart$=o=new j(e.insertBefore(u(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o}},2924:(t,e,i)=>{i.r(e),i.d(e,{customElement:()=>n,eventOptions:()=>d,property:()=>o,query:()=>c,queryAll:()=>h,queryAssignedElements:()=>g,queryAssignedNodes:()=>f,queryAsync:()=>u,state:()=>r});const n=t=>e=>"function"==typeof e?((t,e)=>(customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:n}=e;return{kind:i,elements:n,finisher(e){customElements.define(t,e)}}})(t,e),s=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}},a=(t,e,i)=>{e.constructor.createProperty(i,t)};function o(t){return(e,i)=>void 0!==i?a(t,e,i):s(t,e)}function r(t){return o({...t,state:!0})}const l=({finisher:t,descriptor:e})=>(i,n)=>{var s;if(void 0===n){const n=null!==(s=i.originalKey)&&void 0!==s?s:i.key,a=null!=e?{kind:"method",placement:"prototype",key:n,descriptor:e(i.key)}:{...i,key:n};return null!=t&&(a.finisher=function(e){t(e,n)}),a}{const s=i.constructor;void 0!==e&&Object.defineProperty(i,n,e(n)),null==t||t(s,n)}};function d(t){return l({finisher:(e,i)=>{Object.assign(e.prototype[i],t)}})}function c(t,e){return l({descriptor:i=>{const n={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof i?Symbol():"__"+i;n.get=function(){var i,n;return void 0===this[e]&&(this[e]=null!==(n=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(t))&&void 0!==n?n:null),this[e]}}return n}})}function h(t){return l({descriptor:e=>({get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelectorAll(t))&&void 0!==i?i:[]},enumerable:!0,configurable:!0})})}function u(t){return l({descriptor:e=>({async get(){var e;return await this.updateComplete,null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t)},enumerable:!0,configurable:!0})})}var p;const m=null!=(null===(p=window.HTMLSlotElement)||void 0===p?void 0:p.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function g(t){const{slot:e,selector:i}=null!=t?t:{};return l({descriptor:n=>({get(){var n;const s="slot"+(e?`[name=${e}]`:":not([name])"),a=null===(n=this.renderRoot)||void 0===n?void 0:n.querySelector(s),o=null!=a?m(a,t):[];return i?o.filter((t=>t.matches(i))):o},enumerable:!0,configurable:!0})})}function f(t,e,i){let n,s=t;return"object"==typeof t?(s=t.slot,n=t):n={flatten:e},i?g({slot:s,flatten:e,selector:i}):l({descriptor:t=>({get(){var t,e;const i="slot"+(s?`[name=${s}]`:":not([name])"),a=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(i);return null!==(e=null==a?void 0:a.assignedNodes(n))&&void 0!==e?e:[]},enumerable:!0,configurable:!0})})}},3534:(t,e,i)=>{i.r(e),i.d(e,{UnsafeHTMLDirective:()=>a,unsafeHTML:()=>o});var n=i(6752);class s{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}class a extends s{constructor(t){if(super(t),this.et=n.s6,2!==t.type)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===n.s6||null==t)return this.ft=void 0,this.et=t;if(t===n.c0)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}a.directiveName="unsafeHTML",a.resultType=1;const o=(r=a,(...t)=>({_$litDirective$:r,values:t}));var r},4437:(t,e,i)=>{i.r(e),i.d(e,{CSSResult:()=>r,LitElement:()=>I,ReactiveElement:()=>w,UpdatingElement:()=>T,_$LE:()=>S,_$LH:()=>k.ge,adoptStyles:()=>c,css:()=>d,defaultConverter:()=>v,getCompatibleStyle:()=>h,html:()=>k.qy,isServer:()=>D,noChange:()=>k.c0,notEqual:()=>_,nothing:()=>k.s6,render:()=>k.XX,supportsAdoptingStyleSheets:()=>s,svg:()=>k.JW,unsafeCSS:()=>l});const n=window,s=n.ShadowRoot&&(void 0===n.ShadyCSS||n.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),o=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}}const l=t=>new r("string"==typeof t?t:t+"",void 0,a),d=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[n+1]),t[0]);return new r(i,t,a)},c=(t,e)=>{s?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=n.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))},h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return l(e)})(t):t;var u;const p=window,m=p.trustedTypes,g=m?m.emptyScript:"",f=p.reactiveElementPolyfillSupport,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>e!==t&&(e==e||t==t),y={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:_},b="finalized";class w extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const n=this._$Ep(i,e);void 0!==n&&(this._$Ev.set(n,i),t.push(n))})),t}static createProperty(t,e=y){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);void 0!==n&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){const s=this[t];this[e]=n,this.requestUpdate(t,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||y}static finalize(){if(this.hasOwnProperty(b))return!1;this[b]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(h(t))}else void 0!==t&&e.push(h(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return c(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=y){var n;const s=this.constructor._$Ep(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==(null===(n=i.converter)||void 0===n?void 0:n.toAttribute)?i.converter:v).toAttribute(e,i.type);this._$El=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$El=null}}_$AK(t,e){var i;const n=this.constructor,s=n._$Ev.get(t);if(void 0!==s&&this._$El!==s){const t=n.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:v;this._$El=s,this[s]=a.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let n=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}w[b]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},null==f||f({ReactiveElement:w}),(null!==(u=p.reactiveElementVersions)&&void 0!==u?u:p.reactiveElementVersions=[]).push("1.6.3");var x,$,k=i(6752);const T=w;class I extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,k.XX)(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return k.c0}}I.finalized=!0,I._$litElement$=!0,null===(x=globalThis.litElementHydrateSupport)||void 0===x||x.call(globalThis,{LitElement:I});const E=globalThis.litElementPolyfillSupport;null==E||E({LitElement:I});const S={_$AK:(t,e,i)=>{t._$AK(e,i)},_$AL:t=>t._$AL};(null!==($=globalThis.litElementVersions)&&void 0!==$?$:globalThis.litElementVersions=[]).push("3.3.3");const D=!1},8330:t=>{t.exports=JSON.parse('{"name":"brokkoli-card","version":"3.0.2","description":"A Lovelace brokkoli card for Home Assistant","main":"brokkoli-card.js","repository":{"type":"git","url":"git+ssh://git@github.com/Olen/lovelace-brokkoli-card.git"},"author":"Ola Bjorling Erdal <ola@bjorling.se>","license":"MIT","scripts":{"build":"webpack -c webpack.config.js","lint":"eslint src/**/*.ts","watch":"webpack -c webpack.config.js --watch --mode=development"},"dependencies":{"@marcokreeft/ha-editor-formbuilder":"2024.9.1","@mdi/js":"^7.4.47","custom-card-helpers":"^1.9.0","flatpickr":"^4.6.13","home-assistant-js-websocket":"^9.4.0","lit":"^2.8.0","lit-element":"^2.5.1"},"devDependencies":{"@babel/core":"^7.26.0","@babel/preset-env":"^7.26.0","@babel/preset-typescript":"^7.26.0","@types/node":"^20.11.30","@typescript-eslint/eslint-plugin":"^8.19.1","apexcharts":"^4.4.0","babel-loader":"^9.1.3","compression-webpack-plugin":"^11.1.0","copy-webpack-plugin":"^13.0.0","css-loader":"^7.1.2","eslint":"^8.57.0","style-loader":"^4.0.0","ts-loader":"^9.5.2","typescript":"^5.7.3","webpack":"^5.97.1","webpack-cli":"^5.1.4"},"keywords":[],"bugs":{"url":"https://github.com/Olen/lovelace-brokkoli-card/issues"},"homepage":"https://github.com/Olen/lovelace-brokkoli-card#readme"}')}},e={};function i(n){var s=e[n];if(void 0!==s)return s.exports;var a=e[n]={exports:{}};return t[n].call(a.exports,a,a.exports,i),a.exports}i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(4828)})();