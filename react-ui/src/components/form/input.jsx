import React, {Component} from 'react';

//helpers
import ClassNames from "classnames";

export default class InputWrapper extends Component {
    static defaultProps = {
        value: ''
    };
    constructor (props) {
        super(props);
        this.state = {focused : false};
    }
    render() {
        const {className, type, required, label, error, value, onChange, onSetValue=()=>{}} = this.props;
        const newClassName = ClassNames('InputWrapper', className, {
            'focused': this.state.focused || value.length,
            'error': error
        });
        return(
            <div className={newClassName}>
                <input type={type}
                       onChange={onChange}
                       required={required}
                       value={value}
                       onFocus={() => this.focused = true}
                       onBlur={() => this.focused = false}
                />
                <label>{label}</label>
            </div>
        )
    }
}