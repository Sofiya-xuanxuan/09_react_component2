import React, {Component} from 'react';

//创建一个函数，接收一个组件，返回另外一个组件
function withStage(Component) {
    const NewComponent=props=>{
        return <Component {...props} stage='react'/>
    }
    return NewComponent;
}

//功能：日志记录log
function withLog(Component){
    console.log(Component.name);
    return props=>{
        return <Component {...props}/>
    }
}

//装饰器
@withLog
@withStage
@withLog
class Kaikeba extends Component{
    render() {
        return (
            <div>
                {this.props.stage}--{this.props.name}
            </div>
        )
    }
}

export default Kaikeba;