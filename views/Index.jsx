const React = require('react');
const AppLayout = require('./AppLayout');

class Index extends React.Component {
  render() {
    const { products, currentUser } = this.props;
    // render method must return something...
    return (
      <AppLayout currentUser={currentUser}>
        <div className='container'>
          {products.map((product, index) => {
            let name = product.name;
            let id = product._id;

            name = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <div className='card' id={`${index}`}>
                <div className='card_top'>
                  <h3>{product.name}</h3>
                </div>
                <div className='card_body'>
                  <div className='card_image'>
                    <a href={`/product/${id}`}>
                      <img
                        src={`${product.img}`}
                        alt={`${product.name}`}
                        // className='card_image'
                      />
                    </a>
                  </div>
                  {/* <p>Description:</p> */}
                  <p className='card_description'>{product.description}</p>
                  <div className='card_price_quanity'>
                    <p>Price: ${product.price}</p>

                    {/* <p>Quantity: {product.qty}</p> */}
                  </div>
                </div>
                <div className='card_bottom'>
                  <a href={`/product/${id}`}>Product Details</a>
                  {' | '}
                  <a href={`/product/${id}/edit`}>Edit Product</a>
                  {/* DELETE FORM - forms can only get or put. 
              TRICK IT USING NPM PKG:
              npm i method-override --save
            */}

                  <form action={`/product/${id}?_method=DELETE`} method='post'>
                    {/* must send post request so data is not immediately available in browser and appended to url (think username/password). it is sent to server instead.
                methodOverride will override method='post' with method='delete' and sent to 
                app.delete route instead of app.post route */}
                    <input type='submit' value='DELETE' className='formBtn' />
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </AppLayout>
    );
  }
}

module.exports = Index;
