const sum = (n)=>{
  let res = 0;
  for(let i = 0;i<=n;i++){
    res += i
  }
  return String(res);
}

process.on('message',data=>{
  console.log(process.pid)
  process.send(sum(parseInt(data)))
})