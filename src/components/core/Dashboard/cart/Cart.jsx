import { useSelector } from "react-redux"
import {RenderCartCourses} from "./RenderCartCourses"
import {RenderTotalAmount} from "./RenderTotalAmount"


export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)
  const { paymentLoading } = useSelector((state) => state.course)

  if (paymentLoading)
    return (
      <div className="cart-loader-container">
        <div className="cart-spinner"></div>
      </div>
    )

  return (
    <div className="cart-wrapper">
      <h1 className="cart-title">Cart</h1>
      <p className="cart-subtitle">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="cart-content">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="cart-empty">Your cart is empty</p>
      )}
    </div>
  )
}
