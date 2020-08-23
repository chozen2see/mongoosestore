const React = require('react');
const AppLayout = require('./AppLayout');

class New extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <AppLayout currentUser={currentUser}>
        <div className='product'>
          {/* <h2>ADD NEW PRODUCT</h2> */}
          {/* NOTE: action will be the route, method will be the HTTP verb */}
          <form action='/store' method='POST'>
            <fieldset className='product-info'>
              <legend>ADD NEW PRODUCT</legend>

              {/* <-- PRODUCT NAME --> */}
              <label htmlFor='name'>NAME</label>
              <br />
              <input
                type='text'
                name='name'
                className='formInput'
                placeholder='Product Name'
              />
              <br />
              {/* <-- DESCRIPTION --> */}
              <label for='description'>DESCRIPTION</label>
              <br />
              <textarea
                name='description'
                placeholder='Product description...'
                className='formInput'
              ></textarea>
              <br />
              {/* <-- IMAGE --> */}
              <label htmlFor='img'>IMAGE</label>
              <br />
              <input
                type='text'
                name='img'
                className='formInput'
                placeholder='/images/image.jpg'
              />
              <br />
              {/* <-- PRICE --> */}
              <label htmlFor='price'>PRICE</label>
              <br />
              <input
                type='text'
                name='price'
                className='formInput'
                placeholder='0'
              />
              <br />
              {/* <-- QUANTITY --> */}
              <label htmlFor='qty'>QUANTITY AVAILABLE</label>
              <br />
              <input
                type='text'
                name='qty'
                className='formInput'
                placeholder='0'
              />
            </fieldset>
            <br />
            {/* <-- SUBMIT BUTTON --> */}
            <input
              type='submit'
              name=''
              value='CREATE PRODUCT'
              className='formBtn'
            />
          </form>
        </div>
      </AppLayout>
    );
  }
}

module.exports = New;
