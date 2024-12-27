

export function generateTicket(from, to, discount, price) {
  alert(`Ticket from ${from} to ${to} with a ${discount}% discount costs $${price}`);
}

export function updatePrice(from, to, discount, priceHTML) {
    let updatedPrice = 0;
    let discountPrice = 0;

    if(discount === 'student'){
        discountPrice = 0.2;
    } else if(discount === 'senior'){
        discountPrice = 0.3;
    } else if(discount === 'pwd'){
        discountPrice = 0.4;
    } else {
        discountPrice = 0;
    }

    if(from === to){
        updatedPrice = 0;
        alert('Route should not be the same');
    } else if(from === 'Cubao' && to === 'Bulakan' || from === 'Bulakan' && to === 'Cubao'){
        updatedPrice = 120 - (120 * discountPrice);
    } else if(from === 'Divisoria' && to === 'Santolan' || from === 'Santolan' && to === 'Divisoria'){
        updatedPrice = 105 - (105 * discountPrice);
    }
    
    priceHTML.innerHTML = updatedPrice.toFixed(2);
}