import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { ProductsProvider } from './context/products_context'
import { FilterProvider } from './context/filter_context'
import { CartProvider } from './context/cart_context'
import { UserProvider } from './context/user_context'
import { BrowserRouter as Router } from 'react-router-dom'

const root = createRoot(document.getElementById("root"));
root.render(
    <Router>
        <CartProvider>
            <UserProvider>
                <ProductsProvider>
                    <FilterProvider>
                        <App />
                    </FilterProvider>
                </ProductsProvider>
            </UserProvider>
        </CartProvider>
    </Router>
)
