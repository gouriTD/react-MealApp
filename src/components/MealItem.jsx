import React,{useContext, useEffect, useRef, useState} from 'react'
import { MealContext } from '../store/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheck} from '@fortawesome/fontawesome-free-solid'

function MealItem({id,image, name, price, description,isFavourite}) {

    const ctx = useContext(MealContext)
    const [isConfirm,setIsConfirm] = useState(false)
    const timeRef = useRef()

    useEffect(()=>{
      if(!isConfirm){
        return
      }
      if(timeRef.current){
        timeRef.current = null
      }
      timeRef.current = setTimeout(()=>{
        timeRef.current = null;
        setIsConfirm(false)
      },500)
    },[isConfirm])

    const handleClick = ()=>{
        const item = {id,name,price,quantity:1}
        ctx.addCartItem(item)
        setIsConfirm(true)
    }

    const handleFavouriteClick = ()=>{
      ctx.toggleFavourites(id)
    }
    console.log(image)
  return (
    <div className='meal-item'>
            <FontAwesomeIcon className={`icon ${isFavourite ? 'favourite' : 'normal'}`} icon={faHeart} onClick={handleFavouriteClick}/>
            <img src={image} alt="meal image" />
            <h3>{name}</h3>
            <p className='meal-item-price'>{price}</p>
            <p className='meal-item-description'>{description}</p>
            <button className='button meal-item-actions' onClick={handleClick} disabled={isConfirm}>{isConfirm ? <span className='confirm'><FontAwesomeIcon icon={faCheck}/> Item added</span>:'Add to Cart'}</button>
            
        </div>
  )
}

export default MealItem