import React from 'react'

function CartItemList({ cartItemList }) {
  console.log("log >>")
  console.log(cartItemList)
  return (
    <div className='flex flex-row'>
      {
        cartItemList.map((item) => {
          return (
            <span>
              {item.attributes.products.data[0].attributes.name + 0}
            </span>
          )
        })
      }
    </div>
  )
}

export default CartItemList 