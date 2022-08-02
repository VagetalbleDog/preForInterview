function shuffle(arr = []) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let rIndex = Math.floor(Math.random() * i);
        let t = arr[i];
        arr[i] = arr[rIndex];
        arr[rIndex] = t;
    }
}
let arr = [1, 2, 3, 4, 5, 6, 7];
shuffle(arr);
console.log(arr);
