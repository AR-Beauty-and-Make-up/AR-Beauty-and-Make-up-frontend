import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {CartProvider} from "../providers/cartProvider";
import CartShopping from "../components/cart/CartShopping";
import {ProductProvider} from "../providers/productProvider";
import Product from "../components/store/Product";
import CartItem from "../components/cart/CartItem";


function createFakeProduct(aQuantity) {
  return {
    product: {
      id: "4",
      category: "Cremas",
      photo: '',
      price: 1100.0,
      productName: "Crema para cara"
    },
    quantity: aQuantity
  }
}

function renderProduct(product) {
  render(<ProductProvider>
    <Product prod={product}/>
  </ProductProvider>)
}


function renderCartShopping(item) {
  return render(
    <CartProvider>
      <ProductProvider value={item}>
        <CartShopping>
          <CartItem item={item}
          />
        </CartShopping>

      </ProductProvider>
    </CartProvider>
  );
}
describe('Flujo de agregar y quitar poductos del carrito', () => {

  const fakeItem = createFakeProduct(0)

  it('Cart is empty at first', () => {
      const {getByTestId} = renderCartShopping()
      expect(getByTestId('Empty Cart')).toHaveTextContent('Aun no tienes compras')
    })

  it('Added a product in cart, has a product price and total price', () => {
      renderProduct(fakeItem.product);
      const addButton = screen.getByTestId(fakeItem.product.id + " add-button")

      userEvent.click(addButton)
      const {getByTestId} = renderCartShopping()

      expect(getByTestId(fakeItem.product.productName)).toHaveTextContent('Crema para cara')
      expect(getByTestId("total")).toHaveTextContent(fakeItem.product.price)
    })

  it('click on button + increments product quantity in 1, change total price but not change productPrice', () => {
    const total = fakeItem.product.price * 2
    const {getByTestId} = renderCartShopping(fakeItem)
    const plusButton = screen.getByTestId(fakeItem.product.id + "add-unit-button")

    userEvent.click(plusButton)

    expect(getByTestId(fakeItem.product.id + "product-price")).toHaveTextContent(fakeItem.product.price)
    expect(getByTestId(fakeItem.product.id + "subtotal")).toHaveTextContent(total.toString())
    expect(getByTestId(fakeItem.product.id + "quantity")).toHaveTextContent("2")
    expect(getByTestId("total")).toHaveTextContent(total.toString())
  })

  it('click on button - decrements product quantity in 1', () => {
    const {getByTestId} = renderCartShopping(fakeItem)
    const miniusButton = screen.getByTestId(fakeItem.product.id + "minus-unit-button")

    userEvent.click(miniusButton)

    expect(getByTestId(fakeItem.product.id + "quantity")).toHaveTextContent("1")
    expect(getByTestId("total")).toHaveTextContent(fakeItem.product.price)
  })

  it('click on button - decrements product quantity in 1 and the cart is empty again', () => {
    const {getByTestId} = renderCartShopping(fakeItem)
    const miniusButton = screen.getByTestId(fakeItem.product.id + "minus-unit-button")

    userEvent.click(miniusButton)

    expect(getByTestId('Empty Cart')).toHaveTextContent('Aun no tienes compras')
  })


})
