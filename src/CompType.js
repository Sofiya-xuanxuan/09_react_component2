import React, {Component} from 'react';

//函数形式的组件
function Welcome1(props) {
    return <div>Welcome1,{props.name}</div>;
}

//类形式的组件
class Welcome2 extends Component {
    render() {
        return <div>Welcome2,{this.props.name}</div>
    }
}

export default function CompType() {
    return (
        <div>
            {/*属性是只读的不能改*/}
            {/*将嵌套复杂的组件抽取为更小的组件是最佳实践*/}
            <Welcome1 name='sofiya'/>
            <Welcome2 name='tom'/>
        </div>
    )
};