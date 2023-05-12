export const chunkArray = (array, size) => {
    const chunkedArr = [];
    let index = 0;
  
    while (array && array.length != 0 && index < array.length) {
      chunkedArr.push(array.slice(index, index + size));
      index += size;
    }
  
    return chunkedArr;
}