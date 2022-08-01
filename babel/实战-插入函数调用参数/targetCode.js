console.log('filename:1,0')
console.log(1);

function func() {
  console.info('filename:3,2')
  console.info(2);
}

export default class Test {
  say() {
    console.debug('filename:7,4')
    console.debug(3);
  }

  render() {
    return <div>{[console.error('filename:10,17'), console.error(4)]}</div>;
  }

}