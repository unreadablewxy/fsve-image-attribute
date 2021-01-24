import * as React from "react";

interface Props {
    name: string;
    value: string;

    onSave(name: string, value: string): void;
}

interface State {
    name: string;
    value: string;
}

export class Attribute extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: props.name,
            value: props.value,
        };

        this.handleSetValue = this.handleSetValue.bind(this);
    }

    render() {
        return <label>
            <div>{this.state.name}</div>
            <textarea onChange={this.handleSetValue}>{this.state.value}</textarea>
        </label>;
    }

    handleSetValue(ev: React.ChangeEvent) {
        this.setState({value: ev.target.nodeValue || ""});
    }
}