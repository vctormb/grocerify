import ProductCard from './ProductCard';
import ProductCardImage from './ProductCardImage';
import ProductCardBody from './ProductCardBody';
import ProductCardFooter from './ProductCardFooter';
import ProductCardContent from './ProductCardContent';
import ProductCardAddToCart from './ProductCardAddToCart';
import ProductCardCartFooter from './ProductCardCartFooter';

ProductCard.Content = ProductCardContent;
ProductCard.Image = ProductCardImage;
ProductCard.Body = ProductCardBody;
ProductCard.Footer = ProductCardFooter;

export { ProductCardAddToCart, ProductCardCartFooter };
export default ProductCard;
