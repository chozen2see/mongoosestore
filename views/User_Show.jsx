const React = require('react');
const AppLayout = require('./AppLayout');

class User_Show extends React.Component {
  render() {
    const { _id, username, shopping_cart } = this.props.user;

    let name = username.charAt(0).toUpperCase() + username.slice(1);
    let items_in_cart = shopping_cart.length;
    let shopping_cart_total = 0;

    return (
      <AppLayout currentUser={this.props.user}>
        <div className='cart_container'>
          <div className='customer_info'>
            <p className='cart_name'>Shopping Cart</p>
          </div>
          {(() => {
            if (items_in_cart > 0) {
              return (
                <>
                  <div className='cart_items'>
                    <table className='cart_table'>
                      <tr className='table_bottom_line'>
                        <th className='cart_product'>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>

                      {shopping_cart.map((product, index) => {
                        let subtotal = product.price * product.qty;
                        shopping_cart_total += subtotal;

                        return (
                          <tr id={`${index}`}>
                            <td className='cart_product'>
                              <a href={`/product/${product._id}`}>
                                {product.name}
                              </a>
                            </td>
                            <td>${product.price}</td>
                            <td>{product.qty}</td>
                            <td>${subtotal}</td>
                            <td>
                              <form
                                action={`/user/cart/${_id}/${product._id}?_method=DELETE`}
                                method='post'
                              >
                                <input
                                  type='image'
                                  src='/images/delete.png'
                                  alt='remove product'
                                  className='cart_delete'
                                />
                              </form>
                            </td>
                          </tr>
                        );
                      })}

                      <tr className='table_top_line'>
                        <td colSpan='2'></td>
                        <td className='cart_total'>Total</td>
                        <td>${shopping_cart_total}</td>
                        <td></td>
                      </tr>
                    </table>
                  </div>

                  <form action='' method='get'>
                    {/* must send post request so data is not immediately available in browser and appended to url (think username/password). it is sent to server instead.
                        methodOverride will override method='post' with method='delete' and sent to 
                      app.delete route instead of app.post route */}
                    <input type='submit' value='CHECKOUT' className='formBtn' />
                  </form>
                </>
              );
            } else {
              return (
                <p>
                  <br />
                  Your cart is empty. Please check out our fantastic products{' '}
                  <a href='/store'>here</a>.
                </p>
              );
            }
          })()}
        </div>
      </AppLayout>
    );
  }
}

module.exports = User_Show;
