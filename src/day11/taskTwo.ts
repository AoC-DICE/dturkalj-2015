function day11TaskTwo() {
    const oldPassword = "vzbxxyzz";
    let newPassword = incrementString(oldPassword);

    while (newPassword !== "zzzzzzzz" && !isValidPassword(newPassword)) {
        newPassword = incrementString(newPassword);
    }

    console.log(`New password: ${newPassword}`);

    function incrementString(password) {
        let arr = password.split('');
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] === 'z') {
                arr[i] = 'a';
            } else {
                arr[i] = String.fromCharCode(arr[i].charCodeAt(0) + 1);
                return arr.join('');
            }
        }
        return 'a' + arr.join('');
    }

    function isValidPassword(password) {
        if (/[iol]/.test(password)) return false;
        if (!/(abc|bcd|cde|def|efg|fgh|ghi|hij|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(password)) return false;
        const pairs = password.match(/([a-hj-np-z])\1/g);
        return !(pairs === null || pairs.length < 2);
    }
}

day11TaskTwo();