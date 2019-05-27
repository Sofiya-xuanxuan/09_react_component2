import React, {Component, PureComponent} from 'react';
//展示组件
// function Comment({data}){
//     console.log('react render');//每隔1s执行一次
//     return (
//         <div>
//             <p>{data.body}</p>
//             <p>---{data.author}</p>
//         </div>
//     )
// }

// class Comment extends Component {
//     shouldComponentUpdate(nextProps) {
//         if(nextProps.data.body==this.props.data.body && nextProps.data.author==this.props.data.author) {
//            return false;
//         }
//         return true;
//     }
//
//     render() {
//         console.log('react render');//每隔1s执行一次
//         const {data} = this.props;
//         return (
//             <div>
//                 <p>{data.body}</p>
//                 <p>---{data.author}</p>
//             </div>
//         )
//     }
// }

//使用纯组件来解决：不管数据变化没变化，都会重复render这个过程，会影响性能
// class Comment extends PureComponent{
//     render() {
//         console.log('react render');//每隔1s执行一次
//         // const {data} = this.props;
//         const {body,author} = this.props;
//         return (
//             <div>
//                 <p>{body}</p>
//                 <p>---{author}</p>
//             </div>
//         )
//     }
// }

//使用React.memo使用函数式的组件也能拥有PureComponent的功能

const Comment=React.memo(function({body,author}){
    console.log('react render');//每隔1s执行一次
    return (
        <div>
            <p>{body}</p>
            <p>---{author}</p>
        </div>
    )
})



//容器组件
export default class CommontList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        setInterval(() => {
            //定时器的目的是每隔1s，去服务器看一下，数据有没有变化，不管数据变化没有，都会导致组件重新render
            //优化：immutable.js
            this.setState({
                comments: [
                    {body: 'react is very good', author: 'facebook'},
                    {body: 'vue is very good', author: 'youyuxi'},
                ]
            })
        }, 1000)
    }

    render() {
        return (
            <div>
                {this.state.comments.map((item, index) => (
                    //data={item}——直接将属性展开去传递数据
                    <Comment key={index} {...item}></Comment>
                ))}
            </div>
        );
    }
}