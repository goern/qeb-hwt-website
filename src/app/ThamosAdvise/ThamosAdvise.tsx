import * as React from 'react';
import { Grid, GridItem, Text } from '@patternfly/react-core';

import axios from 'axios';
import queryString from 'query-string'


export interface IThamosAdvise {
    adviserDocumentId?: {};
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

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleChange(event) {
        this.setState({ documentId: event.target.value });
    }

    handleSubmit(event) {
        this.fetchData();
        event.preventDefault();
    }

    pipfileLockOrError(result: {}) {
        const product = result.report.products[0]; // FIXME it should be the product with the highest score

        if (!result.error) {
            return (
                <div>
                    <Text component="h2">Pipfile.lock</Text>
                    <Text component="p"><code>{JSON.stringify(product.project.requirements_locked)}</code></Text>
                </div>
            )
        }
    }

    adviseOrError(result: {}) {
        const product = result.report.products[0]; // FIXME it should be the product with the highest score

        if (result.error) {
            return (<Text component="p">Error in advise: {result.error_msg}</Text>)
        } else {
            return (
                <div>
                    <Text component="h2">Advises</Text>
                    <Text component="p">{product.justification}</Text>
                </div>
            )
        }
    }

    dumpPipfile(report: {}) {
        const product = report.products[0]; // FIXME it should be the product with the highest score

        return (
            <Text component="blockquote">
                {JSON.stringify(product.project.requirements)}
            </Text>
        )
    }

    render() {
        if (this.state.isLoading) {
            return (<Text component="p">Loading ...</Text>);
        }

        if (this.state.isError) {
            return (<Text component="p">Error: {this.state.errorMessage}</Text>);
        }

        // TODO nice view if we cant get the adviser result from API

        return (

            <Grid gutter="md">
                <GridItem span={12}>
                    <Text component="h2">Environment</Text>
                    <Text component="p">We have analysed an application stack running on <em>{this.state.advise.metadata.os_release.name} {this.state.advise.metadata.os_release.version}</em>, running Python ({this.state.advise.metadata.python.implementation_name}) {this.state.advise.metadata.python.major}.{this.state.advise.metadata.python.minor}.{this.state.advise.metadata.python.micro}. It was Adviser Job ID <em>{this.state.advise.metadata.document_id}</em>, by thoth-analyser v{this.state.advise.metadata.analyzer_version}.
                        </Text>
                </GridItem>
                <GridItem span={8}>

                    <Text component="h2">Pipfile</Text>
                    {this.dumpPipfile(this.state.advise.result.report)}
                </GridItem>
                <GridItem span={4} rowSpan={2}>
                    {this.adviseOrError(this.state.advise.result)}
                </GridItem>
                <GridItem span={8}>
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
