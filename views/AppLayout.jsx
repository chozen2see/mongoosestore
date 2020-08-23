const React = require('react');
// let userid = '5eacca26965eadc463792723';

class AppLayout extends React.Component {
  render() {
    // console.log(this.props.currentUser);
    const id =
      this.props.currentUser._id !== undefined
        ? this.props.currentUser._id
        : '5eacca26965eadc463792723';

    const username =
      this.props.currentUser.username !== undefined
        ? this.props.currentUser.username.charAt(0).toUpperCase() +
          this.props.currentUser.username.slice(1)
        : 'MakeupLyfe';

    return (
      <html>
        <head>
          <link rel='stylesheet' href='/css/app.css' />
          {/* <script src='/js/functions.js'></script> */}
          <title>Mongoose Store</title>
        </head>
        <body>
          <header>
            <img
              src='/images/logo.png'
              alt='Mongoose Store Logo'
              className='logo'
            />
            <p className='greeting'>Welcome, {username}!</p>
          </header>
          <nav>
            <a href='/store'>Shop</a>
            <a href='/product/new'>Add New Product</a>
            <a href={`/user/${id}`}>View Cart</a>
          </nav>
          <br />
          <div className='wrapper'>{this.props.children}</div>
          <footer>
            <p className='copyright'>Copyright Mongoose Store &copy; 2020</p>
          </footer>
        </body>
      </html>
    );
  }
}

module.exports = AppLayout;
