import * as redux from '/node_modules/redux/es/redux.mjs'

// Redux logic
const reducer = (state, action) => {
    console.log(action)

    if (state === undefined) {
        return {
            color: 'yellow',
        }
    }

    if (action.type === 'CHANGE_COLOR') {
        return {
            ...state,
            color: action.color,
        }
    }
}

const store = redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const $tag = (tagName, content = '', className) => {
    const tag = document.createElement(tagName)

    tag.textContent = content
    tag.className = className

    return tag
}

class ColorBox {
    constructor(colorName) {
        this.colorName = colorName
    }

    onclickF() {
        const color = this.colorName

        return function () {
            store.dispatch({
                type: 'CHANGE_COLOR',
                color,
            })
        }
    }

    firstRender() {
        const h1 = $tag('h1', this.colorName)
        const button = $tag('button', 'fire')

        button.addEventListener('click', this.onclickF())

        const div = $tag('div', '', 'container')

        div.append(h1, button)

        div.style['backgroundColor'] = store.getState().color

        div.id = this.colorName

        document.body.append(div)

        return this
    }

    renderF() {
        const colorName = this.colorName

        return function () {
            const { color } = store.getState()

            document.getElementById(colorName).style['backgroundColor'] = color

            return this
        }
    }
}

const main = () => {
    const colors = ['red', 'blue', 'green', 'orange', 'purple', 'yellow']

    const colorBoxes = colors.map(color => new ColorBox(color))

    console.log(colorBoxes)

    colorBoxes
        .map(colorBox => colorBox.firstRender())
        .map(colorBox => store.subscribe(colorBox.renderF()))
}

window.addEventListener('load', main)
