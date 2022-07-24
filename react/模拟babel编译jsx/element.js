import React from 'react'

function TestComponent(){
    return <p>hello,react</p>
}

function Index(){
    return <div>
        <span>模拟babel编译jsx</span>
        <TestComponent />
    </div>
}
export default Index;