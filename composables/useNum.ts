export default function () {
  const formatNumber = (number: number, scale = 2) => {
    try {
      return number.toFixed(scale).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    } catch (err) {
      return number
    }
  }
  const parseNumber = (str: string | number) => {
    if (str !== null && str !== undefined) {
      if (isNumber(str)) {
        return str
      } else {
        return str + ''.replace(/,/g, '')
      }
    } else {
      return str
    }
  }

  function isNumber(value: string | number): boolean {
    return value != null && value !== '' && !isNaN(Number(value.toString()))
  }

  return { formatNumber, parseNumber, isNumber }
}
