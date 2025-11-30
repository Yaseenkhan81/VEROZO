import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      className="text-gray-700 cursor-pointer product-card block group"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded-lg bg-gray-100">
        <img
          className="hover:scale-110 transition-transform duration-500 ease-in-out w-full h-full object-cover"
          src={image[0]}
          alt={name}
          loading="lazy"
        />
      </div>
      <p className="pt-3 pb-1 text-sm group-hover:text-black transition-colors">{name}</p>
      <p className="text-sm font-medium text-black">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
