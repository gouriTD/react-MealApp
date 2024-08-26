import classes from './CartItem.module.css'
import { MealContext } from '../store/store';
import { useContext } from 'react';

const CartItem = ({ id, title, quantity = 1, price, total = quantity * price }) => {

  const { addCartItem, removeCartItem } = useContext(MealContext)

  const handleItemAdd = () => {
    // dispatch(CartActions.addToCart({pid}))
    addCartItem({ id, title, quantity, price })
  }

  const handleItemRemove = () => {
    // dispatch(CartActions.removeFromCart({pid}))
    removeCartItem(id)
  }

  console.log(id, title, price, total, quantity)

  return (
    <li className={classes.item}>
      <div>
        <span className={classes.title}>{title}: </span>
        <span>{quantity} x ₹{price}</span>
      </div>


      <div className={classes.quantity}>
        <button onClick={handleItemRemove}>-</button>
        <p>{quantity}</p>

        <button onClick={handleItemAdd}>+</button>
      </div>


    </li>
  );
};

export default CartItem;
