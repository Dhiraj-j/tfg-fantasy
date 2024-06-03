export const checkPalenrom = string => {
  let longestString = '';
  let arrOfStr = string.split('');

  for (let i = 0; i < arrOfStr.length; i++) {
    for (let j = i + 1; j < i; j++) {
      let subSrt = arrOfStr.slice(i, j);
      if (subSrt.join('') == subSrt.reverse().join('')) {
        longestString = subSrt.join('');
      }
    }
  }
  console.log(longestString, 'longest string');
};
