const partition = (left,right,arr)=>{
  const pivot = arr[left]
  while(left<right){
    while(left<right&&arr[right]>=pivot){
      right--;
    }
    arr[left] = arr[right]
    while(left<right&&arr[left]<=pivot){
      left++;
    }
    arr[right] = arr[left]
  }
  arr[left] = pivot;
  return left;
}

const quickSort = (left,right,arr)=>{
  if(left<right){
    const mid = partition(left,right,arr);
    quickSort(left,mid-1,arr)
    quickSort(mid+1,right,arr) 
  }
}

const arr = [4,2,1,5,6,7,3,9,0,12]
quickSort(0,arr.length-1,arr)

const binarySearch = (arr,target)=>{
  let left = 0,right=arr.length-1;
  while(left<=right){
    const mid = parseInt((left+right)/2)
    if(arr[mid]===target){
      return mid
    }else if(arr[mid]>target){
      right = mid-1
    }else{
      left = mid +1
    }
  }
  return -1
}

console.log(binarySearch(arr,9))