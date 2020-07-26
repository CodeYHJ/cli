import React from 'react';
import ReactDOM from 'react-dom';
interface AppProps {

}

const App: React.SFC<AppProps> = () => {
    return (
        <div>app</div>
    );
}
ReactDOM.render(<App />, document.getElementById('app'))
export default App;