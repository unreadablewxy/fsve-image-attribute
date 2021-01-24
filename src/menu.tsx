import * as React from "react";

import {Attribute} from "./attribute";

interface PreferenceMappedProps {
}

interface Props extends PreferenceMappedProps {
    browsing: any;
    attribute: any;
}

interface State {
    attributes: any[] | null;
}

export class Menu extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            attributes: null,
        };
    }

    componentDidMount(): void {
        this.props.browsing.on("filefocus", this.handleFileFocus);
    }

    componentWillUnmount(): void {
        this.props.browsing.off("filefocus", this.handleFileFocus);
    }

    render(): React.ReactNode {
        return <ul className="uc-fsv-attr-editor">
            <label>
                {this.state.attributes
                    ? this.state.attributes.map(
                        a => <Attribute {...a} onSave={this.handleSave} />)
                    : <div>Loading</div>}
            </label>
        </ul>;
    }

    handleFileFocus = async (index: number | null): Promise<void> => {
        this.setState({attributes: null});
        const file = this.props.browsing.files.names[index as number];
        if (file) {
            const attributes = await this.props.attribute.getAll(file);
            this.setState(() => this.props.browsing.focusedFile === index
                ? {attributes}
                : null);
        }
    };

    handleSave = async (name: string, value: string): Promise<void> => {
        // TODO:
    };
}

export const Definition = {
    id: "comparer",
    path: "/stage",
    services: ["browsing", "attribute"],
    component: Menu,
};