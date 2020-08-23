const React = require('react');
const AppLayout = require('./AppLayout');

class Edit extends React.Component {
  render() {
    // take key product off of object product (key must exist)
    // const fruit = this.props.fruit;
    const { product, currentUser } = this.props;

    let name = product.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <AppLayout currentUser={currentUser}>
        <div className='product'>
          {/* <h1>EDIT PRODUCT</h1> */}
          <form action={`/product/${product._id}?_method=PUT`} method='post'>
            {/* NOTE: the form is pre-populated with values for the server */}
            <fieldset className='product-info'>
              <legend>EDIT PRODUCT</legend>

              {/* <-- PRODUCT NAME --> */}
              <label htmlFor='name'>NAME</label>
              <br />
              <input
                type='text'
                name='name'
                defaultValue={name}
                className='formInput'
              />
              <br />
              {/* <-- DESCRIPTION --> */}
              <label for='description'>DESCRIPTION</label>
              <br />
              <textarea
                name='description'
                defaultValue={product.description}
                className='formInput'
              ></textarea>
              <br />
              {/* <-- IMAGE --> */}
              <label htmlFor='img'>IMAGE</label>
              <br />
              <input
                type='text'
                name='img'
                defaultValue={product.img}
                className='formInput'
              />
              <br />
              {/* <-- PRICE --> */}
              <label htmlFor='price'>PRICE</label>
              <br />
              <input
                type='text'
                name='price'
                defaultValue={product.price}
                className='formInput'
              />
              <br />
              {/* <-- QUANTITY --> */}
              <label htmlFor='qty'>QUANTITY AVAILABLE</label>
              <br />
              <input
                type='text'
                name='qty'
                defaultValue={product.qty}
                className='formInput'
              />
            </fieldset>
            <br />
            <input
              type='submit'
              name=''
              defaultValue='SUBMIT CHANGES'
              className='formBtn'
            />
          </form>
        </div>
      </AppLayout>
    );
  }
}

module.exports = Edit;
