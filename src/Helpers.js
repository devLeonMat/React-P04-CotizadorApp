export function getDifferenceYear(year) {
    let diff = new Date().getFullYear() - year;
    return diff <= 0 ? 1 : diff;
}

export function fullPaymentForBrand(brand) {
    let increase;
    switch (brand) {
        case 'europeo':
            increase = 1.30;
            break;
        case 'americano':
            increase = 1.15;
            break;
        case 'asiatico':
            increase = 1.05;
            break;
        default:
            break;
    }
    return increase;
}

export function getPlan(plan) {
    return (plan === 'basico') ? 1.20 : 1.50;
}

export function capitalized(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);

}