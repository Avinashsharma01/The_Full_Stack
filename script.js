let arr = [4, 2, 5, 1, 3]


let bubbleSort = (arr) => {
    let n = arr.length;
    let swap;
    for (let i = 0; i < n; i++) {
        swap = false
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                swap = true
            }
        }

        if (!swap) {
            return
        }
    }
}

bubbleSort(arr)

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}