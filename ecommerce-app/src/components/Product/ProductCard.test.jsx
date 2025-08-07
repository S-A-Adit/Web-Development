// components/Product/ProductCard.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '../../context/CartContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 19.99,
  image: 'test-image.jpg',
};

describe('ProductCard', () => {
  it('renders product information', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$19.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-image.jpg');
    expect(screen.getByText(formatPrice(19.99))).toBeInTheDocument();
  });

  it('handles quantity changes', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');
    const input = screen.getByRole('spinbutton');

    fireEvent.click(incrementButton);
    expect(input).toHaveValue(2);

    fireEvent.click(decrementButton);
    expect(input).toHaveValue(1);

    fireEvent.change(input, { target: { value: '5' } });
    expect(input).toHaveValue(5);
  });
});