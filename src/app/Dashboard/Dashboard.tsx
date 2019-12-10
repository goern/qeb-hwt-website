import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextVariants,
  TextContent,
  Text
} from '@patternfly/react-core';

import { ThamosAdvise } from '@app/ThamosAdvise/ThamosAdvise';

const Dashboard: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component={TextVariants.h1}>Qeb-Hwt</Text>
        <Text component={TextVariants.p}>
          Qeb-Hwt will use the Thoth Service API to get advises on your application stack.
      </Text>
      </TextContent>
      <PageSection>
        <ThamosAdvise></ThamosAdvise>
      </PageSection>
      <PageSection>
        <TextContent>
          <Text component={TextVariants.small}>
            Qeb-Hwt website: git commit hash: {COMMITHASH}, version: {VERSION}
          </Text>
        </TextContent>
      </PageSection>
    </PageSection>
  </React.Fragment>
)

export { Dashboard };
