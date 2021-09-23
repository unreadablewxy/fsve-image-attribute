import "./menu.sass";
import * as React from "react";
import {mdiImageText} from "@mdi/js";
import {parse as parseExif} from "exifr";

import type {browsing, io} from "fs-viewer";

type Property = [name: string, value: string];

const Table = window.components.createTable<Property, {}>(null, [
    {
        label: "Name",
        width: 10,
        render: v => <span>{v.value[0]}</span>
    },
    {
        label: "Value",
        width: 10,
        render: v => <span>{v.value[1]}</span>
    },
]);

interface PreferenceMappedProps {
}

interface Props extends PreferenceMappedProps {
    browsing: browsing.Service;
    reader: io.Reader;
}

interface State {
    attributes: Property[];
}

export class Menu extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            attributes: [],
        };

        this.handleFileFocus = this.handleFileFocus.bind(this);
    }

    componentDidMount(): void {
        this.props.browsing.on("filefocus", this.handleFileFocus);

        this.handleFileFocus(this.props.browsing.focusedFile);
    }

    componentWillUnmount(): void {
        this.props.browsing.off("filefocus", this.handleFileFocus);
    }

    render(): React.ReactNode {
        return <ul className="menu uc-fsv-attr-editor">
            <li>
                <Table scroll values={this.state.attributes} placeholder="Loading" />
            </li>
        </ul>;
    }

    async handleFileFocus(index: number | null): Promise<void> {
        this.setState({attributes: []});

        const {browsing, reader} = this.props;
        const file = browsing.files.names[index as number];
        if (file) {
            const filePath = reader.joinPath(browsing.files.path, file);
            const exif = await parseExif(`file://${filePath}`, true);
            const attributes = Object.keys(exif).
                reduce((r, k) => (r.push([k, String(exif[k])]), r), [] as Property[]);

            this.setState(() => browsing.focusedFile === index
                ? {attributes}
                : null);
        }
    }
}

export const Definition = {
    id: "attributes",
    icon: mdiImageText,
    label: "Attributes",
    path: "/stage",
    services: ["browsing", "reader"],
    component: Menu,
};