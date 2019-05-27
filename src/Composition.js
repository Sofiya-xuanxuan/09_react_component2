import React from 'react';

function Dialog(props){
    const color=props.color||'blue';
    return (
        <div style={{border:`4px solid ${color}`}}>
            {/*children是固定名称，类似于匿名插槽*/}
            {props.children}
            <div>{props.foo('这个内容是dialog传递的')}</div>
            <div>{props.footer}</div>
        </div>
    )
}

//WelcomDialog通过符合提供内容
function WelcomDialog(){
    const footer=<button onClick={()=>alert('react')}>点我</button>;
    return (
        //传递任意合法表达式
        <Dialog color='red' footer={footer} foo={c=><p>{c}</p>}>
            <h1>欢迎光临</h1>
            <p>感谢使用react</p>
        </Dialog>
    )
}

//将p之外的标签过滤掉，不显示
function FilterP(props){
    return (
        <div>
            {React.Children.map(props.children,child=>{
                if(child.type !=='p') {
                    return;
                }
                return child;
            })}
        </div>
    )
}

//实现radio组合
function RadioGroup(props){
   //将name属性值赋给Radio
   return(
       <div>
           {React.Children.map(props.children,child=>React.cloneElement(child,{name:props.name}))}
       </div>
   )
}

function Radio(props){
    return (
        <label>
            <input type="radio" name={props.name}/>{props.children}
        </label>
    )
}


export default function Composition(){
    return(
        <>
            <WelcomDialog />

            <FilterP>
                <p>sofiya</p>
                <h1>穷徐</h1>
                <p>Hello</p>
                <span>你好</span>
            </FilterP>

            <RadioGroup name='mvvm'>
                <Radio value='vue'>vue</Radio>
                <Radio value='react'>react</Radio>
                <Radio value='angular'>angular</Radio>
            </RadioGroup>
        </>
    )
};