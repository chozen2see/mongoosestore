const React = require('react');
const AppLayout = require('./AppLayout');

class Show extends React.Component {
  render() {
    const { _id, name, description, img, price, qty } = this.props.product;
    const currentUser = this.props.currentUser;

    let nameUpperCase = name;
    nameUpperCase =
      nameUpperCase.charAt(0).toUpperCase() + nameUpperCase.slice(1);
    const id = _id;

    return (
      <AppLayout currentUser={currentUser}>
        <div className='show_container'>
          <aside>
            <div className='show_image'>
              <img src={`${img}`} alt={`${name}`} />
            </div>
          </aside>
          <main>
            <p className='show_product_name'>
              {nameUpperCase} (${price})
            </p>
            <hr />
            <h2 className='show_product_description'>{description}</h2>
            <p className='show_product_description_details'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              ratione odit impedit sint, quibusdam molestias, perferendis,
              debitis a ad officia dolorum sunt animi totam vero voluptate
              laudantium? Quisquam, ipsam ipsa.
            </p>
            <p className='show_product_quantity'>
              Quantity Available:
              <span className={qty === 0 ? 'out_of_stock' : ''}>
                {qty > 0 ? '  ' + qty : '  OUT OF STOCK'}
              </span>
            </p>
            <div className='buttons'>
              <p>
                <a href={`/product/${id}/edit`} className='formBtn editBtn'>
                  Edit Product
                </a>
              </p>

              <form action={`/buy/${id}?_method=PUT`} method='post'>
                <input
                  type='submit'
                  value='BUY'
                  className={`formBtn ${qty > 0 ? '' : 'hidden'}`}
                />
              </form>
              <form action={`/product/${id}?_method=DELETE`} method='post'>
                {/* must send post request so data is not immediately available in browser and appended to url (think username/password). it is sent to server instead.
                methodOverride will override method='post' with method='delete' and sent to 
              app.delete route instead of app.post route */}
                <input
                  type='submit'
                  value='DELETE PRODUCT'
                  className='formBtn'
                />
              </form>
            </div>
          </main>
        </div>
      </AppLayout>
    );
  }
}

module.exports = Show;
