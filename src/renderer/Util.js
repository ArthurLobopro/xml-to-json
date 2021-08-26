function delay(time) {
    return new Promise(res => {
        setTimeout(() => {
            res(true)
        }, time);
    })
}

const copy = text => {
    navigator.clipboard.writeText(text)
    //.then(() => alert("Copiado para área de transferência!"))
}

export { delay, copy }