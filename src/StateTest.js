import React, {Component} from 'react';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date(), counter: 1}
    }

    //生命周期
    componentDidMount() {
        this.timer = setInterval(() => {
            //setState修改状态
            this.setState({date: new Date()})
        }, 1000)

        //批量操作：对同一个key多次操作会合并，会执行最后一次
        this.setState({counter:this.state.counter+1});
        this.setState({counter:this.state.counter+1});
        this.setState({counter:this.state.counter+1},()=>{
            console.log(this.state.counter);//2
        });
        console.log(this.state.counter);//1——因为setState执行可能是异步的

        //想要立即拿到值：有以下3种方式
        //1、setState回调函数
        this.setState(prev=>{
            console.log(prev.counter);//2
            return prev.counter;
        })

        //2、使用定时器
        setTimeout(()=>{
            console.log(this.state.counter);//2
        },0)

        //3、原生事件处理
        document.body.addEventListener('click',this.changeCounter)
    }
    changeCounter=()=>{
        this.setState({counter:this.state.counter+1});
        console.log(this.state.counter);//3
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div>
                {this.state.date.toLocaleTimeString()}
                <p>{this.state.counter}</p>
            </div>
        )
    }
}

class StateTest extends Component {
    render() {
        return (
            <div>
                <Clock/>
            </div>
        );
    }
}

export default StateTest;