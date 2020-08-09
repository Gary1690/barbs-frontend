
import { createPopper } from '@popperjs/core';


let popperInstance  = null;




const createTooltip = (target,tooltip) =>{
  popperInstance = createPopper(target,tooltip, {
    placement: 'top',
    modifiers: [
     {
       name: 'offset',
       options: {
         offset: [0, 8],
       },
     },
   ],
 });
}

const destroyTooltip = ( ) => {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
}
const show = (target,tooltip) => {
  tooltip.setAttribute('data-show', '');
  createTooltip(target,tooltip);
}

const hide = (tooltip) => {
  tooltip.removeAttribute('data-show');
  destroyTooltip();
}

const InitTooltip = (target,tooltip )=>{
  target.addEventListener("click",()=> {
    debugger
    if (tooltip.hasAttribute("data-show")){
      hide(tooltip)
    }else{
      show(target,tooltip)
    }
  });
  target.addEventListener("blur", ()=> alert("hello"))
}


export default InitTooltip;