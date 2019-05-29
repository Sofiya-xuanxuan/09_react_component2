import React, {useState, useEffect, useReducer, useContext} from 'react';

//水果列表
function FruitList({fruits, setFruit}) {
    return (
        fruits.map(f => (
            <li key={f} onClick={() => setFruit(f)}>{f}</li>
        ))
    )
}

//添加水果
function FruitAdd(props) {
    const [pname, setPname] = useState('草莓');

    const {dispatch} = useContext(Context);

    const onAddFruit = (e) => {
        if (e.key === 'Enter') {
            dispatch({type: 'add', payload: pname})
            //props.onAddFruit(pname);
            //清空输入框
            setPname('');
        }
    }
    return (
        <div>
            <input type="text" value={pname} onChange={e => setPname(e.target.value)} onKeyDown={onAddFruit}/>
        </div>
    )
}

//将状态移至全局
function fruitReducer(state, action) {
    switch (action.type) {
        case 'init':
            return {...state, list: action.payload};
        case'add':
            return {...state, list: [...state, action.payload]};
        case'loading_start':
            return {...state, loading: true};
        case'loading_end':
            return {...state, loading: false}
        default:
            return state;
    }
}

//判断对象是否是promise
function isPromise(obj) {
    return (
        !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
    )
}

//mock一个异步方法
async function asyncFetch(p) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(p);
        }, 1000)
    })
}


//对dispatch函数进行封装，使其支持处理异步数据
function wrapDispatch(dispatch) {
    return function (action) {
        if (isPromise(action.payload)) {
            dispatch({type: 'loading_start'});
            action.payload.then(v => {
                dispatch({type: action.type, payload: v});
                dispatch({type: 'loading_end'})
            })
        } else {
            dispatch(action)
        }
    }
}

//创建上下文
const Context = React.createContext();

export default function HookTest() {
    //useState参数是状态初始值
    //返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState('草莓');
    //const [fruits, setFruits] = useState([]);

    //参数1是相关reducer，参数2是初始值
    //const [fruits, dispatch] = useReducer(fruitReducer, []);
    const [{list: fruits, loading}, originDispatch] = useReducer(fruitReducer, {
        list: [],
        loading: false
    })

    //包装dispatch
    const dispatch=wrapDispatch(originDispatch);

    //使用useEffect操作副作用，第一个参是回调函数，第二个参是数组
    //任何的状态变更都会执行useEffect
    //请务必设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        console.log('get Fruits');
        dispatch({type: 'init', payload: asyncFetch(['草莓', '香蕉'])})
        // setTimeout(() => {
        //     //setFruits(['草莓', '香蕉'])
        //     dispatch({type: 'init', payload: ['草莓', '香蕉']})
        // }, 2000)
    }, []);

    //设置依赖选项
    useEffect(() => {
        document.title = fruit;
    }, [fruit]);

    //清除工作
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('应用启动了');
        }, 1000)

        //返回清除函数
        return function () {
            clearInterval(timer)
        }
    }, []);


    return (
        //提供上下文的值
        <Context.Provider value={{fruits, dispatch}}>
            <div>
                <p>{fruit === '' ? "请选择喜爱的水果" : `您选择的是${fruit}`}</p>

                {/*<FruitAdd onAddFruit={pname => dispatch({type: 'add', payload: pname})}/>*/}
                {/* 这里不再需要给FruitAdd传递变更函数，实现了解耦 */}
                <FruitAdd/>

                {/*加载状态处理*/}
                {
                    loading?(<div>数据加载中...</div>):(<FruitList fruits={fruits} setFruit={setFruit}/>)
                }
            </div>
        </Context.Provider>
    )
}

