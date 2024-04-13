

const roundTo = (val, to) => {
    const p = Math.pow(10, to)
    return Math.round(val * p)/p
}

export default roundTo
