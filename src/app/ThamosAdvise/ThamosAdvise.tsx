import * as React from 'react';
import {
    Grid,
    GridItem,
    Text,
    TextVariants,
    Title,
    Button,
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon,
    EmptyStateBody,
    EmptyStateSecondaryActions
} from '@patternfly/react-core';
import { Spinner } from '@patternfly/react-core/dist/esm/experimental';
import { CubesIcon } from '@patternfly/react-icons';

import axios from 'axios';
import queryString from 'query-string';

import TOML from '@iarna/toml';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const humanizeDuration = require('humanize-duration')

export interface IThamosAdvise {
    adviserDocumentId?: {};
    serviceEnvironment?: {};
}


class ThamosAdvise extends React.Component<IThamosAdvise> {
    constructor(props) {
        super(props);

        this.state = {
            advise: {},
            isLoading: true,
            isError: false,
            errorMessage: "",
            documentId: "",
            documentIdQueryString: null,
        };
    }

    componentDidMount() {
        this.setState({ documentId: this.props.adviserDocumentId });

        const value = queryString.parse(window.location.search); // TODO not sure if this is a good way...

        if (value.adviser_document_id) {
            this.setState({ documentIdQueryString: value.adviser_document_id.toString() });
            this.fetchData(value.adviser_document_id.toString());
        } else {
            this.setState({ isLoading: false, isError: true, errorMessage: "no adviser_document_id provides as query parameter!" });
        }
    }

    fetchData(adviser_document_id: string) {
        console.log(adviser_document_id);
        this.setState({ isLoading: true });

        console.log(this.props.adviserDocumentId);

        axios.get('https://stage.thoth-station.ninja/api/v1/advise/python/adviser-' + adviser_document_id)
            .then(res => {
                const data = res.data;
                this.setState({ advise: data, isLoading: false })
            })
            .catch(error => {
                // handle error
                this.setState({ isLoading: false, isError: true, errorMessage: error.response.data.error })
            })

    }

    pipfileLockOrError(result: {}) {
        if (!result.error) {
            const product = result.report.products[0]; // FIXME it should be the product with the highest score

            return (
                <SyntaxHighlighter language="javascript" style={docco}>
                    {JSON.stringify(product.project.requirements_locked, null, 3)}
                </SyntaxHighlighter>
            )
        }
    }

    adviseOrError(result: {}) {
        if (result.error) {
            return (<Text component="p">Error in advise: {result.error_msg}</Text>)
        } else {
            const product = result.report.products[0]; // FIXME it should be the product with the highest score

            return (
                <div>
                    <Text component="p">{product.justification}</Text>
                </div>
            )
        }
    }

    dumpPipfile(result: {}) {
        if (result.parameters.project) {
            return (
                <SyntaxHighlighter language="toml" style={docco}>
                    {TOML.stringify(result.parameters.project.requirements)}
                </SyntaxHighlighter>
            )
        } else {
            return (
                <Text component={TextVariants.p}>&nbsp;</Text>
            )
        }
    }

    render() {
        if (this.state.isLoading) {
            return (<Spinner size="lg" />);
        }

        if (this.state.isError) {
            return (
                <EmptyState variant={EmptyStateVariant.full}>
                    <EmptyStateIcon icon={CubesIcon} />
                    <Title headingLevel="h5" size="lg">No Adviser Document found</Title>
                    <EmptyStateBody>
                        <Text component="p">Error: {this.state.errorMessage}</Text>

                    </EmptyStateBody>
                    <Button variant="primary" component="a" href="/?adviser_document_id=f4994f74">try this one</Button>
                    <EmptyStateSecondaryActions>
                        <Button variant="link" component="a" href="https://thoth-station.ninja/" target="_blank">Project Thoth</Button>
                        <Button variant="link" component="a" href="https://thoth-station.ninja/docs/developers/adviser/" target="_blank">Adviser Documentation</Button>
                        <Button variant="link" component="a" href="https://github.com/thoth-station" target="_blank">GitHub</Button>
                    </EmptyStateSecondaryActions>
                </EmptyState>
            );
        }

        // TODO one view while advise is still running...

        return (
            <Grid gutter="md">
                <GridItem span={12}>
                    <Text component="h2">the <b>Build Environment</b></Text>
                    <Text component="p">We have analysed an application stack running on <em>{this.state.advise.metadata.os_release.name} {this.state.advise.metadata.os_release.version}</em>, running Python ({this.state.advise.metadata.python.implementation_name}) {this.state.advise.metadata.python.major}.{this.state.advise.metadata.python.minor}.{this.state.advise.metadata.python.micro}. It was Adviser Job ID <em>{this.state.advise.metadata.document_id}</em>, by thoth-analyser v{this.state.advise.metadata.analyzer_version}. The adviser job was performed in {humanizeDuration(this.state.advise.metadata.duration * 1000)}.
                        </Text>
                </GridItem>
                <GridItem span={8}>
                    <Text component="h2">your <code><b>Pipfile</b></code></Text>
                    {this.dumpPipfile(this.state.advise.result)}
                </GridItem>
                <GridItem span={4} rowSpan={2}>
                    <Text component="h2">our <code><b>Advises</b></code></Text>
                    {this.adviseOrError(this.state.advise.result)}
                </GridItem>
                <GridItem span={8}>
                    <Text component="h2">our <code><b>Pipfile.lock</b></code></Text>
                    {this.pipfileLockOrError(this.state.advise.result)}
                </GridItem>
            </Grid>

            /*
            <div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Job ID: <input type="text" value={this.state.documentId} onChange={this.handleChange} />
                        </label>
                        <input type="submit" value="refresh" />
                    </form>
                </div>
            </div>
            */
        );
    }
}

export { ThamosAdvise };
