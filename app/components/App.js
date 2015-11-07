import React from 'react'
import Home from './Home'

class App extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
        </div>
    );
  }
}
// const App = React.createClass({
//   render() {
//     return (
//       <div>
//       tats
//       </div>
//     );
//   }
// })
export default App
