import * as React from 'react';
import {
  PageSection,
  PageSectionVariants,
  TextContent,
  Text
} from '@patternfly/react-core';

import { ThamosAdvise } from '@app/ThamosAdvise/ThamosAdvise';

const Dashboard: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <PageSection variant={PageSectionVariants.light}>
      <TextContent>
        <Text component="h1">Qeb-Hwt</Text>
        <Text component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque quaerat, ipsa quod atque natus eius omnis amet nisi aperiam impedit corrupti fugit itaque reprehenderit dolor nulla. Dolor voluptatum quasi ex.
      </Text>
      </TextContent>
      <PageSection>
        <ThamosAdvise adviserDocumentId="01cfc09e"></ThamosAdvise>
      </PageSection>
    </PageSection>
  </React.Fragment>
)

export { Dashboard };
