import React from 'react';
import './App.css';
import JsxTest from './JsxTest'
import CompType from './CompType'
import StateTest from './StateTest'
import CartSample from './CartSample'
import style from './App.module.css'
//全局引入
// import Button from 'antd/lib/button'
// import 'antd/dist/antd.css'

//按需引入
import {Button} from 'antd';

import CommontList from './CommontList';
import Hoc from './Hoc'

import Composition from './Composition'

import ContextTest from './ContextTest'

import HookTest from './HookTest'

import KFormTest from './KFormTest'
function App() {
    return (
        <div className={style.img}>
            {/* 自定义组件开头大写 */}
            {/* <JsxTest /> */}
            <JsxTest/>
            {/*组件类型*/}
            <CompType/>
            {/*状态*/}
            <StateTest/>
            {/*购物车*/}
            <CartSample/>

            {/*antd按钮*/}
            <Button type='primary'>Button</Button>

            {/*容器组件&展示组件*/}
            <CommontList />

            {/*高阶组件*/}
            <Hoc name='sofiya'/>

            {/*组件复合*/}
            <Composition />

            {/*组件跨层级通信-Context*/}

            <ContextTest />

            {/*Hooks*/}
            <HookTest />

            {/*组件设计与实现*/}
            <KFormTest />
        </div>
    );
}

export default App;
