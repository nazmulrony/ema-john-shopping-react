import { getStoredCart } from "../utilities/fakedb";


export const ProductsAndCartLoader = async () => {
    //get products
    const productData = await fetch('http://localhost:5000/products')
    const { products } = await productData.json();

    //get the cart
    let initialCart = [];
    const storedCart = getStoredCart();
    for (const id in storedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
        }
        initialCart.push(addedProduct);
    }
    console.log(initialCart);
    return { products, initialCart };
};