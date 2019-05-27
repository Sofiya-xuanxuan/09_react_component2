import React, {Component} from 'react';
import logo from './logo.svg';
import './index.css'
function formatName(user) {
    return user.firstName+'-'+user.lastName
}
class JsxTest extends Component {
    render() {
        const name='Sofiya';
        const greet=<p>hello,sofiya!</p>
        return (
            <div>
                {/*表达式：任意的合法的表达式即可*/}
                <h1>{name}</h1>
                {/*函数也是表达式*/}
                <p>{formatName({firstName:'qiao',lastName:'xu'})}</p>
                {/*jsx也是表达式*/}
                {greet}

                {/*属性*/}
                <img src={logo} style={{width:'100px'}} className='img' alt=''/>
                <label htmlFor="">fff</label>
            </div>
        )
    }
}

export default JsxTest;