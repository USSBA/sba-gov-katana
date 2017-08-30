/*global expect*/

import React from 'react';
import BasicPage from 'client/components/templates/basic-page/basic-page.jsx';
import { TitleSection, Breadcrumb } from 'client/components/molecules';
import {shallow} from 'enzyme';

const title = "My Basic Page";
const summary = "My Basic Page Summary";

describe("BasicPage", () => {
  test("renders default data", () => {
    const component = shallow(
      <BasicPage title="" summary="" />
    );
    expect(component.find(".basicpage-mobilenav")).toHaveLength(1);
    expect(component.find(".basicpage-previousnext")).toHaveLength(1);
    expect(component.find(".basicpage-sectionnavigation")).toHaveLength(1);
    expect(component.find(".basicpage-titlesection")).toHaveLength(1);
  });

  test("creates a TitleSection component with appropriate props", () => {
    const component = shallow(
      <BasicPage title={title} summary={summary}/>
    );
    expect(component.find(".basicpage-titlesection").childAt(0).type()).toBe(TitleSection);
    expect(component.find(".basicpage-titlesection").childAt(0).prop("title")).toBe(title);
    expect(component.find(".basicpage-titlesection").childAt(0).prop("summary")).toBe(summary);
  });

  test("creates a Breadcrumb component with appropriate props", () => {
    const component = shallow(
      <BasicPage title={title} summary={summary} lineage={[{title: "lineage1", fullUrl: "http://example.com/lineage1"}]}/>
    );
    expect(component.find(".basicpage-breadcrumb").childAt(0).type()).toBe(Breadcrumb);
    expect(component.find(".basicpage-breadcrumb").childAt(0).prop("items")).toHaveLength(1);
    expect(component.find(".basicpage-breadcrumb").childAt(0).prop("items")[0].title).toBe("lineage1");
    expect(component.find(".basicpage-breadcrumb").childAt(0).prop("items")[0].url).toBe("http://example.com/lineage1");
  });
  test("creates an empty breadcrumb div without a lineage", () => {
    const component = shallow(
      <BasicPage title={title} summary={summary}/>
    );
    expect(component.find(".basicpage-breadcrumb").childAt(0).type()).toBe("div");
    expect(component.find(".basicpage-breadcrumb").childAt(0).children()).toHaveLength(0);
  });
})
