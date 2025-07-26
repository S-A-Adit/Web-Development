/* Let's Do Merge Sort*/

/* Using Recursion*/
function mergeSortRec(arr){
    if (arr.length ===0) "Please provide a valid string"
    if(arr.length === 1) return arr;
    
    const mid = Math.floor(arr.length/2);
    const left = arr.slice(0,mid);
    const right = arr.slice(mid,arr.length);
   
    return mergeSortRec(mergeSortRec(left), mergeSortRec(right));
}

const merge = (leftArr, rightArr) =>{
    //To merge the both incoming arrays
    const result = [];

    let iL = 0;
    let iR = 0;

    while (iL < leftArr.length && iR<rightArr.length ){
        if(leftArr[iL]< rightArr[iR]){
           result.push[leftArr[iL]]
           iL ++;
        }else{
            result.push[rightArr[iR]]
            iR ++;
        }
    }

    while(iL < leftArr.length){
        result.push[leftArr[iL]]
    }
    while(iR < rightArr.length){
        result.push[rightArr[iR]]
    }

    return result;
}
console.log(mergeSortRec([]))
console.log(mergeSortRec([10, 7, 8, 9, 1, 5]));
console.log(mergeSortRec([30, 20, 10, 50, 22, 33, 55])); 