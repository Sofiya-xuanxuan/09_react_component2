import React, {Component} from 'react';

//购物车
function Cart(props) {
    return (
        <table>
            <tbody>
            {props.data.map(d => (
                <tr key={d.id} onClick={()=>props.onSelect(d.text)}>
                    <td>{d.text}</td>
                    <td>{d.count}</td>
                    <td>￥{d.price * d.count}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

class CartSample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            name: '',
            goods: [
                {text: '百万年薪架构师', price: 100, id: 1},
                {text: 'web全栈架构师', price: 2200, id: 2},
                {text: 'Python爬虫', price: 330, id: 3},
            ],
            cart: []
        }

        setTimeout(() => {
            this.setState({title: 'react购物车'})
        }, 1000)
    }

    //inputchange事件
    handleChange = (e) => {
        this.setState({name: e.target.value})
    }

    //添加新课
    addGood = () => {
        this.setState({
            goods: [...this.state.goods, {text: this.state.name, price: 999, id: this.state.goods.length + 1}]
        })
    }

    //加入购物车

    addCart = (good) => {
        const item = this.state.cart.find(c => c.text === good.text);
        if (item) {
            item.count++
            this.setState({
                cart: [...this.state.cart]
            })
        } else {
            this.setState({
                cart: [...this.state.cart, {...good, count: 1}]
            })
        }
    };
    //子父通信
    onSelect=name=>{
        console.log(name);
    }
    render() {
        const goods = this.state.goods.map(good => {
            return <li key={good.id}>
                {good.text}
                <button onClick={() => this.addCart(good)}>+加购物车</button>
            </li>
        });
        return (
            <div>
                {/*条件语句*/}
                {this.state.title && <h1>{this.state.title}</h1>}
                {/*事件处理*/}
                <div>
                    {/*react中的单向数据流*/}
                    <input type="text"
                           value={this.state.name}
                           onChange={e => this.handleChange(e)}
                        // onChange={this.handleChange}两种方式
                    />
                    <button onClick={e => this.addGood()}>添加</button>
                </div>
                <ul>
                    {goods}
                </ul>
                {/*购物车*/}

                <Cart data={this.state.cart} onSelect={this.onSelect}></Cart>
            </div>
        );
    }
}

export default CartSample;