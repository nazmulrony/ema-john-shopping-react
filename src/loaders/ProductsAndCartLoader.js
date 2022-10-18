import { getStoredCart } from "../utilities/fakedb";


export const ProductsAndCartLoader = async () => {
    //get products
    const productData = await fetch('products.json')
    const products = await productData.json();

    //get the cart
    let initialCart = [];
    const storedCart = getStoredCart();
    for (const id in storedCart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
        }
        initialCart.push(addedProduct);
    }
    console.log(initialCart);
    return { products, initialCart };
};