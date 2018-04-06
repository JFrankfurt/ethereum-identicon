import React, {Component} from 'react'
import * as jazzicon from "jazzicon"


export default class EthereumIdenticon extends Component {
    constructor(props) {
        super(props)
        this.node = null;
        this.diameter = props.diameter || 46
    }

    componentDidMount() {
        const {address} = this.props
        if (address) {
            const container = this.node;
            const img = this.generateNewIdenticon(address, this.diameter)
            container.appendChild(img)
        }
    }

    componentDidUpdate() {
        const {address} = this.props
        this.diameter = this.props.diameter || this.diameter
        if (address) {
            const container = this.node
            const {children} = container
            for (let i of children) {
                container.removeChild(children[i])
            }
            container.appendChild(this.generateNewIdenticon(address, this.diameter))
        }
    }

    jsNumberForAddress = address => parseInt(address.slice(2, 10), 16)

    generateNewIdenticon = (address, diameter) => jazzicon(diameter, this.jsNumberForAddress(address))

    render() {
        const {diameter} = this
        const style = {
            display: 'inline-block',
            alignItems: 'center',
            justifyContent: 'center',
            height: diameter,
            width: diameter,
            borderRadius: diameter / 2,
            overflow: 'hidden',
        }
        return <div ref={x => this.node = x} style={style}/>
    }
}