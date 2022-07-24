const debounce = (fn,wait)=>{
  let timeout = null;
  return ()=>{
    clearTimeout(timeout);
    timeout = setTimeout(()=>{
      fn()
    },wait)
  }
}

const throttle = (fn,wait)=>{
  let timeout = null;
  return ()=>{
    if(timeout){
      return;
    }
    setTimeout(()=>{
      fn();
      timeout = null;
    },wait)
  }
}