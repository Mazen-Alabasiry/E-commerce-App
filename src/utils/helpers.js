export const formatPrice = (value) => {
    let formattedValue = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value).slice(0, -3)

    return formattedValue
}


export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])
    if (type === 'colors') {
        unique = unique.flat()
    }

    return ['all', ...new Set(unique)]
}
