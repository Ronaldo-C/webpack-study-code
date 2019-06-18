const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8') //读取文件内容
    const ast = parser.parse(content, { //转化为抽象语法树
        sourceType: 'module' //以严格模式解析并允许模块声明
    })
    const dependencies = {}
    traverse(ast, {
        ImportDeclaration({ node }) { //遍历抽象语法树，找到type为ImportDeclaration的节点
            //生成绝对路径
            const dirname = path.dirname(filename)
            const newFile = './' + path.join(dirname, node.source.value)
            dependencies[node.source.value] = newFile
        }
    })
    //把es6语法转化为浏览器可以执行的语法
    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    })
    return {
        filename,
        dependencies,
        code
    }
}

const makeDependenciesGraph = (entry) => {
    //生成依赖图谱,代码分析所有模块
    const entryModule = moduleAnalyser(entry)
    const graphArray = [ entryModule ]
    for(let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i]
        const { dependencies } = item
        if(dependencies) {
            for(let j in dependencies) {
                graphArray.push(
                    moduleAnalyser(dependencies[j])
                )
            }
        }
    }
    //数据格式转换为对象
    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    });
    return graph;
}

const generateCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry))
    //使用闭包让模块代码不会影响到外部变量
    return `
        (function(graph) {
            function require(module) {
                function localRequire(relativePath) {
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require, exports, code) {
                    eval(code)
                })(localRequire, exports, graph[module].code);
                return exports;
            };
            require('${entry}')
        })(${graph});
    `
}

const code = generateCode('./src/index.js')
console.log(code)
