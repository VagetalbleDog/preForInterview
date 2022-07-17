//提取props里的ref
type getPropRef<Props extends Object> = 'ref' extends keyof Props? Props extends {ref?:infer refType|undefined}?refType:never:never

interface Props{
    ref:string | number,
    name:string
}

const ref:getPropRef<Props> = 1;