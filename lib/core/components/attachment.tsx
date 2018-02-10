// modules
import * as React from 'react';
import * as debug from 'debug';

// components
import Paper from 'material-ui/Paper';

import { List, ListItem, RaisedButton, IconButton } from 'material-ui';
import SVGClose from 'material-ui/svg-icons/navigation/close';

import Dropzone from 'react-dropzone';

import * as request from 'superagent';
// types

// selectors
// actions

const log = debug('lumi:cards:components:card-attachment');

interface IPassedProps {
    doc_id: string;
    _rev: string;
    attachments;
}

interface IDispatchProps {
    insert_cb?: (link: string) => void;
}

interface IProps extends IPassedProps, IDispatchProps {}

export default class AttachmentComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);

        this.insertAttachment = this.insertAttachment.bind(this);
        this.onDrop = this.onDrop.bind(this);

        this._delete = this._delete.bind(this);
    }

    public insertAttachment(attachment: string) {
        this.props.insert_cb('![attachment](/attachment/' + attachment + ')');
    }

    public onDrop(acceptedFiles) {
        log(acceptedFiles);
        acceptedFiles.forEach(file => {
            const req = request
                .put(
                    '/api/v0/cards/' +
                        this.props.doc_id +
                        '/attachment/' +
                        file.name +
                        '?rev=' +
                        this.props._rev
                )
                .set('Content-Type', file.type)
                .send(file)
                .end(() => {
                    log('files attached', acceptedFiles);
                });
        });
    }

    public _delete(key: string) {
        request
            .delete(
                '/api/v0/cards/' +
                    this.props.doc_id +
                    '/attachment/' +
                    key +
                    '?rev=' +
                    this.props._rev
            )
            .end(() => {
                log('attachment deleted');
            });
    }

    public render() {
        return (
            <div>
                <List>
                    {(() => {
                        return Object.keys(this.props.attachments || {}).map(
                            key => (
                                <a
                                    href={
                                        '/api/v0/cards/' +
                                        this.props.doc_id +
                                        '/attachment/' +
                                        key
                                    }
                                    target="_blank"
                                >
                                    <ListItem
                                        key={key}
                                        primaryText={key}
                                        rightIconButton={
                                            <IconButton
                                                onClick={() =>
                                                    this._delete(key)
                                                }
                                            >
                                                <SVGClose />
                                            </IconButton>
                                        }
                                    />
                                </a>
                            )
                        );
                    })()}
                </List>
                <Dropzone onDrop={this.onDrop}>
                    <RaisedButton primary={true} label="Add attachment" />
                </Dropzone>
            </div>
        );
    }
}
