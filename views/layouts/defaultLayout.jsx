var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
              <html>
      <head>
      <title>{this.props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      </head>
        <body style={{backgroundColor:"#191919"}}>
          {this.props.children}
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;