                            // default value
const calculateTip = (total, tipPercent = .15) => total + (total * tipPercent)

module.exports = {
    calculateTip
}